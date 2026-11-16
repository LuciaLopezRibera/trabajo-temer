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
        triangulo.innerHTML = "&#x2228;"; 
    }else{
        tabla.style.display = "block";
        triangulo.innerHTML = "	&#x2227;";
    }
}
function desplegar(respuesta){
    const r = document.getElementById(respuesta);
    if (r.style.display === "block"){
        r.style.display = "none";
        
    }else{
        r.style.display = "block";
       
    }
}

//function filaIgual(){}

//function interfazTabla(){}