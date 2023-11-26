var inputEmail=null;
var inputPassword=null;
var frmLogin=null;

import { usuariosServices } from "/servicios/usuarios-servicios.js";

export function setLogin (){
    // Obtener la referencia al formulario de inicio de sesión
    frmLogin = document.getElementById('frmLogin'); 

    // Obtener la referencia al botón de cierre de sesión
    const btnLogout = document.getElementById('btnLogout');

    // Agregar un event listener al botón de cierre de sesión para manejar el evento de clic
    btnLogout.addEventListener('click', logout);

    // Verificar si hay un usuario autenticado
    if (getUsuarioAutenticado()){
        // Si hay un formulario de inicio de sesión, eliminarlo del DOM
        if (frmLogin)
            frmLogin.outerHTML = '';
    } else {
        // Si no hay un usuario autenticado, ocultar el contenido y configurar la lógica de inicio de sesión
        document.getElementById("sitio").classList.add('d-none');
        
        // Obtener referencias a los campos de entrada de correo y contraseña
        inputEmail = document.getElementById('loginEmail');
        inputPassword = document.getElementById('loginPassword');
        
        // Obtener referencias al botón de inicio de sesión
        const btnLogin = document.getElementById('iniciar-sesion');

        // Agregar event listeners para validar el formulario y manejar el inicio de sesión
        inputEmail.addEventListener('blur', validarForm);
        inputPassword.addEventListener('blur', validarForm);
        btnLogin.addEventListener('click', usuarioExiste);
    }

   
}

async function usuarioExiste() {

    // Variables para almacenar información del usuario
    let existeUsuario;
    let usuarioActivo;
    let usuarioFoto;
    let usuarioId;

    // Spinner para indicar carga
    const spinner = document.querySelector('#spinner');

    // Consultar la lista de usuarios
    await usuariosServices.listar()
        .then(respuesta => {
            // Iterar sobre la respuesta para encontrar el usuario
            respuesta.forEach(usuario => {
                if (usuario.correo === inputEmail.value && usuario.password === inputPassword.value) {
                    // Si se encuentra el usuario, asignar valores y salir del bucle
                    usuarioId = usuario.id;
                    usuarioActivo = usuario.nombre + ' ' + usuario.apellido;
                    usuarioFoto = usuario.avatar;
                    existeUsuario = true;
                    return;
                }
            });
        })
        .catch(error => console.log(error));

    // Verificar si existe el usuario
    if (!existeUsuario) {
        mostrarMensaje('Email o contraseña incorrecto, intenta nuevamente');
    } else {
        // Ocultar el formulario de inicio de sesión
        frmLogin.outerHTML = '';
        
        // Mostrar el contenido y configurar sessionStorage
        document.getElementById("sitio").classList.remove('d-none');
        sessionStorage.setItem('usuarioId', usuarioId);
        sessionStorage.setItem('usuarioActivo', usuarioActivo);
        sessionStorage.setItem('usuarioFoto', usuarioFoto);
        
        // Establecer la autenticación del usuario
        setUsuarioAutenticado(true); 
        
        // Redireccionar al home
        window.location.href = "#/home";
    }

}




function validarForm(e) {

    return true;
  
}

function mostrarMensaje(msj) {
    alert(msj);
}


function setUsuarioAutenticado(booleano) {

    sessionStorage.setItem('autenticado', booleano);

}
function getUsuarioAutenticado() {

    return (sessionStorage.getItem('autenticado') === "true") ;


}

function logout(){
    setUsuarioAutenticado(false);
    window.location.replace("index.html")
}
