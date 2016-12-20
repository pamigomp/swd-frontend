(function () {
    'use strict';

    angular.module('app.mixprob', ['ngAnimate', 'app.problemsService', 'ui.sortable'])

            .controller('MixProbController', MixProbController);

    MixProbController.$inject = ['problemsService', '$scope'];

    function MixProbController(problemsService, $scope) {
        var vm = this;

        vm.parameters = {};
        vm.resultsList;
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
        var tmpList = [];

        for (var i = 1; i <= 6; i++) {
            tmpList.push({
                text: 'Item ' + i,
                value: i
            });
        }

        $scope.list = tmpList;
        vm.objectiveFunctions = [
            {
                "name": "Minimalizacja kosztu zakupu produktów",
                "value": 1
            },
            {
                "name": "Minimalizacja szkodliwości zakupionych produktów",
                "value": 2
            },
            {
                "name": "Minimalizacja ilości witamin zakupionych produktów",
                "value": 3
            }
        ];

        vm.parameters.objectiveFunctionsOrder = vm.objectiveFunctions;

        function clear() {
            vm.parameters = '';
            vm.resultsList = '';
        }

        function calculate() {
            vm.errorCalculate = false;
            vm.submitting = true;
            problemsService.calculate(vm.parameters)
                    .then(calculateSuccess, calculateFailure);

            function calculateSuccess(resultsList) {
                vm.resultsList = resultsList;
                vm.errorCalculate = false;
                vm.submitting = false;
            }

            function calculateFailure() {
                vm.errorCalculate = true;
                vm.submitting = false;
            }
        }
    }
})();
