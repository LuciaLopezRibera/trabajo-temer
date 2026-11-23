
// Al entrar en la página cogemos la hora actual y nos quedamos con los segundos
const hora = new Date(); // crear un objeto con la fecha y la hora de ahora
const segundo_entrada = hora.getSeconds(); // guardar solo los segundos

// Se decide el estado del huerto con la condición de: segundos de 0 a 19 --> verde, segundos de 20 a 39 --> amarillo, segundos de 40 a 59 --> rojo
let estado_actual; // se usa let porque la variable se asigna a continuación
if (segundo_entrada <20) {
    estado_actual = "verde";
} else if (segundo_entrada < 40){
    estado_actual = "amarillo";
} else { estado_actual = "rojo";}

// Simular los datos para cada uno de los tres estados
// Para que parezca que está en directo, se dan unos valores base para las medidas (datos) y luego se cambian un poco, para que no salgan siempre los mismos
const estados = { // objeto con tres propiedades, que cada una de ellas es otro objeto
    verde: {
        clase: "estado-verde", // clase css que se pondrá en el <body>
        luz: ":)", // lo que se muestra dentro del círculo de semáforo
        titulo: "Todo OK", // texto del recuadro de información 
        mensaje: "Tu huerto está en buen estado. No necesitas hacer nada.", // texto del recuadro de información
        datos: {humedad: 62, temperatura: 22, ambiente: 55, luz: 70, ph: 6.5, bateria: 88}, // otro objeto con los valores de cada sensor para ese estado 
        avisos: [ // lista de textos para poner como aviso de ese estado
            "Todos los sensores funcionan correctamente.",
            "Próximo riego programado en unas horas."
        ]
    },
    amarillo: {
        clase: "estado-amarillo",
        luz: ":/",
        titulo: "Requiere atención", 
        mensaje: "El huerto presenta valores atípicos. Conviene una revisión pronto.",
        datos: {humedad: 34, temperatura: 31, ambiente: 40, luz: 85, ph: 6.3, bateria: 55 },
        avisos: ["La humedad del suelo es baja.",
            "La temperatura es algo elevada para tus cultivos."
        ]
    },
    rojo: {
        clase: "estado-rojo",
        luz: ":(",
        titulo: "Alerta crítica",
        mensaje: "Se han registrado valores peligrosos para tus cultivos. Es necesario actuar cuanto antes.",
        datos: {humedad: 12, temperatura: 39, ambiente:25, luz: 95, ph: 5.1, bateria: 14}, 
        avisos: [
            "Humedad del suelo crítica. ¡Regar cuanto antes!",
            "Temperatura muy alta. ¡Proteger los cultivos del sol!",
            "Batería baja en una de las estacas."
        ]
    }
}

// Lista de sensores: nombre, unidades, valor máximo, variación para dar sensación de directo
// Es una lista de objetos, uno por sensor
// id --> igual que el nombre del sensor en "datos" del objeto estados
// icono --> archivo de la imagen para poner al lado del texto
// nombre --> nombre del sensor que se muestra en la página
// unidad --> unidades en las que se mide lo que se muestra
// max --> valor maximo para ese sensor (lo que sería la barra llena)
// variación --> cuánto va a oscilar el valor para que parezca en directo
// decimales --> cuántos decimales se muestran
const sensores = [
    {id: "humedad", icono: "humedad.svg", nombre: "Humedad del suelo", unidad: "%", max: 100, variacion: 1, decimales: 1},
    {id: "temperatura", icono: "temperatura.svg", nombre: "Temperatura", unidad: "ºC", max: 50, variacion: 0.4, decimales: 1},
    {id: "ambiente", icono: "aire.svg", nombre: "Humedad del aire", unidad: "%", max: 100, variacion: 1, decimales: 1},
    {id: "luz", icono: "luz.svg", nombre: "Luz solar", unidad: "%", max: 100, variacion: 2, decimales: 0},
    {id: "ph", icono: "ph.svg", nombre: "pH del suelo", unidad: "", max: 14, variacion: 0.1, decimales: 2},
    {id: "bateria", icono: "bateria.svg", nombre: "Batería de las estacas", unidad: "%", max: 100, variacion: 0.5, decimales: 1}

]

// Para devolver la fecha en horas, minutos y segundos (hh:mm:ss)
function formatoHora(fecha) {
    let h // horas
    let m // minutos
    let s // segundos
    if(fecha.getHours() < 10) { // si la hora es de una sola cifra se pega un cero delante 
        h = "0" + fecha.getHours();
    } else { h = "" + fecha.getHours();} // si no se convierte el número en texto
    if(fecha.getMinutes() < 10) {
        m = "0" + fecha.getMinutes();
    } else { m = "" + fecha.getMinutes();}
    if(fecha.getSeconds() < 10) {
        s = "0" + fecha.getSeconds();
    } else { s = "" + fecha.getSeconds();}
    return h + ":" + m + ":" + s; // se unen las tres partes
}

// Aplicar el estado a la página
function aplicarEstado() {
    const estado = estados[estado_actual];
    document.body.setAttribute("class", estado.clase); // se pone la clase del estado actual en el <body> del html para que funcionen las instrucciones del css
    document.getElementById("luz").innerHTML = estado.luz; // busca el elemento luz y lo escribe en el html
    document.getElementById("titulo-estado").innerHTML = estado.titulo; // busca el elemento titulo-estado y lo escribe en el html
    document.getElementById("mensaje-estado").innerHTML = estado.mensaje; // busca el elemento mensaje-estado y lo escribe en el html
    document.getElementById("hora-entrada").innerHTML = formatoHora(hora); // busca el elemento hora-entrada y lo escribe en el html usando la función de formatoHora

    // Avisos (se crea un <li> por cada aviso)
    const lista = document.getElementById("avisos"); // coge la lista de avisos del html
    for(let i = 0; i<estado.avisos.length; i++){ // recorre la lista de avisos
        const li = document.createElement("li"); // crea un <li> vacío en la página
        li.innerHTML = estado.avisos[i]; // pone el texto de la línea de aviso que toca en li
        lista.appendChild(li); // lo añade en la lista
    }
}

// Tarjetas de los sensores
function crearTarjetas(){
    const contenedor = document. getElementById("sensores"); // coge el div vacío del html donde van a ir las tarjeta de los sensores
    for (let i = 0; i < sensores.length; i++){
        const s = sensores[i]; // sensor actual

        const tarjeta = document.createElement("div"); // crea un div (para la tarjeta de ese sensor)
        tarjeta.className = "sensor"; // le pone al div la clase sensor
        
        const titulo = document.createElement("h3");
        const icono = document.createElement("img");
        icono.src = "../img/" + s.icono; // se construye la ruta del icono (tiene que contar desde la página html)
        icono.alt = ""; // para poner la imagen como decorativa
        icono.className = "icono"; // le da la clase icono
        const nombre = document.createElement("span");
        nombre.innerHTML = s.nombre; // añade el nombre del sensor en el html
        titulo.appendChild(icono); // añade el icono del sensor en la página
        titulo.appendChild(nombre); // añade el nombre del sensor en la página

        const valor = document.createElement("p"); // crear un elemento de párrafo
        valor.className = "valor"; // en el html queda como <p class="valor">
        s.spanValor = document.createElement("span"); // crea un elemento span para los valores y lo guarda dentro del objeto s
        const spanUnidad = document.createElement("span"); // crea un elemento span para las unidades
        spanUnidad.className = "unidad"; // le asigna la clase unidad
        spanUnidad.innerHTML = " " + s.unidad; // añadir un espacio para que las uds no salgan pegadas
        valor.appendChild(s.spanValor); // añade el valor en el párrafo
        valor.appendChild(spanUnidad); // añade las unidades en el párrafo

        const barra = document.createElement("div"); // creación de un div para la barra de progreso de los sensores
        barra.className = "barra"; // se le asigna la clase barra 
        s.relleno = document.createElement("div"); // se crea un div para el relleno de la barra
        barra.appendChild(s.relleno); // se añade el relleno a la barra

        tarjeta.appendChild(titulo); // se añade el titulo en la tarjeta
        tarjeta.appendChild(valor); // se añade el valor en la tarjeta
        tarjeta.appendChild(barra); // se añade la barra en la tarjeta
        contenedor.appendChild(tarjeta); // se añade la tarjeta en la página
    }
}

// Para que parezca que los datos son en directo: cada 10 segundos los valores cambian un poco respecto de los base
let tic = 0;  // contador para ver cuántas veces se actualiza

function mostrarValores() {
    const base = estados[estado_actual].datos; // se cogen los valores base para el estado en el que estamos

    for (let i = 0; i < sensores.length; i++) {
        const s = sensores[i]; // se coge el sensor actual
        // tic % 4 puede dar 0, 1, 2 o 3 y al restarle 1.5 nos puede quedar -1.5, -0.5, 0.5, 1.5,
        // al multiplicar por la variación el valor sube o baja
        const valor = base[s.id] + ((tic % 4) - 1.5)*s.variacion; 
        // redondea el valor a los decimales que se quiere y se pasa a texto y lo escribe en el span de la tarjeta
        s.spanValor.innerHTML = valor.toFixed(s.decimales); 
        s.relleno.style.width = (valor/s.max*100) + "%"; // calcula que porcentaje del máximo es ese valor y se pone como ancho de la barra
    }

    document.getElementById("hora-actualizacion").innerHTML = formatoHora(new Date()); // escribe la hora actual, no la de entrada
}

function tiempo() { // se suma 1 al tic y se vuelven a pintar los valores
    tic = tic + 1;
    mostrarValores();
}

// Arrancar 

aplicarEstado();  // pone el color, los textos y los avisos
crearTarjetas();
mostrarValores(); 
setInterval(tiempo, 10000); // cada 10 segundos se ejecuta tiempo, que es para recargar los valores de los sensores


// Aviso al cerrar sesión 

const enlaceCerrar = document.getElementById("cerrar-sesion"); // coge el enlace que se usa para cerrar sesiçon
const aviso = document.getElementById("aviso-cerrar"); // coge el contenedor de aviso de cerrar
const botonNo = document.getElementById("aviso-no"); // coge el botón de cancelación del cierre de sesión

// Al pulsar cerrar sesión no se va al login, se enseña el aviso
enlaceCerrar.addEventListener("click", function (e){ // escucha el evento click sobre el enlace de cerrar sesión
    e.preventDefault(); // anula lo que haría el enlace por defecto (ir al login)
    aviso.style.display = "flex"; // cambia la propiedad del aviso a flex, para que sea visible en pantalla (por defecto está oculto)
 
});

// Al pulsar no se esconde el aviso y te quedas donde estás
botonNo.addEventListener("click", function(){ // escicha el clic en el botón de no, volver
    aviso.style.display = "none"; // si se pulsa se vuelve a ocultar la ventana de aviso poniendo otra vez el display a none
})

// Para que salga el nombre del usuario arriba (saludo personalizado)
let nombre = localStorage.getItem("nombre_usuario"); // se coge el valor del nombre de usuario guardado en el inicio de sesión
document.getElementById("hola").textContent = "Hola, " + nombre; // se pone en el "hola" del html el texto con el saludo y el nombre