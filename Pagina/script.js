let imagenes = document.querySelectorAll(".galeria img");
let indiceActual = 0;

function abrirCarta() {
    const carta = document.getElementById("carta");
    

    if (carta.style.display === "none" || carta.style.display === "") {
        carta.style.display = "block";
    } else {
        carta.style.display = "none";
    }
}

function abrirModal(indice) {
    indiceActual = indice;
    actualizarModal();
    document.getElementById("modal").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}

function cambiarFoto(direccion) {
    indiceActual += direccion;

    if (indiceActual < 0) {
        indiceActual = imagenes.length - 1;
    }

    if (indiceActual >= imagenes.length) {
        indiceActual = 0;
    }

    actualizarModal();
}

function actualizarModal() {
    const img = imagenes[indiceActual];
    document.getElementById("modal-img").src = img.src;
    document.getElementById("modal-desc").textContent = img.dataset.descripcion;
}


function iniciarAmbienteRomantico() {
    const contenedor = document.querySelector(".efectos");

    // Corazones constantes
    setInterval(() => {
        crearCorazon(contenedor);
    }, 800);

    // Partículas rosadas
    setInterval(() => {
        crearParticula(contenedor);
    }, 400);

    // Brillitos mágicos
    setInterval(() => {
        crearBrillo(contenedor);
    }, 300);
}

function crearCorazon(contenedor) {
    const corazon = document.createElement("div");
    corazon.classList.add("corazon");
    corazon.innerHTML = "💖";

    corazon.style.left = Math.random() * 100 + "vw";
    corazon.style.fontSize = (12 + Math.random() * 20) + "px";
    corazon.style.animationDuration = (6 + Math.random() * 4) + "s";

    contenedor.appendChild(corazon);

    setTimeout(() => corazon.remove(), 10000);
}

function crearParticula(contenedor) {
    const particula = document.createElement("div");
    particula.classList.add("particula");

    particula.style.left = Math.random() * 100 + "vw";
    particula.style.animationDuration = (8 + Math.random() * 5) + "s";

    contenedor.appendChild(particula);

    setTimeout(() => particula.remove(), 12000);
}

function crearBrillo(contenedor) {
    const brillo = document.createElement("div");
    brillo.classList.add("brillo");

    brillo.style.left = Math.random() * 100 + "vw";
    brillo.style.top = Math.random() * 100 + "vh";

    contenedor.appendChild(brillo);

    setTimeout(() => brillo.remove(), 3000);
}

const pantalla = document.getElementById("pantalla-inicial");

pantalla.addEventListener("click", () => {
    const musica = document.getElementById("musica");
    musica.play();
    pantalla.style.opacity = "0";

    setTimeout(() => {
        pantalla.style.display = "none";
        iniciarAmbienteRomantico(); // activa corazones
    }, 1500);
});



