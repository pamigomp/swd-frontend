(function () {
    'use strict';

    angular.module('app.mixprob', ['ngAnimate', 'app.problemsService', 'ui.sortable'])

            .controller('MixProbController', MixProbController);

    MixProbController.$inject = ['problemsService'];

    function MixProbController(problemsService) {
        var vm = this;

        vm.parameters = {};
        vm.aprioriResults;
        vm.nonpreferentialResults;
        vm.clear = clear;
        vm.calculate = calculate;

        vm.physicalActivities = [
            {
                "name": "Brak",
                "value": "NONE",
                "description": "Brak aktywności poza aktywnością podstawową"
            },
            {
                "name": "Mała",
                "value": "LOW",
                "description": "Aktywność powyżej podstawowej, ale mniej niż 150 minut tygodniowo"
            },
            {
                "name": "Umiarkowana",
                "value": "AVERAGE",
                "description": "Aktywność od 150 do 300 minut tygodniowo"
            },
            {
                "name": "Wysoka",
                "value": "HIGH",
                "description": "Aktywność powyżej 300 minut tygodniowo"
            }
        ];

        var objectiveFunctions = [
            {
                "name": "Minimalizacja kosztu zakupu produktów",
                "value": 1
            },
            {
                "name": "Minimalizacja szkodliwości zakupionych produktów",
                "value": 2
            },
            {
                "name": "Minimalizacja ilości witamin w zakupionych produktach",
                "value": 3
            }
        ];

        vm.objectiveFunctionsTemp = angular.copy(objectiveFunctions);

        function clear() {
            vm.objectiveFunctionsTemp = angular.copy(objectiveFunctions);
            vm.parameters = {};
            vm.aprioriResults = '';
            vm.nonpreferentialResults = '';
        }

        function calculate() {
            vm.aprioriResults = '';
            vm.nonpreferentialResults = '';
            vm.errorCalculate = false;
            vm.submitting = true;
            vm.parameters.objectiveFunctions = vm.objectiveFunctionsTemp;
            problemsService.calculate(vm.parameters)
                    .then(calculateSuccess, calculateFailure);

            function calculateSuccess(resultsList) {
                vm.aprioriResults = resultsList[0];
                vm.nonpreferentialResults = resultsList[1];
                vm.errorCalculate = false;
                vm.submitting = false;
            }

            function calculateFailure(errorData) {
                vm.errorMessage = errorData;
                vm.errorCalculate = true;
                vm.submitting = false;
            }
        }
    }
})();
