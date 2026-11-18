
// Al entrar en la página cogemos la hora actual y nos quedamos con los segundos
const hora = new Date();
const segundo_entrada = hora.getSeconds();

// Se decide el estado del huerto con la condición de: segundos de 0 a 19 --> verde, segundos de 20 a 39 --> naranja, segundos de 40 a 59 --> rojo
let estado_actual; 
if (segundo_entrada <20) {
    estado_actual = "verde";
} else if (segundo_entrada < 40){
    estado_actual = "amarillo";
} else { estado_actual = "rojo";}

// Simular los datos para cada uno de los tres estados
// Para que parezca que está en directo, se dan unos valores base para las medidas (datos) y luego se cambian un poco, para que no salgan siempre los mismos
const estados = {
    verde: {
        clase: "estado-verde",
        luz: ":)",
        titulo: "Todo OK",
        mensaje: "Tu huerto está en buen estado. No necesitas hacer nada.",
        datos: {humedad: 62, temperatura: 22, ambiente: 55, luz: 70, ph: 6.5, bateria: 88},
        avisos: [
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
        mensaje: "Se han registrado valores peligrosos para tus cultivos. En necesario actuar cuanto antes.",
        datos: {humedad: 12, temperatura: 39, ambiente:25, luz: 95, ph: 5.1, bateria: 14}, 
        avisos: [
            "Humedad del suelo crítica. ¡Regar cuanto antes!",
            "Temperatura muy alta. ¡Proteger los cultivos del sol!",
            "Batería baja en una de las estacas."
        ]
    }
}

// Lista de sensores: nombre, unidades, valor máximo, variación para dar sensación de directo
const sensores = [
    {id: "humedad", icono: "humedad.svg", nombre: "Humedad del suelo", unidad: "%", max: 100, variacion: 1, decimales: 1},
    {id: "temperatura", icono: "temperatura.svg", nombre: "Temperatura", unidad: "ºC", max: 50, variacion: 0.4, decimales: 1},
    {id: "ambiente", icono: "aire.svg", nombre: "Humedad del aire", unidad: "%", max: 100, variacion: 1, decimales: 1},
    {id: "luz", icono: "luz.svg", nombre: "Luz solar", unidad: "%", max: 100, variacion: 2, decimales: 0},
    {id: "ph", icono: "ph.svg", nombre: "pH del suelo", unidad: "", max: 14, variacion: 0.1, decimales: 2},
    {id: "bateria", icono: "bateria.svg", nombre: "Batería de las estacas", unidad: "%", max: 100, variacion: 0.5, decimales: 1}

]

// Para devolver la fecha en horas, minutos y segundos
function formatoHora(fecha) {
    let h
    let m
    let s
    if(fecha.getHours() < 10) {
        h = "0" + fecha.getHours();
    } else { h = "" + fecha.getHours();}
    if(fecha.getMinutes() < 10) {
        m = "0" + fecha.getMinutes();
    } else { m = "" + fecha.getMinutes();}
    if(fecha.getSeconds() < 10) {
        s = "0" + fecha.getSeconds();
    } else { s = "" + fecha.getSeconds();}
    return h + ":" + m + ":" + s;
}

// Aplicar el estado a la página
function aplicarEstado() {
    const estado = estados[estado_actual];
    document.body.setAttribute("class", estado.clase);
    document.getElementById("luz").innerHTML = estado.luz;
    document.getElementById("titulo-estado").innerHTML = estado.titulo;
    document.getElementById("mensaje-estado").innerHTML = estado.mensaje;
    document.getElementById("hora-entrada").innerHTML = formatoHora(hora);

    // Avisos (se crea un <li> por cada aviso)
    const lista = document. getElementById("avisos");
    for(let i = 0; i<estado.avisos.length; i++){
        const li = document.createElement("li");
        li.innerHTML = estado.avisos[i];
        lista.appendChild(li);
    }
}

// Tarjetas de los sensores
function crearTarjetas(){
    const contenedor = document. getElementById("sensores");
    for (let i = 0; i < sensores.length; i++){
        const s = sensores[i];

        const tarjeta = document.createElement("div");
        tarjeta.className = "sensor";
        
        const titulo = document.createElement("h3");
        const icono = document.createElement("img");
        icono.src = "../img/" + s.icono;
        icono.alt = "";
        icono.className = "icono";
        const nombre = document.createElement("span");
        nombre.innerHTML = s.nombre;
        titulo.appendChild(icono);
        titulo.appendChild(nombre); 

        const valor = document.createElement("p");
        valor.className = "valor";
        s.spanValor = document.createElement("span");
        const spanUnidad = document.createElement("span");
        spanUnidad.className = "unidad";
        spanUnidad.innerHTML = " " + s.unidad;
        valor.appendChild(s.spanValor);
        valor.appendChild(spanUnidad);

        const barra = document.createElement("div");
        barra.className = "barra";
        s.relleno = document.createElement("div");
        barra.appendChild(s.relleno);

        tarjeta.appendChild(titulo);
        tarjeta.appendChild(valor); 
        tarjeta.appendChild(barra);
        contenedor.appendChild(tarjeta);
    }
}

// Para que parezca que los datos son en directo: cada 3 segundos los valores cambian un poco respecto de los base
let tic = 0; 

function mostrarValores() {
    const base = estados[estado_actual].datos;

    for (let i = 0; i < sensores.length; i++) {
        const s = sensores[i];
        const valor = base[s.id] + ((tic % 4) - 1.5)*s.variacion; 
        s.spanValor.innerHTML = valor.toFixed(s.decimales);
        s.relleno.style.width = (valor/s.max*100) + "%";
    }

    document.getElementById("hora-actualizacion").innerHTML = formatoHora(new Date());
}

function tiempo() {
    tic = tic + 1;
    mostrarValores();
}

// Arrancar 

aplicarEstado(); 
crearTarjetas();
mostrarValores(); 
setInterval(tiempo, 10000);