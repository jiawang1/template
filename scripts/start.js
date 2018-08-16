const config = require('../config/webpack.dev.config');
const net = require('net');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const DEFAULT_PORT = 8203;
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const listen = port => {
  const server = new net.Server();
  return new Promise((res, rej) => {
    server.on('error', err => {
      server.close();
      if (err.code === 'ENOTFOUND') {
        return res(port);
      }
      return rej(err);
    });
    server.listen(port, 'localhost', () => {
      const { port: targetPort } = server.address();
      server.close();
      res(targetPort);
    });
  });
};

/**
 * try to find available port if default prot is ocuppied by other process
 * @param {*} port : default prot number
 */
const findPort = port =>
  listen(port).catch(() => {
    const __port = port + 1;
    return findPort(__port);
  });

const startServer = () => {
  findPort(DEFAULT_PORT).then(port => {
    const entry = {
      main: [`webpack-dev-server/client?http://localhost:${port}`, 'webpack/hot/only-dev-server', './example/index']
    };
    return new WebpackDevServer(
      webpack({
        ...config,
        entry
      }),
      {
        port
      }
    ).listen(port, err => {
      if (err) {
        console.log(err);
      } else {
        console.log(`server started, listen to http://localhost:${port}`);
      }
    });
  });
};

startServer();
