angular.module('starter.controllers', ['ionic','ionic.cloud'])


.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {



  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.usuarioActivo = null;
  $scope.loginData = {};
  $scope.registroData = {};
  $scope.puntajeSemana = {};
  $scope.permiso = false;
  $scope.imagenSaludo = "../img/RPS1.png";
  $scope.imagenRegano = "../img/RPS2.png";
  $scope.imagenIncorrecto = "../img/RPS3.png";
  $scope.imagenCorrecto = "../img/RPS4.png";
  $scope.imagenExplicando = "../img/RPS5.png";
  $scope.imagenNeutral = "../img/RPS6.png";
  $scope.imagen = "";
  $scope.news = cargarNoticias();
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modalLogin) {
    $scope.modalLogin = modalLogin;
  });

  // Create register modal
  $ionicModal.fromTemplateUrl('templates/registro.html', {
    scope: $scope
  }).then(function(modalRegistro) {
    $scope.modalRegistro = modalRegistro;
  });

  // create cerrar sesion modal
  $ionicModal.fromTemplateUrl('templates/cerrarSesion.html', {
    scope: $scope
  }).then(function(modalCerrarSesion) {
    $scope.modalCerrarSesion = modalCerrarSesion;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modalLogin.hide();
  };
  $scope.cargarNoticias = function(){
    var http = new XMLHttpRequest();
    var url = " https://rpsnode.herokuapp.com/api/news";
    http.open("GET", url, false);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
          noticias= http.responseText;
          noticias = JSON.parse(noticias);
        }
    }
    http.send(null);
    return noticias;
  };

  // Open the login modal
  $scope.login = function() {
    if($scope.usuarioActivo === null){
      console.log($scope.usuarioActivo);
      $scope.modalLogin.show();
    }
    else{
      $scope.cerrarSesion();
    }
  };

  $scope.openRegistro = function(){
    console.log("Abrir registro");
    $scope.modalRegistro.show();
  };

  $scope.closeRegistro = function(){
    $scope.modalRegistro.hide();
    window.location="#/app/info";
  };

  $scope.launchTrivia = function(){
    console.log("do launchTrivia");
    $state.go('app.trivia');
  };

  $scope.privacidad =function(){
    $scope.permiso = true;
    console.log("Terminos y condiciones aceptados");
    window.location="#/app/info";
  };

  $scope.doRegistro = function(){
    $scope.closeLogin();
    existe = $scope.usuarioExiste($scope.registroData.username);
    console.log("Doing registro");
    if(existe === true ){
        alert("El usuario ya se encuentra registrado, por favor escoger otro");
        return 0;
    }
    else if ($scope.registroData.password != $scope.registroData.password2){
        alert("Las contraseñas no coinciden");
        return 0;
    }
    else{
      $scope.enviarRegistro($scope.registroData.username, $scope.registroData.password);
      $scope.closeRegistro();
      window.location="#/app/info";
    }
  };

  $scope.usuarioExiste = function(usuario){
    console.log("verificar que usuario exista");
    var http = new XMLHttpRequest();
    var url = " https://rpsnode.herokuapp.com/api/user/"+usuario;
    http.open("GET", url, false);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
          existe= http.responseText;
          existe = JSON.parse(existe);
        }
    }
    http.send(null);
    console.log(existe);
    if (existe.length != 0){
      return true;
      console.log("el usuario ya existe maifren");
    }
    else{
      return false;
      console.log("el usuario no existe maifren");
    }
  }

  $scope.enviarRegistro =function(usuario,password){
    var params = "username="+usuario+"&password="+password;
    console.log(params);
    var http = new XMLHttpRequest();
    var url = " https://rpsnode.herokuapp.com/api/user";
    http.open("POST", url, false);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
          alert("Usuario registrado exitosamente");
        }
    }
    http.send(params);
  }

  $scope.doLogout = function(){
    $scope.usuarioActivo = null;
    $scope.closeCerrarSession();
    window.location="#/app/info";
  };

  $scope.cerrarSesion= function(){
    $scope.modalCerrarSesion.show();
  };

  $scope.closeCerrarSession = function(){
    $scope.modalCerrarSesion.hide();
    window.location="#/app/info";
  };
  // Perform the login action when the user submits the login form
  $scope.cargarPreguntas = function(){
    var http = new XMLHttpRequest();
    var url = " https://rpsnode.herokuapp.com/api/question";
    http.open("GET", url, false);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
          preguntas= http.responseText;
          preguntas = JSON.parse(preguntas);
        }
    }
    http.send(null);
    return preguntas;
  };

  $scope.doLogin = function() {
    var usuario = null;
    console.log('Doing login', $scope.loginData);
    console.log($scope.loginData.username);
    document.getElementById("usernameLogin").value = $scope.loginData.username;
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    /*$timeout(function() {
      $scope.closeLogin();
    }, 1000);*/
    var http = new XMLHttpRequest();
    var url = " https://rpsnode.herokuapp.com/api/user/"+$scope.loginData.username;
    http.open("GET", url, false);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
          usuario= http.responseText;
          console.log(usuario);
          usuario = JSON.parse(usuario);
        }
    }
    http.send(null);
    console.log("objeto usuario: "+usuario);
    if(usuario[0].password === $scope.loginData.password){
      $scope.usuarioActivo = usuario[0];
      console.log("El usuario activo: "+$scope.usuarioActivo);
      $scope.closeLogin();
      window.location="#/app/info";
    }
    else{
      console.log(usuario[0].password);
      console.log("Usuario o contraseña incorrectos");
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
  let cont = 0;
  $scope.opciones = $scope.cargarPreguntas();
  $scope.opciones = shuffle($scope.opciones); //reordena el array
  $scope.pregunta = $scope.opciones[cont++]; //primer elemento del array randomizad
  $scope.doAnswer = function(ans){

    $scope.answered = true;
    $scope.botonesInactivos(true);
    document.getElementById("pregunta").className = "animated tada";
    document.getElementById("triviaDiv").className = "";
    console.log("respuesta obtenida " + ans);

    if($scope.pregunta.respuesta==ans){
      $scope.puntaje = $scope.puntaje + 1;
      document.getElementById("pregunta").className = "";
      console.log("respuesta correcta!!");
      $scope.imagen = $scope.imagenCorrecto;
      console.log(document.getElementById("pregunta").className);

      document.getElementById("pregunta").className = "animated bounce";
    }else{
      document.getElementById("triviaDiv").className = "animated shake";
      console.log("Fallaste!!!!");
      $scope.imagen = $scope.imagenIncorrecto;
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
    if(opt === false){
      document.getElementById("botonVerdadero").style.display='block';
      document.getElementById("botonFalso").style.display='block';
    }
    else{
      document.getElementById("botonVerdadero").style.display='none';
      document.getElementById("botonFalso").style.display='none';
    }
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
    $scope.actualizarPuntajes = function(){
      var http = new XMLHttpRequest();
      var url = "https://rpsnode.herokuapp.com/api/score/update/week/1";
      params = "iduser="+$scope.usuarioActivo.id+"&puntaje="+$scope.puntajeSemana;
      http.open("PUT", url, false);
      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      http.onreadystatechange = function() {//Call a function when the state changes.
          if(http.readyState == 4 && http.status == 200) {
            console.log("Puntaje actualizado!");
          }
      }
      http.send(params);
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

function cargarNoticias(){
    var http = new XMLHttpRequest();
    var url = " https://rpsnode.herokuapp.com/api/news";
    http.open("GET", url, false);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
          noticias= http.responseText;
          noticias = JSON.parse(noticias);
        }
    }
    http.send(null);
    return noticias;
  };