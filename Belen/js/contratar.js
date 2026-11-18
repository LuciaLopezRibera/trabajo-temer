// ESCRIBIR LA CANTIDAD DE LA BARRA DE ESTACAS, NODOS Y CAMARAS 

const estacas = document.getElementById("estacas");
const nodos = document.getElementById("nodos");
const camaras = document.getElementById("camaras");

let numEstacas = document.getElementById("valor-estacas");
let numNodos = document.getElementById("valor-nodos");
let numCamaras = document.getElementById("valor-camaras");

estacas.addEventListener("input", function(){
    numEstacas.textContent=estacas.value;
});

nodos.addEventListener("input", function(){
    numNodos.textContent=nodos.value;
});

camaras.addEventListener("input", function(){
    numCamaras.textContent=camaras.value;
});

// PARA QUE SI HAY ALGÚN CAMPO DEL FORMULARIO VACIO SALTE UNA ALERTA
const formulario = document.getElementById("formulario");
const obligatorio = ["nombre", "apellidos", "telefono", "correo", "direccion", "codpost", "usuario", "contrasena"];

formulario.addEventListener("submit", function(evento){
    let relleno = 1;

    // miramos que todos los campos esten rellenos
    for (let i = 0; i < obligatorio.length; i++) {
        let campo = document.getElementById(obligatorio[i]);
        // si esta vacio 
        if (campo.value=="") {
        campo.style.borderColor = "red"; // si no esta relleno pongo el borde de color rojo
        campo.style.backgroundColor = "#ffdfce"; 
        relleno = 0;
        } else {
        campo.style.borderColor = "#9dcb82";    // si ya esta relleno vuelvo a ponerlo del verde original
        campo.style.backgroundColor = "white"; 
        }
    }

    // compruebo si se han pulsado los formularios de plan de suscripcion y facturacion
    let suscrip = document.getElementById("titSuscripcion");
    if (document.querySelector('input[name="suscripcion"]:checked') === null) {
        relleno = 0;
        suscrip.style.color = "red"; // si no se ha marcado el titulo se pone rojo
    }else{
        suscrip.style.color = "black";
    }

    let fact = document.getElementById("titFacturacion");
    if (document.querySelector('input[name="facturacion"]:checked') === null) {
        relleno = 0;
        fact.style.color = "red"; // si no se ha marcado el titulo se pone rojo
    }else{
        fact.style.color = "black";
    }

    // si falta algun campo por rellenar salta una alerta
    if (relleno == 0) {
        evento.preventDefault();      // nos quedamos en esta página
        alert("¡Error! Falta algún campo por rellenar.");
    }
});