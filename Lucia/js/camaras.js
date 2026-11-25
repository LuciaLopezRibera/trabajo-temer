
// Datos de las cámaras (cada cámara tiene su nombre y dos vídeos distintos)

const camaras = { // objeto con tres propiedades, que a su vez son objetos también con propiedades de nombre y una lista de vídeos
    manzanas: {
        nombre: "Cámara 1. Manzanas",
        videos: [
            "../img/manzanas1.mp4", "../img/manzanas2.mp4"] // rutas a los vídeos dentro de las carpetas
    }, 
    fresas: {
        nombre: "Cámara 2. Fresas",
        videos: [
            "../img/fresas1.mp4", "../img/fresas2.mp4"]
    }, 
    tomates: {
        nombre: "Cámara 3. Tomates",
        videos: [
            "../img/tomates1.mp4", "../img/tomates2.mp4"]
    } 
};

const zona = document.getElementById("zona"); // para guardar el recuadro grande donde se suelta el vídeo
const iconos = document.querySelectorAll(".camara"); // para guardar la lista de los recuadros de icono de las cámaras
let reloj = null; // para guardar el temporizador del reloj "en directo" (se pone let porque va a cambiar de valor)

// Para devolver la fecha en horas, minutos y segundos (hh:mm:ss)
function formatoHora(fecha) {
    let h; // horas
    let m; // minutos
    let s; // segundos
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

// Para mostrar el vídeo en la zona grande 
function mostrarVideo(fruta){ // en fruta ponemos manzanas, fresas o tomates
    const camara = camaras[fruta]; // busca el objeto de la fruta que corresponda
    // Tomamos en qué segundo se ha soltado la cámara. Si los segundos van de 0 a 29 --> primer vídeo. Si los segundos van de 30 a 59 --> segundo vídeo. 
    const segundo = new Date().getSeconds();  // tomar la hora actual y coger los segundos
    
    let num; 
    if(segundo < 30){
        num = 0; // índice para primer vídeo
    } else {
        num = 1; // índice para segundo vídeo
    }

    
    // Se vacía la zona y se para el reloj anterior (por si había otro vídeo antes)

    zona.innerHTML = ""; // para que desaparezca vídeo anterior si había
    if (reloj !== null){ // se borra el reloj porque al arrastrar otra se generará otro reloj y si no estarán todos corriendo a la vez
        clearInterval(reloj);
    }

    // "EN DIRECTO" con el nombre de la cámara y la hora
    const barra = document.createElement("div"); // se crea el div para la barra
    barra.className = "directo";

    const punto = document.createElement("span"); // span para el punto que parpadeará
    punto.className = "punto";
    punto.innerHTML = "●"; // se asigna el punto

    const texto = document.createElement("span"); // span para el texto con el nombre de la cámara que se muestra
    texto.innerHTML = "EN DIRECTO - " + camara.nombre;

    const hora = document.createElement("span"); // span para la hora en directo del vídeo
    hora.className = "hora";
    hora.innerHTML = formatoHora(new Date()); // se asigna la hora

    // se añaden los tres elementos span dentro de la barra 
    barra.appendChild(punto);
    barra.appendChild(texto);
    barra.appendChild(hora);

    // Muestra del vídeo
    const video = document.createElement("video"); // se crea el vídeo
    video.src = camara.videos[num]; // se le asigna la ruta del vídeo que se va a mostrar (1 o 2 dependiendo de los segundos)
    video.controls = true; // para que salgan los botones de reproducir, pausa, volumen, etc.
    video.autoplay = true; // para que empiece solo en cuanto se muestre
    video.muted = true; // vídeo sin sonido
    video.loop = true; // al acabar vuelve a empezar (para que de la sensación de directo)

    zona.appendChild(barra); // colocar la barra en la página
    zona.appendChild(video); // colocar el vídeo en la página
    zona.style.borderStyle = "solid"; // para que el borde deje de ser discontinuo (como se había definido al principio en el css para cuando el vídeo estaba vacío)

    // Para hacer que cada segundo se actualice la hora y el punto rojo parpadee
    reloj = setInterval(function(){
        hora.innerHTML = formatoHora(new Date()); // se actualiza la hora
        if(punto.style.visibility === "hidden"){ // si el punto está oculto se muestra
            punto.style.visibility = "visible"; 
        } else {
            punto.style.visibility = "hidden"; // si el punto se está mostrando se quita
        }
        // así se crea sensación de parpadeo
    }, 1000) // como cuenta en ms, con 1000 tenemos que lo hace cada segundo

    // Para marcar en verde la cámara que se está viendo en el recuadro grande
    for (let i = 0; i < iconos.length; i++){
        iconos[i].style.backgroundColor = "#ffffff"; // pone todos los iconos en blanco (por si había alguno pintado) 
    }
    document.getElementById("camara-" + fruta).style.backgroundColor = "#bfe0c4"; // y después el que quiere en verde

}

// Programación del ARRASTRAR Y SOLTAR

for (let i = 0; i < iconos.length; i++){ // para recorrer los 3 iconos
    const icono = iconos[i];
    icono.addEventListener("dragstart", function(e){
        e.dataTransfer.setData("text", icono.id); 
        // Cuando se empieza a arrastrar se guarda el id del icono
    }); 
}

// Configurar la zona grande para que acepte que se suelten cosas encima
zona.addEventListener("dragenter", function(e){
    e.preventDefault();
    zona.style.backgroundColor = "#e4f2e2"; // se cambia mientras se está pasando por encima para que de la sensación de que se puede soltar
}); 
zona.addEventListener("dragover", function(e){
    e.preventDefault(); // para que se permita soltar
});
zona.addEventListener("dragleave", function(e){
    e.preventDefault();
    zona.style.backgroundColor = ""; // cuando ya se suelta se vuelve al color del css
}); 
zona.addEventListener("drop", function(e){ // lo que ocurre al soltar
    e.preventDefault();
    zona.style.backgroundColor = "";
    const id = e.dataTransfer.getData("text"); // coge el nombre de la cámara que se ha arrastrado (id)
    const fruta = document.getElementById(id).dataset.fruta;  // lee el data-fruta de la fruta de la que se ha arrastrado la cámara (manzanas, fresas o tomates)
    // .dataset da acceso a todos los atributos que empiezan por data-
    // .fruta es para decirle que acceda específicamente al data-fruta
    mostrarVideo(fruta); // se muestra el vídeo de la fruta que corresponde 
}); 


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