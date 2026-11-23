
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
    let h // horas
    let m // minutos
    let s // segundos
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