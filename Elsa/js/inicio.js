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