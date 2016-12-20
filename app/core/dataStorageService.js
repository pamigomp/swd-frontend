(function () {
    'use strict';

    angular.module('app.dataStorageService', [])
            .factory('dataStorageService', dataStorageService);

    dataStorageService.$inject = ['$http'];

    function dataStorageService($http) {
        return {
            postParameters: postParameters
        };

        function postParameters(parameters) {
            return $http({
                method: 'POST',
                url: 'http://localhost:8080/mixprob',
                data: parameters
            });
        }
    }
})();
