(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];
    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[oauthApp Error] ',
        appTitle: 'oauthApp'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject = ['$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider', '$authProvider'];
    /* @ngInject */
    function configure($logProvider, routerHelperProvider, exceptionHandlerProvider, $authProvider) {
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({docTitle: config.appTitle + ': '});

        $authProvider.oauth2({
            name: 'fos',
            url: '/auth/fos',
            clientId: '2_33b8wmu4cqo00k88g4co4w44s80ocsc88gw88okc8wckk8kc8s',
            redirectUri: window.location.origin,
            authorizationEndpoint: 'http://oauth-example.dev:8080/web/app_dev.php/oauth/v2/auth',
        });
    }

})();
