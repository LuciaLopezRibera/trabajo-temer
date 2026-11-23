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


// PARA QUE SI HAY ALGÚN CAMPO DEL FORMULARIO VACIO SALTE UNA ALERTA + revisar que el formato de telefono y codigo postal sea correcto

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

    // REVISAR FORMATO DE LOS CAMPOS (telefono y codigo postal)
    let errores="";

    // telefono (tiene que tener 9 numeros)
    let telefono = document.getElementById("telefono");
    let tel_valido=1;
    if(telefono.value!=""){// que solo compruebe si el telefono esta relleno
        for (let i = 0; i < telefono.value.length; i++) {
            if (isNaN(telefono.value[i]) || telefono.value[i] === " ") { // con isNan compruebo si cada caracter es un numero
            tel_valido=0;
            }
        }
        if (telefono.value.length != 9) { // compruebo que tenga 9 dígitos
            tel_valido = 0;
        }
        if(tel_valido==0){
            telefono.style.borderColor = "red"; // si no esta relleno pongo el borde de color rojo
            telefono.style.backgroundColor = "#ffdfce";
            errores=errores+ "- El teléfono deber estar compuesto por 9 números.\n"
        }
        }

    // codigo postal (tiene que tener 5 numeros)
    let cod_post = document.getElementById("codpost");
    let cod_valido=1;
    if (cod_post.value!=""){
        for (let i = 0; i < cod_post.value.length; i++) {
            if (isNaN(cod_post.value[i])|| cod_post.value[i] === " ") {
            cod_valido=0;
            }
        }
        if (cod_post.value.length != 5) {
            cod_valido = 0;
        }
        if(cod_valido==0){
            cod_post.style.borderColor = "red"; // si no esta relleno pongo el borde de color rojo
            cod_post.style.backgroundColor = "#ffdfce";
            errores=errores+ "- El código postal deber estar compuesto por 5 números.\n"
        }
    }

    // ALERTA SI FALTA ALGUN CAMPO POR RELLENAR O EL FORMATO DE TELEFONO O CODIGO POSTAL ESTA MAL
    let mensaje = "";
    if (relleno == 0) {
        mensaje = mensaje + "- Falta algún campo por rellenar.\n";
    }
    if (errores !== "") {
        mensaje = mensaje + errores;
    }

    if (mensaje !== "") {
        evento.preventDefault(); // nos quedamos en esta página
        alert("¡Error! Revisa lo siguiente:\n" + mensaje);
    }else{
        // me almaceno el usuario y cotrasena introducido para poder entrar en miPortal
        localStorage.setItem("usuario_nuevo", document.getElementById("usuario").value);
        localStorage.setItem("contrasena_nueva", document.getElementById("contrasena").value)
        localStorage.setItem("nombre_nuevo", document.getElementById("nombre").value)
    }
});


// RESUMEN

formulario.addEventListener("input", actualizarResumen);

function actualizarResumen(){
    // ACTUALIZO EL PLAN
    let plan = document.querySelector('input[name="suscripcion"]:checked');
    let tipo_plan = "-";
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
    let tipo_facturacion = "-";
    let coste_suscripcion="-";
    let descuento_suscr="";

    // cuando se marque la casilla en el formulario, que se actualice
    if (facturacion !== null) {
        if (facturacion.value === "mensual") {
            tipo_facturacion = "Mensual";
            if (plan !== null) { // para que si no se ha marcado todavia el plan no se actualizo porque si no me va a salir 0
                coste_suscripcion=precio_plan+ " €/mes";
            }
        } else if (facturacion.value === "anual") {
            tipo_facturacion = "Anual";
            if (plan !== null) {
                coste_suscripcion=precio_plan*12*0.8+ " €/año";
                descuento_suscr="descuento de "+ precio_plan*0.2*12 + " €/año en la suscripción.";
            }
        }
    }
    document.getElementById("res-facturacion").textContent = tipo_facturacion;

    // actualizo el precio de la suscripcion 
    document.getElementById("res-suscripcion").textContent =coste_suscripcion;
    // actualizo descuento
    document.getElementById("res-descuento-suscr").textContent =descuento_suscr;

    // CALCULO PRECIO DE LOS EQUIPOS
    const precio_estaca=29.9;
    const precio_nodo=34.9;
    const precio_camara=20.9;

    let coste_estacas=0;
    let coste_nodos=0;
    let coste_camaras=0;
    let est_gratis=0;
    let nodos_gratis=0;
    let cam_gratis=0;
    let coste_equipos=0 + " €";
    let descuento_equip="";
    let i;

    // coste estacas
    for (i = 10; i <= estacas.value; i = i + 10) {// Cada vez que tenemos paquetes de 10, hay 2 estacas gratis
        est_gratis = est_gratis + 2;
    }
    coste_estacas=(estacas.value-est_gratis)*precio_estaca;

    // coste nodos
    for (i = 10; i <= nodos.value; i = i + 10) {
        nodos_gratis = nodos_gratis + 2;
    }
    coste_nodos=(nodos.value-nodos_gratis)*precio_nodo;

    // coste camaras
    for (i = 10; i <= camaras.value; i = i + 10) {
        cam_gratis = cam_gratis + 2;
    }
    coste_camaras=(camaras.value-cam_gratis)*precio_camara;

    // actualizo el precio de la instalacion y el descuento
    if(cam_gratis!=0 || nodos_gratis!=0 || est_gratis!=0){//para que solo salga el mensaje si hay algun descuento
        descuento_equip="descuento de "+ (est_gratis*precio_estaca+nodos_gratis*precio_nodo+cam_gratis*precio_camara).toFixed(2) + "€ en los equipos.";
    }

    coste_equipos=(coste_estacas+coste_camaras+coste_nodos).toFixed(2) + " €";

    document.getElementById("res-equipos").textContent =coste_equipos;
    document.getElementById("res-descuento-equip").textContent =descuento_equip;
}

actualizarResumen(); //para que nada más cargar la pagina salga relleno con el texto por defecto