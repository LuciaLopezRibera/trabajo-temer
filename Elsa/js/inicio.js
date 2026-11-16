// JavaScript de la página inicio - Responsable: Elsa Blasco Novell


// --------- CONTADOR DE CLIENTES --------- //

// Paso 1: buscamos en la pagina el contador (su id) y lo guardamos
const contador = document.getElementById("contador_clientes");

// Paso 2: vemos si ya teniamos un numero guardado en el navegador de antes
let clientes = localStorage.getItem("clientes");

// Paso 3: leemos el numero donde empieza a contar el contador 
// Opcion 1: no hay nada guardado --> empezamos por el numero del .html
    // innerHTML devuelve lo que hay escrito dentro del span --> <span id="contador_clientes">2500</span> ---> "2500"
    // parseInt() convierte el texto "2500" en un numero
// Opcion 2: si habia algo guardado --> lo pasamos a numero y lo mostramos
if (clientes === null){
    clientes = parseInt(contador.innerHTML);
}else{
    clientes = parseInt(clientes);
    contador.innerHTML = clientes;
}

// Paso 4: cada 3 segs (3000 ms) sumamos un cliente y lo mostramos --> setInterval(funcion, ms)
function sumarCliente() {
    clientes++;
    contador.innerHTML = clientes;
    localStorage.setItem("clientes", clientes);  // lo guardamos
}

setInterval(sumarCliente, 3000);

// Tendremos que poner esto en la consola el dia del video para que empiece desde 2500 
// localStorage.removeItem("clientes")





// --------- SEMAFORO --------- //
// Paso 1: buscamos las tres luces y los tres textos 
const luzVerde = document.getElementById("luz-verde");
const luzAmbar = document.getElementById("luz-ambar");
const luzRoja  = document.getElementById("luz-roja");

const textoVerde = document.getElementById("texto-verde");
const textoAmbar = document.getElementById("texto-ambar");
const textoRoja  = document.getElementById("texto-roja");

// Paso 2: creamos la funcion que enienda el circulito de la luz recibida y muestre su texto
function encender(luz, texto) {
    // apagamos las tres luces
    luzVerde.classList.remove("encendida");
    luzAmbar.classList.remove("encendida");
    luzRoja.classList.remove("encendida");

    // ocultamos los tres textos
    textoVerde.classList.add("oculto"); // le ponemos la clase oculto a textoVerde
    textoAmbar.classList.add("oculto");
    textoRoja.classList.add("oculto");

    // encendemos solo la luz pulsada y mostramos solo su texto
    luz.classList.add("encendida");
    texto.classList.remove("oculto");
}



// --------- SELECCION DE PERFIL DE CLIENTES --------- //

const perfiles = document.getElementById("perfiles");
const perfilPro = document.getElementById("pro");
const perfilAfi = document.getElementById("afi");

function destacar(perfil) {
    perfilPro.classList.remove("destacado");
    perfilAfi.classList.remove("destacado");

    perfil.classList.add("destacado");

    // padre.insertBefore(elemQueMovemos, elemQueHayPrimero); --> ver Ej5 del tema 16:JS-DOM
    perfiles.insertBefore(perfil, perfiles.firstChild);
}