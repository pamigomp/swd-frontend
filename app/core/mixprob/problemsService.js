(function () {
    'use strict';

    angular.module('app.problemsService', ['app.dataStorageService'])

            .factory('problemsService', problemsService);

    problemsService.$inject = ['dataStorageService', '$q'];

    function problemsService(dataStorageService, $q) {
        return {
            calculate: calculate
        };

        function calculate(parameters) {
            var deferred = $q.defer();

            dataStorageService.postParameters(parameters)
                    .then(calculateSuccess, calculateFailure);

            function calculateSuccess(problemResult) {
                deferred.resolve(problemResult.data);
            }

            function calculateFailure(error) {
                deferred.reject(error.data);
            }

            return deferred.promise;
        }
    }
})();
