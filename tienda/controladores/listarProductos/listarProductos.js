import { categoriasServices } from "../../../servicios/categorias-servicios.js";
import { productosServices } from "../../../servicios/productos-servicios.js";

function htmlCategoria(id, categoria) {
    /*ESTA FUNCION RECIBE DOS PARAMETROS ID Y CATEGORIA*/
    /*EN ESTA SE GENERA UNA CADENA DE CARACTERES CON EL CODIGO HTML CORRESPONDIENTE A LA CATEGORIA (ESTA EN ASSETS/MODULOS/listarProducto.html)*/
    /*SE DEBERÁ CONCATENAR PARA INCORPORAR EL id DE LA CATEGORIA AL ATRIBUTO data-idCategoria  */
    /*Y ADEMAS REEMPLAZAR EL TEXTO Nombre de Categoría POR EL VALOR QUE LLEGA AL PARAMETRO CATEGORIA DE LA FUNCION*/
    /*POR ULTIMO, LA FUNCION DEVOLVERA LA CADENA RESULTANTE*/   
    let cad =
        `<div class="categorias" data-idCategoria="${id}">
            <h1 class="categoria mt-5">${categoria}</h1>
            <hr class="mb-5">
            <div class="productos">
                <!-- Acá listan los productos-->
                <p class="item-producto">Sin productos.</p>
            </div>
        </div>`;

    return cad;
}

function htmlItemProducto(id, imagen, nombre, precio) {
    /**1- ESTA FUNCION RECIBE COMO PARAMETRO los siguiente datos id, imagen, nombre y precio del producto */
    /**2- A ESTOS PARAMETROS LOS CONCATENA DENTRO DEL CODIGO CORRESPONDIENTE AL COMPONENTE itemProducto ( ASSETS/MODULOS/itemProducto.html)*/
    /**3- POR ULTIMO DEVUELVE LA CADENA RESULTANTE. */
    /**4- SE RECUERDA QUE PARA PODER HACER LA INTERPOLACION DE CADENAS ${NOMBRE_VARIABLE} EL TEXTO DEBE ESTAR ENTRE LAS COMILLAS ` `. 
     *  
     *  ejemplo
     *   let titulo = 'Señora';  
     *   let cadena = `Hola, ${titulo} Claudia  en que podemos ayudarla`;
     *   
    */
    
    let cad =
        `
        
        <div class="card mt-5" style="width: 25rem;">
        <img src="${imagen}" class="card-img-top " alt="${nombre}" width="200" height="200" >
        <div class="card-body text-center">
            <h5 class="card-title fs-3 text-start">${nombre}</h5>
            <p class="card-text fs-5 fw-bold my-5 text-start">${parseFloat(precio).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
            <a href="?idProducto=${id}#vistaProducto" type="button" class="producto_enlace text-decoration-none">Ver producto</a>
        </div>
        </div>
        `;

    return cad;
}

async function asignarProducto(id, listaProductos) {
     /*1- ESTA FUNCION DEBERA CONSULTAR EN EL API-REST TODOS LOS PRODUCTOS PERTENECIENTES A LA CATEGORIA CON CODIGO ID  */
    /*2- HACER UN BUCLE CON EL RESULTADO DE LA CONSULTA Y RECORRELO PRODUCTO POR PRODUCTO*/
    /*3- EN EL INTERIOR DEL BUCLE DEBERA LLAMAR A LA FUNCION htmlItemProducto y acumular su resultado en una cadena de caracteres */
    /*4- LUEGO DEL BUCLE Y CON LA CADENA RESULTANTE SE DEBE CAPTURAR EL ELEMENTO DEL DOM PARA ASIGNAR ESTOS PRODUCTOS DENTRO DE LA CATEGORIA CORRESPONDIENTE */
    /*5- PARA ELLO PODEMOS HACER USO DE UN SELECTOR CSS QUE SELECCIONE EL ATRIBUTO data-idCategoria=X, Ó LA CLASE .productos  .SIENDO X EL VALOR LA CATEGORIA EN CUESTION.*/ 

    
    try {
        // Cadena que acumulará el HTML de los productos
        let cad = "";
        
        // Consulta los productos por categoría desde el servicio
        let resProd = await productosServices.listarPorCategoria(id);

        // Recorre la lista de productos y construye la cadena HTML
        resProd.forEach(producto => {
            cad += htmlItemProducto(producto.id, producto.foto, producto.nombre, producto.precio);
        });

        // Busca el elemento dentro de listaProductos con el atributo data-idCategoria igual a id y la clase .productos
        let itemProducto = listaProductos.querySelector("[data-idCategoria='" + id + "'] .productos");

        // Verifica si el elemento fue encontrado
        if (itemProducto) {
            // Asigna la cadena HTML al contenido del elemento
            itemProducto.innerHTML = cad;
        } else {
            // Muestra un mensaje de error si el elemento no se encuentra
            console.error("El elemento no se encontró en el documento.");
        }
    } catch (error) {
        // Maneja cualquier error ocurrido durante la ejecución
        console.error("Error al asignar productos:", error);
    }
}

export async function listarProductos() {
    /************************** .
     /* 1- ESTA FUNCION DEBERA SELECCIONAR DESDE DEL DOM  LA CLASE .seccionProductos. */
     /* 2- DEBERÁ CONSULTAR LA API-REST PARA TRAER LAS CATEGORIAS Y  CONSTRUIR UN BUCLE PARA RECORRERLAS UNA A UNA. */
     /* 3- EN EL INTERIOR DE ESTE BUCLE LLAMARA A LA FUNCION htmlCategoria PARA ASIGNAR EL NOMBRE DE LA CATEGORIA Y SU ID*/
     /* 4- SE DEBERA ASIGNAR EL RESULTADO DE FUNCION ANTERIOR AL ELEMENTO DEL DOM .seccionProductos */
     /* 5- LUEGO DEBERÁ LLAMAR UNA FUNCION, asignarProducto, QUE RECIBA COMO PARAMETRO EL ID DE LA CATEGORIA  */
     /* 6- FIN DEL BUCLE Y FIN DE LA FUNCION */   


    try {
        // Accede al objeto 'document' del navegador
        let d = document;
    
        // Variable para almacenar la respuesta de la lista de categorías
        let resCat;
    
        // Selecciona el elemento con la clase 'seccionProductos' en el DOM
        let listaProductos = d.querySelector(".seccionProductos");
    
        // Vacía el contenido de la lista de productos
        listaProductos.innerHTML = "";
    
        // Obtiene la lista de categorías desde el servicio
        resCat = await categoriasServices.listar();
    
        // Recorre la lista de categorías
        for (const element of resCat) {
            // Agrega el HTML de la categoría al contenido de la lista de productos
            listaProductos.innerHTML += htmlCategoria(element.id, element.nombre);
    
            // Asigna productos a la categoría actual
            await asignarProducto(element.id, listaProductos);
        }
    } catch (error) {
        // Maneja cualquier error ocurrido durante la ejecución
        console.error("Error al listar productos:", error);
    }
    
}
