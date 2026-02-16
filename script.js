console.log("Script cargado correctamente");
let imagenes = document.querySelectorAll(".galeria img");
let indiceActual = 0;

function abrirCarta() {
    const carta = document.getElementById("carta");
    const botonDescarga = document.getElementById("btnDescargar");

    carta.classList.toggle("activa");
    botonDescarga.classList.toggle("activo");
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

async function descargarCarta() {
    const carta = document.getElementById("carta");
    

    const efectos = document.querySelector(".efectos");
    // Quitar animaciones y efectos
    carta.style.animation = "none";
    carta.style.opacity = "1";
    carta.style.transform = "none";
    carta.style.background = "#ffffff";
    carta.style.color = "#000000";

    efectos.style.display = "none";

    await new Promise(resolve => setTimeout(resolve, 300));

    const canvas = await html2canvas(carta, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
    });

    efectos.style.display = "block";

    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const pdfHeight = 297;

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let yPosition = 0;

    // Primera página
    pdf.addImage(imgData, "PNG", 0, yPosition, imgWidth, imgHeight);

    // Si la imagen es más grande que una hoja
    if (imgHeight > pdfHeight) {
        let remainingHeight = imgHeight - pdfHeight;

        while (remainingHeight > 0) {
            yPosition -= pdfHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, yPosition, imgWidth, imgHeight);
            remainingHeight -= pdfHeight;
        }
    }

    pdf.save("Carta-Para-Mi-Amor.pdf");
}
