// CAMBIAR A REGISTRO
const container = document.getElementById('container');

function mostrarRegistro(){
    container.classList.add('active');
}

// VOLVER A LOGIN
function mostrarLogin(){
    container.classList.remove('active');
}

// MOSTRAR U OCULTAR CONTRASEÑA
function togglePassword(id){
    const pass = document.getElementById(id);
    pass.type = pass.type === 'password' ? 'text' : 'password';
}

// REDIRECCION AL JUEGO
function iniciarSesion(){
    window.location.href = 'pelotita saltarina.html';
}

// REGISTRO DE USUARIO
async function registrarUsuario(){
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;

    if(!nombre || !correo){
        alert('Complete todos los campos');
        return;
    }

    try{
        const respuesta = await fetch('/registrar',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({nombre,email:correo})
        });

        const datos = await respuesta.json();
        alert(datos.mensaje);
    }catch(error){
        alert('Error al registrar usuario');
        console.error(error);
    }
}
