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
            url: 'http://oauth-example.dev:8080/web/app_dev.php/auth/fos',
            clientId: '3_3zc8ue2y5xeswc0w484cwkkccc4kssskgsgw8s08gswocok408',
            redirectUri: window.location.origin,
            authorizationEndpoint: 'http://oauth-example.dev:8080/web/app_dev.php/oauth/v2/auth',
            defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
            responseType: 'code',
            responseParams: {
                code: 'code',
                clientId: 'clientId',
                redirectUri: 'redirectUri'
            }
        });
    }

})();
