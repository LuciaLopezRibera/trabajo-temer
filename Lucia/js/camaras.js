
// Datos de las cámaras (cada cámara tiene su nombre y dos vídeos distintos)

const camaras = {
    manzanas: {
        nombre: "Cámara 1. Manzanas",
        videos: [
            "../img/manzanas1.mp4", "../img/manzanas2.mp4"]
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
    }, 
};

const zona = document.getElementById("zona");
const iconos = document.querySelectorAll(".camara");
let reloj = null; // para guardar el temporizador del reloj "en directo"

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
    const camara = camaras[fruta];
    // Tomamos en qué segundo se ha soltado la cámara. Si los segundos van de 0 a 29 --> primer vídeo. Si los segundos van de 30 a 59 --> segundo vídeo. 
    const segundo = new Date().getSeconds(); 
    let num; 
    if(segundo < 30){
        num = 0;
    } else {
        num = 1; 
    }

    // Se vacía la zona y se para el reloj anterior (por si había otro vídeo antes)
    while(zona.Child){
        zona.removeChild(zona.firstChild);
    } 
    if (reloj !== null){
        clearInterval(reloj);
    }

    // "EN DIRECTO" con el nombre de la cámara y la hora
    const barra = document.createElement("div");
    barra.className = "directo";

    const punto = document.createElement("span");
    punto.className = "punto";
    punto.innerHTML = "●";

    const texto = document.createElement("span");
    texto.innerHTML = "EN DIRECTO - " + camara.nombre;

    const hora = document.createElement("span");
    hora.className = "hora";
    hora.innerHTML = formatoHora(new Date());

    barra.appendChild(punto);
    barra.appendChild(texto);
    barra.appendChild(hora);

    // Muestra del vídeo
    const video = document.createElement("video");
    video.src = camara.videos[num];
    video.controls = true; // para que salgan los botones de reproducir, pausa, volumen, etc.
    video.autoplay = true; // para que empiece solo en cuanto se muestre
    video.muted = true; // vídeo sin sonido
    video.loop = true; // al acabar vuelve a empezar (para que de la sensación de directo)

    zona.appendChild(barra);
    zona.appendChild(video);
    zona.style.borderStyle = "solid"; // para que el borde deje de ser discontinuo (como se había definido al principio en el css para cuando el vídeo estaba vacío)

    // Para hacer que cada segundo se actualice la hora y el punto rojo parpadee
    reloj = setInterval(function(){
        hora.innerHTML = formatoHora(new Date());
        if(punto.style.visibility === "hidden"){
            punto.style.visibility = "visible";
        } else {
            punto.style.visibility = "hidden";
        }
    }, 1000) // como cuenta en ms, con 1000 tenemos que lo hace cada segundo

    // Para marcar en verde la cámara que se está viendo en el recuadro grande
    for (let i = 0; i < iconos.length; i++){
        iconos[i].style.backgroundColor = "#ffffff";
    }
    document.getElementById("camara-" + fruta).style.backgroundColor = "#bfe0c4";

}

// Programación del ARRASTRAR Y SOLTAR

// Cuando se empieza a arrastrar se guarda el id del icono
for (let i = 0; i < iconos.length; i++){
    const icono = iconos[i];
    icono.addEventListener("dragstart", function(e){
        e.dataTransfer.setData("text", icono.id);
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
zona.addEventListener("drop", function(e){
    e.preventDefault();
    zona.style.backgroundColor = "";
    const id = e.dataTransfer.getData("text"); // coge el nombre de la cámara que se ha arrastrado
    const fruta = document.getElementById(id).dataset.fruta;  // lee el data-fruta de la fruta de la que se ha arrastrado la cámara
    mostrarVideo(fruta);
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