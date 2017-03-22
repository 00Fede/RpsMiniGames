angular.module('starter.controllers', ['ionic'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.launchTrivia = function(){
    console.log("do launchTrivia");
    $state.go('app.trivia');
  }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('TriviasCtrl', function($scope) {
  $scope.opciones = [
    { title: 'Opcion 1', id: 1 },
    { title: 'Opcion 2', id: 2 },
    { title: 'Opcion 3', id: 3 },
    { title: 'Opcion 4', id: 4 },
    { title: 'Opcion 5', id: 5 },
    { title: 'Opcion 6', id: 6 }
  ];
})

.controller('TriviaCtrl', function($scope, $state) {

  $scope.opciones = [
    { title: 'Opcion 1', id: 1, correctAns: true },
    { title: 'Opcion 2', id: 2, correctAns: true},
    { title: 'Opcion 3', id: 3, correctAns: false},
    { title: 'Opcion 4', id: 4, correctAns: true},
    { title: 'Opcion 5', id: 5, correctAns: false },
    { title: 'Opcion 6', id: 6, correctAns: true }
  ];
  //solo se corre la primera vez
  $scope.pregunta = $scope.opciones[getRandomInt(0,$scope.opciones.length)];

  $scope.doAnswer = function(ans){
    console.log("respuesta obtenida " + ans);
    if($scope.pregunta.correctAns==ans){
      //Pasa a la proxima pregunta
      console.log("respuesta correcta!!");
      let nextQ = getRandomInt(0,$scope.opciones.length); //prox pregunta aleatoria
      while($scope.pregunta.id-1 == nextQ){ //por si la pregunta es la misma a la anterior
        nextQ = getRandomInt(0,$scope.opciones.length);
      }
      $scope.pregunta = $scope.opciones[nextQ]; //setea nueva pregunta
    }else{
      //TODO: Aviso de fallaste en el UI
      console.log("Fallaste!!!!");
    }

  }

});

//calcula entero random entre min y max, min inclusive, max excluido
function getRandomInt(min, max) {
  console.log("random calculado");
  return Math.floor(Math.random() * (max - min)) + min;
}