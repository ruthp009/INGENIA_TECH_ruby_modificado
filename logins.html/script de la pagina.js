const container = document.getElementById("container");

function mostrarRegistro(){
container.classList.add("active");
}

function mostrarLogin(){
container.classList.remove("active");
}

function togglePassword(id){
const pass = document.getElementById(id);

pass.type =
pass.type === "password"
? "text"
: "password";
}

function iniciarSesion(){
    window.location.href = "pelotita saltarina.html";
}