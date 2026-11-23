// VALIDAR USUARIO Y CONTRASEÑA

let base_usuarios=["prueba", "elsa", "francesca", "lucia", "belen"];
let base_contrasenas=["prueba", "cont_elsa", "cont_francesca", "cont_lucia", "cont_belen"];
let base_nombres=["Prueba", "Elsa", "Francesca", "Lucía", "Belén"]
const formulario = document.getElementById("formulario_inicio");
let nombre_usuario="";

// me añado a la base el usuario y contrasena de contratar
let usuario_nuevo = localStorage.getItem("usuario_nuevo");
let contrasena_nueva = localStorage.getItem("contrasena_nueva");
let nombre_nuevo = localStorage.getItem("nombre_nuevo");
if (usuario_nuevo !== null) {
    base_usuarios.push(usuario_nuevo);
    base_contrasenas.push(contrasena_nueva);
    base_nombres.push(nombre_nuevo);
}

formulario.addEventListener("submit", function(evento){
    let validacion=0;
    // leo los campos de usuario y contraseña del formulario
    let usuario = document.getElementById("usuario");
    let contrasena = document.getElementById("contrasena");

    for (let i=0; i<=base_usuarios.length;i++){ 
        if (base_usuarios[i]===usuario.value){ // compruebo si el usario y contraseña coincide con los almacenados
            if (base_contrasenas[i]===contrasena.value){ // importante que tengan el mismo indice i para que sea la misma pareja usuario/contraseña
                validacion=1;
                nombre_usuario = base_nombres[i]; // nos quedamos con el nombre de usuario
            }
        }
    }

    // si los usuarios no estan en nuestra base salta una alerta y nos quedamos en la pagina
    if (validacion==0){
        evento.preventDefault();
        alert("Usuario o contraseña incorrectos.");
    }else{
        localStorage.setItem("nombre_usuario", nombre_usuario); // me guardo el nombre en una variable local para luego mostrarlo en el resto de paginas
    }
});