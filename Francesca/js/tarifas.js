//JavaScript de tarifas. Responsable: Francesca González Marcet
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
function ponerahorro(precios) {
    if (document.getElementById("filaahorro") !== null){ //ya la he creado
        return;
    }
    const fila = document.createElement("tr"); //creo una fila
    fila.id = "filaahorro";
    let texto = "<td>Ahorro frente al plan mensual</td>"
    for (let i = 0; i< precios.length; i++){
        const mensual =  parseInt(precios[i].dataset.mensual);
        const ahorro = mensual*12*0.2;
        texto += '<td class="centrado">' + ahorro + " €/año</td>";   
    }
    fila.innerHTML = texto;
    document.querySelector("#tablacomparar tbody").appendChild(fila);
}
function quitarahorro() {
    const fila = document.getElementById("filaahorro");
    if (fila !== null) {
        document.querySelector("#tablacomparar tbody").removeChild(fila);
    }
}
function mostrarPrecios(periodo) {
    const precios = document.querySelectorAll(".precio"); //busco todos los elementos de la clase precio
    const botonmensual = document.getElementById("botonmensual");
    const botonanual = document.getElementById("botonanual");
    for (let i = 0; i < precios.length; i++){
        precios[i].innerHTML = precios[i].dataset[periodo];
    }
    if (periodo === "mensual"){
        botonmensual.style.backgroundColor = "#9cc488";
        botonmensual.style.color = "#ffffff";
        botonanual.style.backgroundColor = "";
        botonanual.style.color = "";
        quitarahorro();
    }else{
        botonanual.style.backgroundColor = "#9cc488";
        botonanual.style.color = "#ffffff";
        botonmensual.style.backgroundColor = "";
        botonmensual.style.color = "";
        ponerahorro(precios);
    }
    
}
mostrarPrecios("mensual");
function desplegar(numero){
    const respuesta = "r" + numero;
    const triangulo = "t" + numero;
    const r = document.getElementById(respuesta);
    const t = document.getElementById(triangulo);
    if (r.style.display === "block"){
        r.style.display = "none";
        t.innerHTML = "&#x2228;";
    }else{
        r.style.display = "block";
        t.innerHTML = "	&#x2227;";
    }
}
