/* eslint-disable */
window.require = {
  callback: function() {
    var callbacks = [];

    window.require.config({
      context: 'troopjs-1.0',
      waitSeconds: 0,
      baseUrl: config.cacheServer,
      crossOriginDomains: [config.cacheServer.replace(/\/$/, '')],
      packages: [
        {
          name: 'poly',
          location: '_shared/poly/0.5.1-43-ef.1',
          main: 'poly-bundle.min'
        },
        {
          name: 'when',
          location: '_shared/when/3.4.6-ef.1',
          main: 'when-bundle.min'
        },
        {
          name: 'troopjs-bundle',
          location: '_shared/troopjs-bundle/1.0.9-16',
          main: 'troopjs-bundle.min'
        },
        {
          name: 'troopjs-ef',
          location: '_shared/troopjs-ef/1.0.0-78',
          main: 'nodeps.min'
        },
        {
          name: 'headerfooter',
          location: '_shared/headerfooter/' + config['app-version']['et-ui-headerfooter'] + '/js',
          main: 'app-built.min'
        },
        {
          name: 'legacy/toolbar',
          location:
            '_shared/headerfooter/' + config['app-version']['et-ui-headerfooter'] + '/js/legacy/toolbar',
          main: 'toolbar.main-2.0.0.min'
        },
        {
          name: 'legacy/comet',
          location:
            '_shared/headerfooter/' + config['app-version']['et-ui-headerfooter'] + '/js/legacy/comet',
          main: 'et.comet-2.0.0.min'
        },
        {
          name: 'legacy/game',
          location: '_shared/headerfooter/' + config['app-version']['et-ui-headerfooter'] + '/js/legacy/game'
        },
        {
          name: 'legacy/translator',
          location: 'school/_scripts',
          main: 'translator.min'
        },
        {
          name: 'client-tracking',
          location: '_shared/client-tracking/1.0.17',
          main: 'bundle-troopjs.min'
        },
        {
          name: 'json2',
          location: '_shared/json2/20111019',
          main: 'json2.min'
        },
        {
          name: 'underscore',
          location: '_shared/underscore.js/1.3.3',
          main: 'underscore.min'
        },
        {
          name: 'Cookies',
          location: '_shared/Cookies/0.3.1',
          main: 'cookies.min'
        },
        {
          name: 'moment',
          location: '/_shared/moment/2.10.3',
          main: 'moment-with-locales.min'
        },
        {
          name: 'jquery',
          location: '_shared/jquery/1.7.2',
          main: 'jquery.min'
        },
        {
          name: 'jquery.fancybox',
          location: '_shared/fancybox/2.1.5',
          main: 'jquery.fancybox.min'
        },
        {
          name: 'jquery-jsonp',
          location: '_shared/jquery-jsonp/2.1.4',
          main: 'jquery-jsonp.min'
        },
        {
          name: 'jquery.jscrollpane',
          location: '_shared/jquery-jscrollpane/2.0.0b12',
          main: 'jquery.scrollpane.min'
        },
        {
          name: 'jquery.mousewheel',
          location: '_shared/jquery-mousewheel/3.0.6',
          main: 'jquery.mousewheel.min'
        },
        {
          name: 'jquery.countdown',
          location: '/_shared/jquery.countdown/2.1.0',
          main: 'jquery.countdown.min'
        },
        {
          name: 'jquery.scrollbar',
          location: '/_shared/jquery-scrollbar/3.1.13',
          main: 'jquery.mCustomScrollbar.min'
        }
      ],
      shim: {
        json2: {
          exports: function() {
            return window.JSON;
          }
        },
        underscore: {
          exports: function() {
            return window._.noConflict();
          }
        },
        'jquery.jscrollpane': {
          deps: ['jquery'],
          exports: function($) {
            return $;
          }
        },
        'jquery.mousewheel': {
          deps: ['jquery'],
          exports: function($) {
            return $;
          }
        },
        'client-tracking': {
          deps: ['troopjs-ef']
        }
      },
      map: {
        '*': {
          template: 'troopjs-requirejs/template',
          logger: config.troopjsCoreLogger,
          config: 'troopjs-ef/config'
        }
      },
      config: {
        headerfooter: config,
        'client-state/adapters/context': {
          data: {
            // parameter for omniture
          }
        }
      },
      deps: ['require', 'jquery', 'poly', 'troopjs-bundle', 'troopjs-ef'],
      callback: function(localRequire, jQuery) {
        localRequire(
          [
            'config',
            'troopjs-ef/data/cache',
            'troopjs-ef/service/query',
            'troopjs-core/remote/ajax',
            'troopjs-jquery/weave',
            'troopjs-jquery/destroy',
            'troopjs-jquery/action',
            'troopjs-jquery/resize',
            'troopjs-jquery/dimensions',
            'troopjs-jquery/hashchange',
            'client-tracking',
            'headerfooter',
            'when'
          ],
          function(_config, Cache, Query, Ajax) {
            Ajax().start();
            Query(Cache());
            jQuery.extend(_config, config);
          }
        );
      }
    });

    window.require.config({
      context: 'troopjs-2.0',
      waitSeconds: 0,
      baseUrl: config.cacheServer,
      crossOriginDomains: [config.cacheServer.replace(/\/$/, '')],
      packages: [
        {
          name: 'poly',
          location: '_shared/poly/0.5.1-43-ef.1',
          main: 'poly-bundle.min'
        },
        {
          name: 'when',
          location: '_shared/when/3.7.7-ef.1',
          main: 'when-bundle.min'
        },
        {
          name: 'troopjs-bundle',
          location: '_shared/troopjs-bundle/2.0.2-8-ef.4',
          main: 'maxi.min'
        },
        {
          name: 'troopjs-ef',
          location: '_shared/troopjs-ef/2.0.2-ef.5',
          main: 'nodeps.min'
        },
        {
          name: 'json2',
          location: '_shared/json2/20111019',
          main: 'json2.min'
        },
        {
          name: 'text',
          location: '_shared/requirejs-text/2.0.9',
          main: 'text.min'
        },
        {
          name: 'jquery',
          location: '_shared/jquery/1.9.1',
          main: 'jquery-1.9.1.min'
        },
        {
          name: 'jquery.gudstrap',
          location: '/_shared/gudstrap/1.1.1-ef.1/js',
          main: 'gudstrap.min'
        },
        {
          name: 'jquery-jsonp',
          location: '_shared/jquery-jsonp/2.1.4',
          main: 'jquery-jsonp.min'
        },
        {
          name: 'flot',
          location: '_shared/flot/0.8.0',
          main: 'jquery.flot.min'
        },
        {
          name: 'flot-categories',
          location: '_shared/flot/0.8.0',
          main: 'jquery.flot.categories.min'
        },
        {
          name: 'jquery-ui',
          location: '_shared/jquery-ui/1.8.22',
          main: 'jquery-ui.min'
        },
        {
          name: 'jquery-fancybox',
          location: '_shared/fancybox/2.1.5',
          main: 'jquery.fancybox.min'
        },
        {
          name: 'jquery-cookie',
          location: '/_shared/jquery-cookie/1.3.1',
          main: 'jquery.cookie'
        },
        {
          name: 'Cookies',
          location: '/_shared/Cookies/0.3.1',
          main: 'cookies'
        },
        {
          name: 'jquery-ui.selectmenu',
          location: config.publicURL + '/scripts',
          main: 'jquery-ui.selectmenu.min'
        }
      ],
      shim: {
        when: {
          deps: ['poly']
        },
        flot: {
          exports: '$',
          deps: ['jquery']
        },
        'flot-categories': {
          exports: '$',
          deps: ['jquery', 'flot']
        },
        'jquery-cookie': {
          deps: ['jquery'],
          exports: function($) {
            return $;
          }
        },
        'jquery-ui.selectmenu': {
          exports: '$',
          deps: ['jquery']
        }
      },
      map: {
        '*': {
          mv: 'troopjs-requirejs/multiversion',
          template: 'troopjs-requirejs/template',
          shadow: 'troopjs-requirejs/shadow',
          jquery: 'troopjs-jquery/noconflict',
          logger: config.troopjsCoreLogger
        },
        'troopjs-jquery/noconflict': {
          jquery: 'jquery'
        }
      },
      config: {
        'troopjs-data/query/service': {
          url: '/services/api/proxy/queryproxy',
          type: 'post'
        },
        headerfooter: config
      },
      deps: ['require', 'when', 'poly', 'troopjs-bundle', 'troopjs-ef'],
      callback: function(localRequire) {
        localRequire(['jquery', 'mv!client-tracking#troopjs-1.0', 'mv!troopjs-bundle#troopjs-1.0'], function(
          jQuery,
          ct
        ) {
          config && config.app && (config.app.requirejs = localRequire);

          localRequire(
            [
              'mv!client-state#troopjs-1.0',
              'mv!jquery#troopjs-1.0',
              'troopjs-browser/application/widget',
              'troopjs-core/pubsub/proxy/to1x',
              'mv!troopjs-core/pubsub/hub#troopjs-1.0',
              'troopjs-browser/ajax/service',
              'troopjs-data/query/service',
              'troopjs-data/cache/component',
              'troopjs-browser/route/widget',
              'troopjs-ef/service/config',
              // 'troopjs-core/logger/service',
              'troopjs-ef/logger/widget',
              // 'troopjs-ef/logger/appender/filter_ccl',
              // 'troopjs-ef/logger/appender/command',
              'logger',
              'troopjs-jquery/loom',
              'shadow!jquery.gudstrap#$=jquery&jQuery=jquery&exports=jQuery'
            ],
            function(
              cs,
              jqueryInTroop1,
              Application,
              HubProxy,
              v1Hub,
              AjaxService,
              QueryService,
              Cache,
              RouteWidget,
              ConfigService,
              // LogService,
              LogWidget,
              // LogFilter,
              // LogCommand,
              Logger,
              Loom,
              $gudstrap
            ) {
              define('client-tracking', ct);
              define('client-state', cs);

              jQuery(window).on('unhandledrejection unhandledRejection', function(event) {
                var originalEvent = event.originalEvent;
                var reason = originalEvent.reason || (originalEvent.detail && originalEvent.detail.reason);
                if (reason) {
                  var message = String(reason.message || reason);
                  Logger.log({
                    msg: event.type + ': ' + message,
                    stack: reason.stack
                  });
                  event.preventDefault();
                }
              });

              jQuery(function($) {
                // var CCL_LOG_ENABLE = 'school.courseware.log.enable';
                var cache = Cache();
                define('jquery.gudstrap', function() {
                  return $;
                });
                cs.push('tracking.qubit_enabled', false);
                cs.push('tracking.omniture_enabled', false);
                if (config.siteversion.toString().toLowerCase() === 'development') {
                  cs.push('page.environment', 'dev');
                }
                cs.push('tracking.etvt_enabled', true);
                if (config.app.name) {
                  // jQuery('.ue-header-container').after('<div data-weave="' + config.app.name + '/main"></div>');
                }
                Application(
                  $('html'),
                  'bootstrap',
                  HubProxy({
                    hub: v1Hub,
                    subscribe: {
                      ajax: 'ajax',
                      query: 'query'
                    }
                  }),
                  AjaxService(),
                  QueryService(cache),
                  ConfigService(cache, {
                    devicetypeid: {
                      value: 1
                    }
                  }),
                  RouteWidget($(window), 'route'),
                  LogWidget(
                    $(window)
                  ) /*,
                                    LogService(LogFilter(CCL_LOG_ENABLE, LogCommand()))*/
                )
                  .start()
                  .then(function() {
                    jqueryInTroop1('[data-weave-1]').each(function(entryIndex, entry) {
                      var $e = jqueryInTroop1(entry);
                      $e.attr('data-weave', $e.attr('data-weave-1')).weave();
                    });

                    (function() {
                      function appendScript(url) {
                        var tLink = document.createElement('script');
                        tLink.type = 'text/javascript';
                        tLink.src = url;
                        document.getElementsByTagName('head')[0].appendChild(tLink);
                      }
                      appendScript(
                        '/Translator/Integration/PopupClient/?newcourseware=true&siteversion=' +
                          config.siteversion +
                          '&LE=tranlator-register-pop'
                      );
                    })();

                    localRequire(['mv!headerfooter/widget/omniture/base#troopjs-1.0'], function() {
                      cs.push('tracking.qubit_enabled', false);
                      cs.push('tracking.omniture_enabled', false);
                      cs.push('tracking.etvt_enabled', true);
                      if (config.siteversion.toString().toLowerCase() === 'development') {
                        cs.push('page.environment', 'dev');
                      }
                      ct.pageload();
                    });
                  });
              });
            }
          );
        });
      }
    });
  }
};
