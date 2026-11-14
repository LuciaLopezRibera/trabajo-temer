//JavaScript de tarifas. Responsable: Francesca
function seleccionarPlan(nombre){
    const planes = ["basico", "plus", "premium"];
    
    for(let i=0; i<planes.length; i++){
        const caja = document.getElementById("plan-"+planes[i]);
        const detalle = document.getElementById("detalles-"+planes[i]);
        if (planes[i] === nombre && detalle.style.display !== "block"){
            detalle.style.display = "block";
            caja.style.backgroundColor = "#9cc488";
        }else{
            detalle.style.display = "none";
            caja.style.backgroundColor = "";
        }
    }
}


function desplegarTabla(){
    const tabla = document.getElementById("contenedorTabla");
    const triangulo = document.getElementById("triangulo");
    if (tabla.style.display === "block"){
        tabla.style.display = "none";
        triangulo.innerHTML = "&#9660;"; 
    }else{
        tabla.style.display = "block";
        triangulo.innerHTML = "&#9650;";
    }
}

//function filaIgual(){}

//function interfazTabla(){}