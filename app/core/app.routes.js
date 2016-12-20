(function () {
    'use strict';

    angular.module('app')

            .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('', '/mixprob');
        $urlRouterProvider.when('/', '/mixprob');
        $urlRouterProvider.otherwise('/');
        $stateProvider
                .state('root', {
                    abstract: true,
                    url: '/',
                    data: {
                        title: 'Strona główna',
                        breadcrumb: 'Strona główna'
                    },
                    views: {
                        'header': {
                            templateUrl: 'core/navigation/headerView.html',
                            controller: 'HeaderController',
                            controllerAs: 'HC'
                        },
                        'menu': {
                            templateUrl: 'core/navigation/menuView.html',
                            controller: 'MenuController',
                            controllerAs: 'MC'
                        },
                        'breadcrumbs': {
                            templateUrl: 'core/navigation/breadcrumbsView.html',
                            controller: 'BreadcrumbsController',
                            controllerAs: 'BC'
                        },
                        'content': {
                            template: 'Choose option from menu...'
                        },
                        'footer': {
                            templateUrl: 'core/navigation/footerView.html',
                            controller: 'FooterController',
                            controllerAs: 'FC'
                        }
                    }
                })
                .state('root.mixprob', {
                    url: 'mixprob',
                    data: {
                        title: 'Problem mieszanek',
                        breadcrumb: 'Problem mieszanek'
                    },
                    views: {
                        'content@': {
                            templateUrl: 'core/mixProb/mixProbView.html',
                            controller: 'MixProbController',
                            controllerAs: 'MPC'
                        }
                    }
                })
                .state('root.about', {
                    url: 'about',
                    data: {
                        title: 'O programie',
                        breadcrumb: 'O programie'
                    },
                    views: {
                        'content@': {
                            templateUrl: 'core/about/aboutView.html'
                        }
                    }
                });
    }
})();
