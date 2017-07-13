// Ionic Starter App
/**
* Modulo de angular 1.5 para RPSMiniGames, se encuentra como atributo en el <body> del index.html
* starter.controllers se encuentra en controllers.js
*/
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform,$ionicPush) {

  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider,$ionicCloudProvider) {

  //Se inicializa el servicio ionic cloud
  $ionicCloudProvider.init({
    "core":{
      "app_id":"db1ae96e"
    },
    "push":{
      "sender_id":"559008558816",
      "pluginConfig":{
        "ios":{
          "badge":true,
          "sound":true
        },
        "android":{
          "iconColor":"#343434"
        }
      }
    }
  });

  /** Configuracion de los estados de la app*/
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  // vista de informacion
  .state('app.info', {
    url: '/info',
    views: {
      'menuContent': {
        templateUrl: 'templates/info.html'
      }
    }
  })
  // Vista de puntajes
  .state('app.puntajes', {
    url: '/puntajes',
    views: {
      'menuContent': {
        templateUrl: 'templates/puntajes.html',
        controller: 'TriviaCtrl'
      }
    }
  })
  // Vista de trivias
  .state('app.trivia', {
    url: '/trivia',
    views: {
      'menuContent': {
        templateUrl: 'templates/trivia.html',
        controller: 'TriviaCtrl'
      }
    }
  })
  // Vista de privacidad
  .state('app.privacidad', {
    url: '/privacidad',
    views: {
      'menuContent': {
        templateUrl: 'templates/privacidad.html'
      }
    }
  })
  // Vista de acerca de
  .state('app.acerca', {
    url: '/acerca',
    views: {
      'menuContent': {
        templateUrl: 'templates/acerca.html',
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/info');
});
