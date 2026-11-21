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

