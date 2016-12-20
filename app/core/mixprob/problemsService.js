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

            function calculateFailure() {
                deferred.reject();
            }

            return deferred.promise;
        }
    }
})();
