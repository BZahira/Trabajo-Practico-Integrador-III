const htmlCarrusel =
`

    <div id="carouselExample" class="carousel slide">
    <div class="carousel-inner">
        <div class="carousel-item active">
        <img src="/img/slider/imagen1.png" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
        <img src="/img/slider/imagen2.png" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
        <img src="/img/slider/imagen3.png" class="d-block w-100" alt="...">
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
    </div>

` 

export async function Carrusel(){
    // Accedemos al objeto 'document' del navegador
    let d = document;

    // Seleccionamos el elemento con la clase 'carrusel' en el DOM
    let seccionCarrusel = d.querySelector(".carrusel");

    // Seleccionamos el elemento con la clase 'seccionLogin' en el DOM y lo vaciamos
    let seccionLogin = d.querySelector(".seccionLogin");
    seccionLogin.innerHTML = "";

    // Asignamos el contenido de la sección 'carrusel' con el código HTML del carrusel
    seccionCarrusel.innerHTML = htmlCarrusel;
}