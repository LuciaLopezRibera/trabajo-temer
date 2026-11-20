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


// RESUMEN

const precio_estaca=29.9;
const precio_nodo=34.9;
const precio_camara=20.9;

formulario.addEventListener("input", actualizarResumen);

function actualizarResumen(){
    // ACTUALIZO EL PLAN
    let plan = document.querySelector('input[name="suscripcion"]:checked');
    let tipo_plan = "Sin elegir";
    let precio_plan = 0;

    // cuando se marque la casilla en el formulario, que se actualice
    if (plan !== null) {
        if (plan.value === "basico") {
            tipo_plan = "Básico";
            precio_plan = 10;
        } else if (plan.value === "plus") {
            tipo_plan = "Plus";
            precio_plan = 15;
        } else {
            tipo_plan = "Premium";
            precio_plan = 30;
        }
    }
    document.getElementById("res-plan").textContent = tipo_plan;

    // ACTUALIZO FACTURACION
    let facturacion = document.querySelector('input[name="facturacion"]:checked');
    let tipo_facturacion = "Sin elegir";
    let coste_suscripcion="-";
    let descuento_suscr="";

    // cuando se marque la casilla en el formulario, que se actualice
    if (facturacion !== null) {
        if (facturacion.value === "mensual") {
            tipo_facturacion = "Mensual";
            if (plan !== null) { // para que si no se ha marcado todavia el plan no se actualizo porque si no me va a salir 0
                coste_suscripcion=precio_plan+ "€/mes";
            }
        } else if (facturacion.value === "anual") {
            tipo_facturacion = "Anual";
            if (plan !== null) {
                coste_suscripcion=precio_plan*12*0.8+ "€/año";
                descuento_suscr="descuento de "+ precio_plan*0.2*12 + "€/año en la suscripción.";
            }
        }
    }
    document.getElementById("res-facturacion").textContent = tipo_facturacion;

    // actualizo el precio de la suscripcion 
    document.getElementById("res-suscripcion").textContent =coste_suscripcion;
    // actualizo descuento
    document.getElementById("res-descuento-suscr").textContent =descuento_suscr;

    // calculo el precio de las estacas, nodos y camaras

    // actualizo el precio de la instalacion

    

}

actualizarResumen(); //para que nada más cargar la pagina salga relleno con el texto por defecto