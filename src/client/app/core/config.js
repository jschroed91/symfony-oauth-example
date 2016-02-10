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
            url: 'http://oauth-example.dev/app_dev.php/auth/fos',
            clientId: '1_3sac9uppx0o4sgks80o40w0kssc4cco8swc044040cks4wccc0',
            redirectUri: window.location.origin,
            authorizationEndpoint: 'http://oauth-example.dev/app_dev.php/oauth/v2/auth',
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
