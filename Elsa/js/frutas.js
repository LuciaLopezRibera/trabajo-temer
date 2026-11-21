// JavaScript de la página frutas - Responsable: Elsa Blasco Novell


function mostrarCultivos() {
    // PASO 1: Leer lo que hay en cada desplegable 
    const tipo = document.getElementById("filtro-tipo").value; 
    const color = document.getElementById("filtro-color").value; 
    const temporada = document.getElementById("filtro-temporada").value; 

    // PASO 2: Filtramos
    let lista = cultivos;

    if (tipo !== "todos") { // si se ha puesto todos --> no filtra
        const pasanFiltro = []; // vector donde vamos a guardar las frutas/verduras que pasan el filtro
        for (const cultivo of lista) {
            if (cultivo.tipo === tipo) { // si coincide con el elegido lo guardamos
                pasanFiltro.push(cultivo); // push = guardar al final del vector
            }
        }
        lista = pasanFiltro; // la lista a mostrar es solo los filtrados
    }

    if (color !== "todos") { // si se ha puesto todos --> no filtra
        const pasanFiltro = []; // vector donde vamos a guardar las frutas/verduras que pasan el filtro
        for (const cultivo of lista) {
            if (typeof cultivo.color === "string") { // si solo tiene un color
                if (cultivo.color === color) { 
                    pasanFiltro.push(cultivo);
                }
            } else {
                for (const c of cultivo.color) {
                    if (c === color) {
                        pasanFiltro.push(cultivo);
                    }
                }
            }
        }
        lista = pasanFiltro; // la lista a mostrar es solo los filtrados
    }

    if (temporada !== "todas") { // si se ha puesto todos --> no filtra
        const pasanFiltro = []; // vector donde vamos a guardar las frutas/verduras que pasan el filtro
        for (const cultivo of lista) {
            if (cultivo.temporada === temporada) { // si coincide con el elegido lo guardamos
                pasanFiltro.push(cultivo); // push = guardar al final del vector
            }
        }
        lista = pasanFiltro; // la lista a mostrar es solo los filtrados
    }

    // PASO 3: Ordenamos los cultivos
    // Ojo! cultivos.js ya esta ordenado alfabeticamente (az) --> si en el filtro ponemos az no hay que hacer nada

    const orden = document.getElementById("filtro-orden").value; // az o za

    if (orden === "za") {
        const alReves = [];
        let i = lista.length -1; // resto 1 porque la primera posicion es el cero --> tenemos 0, 1, 2, ..., 13
        for (i; i>=0; i--) {
            alReves.push(lista[i]); // recorremos desde el ultimo y lo vamos guardando
        }
        lista = alReves;
    }


    // PASO 4: Mostramos las frutas/verduras de lista (mas o menos como el solitario)

    const zona = document.getElementById("lista-cultivos"); // zona de la pagina donde van los cultivos
    zona.innerHTML = ""; // innerHTML es el contenido de un elemento --> al poner "" vaciamos lista-cultivos (div)


    if (lista.length === 0) {
        zona.innerHTML = "<p>No se ha registrado ningún cultivo que cumpla estos filtros</p>";
    }

    for  (const cultivo of lista) {
        const caja = document.createElement("a"); // cajita para cada cultivo --> pondremos su foto y nombre
        
        // queremos algo del estilo: <a class="cultivo" href="ficha.html" target="_blank" onclick="guardarCultivo('tomate')">
        caja.setAttribute("class", "cultivo");   // al enlace/cajita de cada cultivo le ponemos class = "cultivo"
        caja.setAttribute("href", "fichas.html"); // lleva a la ficha
        caja.setAttribute("target", "_blank");   // la abre en otra pestaña
        caja.setAttribute("onclick", "guardarCultivo('" + cultivo.id + "')");  // al pulsar guardamos que cultivo es

        const foto = document.createElement("img");
        foto.setAttribute("src", "../img/cultivos/" + cultivo.imagen);
        foto.setAttribute("alt", cultivo.nombre);
        caja.appendChild(foto); // ponemos la foto dentro del div

        const nombre = document.createElement("p");
        nombre.innerHTML = cultivo.nombre; 
        caja.appendChild(nombre);

        zona.appendChild(caja);
    }

    


}

function guardarCultivo(id) {
    localStorage.setItem("cultivoElegido", id); // gaurdamos en el navegador el id del cultivo pulsado para que ficha.html sepa cual mostrar
}

mostrarCultivos();