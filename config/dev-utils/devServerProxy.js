/* eslint max-len: "off" */
'use strict';

const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const paths = require(resolveApp('./config/paths'));
const sharedPaths = {
  dotenv: path.resolve(__dirname, '../../.env')
};
const qs = require('querystring');

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve(resolveApp('./config/paths'))];

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

var dotenvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  `${sharedPaths.dotenv}.${NODE_ENV}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  `${sharedPaths.dotenv}.${NODE_ENV}`,
  // Don't include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== 'test' && `${paths.dotenv}.local`,
  NODE_ENV !== 'test' && `${sharedPaths.dotenv}.local`,
  paths.dotenv,
  sharedPaths.dotenv
].filter(Boolean);

dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv').config({
      path: dotenvFile
    });
  }
});

const http = require('http');
const https = require('https');
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';
if (protocol === 'https') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const homepagePath = '/';
const urlMapping = {
  '/': '/example.html'
};

const DevServerProxy = {
  loginRequiredMiddleware: () => (req, res, next) => {
    if (!req.headers['cookie'] || !qs.parse(req.headers['cookie'], '; ')['CMus']) {
      if (
        !(
          (/^.+\.englishtown\.com$/i.test(process.env.HOST) &&
            /^.+\.englishtown\.(?:com|cn)$/i.test(process.env.EC_PROXY_TARGET)) ||
          (/^.+\.ef\.com$/i.test(process.env.HOST) && /^.+\.ef\.com$/i.test(process.env.EC_PROXY_TARGET)) ||
          (/^.+\.ef\.com\.cn$/i.test(process.env.HOST) &&
            /^.+\.ef\.com\.cn$/i.test(process.env.EC_PROXY_TARGET))
        )
      ) {
        console.log("'process.env.HOST' and 'process.env.EC_PROXY_TARGET' are not in the same domain");
      }
      res.statusCode = 302;
      res.location(process.env.EC_LOGIN_URL);
    }
    next();
  },
  urlMappingMiddleware: () => (req, res, next) => {
    const path = req.path;
    const strQS = qs.stringify(req.query);
    if (req.path === '/') {
      res.redirect(302, homepagePath + (strQS ? '?' + strQS : ''));
      return;
    } else if (req.path in urlMapping) {
      req.url = urlMapping[req.path] + (strQS ? '?' + strQS : '');
    }
    next();
  },
  confirmPagePostMiddleware: port => (req, res, next) => {
    const url = req.url;
    const regCustomConfig = new RegExp(
      /((?:.|\s)*?\/\*\s*?custom\:config\s*?\{\s*?\*\/)((?:.|\s)*?)(\/\*\s*?\}\s*?custom\:config\s*?\*\/(?:.|\s)*)/i
    );
    const getReqBody = () => {
      return new Promise((resolve, reject) => {
        let reqBody = [];
        req
          .on('data', chunk => {
            reqBody.push(chunk);
          })
          .on('end', () => {
            reqBody = Buffer.concat(reqBody).toString();
            resolve(reqBody);
          });
      });
    };

    const getResByGet = () => {
      return new Promise((resolve, reject) => {
        const getReq = (protocol === 'https' ? https : http).request(
          {
            host: host,
            port: port,
            path: url,
            method: 'GET',
            headers: {
              Cookie: req.headers.cookie || ''
            }
          },
          res => {
            res.setEncoding('utf8');
            res.on('data', chunk => {
              (res.statusCode !== 200 ? reject : resolve)({
                statusCode: res.statusCode,
                headers: res.headers,
                body: chunk
              });
            });
          }
        );
        getReq.end();
      });
    };

    const getResByPost = reqBody => {
      return new Promise((resolve, reject) => {
        const stringifyPostData = reqBody;
        // const stringifyPostData = querystring.stringify({"notificationTarget": "13800001111"});
        const postReq = (protocol === 'https' ? https : http).request(
          {
            host: process.env.EC_PROXY_TARGET,
            port: protocol === 'https' ? '443' : '80',
            path: '/ecplatform/page/shopping/confirm',
            // path: '/school/remindersetting.aspx?op=updateprofile',
            method: 'POST',
            headers: {
              Host: process.env.EC_PROXY_TARGET,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': Buffer.byteLength(stringifyPostData),
              Cookie: req.headers.cookie || ''
            }
          },
          res => {
            res.setEncoding('utf8');
            res.on('data', chunk => {
              const matches = chunk.match(regCustomConfig);
              const resPostBody = matches && matches[2] ? matches[2] : chunk;
              (res.statusCode !== 200 ? reject : resolve)({
                statusCode: res.statusCode,
                headers: res.headers,
                body: resPostBody
              });
            });
          }
        );
        postReq.write(stringifyPostData);
        postReq.end();
      });
    };

    const getMockup = reqBody => {
      return new Promise((resolve, reject) => {
        fs.readFile(resolveApp('src/confirm/mockup/confirm.html'), (err, chunk) => {
          const matches = chunk.toString().match(regCustomConfig);
          if (matches && matches[2]) {
            resolve({
              statusCode: 200,
              headers: [],
              body: matches[2]
            });
          } else {
            reject({
              statusCode: 404,
              headers: [],
              body: 'src/confirm/mockup/confirm.html match failed'
            });
          }
        });
      });
    };

    const errGetPost = resGetPost => {
      const urlLogin = process.env.EC_LOGIN_URL;
      let resHeadersLocation = '';
      res.statusCode = resGetPost.statusCode;
      for (var i in resGetPost.headers) {
        if (i !== 'location') {
          res.setHeader(i, resGetPost.headers[i]);
        } else {
          resHeadersLocation = resGetPost.headers[i];
          res.setHeader(i, urlLogin);
        }
      }
      res.send(resHeadersLocation ? resGetPost.body.replace(resHeadersLocation, urlLogin) : resGetPost.body);
    };

    getReqBody().then(reqBody => {
      (process.env.EC_IS_CONFIG_PAGE_POST_MOCKUP.toString().toLowerCase() === 'true'
        ? getMockup
        : getResByPost)(reqBody).then(resPost => {
        getResByGet().then(function(resGet) {
          for (var i in resGet.headers) {
            res.setHeader(i, resGet.headers[i]);
          }
          res.send(resGet.body.replace(regCustomConfig, '$1' + resPost.body + '$3'));
        }, errGetPost);
      }, errGetPost);
    });
  }
};
DevServerProxy[`${process.env.EC_PROXY_PATH_REG}`] = {
  target:
    'http' +
    (process.env.HTTPS && process.env.HTTPS.toLowerCase() === 'true' ? 's' : '') +
    '://' +
    process.env.EC_PROXY_TARGET,
  secure: false,
  changeOrigin: true,
  onProxyRes: function onProxyRes(proxyRes, req, res) {
    if (/\/login\/handler\.ashx/i.test(req.path)) {
      if (
        /^https?:\/\/[^\/]+\/school\/course\/currentcourse\/handler\.aspx/i.test(
          proxyRes.headers['location']
        ) ||
        /\/ecplatform\/mvc\/mobile\/dropin/i.test(proxyRes.headers['location'])
      ) {
        proxyRes.headers['location'] = proxyRes.headers['location'].replace(/^https?:\/\/[^\/]+/i, '');
      } else {
        proxyRes.headers['location'] = homepagePath;
      }
    } else if (/\/school\/course\/currentcourse\/handler\.aspx/i.test(req.path)) {
      proxyRes.headers['location'] = homepagePath;
    } else if (/\/logout\/logout.aspx/i.test(req.path)) {
      const urlLogin = process.env.EC_LOGIN_URL;
      if (/\/partner\/englishcenters(\/|$)/i.test(urlLogin)) {
        const arrURLLogin = urlLogin.split('?');
        proxyRes.headers['location'] =
          arrURLLogin[0].replace(/\/$/i, '') +
          (qs.parse(req.headers.cookie, '; ')['ctr'] === 'cn' ? '/cn' : '') +
          (arrURLLogin.length > 1 ? '?' + arrURLLogin[1] : '');
      } else {
        proxyRes.headers['location'] = urlLogin;
      }
    } else if (/\/ecplatform\/mvc\/mobile\/dropin/i.test(req.path)) {
      proxyRes.headers['location'] = homepagePath;
    }
  },
  bypass: (req, res) => {
    (() => {
      const response = res;
      const removeDomainFromCookie = cookie => {
        if (/^.+\.(?:englishtown|ef)\.(?:com|cn)$/i.test(process.env.EC_PROXY_TARGET)) {
          return cookie
            .replace(/; domain=127\.0\.0\.1/i, '; domain=' + process.env.HOST)
            .replace(/; domain=[^\.;]+\.(?:englishtown|ef)\.(?:com|cn)/i, '; domain=' + process.env.HOST);
        }
      };
      let isInitSetCookie403Forbidden = false;
      response.setHeader = (setHeader => (name, initialValue) => {
        let value = initialValue;
        if (res.statusCode === 403 && !isInitSetCookie403Forbidden) {
          isInitSetCookie403Forbidden = true;
          setHeader.call(
            res,
            'set-cookie',
            'CMus=; domain=' + process.env.HOST + '; expires=Thu, 01-Jan-1970 00:00:00 GMT; path=/'
          );
        }
        if (name === 'set-cookie' && Boolean(value)) {
          if (Array.isArray(value)) {
            value = value.map(removeDomainFromCookie);
          } else {
            value = removeDomainFromCookie(value);
          }
        }
        setHeader.call(res, name, value);
      })(response.setHeader);
    })();
  }
};

module.exports = DevServerProxy;
