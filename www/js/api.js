//Archivo contenedor de los metodos de consumo de servicios REST

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


 function tablaPuntajes(){
    //alert("Voy a cargar puntajes");
    var http = new XMLHttpRequest();
    var url = " https://rpsnode.herokuapp.com/api/score/week/4";
    http.open("GET", url, false);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
          puntajeSemana = http.responseText;
          puntajeSemana = JSON.parse(puntajeSemana);
        }
    }
    http.send(null);
    return(puntajeSemana);
  }
function logearUsuario(username) {
	var http = new XMLHttpRequest();
    var url = " https://rpsnode.herokuapp.com/api/user/"+username;
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
    return usuario[0];
}
function cargarPreguntas(){
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

function usuarioExiste(usuario){
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
    if (existe.length != 0){
      return true;
      console.log("el usuario ya existe maifren");
    }
    else{
      return false;
      console.log("el usuario no existe maifren");
    }
}

function enviarRegistro(usuario,password){
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

function actualizarPuntajesAPI(id,puntaje){
  console.log("puntaje a actualizar:"+puntaje);
  var http = new XMLHttpRequest();
  var url = "https://rpsnode.herokuapp.com/api/score/update/week/4";
  params = "iduser="+id+"&puntaje="+puntaje;
  http.open("PUT", url, false);
  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
        console.log("Puntaje actualizado!");
      }
  }
  http.send(params);
 }

function puntajeDeUsuario(id){
	var http = new XMLHttpRequest();
    var url = "https://rpsnode.herokuapp.com/api/score/get/user/"+id;
    http.open("GET", url, false);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
          puntaje= http.responseText;
          console.log(puntaje);
          puntaje = JSON.parse(puntaje);
          console.log(puntaje);
        }
    }
    http.send(null);
    if(puntaje.length === 0){
    	return null;
    }
    else{
    	return puntaje[0].score;
	}
}

function añadirPuntajeAUsuario(id, puntaje){
	semana = "4"
	var params = "iduser="+id+"&idsemana="+semana;
    console.log(params);
    var http = new XMLHttpRequest();
    var url = "https://rpsnode.herokuapp.com/api/score/add/user";
    http.open("POST", url, false);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
          alert("Usuario registrado exitosamente en tabla puntaje");
        }
    }
    http.send(params);
    actualizarPuntajesAPI(id,puntaje);
}