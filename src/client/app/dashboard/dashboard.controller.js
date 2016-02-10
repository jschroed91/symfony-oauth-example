(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataservice', 'logger', '$auth', '$http'];
    /* @ngInject */
    function DashboardController($q, dataservice, logger, $auth, $http) {
        var vm = this;
        vm.news = {
            title: 'oauthApp',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';
        vm.authData = {};
        vm.authenticated = false;
        vm.payload = {};
        vm.jsonResponse;

        vm.authenticate = authenticate;
        vm.logout = logout;
        vm.makeApiCall = makeApiCall;

        activate();

        function activate() {
            if (isAuthenticated()) {
                vm.authenticated = true;
                vm.payload = getPayload();
            }

            var promises = [getMessageCount(), getPeople()];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }

        function getPayload() {
            return $auth.getPayload();
        }

        function logout() {
            var ret = $auth.logout();
            vm.authenticated = isAuthenticated();
            vm.payload = {};

            return ret;
        }

        function isAuthenticated() {
            return $auth.isAuthenticated();
        }

        function authenticate() {
            return $auth.authenticate('fos')
                .then(success)
                .catch(failed);

            function success(response) {

                vm.authData = response.data;
                vm.authenticated = isAuthenticated();
                vm.payload = getPayload();

                return response.data;
            }

            function failed(response) {
                console.log(response);
            }
        }

        function makeApiCall() {
            return $http({
                url: 'http://oauth-example.dev/app_dev.php/api/test',
                method: 'GET'
            })
                .then(success)
                .catch(failed);

            function success(response) {
                vm.jsonResponse = JSON.stringify(response.data);

                return response.data;
            }

            function failed(response) {
                vm.jsonResponse = JSON.stringify(response.data);
            }
        }

        function getMessageCount() {
            return dataservice.getMessageCount().then(function (data) {
                vm.messageCount = data;
                return vm.messageCount;
            });
        }

        function getPeople() {
            return dataservice.getPeople().then(function (data) {
                vm.people = data;
                return vm.people;
            });
        }
    }
})();
