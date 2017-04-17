angular.module('starter.controllers', ['ionic','ionic.cloud'])


.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {



  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.puntajeSemana = {};
  $scope.permiso = false;
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

  $scope.privacidad =function(){
    $scope.permiso = true;
    console.log("Terminos y condiciones aceptados");
  }
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

    console.log('Doing login', $scope.loginData);
    console.log($scope.loginData.username);
    document.getElementById("usernameLogin").value = $scope.loginData.username;
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    /*$timeout(function() {
      $scope.closeLogin();
    }, 1000);*/
    var http = new XMLHttpRequest();
    var url = " https://rpsnode.herokuapp.com/api/instrument?usuario="+$scope.loginData.username;
    http.open("GET", url, false);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
          usuario= http.responseText;
            usuario = JSON.parse(usuario);
        }
    }
    http.send(null);
    for(var i = 0 ; i < usuario.length; i++){
        console.log(usuario[i].usuario);
        if($scope.loginData.username === usuario[i].usuario && $scope.loginData.password === usuario[i].cedula){
        alert("Estas logeado papu");
        $scope.closeLogin();
      }
    }
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

.controller('TriviaCtrl', function($scope, $state, $ionicPush) {

  //registra el dispositivo para aceptar notificaciones push. se hace al abrir app.
  $ionicPush.register().then(function(t){
      return $ionicPush.saveToken(t);
  }).then(function(t){
      console.log('Token saved: '+t.token);
  });   

  //escucha el evento cuando entra una notificacion push
  $scope.$on('cloud:push:notification', function(event, data) {
    var msg = data.message;
    alert(msg.title + ': ' + msg.text);
  });

  $scope.puntaje = 0;
  $scope.username = document.getElementById("usernameLogin").value
  $scope.opciones = [
    { title: 'Opcion 1', id: 1, correctAns: true, hint: 'hint opcion 1' },
    { title: 'Opcion 2', id: 2, correctAns: true, hint: 'hint opcion 2' },
    { title: 'Opcion 3', id: 3, correctAns: false, hint: 'hint opcion 3' },
    { title: 'Opcion 4', id: 4, correctAns: true, hint: 'hint opcion 4' },
    { title: 'Opcion 5', id: 5, correctAns: false, hint: 'hint opcion 5'  },
    { title: 'Opcion 6', id: 6, correctAns: true, hint: 'hint opcion 6'  }
  ];
  let cont = 0;
  $scope.opciones = shuffle($scope.opciones); //reordena el array
  $scope.pregunta = $scope.opciones[cont++]; //primer elemento del array randomizad
  $scope.doAnswer = function(ans){

    $scope.answered = true;
    $scope.botonesInactivos(true);
    document.getElementById("pregunta").className = "animated tada";
    document.getElementById("triviaDiv").className = "";
    console.log("respuesta obtenida " + ans);

    if($scope.pregunta.correctAns==ans){
      $scope.puntaje = $scope.puntaje + 1;
      document.getElementById("pregunta").className = "";
      console.log("respuesta correcta!!");
      console.log(document.getElementById("pregunta").className);

      document.getElementById("pregunta").className = "animated bounce";
    }else{
      document.getElementById("triviaDiv").className = "animated shake";
      console.log("Fallaste!!!!");
    }
  };
  $scope.animar =function(){
    console.log($scope.username);
    document.getElementById("pregunta").className = "";
  };

  $scope.continuar = function(){
    $scope.answered=!$scope.answered;
    $scope.finish= cont==$scope.opciones.length; //verifica si no hay mas preguntas
    $scope.pregunta = $scope.opciones[cont++];
    $scope.botonesInactivos(false);  
    
  }
  $scope.botonesInactivos = function(opt){
    document.getElementById("botonVerdadero").disabled = opt;
    document.getElementById("botonFalso").disabled = opt;
  }
  $scope.tablaPuntajes = function(){
    //alert("Voy a cargar puntajes");
    var http = new XMLHttpRequest();
    var url = " https://rpsnode.herokuapp.com/api/score/week/1";
    http.open("GET", url, false);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
          puntajeSemana = http.responseText;
          $scope.puntajeSemana = JSON.parse(puntajeSemana);
        }
    }
    http.send(null);
    console.log($scope.puntajeSemana);
    }

});

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
