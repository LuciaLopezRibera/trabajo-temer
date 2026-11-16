
// Al entrar en la página cogemos la hora actual y nos quedamos con los segundos
const hora = new Date();
const segundo_entrada = hora.getSeconds();

// Se decide el estado del huerto con la condición de: segundos de 0 a 19 --> verde, segundos de 20 a 39 --> naranja, segundos de 40 a 59 --> rojo
let estado_actual; 
if (segundo_entrada <20) {
    estado_actual = "verde";
} else if (segundo_entrada < 40){
    estado_actual = "amarillo";
} else { estado_actual = "rojo";}

// Simular los datos para cada uno de los tres estados
// Para que parezca que está en directo, se dan unos valores base para las medidas (datos) y luego se cambian un poco, para que no salgan siempre los mismos
const estados = {
    verde: {
        clase: "estado-verde",
        titulo: "Todo OK",
        mensaje: "Tu huerto está en buen estado. No necesitas hacer nada.",
        datos: {humedad: 62, temperatura: 22, ambiente: 55, luz: 70, ph: 6.5, bateria: 88},
        avisos: [
            "Todos los sensores funcionan correctamente.",
            "Próximo riego programado en unas horas."
        ]
    },
    amarillo: {
        clase: "estado-amarillo",
        titulo: "Requiere atención", 
        mensahe: "El huerto presenta valores atípicos. Conviene una revisión pronto.",
        datos: {humedad: 34, temperatura: 31, ambiente: 40, luz: 85, ph: 6.3, bateria: 55 },
        avisos: ["La humedad del suelo es baja.",
            "La temperatura es algo elevada para tus cultivos."
        ]
    },
    rojo: {
        clase: "estado-rojo",
        titulo: "Alerta crítica",
        mensaje: "Se han registrado valores peligrosos para tus cultivos. En necesario actuar cuanto antes.",
        datos: {humedad: 12, temperatura: 39, ambiente:25, luz: 95, ph: 5.1, bateria: 14}, 
        avisos: [
            "Humedad del suelo crítica. ¡Regar cuanto antes!",
            "Temperatura muy alta. ¡Proteger los cultivos del sol!",
            "Batería baja en una de las estacas."
        ]
    }
}

// Lista de sensores: nombre, unidades, valor máximo, variación para dar sensación de directo
const sensores = [
    {id: "humedad", nombre: "Humedad del suelo", unidad: "%", max: 100, variacion: 1},
    {id: "temperatura", nombre: "Temperatura", unidad: "ºC", max: 50, variacion: 0.4},
    {id: "ambiente", nombre: "Humedad del aire", unidad: "%", max: 100, variacion: 1},
    {id: "luz", nombre: "Luz solar", unidad: "%", max: 100, variacion: 2},
    {id: "ph", nombre: "pH del suelo", unidad: "", max: 14, variacion: 0.1},
    {id: "bateria", nombre: "Batería de las estacas", unidad: "%", max: 100, variacion: 0.5}

]

// Para devolver la fecha en horas, minutos y segundos