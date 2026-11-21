// JavaScript de la ficha de cada cultivo - Responsable: Elsa Blasco Novell

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
