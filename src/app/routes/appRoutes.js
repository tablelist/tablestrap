angular.module('tablestrapApp').config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $urlRouterProvider.when('', '/home');
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/app/views/home.html',
        controller: 'componentCtrl'
      })
      //css
      .state('typography', {
        url: '/typography',
        templateUrl: '/app/views/typography.html',
        controller: 'componentCtrl'
      })
      .state('tables', {
        url: '/tables',
        templateUrl: '/app/views/tables.html',
        controller: 'componentCtrl'
      })
      .state('buttons', {
        url: '/buttons',
        templateUrl: '/app/views/buttons.html',
        controller: 'componentCtrl'
      })
      .state('forms', {
        url: '/forms',
        templateUrl: '/app/views/forms.html',
        controller: 'componentCtrl'
      })
      //components
      .state('navbar', {
        url: '/navbar',
        templateUrl: '/app/views/navbar.html',
        controller: 'componentCtrl'
      })
      .state('navs', {
        url: '/navs',
        templateUrl: '/app/views/navs.html',
        controller: 'componentCtrl'
      })
      .state('alerts', {
        url: '/alerts',
        templateUrl: '/app/views/alerts.html',
        controller: 'componentCtrl'
      })
      .state('labels', {
        url: '/labels',
        templateUrl: '/app/views/labels.html',
        controller: 'componentCtrl'
      })
      .state('progress', {
        url: '/progress',
        templateUrl: '/app/views/progress.html',
        controller: 'componentCtrl'
      })
      .state('panels', {
        url: '/panels',
        templateUrl: '/app/views/panels.html',
        controller: 'componentCtrl'
      })
      .state('listgroup', {
        url: '/listgroup',
        templateUrl: '/app/views/listgroup.html',
        controller: 'componentCtrl'
      })
      .state('wells', {
        url: '/wells',
        templateUrl: '/app/views/wells.html',
        controller: 'componentCtrl'
      })
      .state('modals', {
        url: '/modals',
        templateUrl: '/app/views/modals.html',
        controller: 'componentCtrl'
      })
      .state('jumbotron', {
        url: '/jumbotron',
        templateUrl: '/app/views/jumbotron.html',
        controller: 'componentCtrl'
      });
  }
]);
