// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform,$ionicPush) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
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


  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.info', {
    url: '/info',
    views: {
      'menuContent': {
        templateUrl: 'templates/info.html'
      }
    }
  })

  .state('app.puntajes', {
      url: '/puntajes',
      views: {
        'menuContent': {
          templateUrl: 'templates/puntajes.html'
        }
      }
    })
    .state('app.trivias', {
      url: '/trivias',
      views: {
        'menuContent': {
          templateUrl: 'templates/trivias.html',
          controller: 'TriviasCtrl'
        }
      }
    })

  .state('app.trivia', {
    url: '/trivia',
    views: {
      'menuContent': {
        templateUrl: 'templates/trivia.html',
        controller: 'TriviaCtrl'
      }
    }
  })
  .state('app.privacidad', {
    url: '/privacidad',
    views: {
      'menuContent': {
        templateUrl: 'templates/privacidad.html',
        controller: 'TriviaCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/privacidad');
});
