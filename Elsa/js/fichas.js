// JavaScript de la ficha de cada cultivo - Responsable: Elsa Blasco Novell

// Saludo de arriba del todo
let nombre = localStorage.getItem("nombre_usuario");
document.getElementById("hola").textContent = "Hola, " + nombre;


// PASO 1: Cogemos la fruta/verdura seleccionada
const idElegido = localStorage.getItem("cultivoElegido");

let cultivo = null; // donde guardamos el cultivo pulsado
for (const c of cultivos) {
    if (c.id === idElegido) {
        cultivo = c;
    }
}

// PASO 2: Rellenamos su portada
const imagen = document.getElementById("portada-imagen");
imagen.setAttribute("src", "../img/portadas/" + cultivo.id + "p.jpg");
imagen.setAttribute("alt", cultivo.nombre);

// nombre
document.getElementById("portada-nombre").innerHTML = cultivo.nombre; 

// detalles
let temporada = cultivo.temporada; 
document.getElementById("portada-detalles").innerHTML = cultivo.tipo + " de " + temporada;



// PASO 3: Ponemos la imagen del pie
const pie = document.getElementById("pie-imagen");
pie.setAttribute("src", "../img/pies/" + cultivo.id + "pie.jpg");
pie.setAttribute("alt", "Variedades de " + cultivo.nombre);


// PASO 4: Rellenamos la tabla del calendario

// buscamos las dos filas y, dentro de cada una, sus 12 celdas <td>
const filaSiembra = document.getElementById("fila-siembra");
const filaCosecha = document.getElementById("fila-cosecha");
const celdasSiembra = filaSiembra.getElementsByTagName("td");   // vector con las 12 celdas de siembra
const celdasCosecha = filaCosecha.getElementsByTagName("td");   // vector con las 12 celdas de cosecha

// cosecha 
for (const mes of cultivo.cosecha) { // recorremos, por ejemplo, cosecha: [8, 9, 10, 11, 12] (uva)
    celdasCosecha[mes -1].classList.add("cosecha");  // mes -1 porque las posiciones empiezan en 0 --> agosto = 8 pero esta en la celda 7 (cosecha no cuenta porque no es td)
}

// siembra
if (cultivo.frutal) {
    filaSiembra.innerHTML ="<th>Plantación</th><td colspan='12'>Se planta una sola vez y produce durante muchos años</td>";
} else {
    for (const mes of cultivo.siembra) {
        celdasSiembra[mes-1].classList.add("siembra");
    }
}



// PASO 5: Rellenamos las necesidades

// funcion que dibuja los puntitos segun el nivel (1-4) que hemos puesto en el js
function dibujarPuntos(nivel) {
    let puntos = ""
    for (let i=1; i<=4; i++) {
        if (i<=nivel) {
            puntos += "&#9679;"; // punto lleno
        } else {
            puntos += "&#9675;"; // punto vacio
        }
    }
    return puntos; 
}

// agua
document.getElementById("nivel-agua").innerHTML = dibujarPuntos(cultivo.agua);
document.getElementById("texto-agua").innerHTML = cultivo.textoAgua;

// temperatura
document.getElementById("nivel-temp").innerHTML = dibujarPuntos(cultivo.calor);
document.getElementById("texto-temp").innerHTML = cultivo.textoCalor;


// PASO 5: Rellenamos los consejos
document.getElementById("texto-consejo").innerHTML = cultivo.consejo; 





// Aviso al cerrar sesion 

const enlaceCerrar = document.getElementById("cerrar-sesion");
const aviso = document.getElementById("aviso-cerrar");
const botonNo = document.getElementById("aviso-no");

// Al pulsar cerrar sesion no se va al login, se enseña el aviso
enlaceCerrar.addEventListener("click", function (e) {
    e.preventDefault();          // anula lo que haria el enlace (ir al login)
    aviso.style.display = "flex";
});

// Al pulsar no se esconde el aviso y te quedas donde estas
botonNo.addEventListener("click", function () {
    aviso.style.display = "none";
});
