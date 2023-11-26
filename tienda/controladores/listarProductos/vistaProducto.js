/**ESTE COMPONENTE SE ENCARGA DE MOSTRAR EL DETALLE DE UN PRODUCTO */
import { productosServices } from "../../../servicios/productos-servicios.js";
import { ventasServices } from "../../../servicios/ventas-servicios.js";
import { getUsuarioAutenticado } from "../login/login.js";

export async function vistaProducto(){
    /**1-En esta función se deben capturar los elementos html: .carrusel, .seccionProducto, .seccionLogin. Para luego 
     * blanquear su contenido. 
     * 2-Se deberá capturar el elemento .vistaProducto.
     * 3-Se deberá llamar a la función leerParametro para recuperar de la url el idProducto. 
     * 4-Luego se deberán leer los datos del producto indentificado con el idProducto recuperado.
     * 5-Llamar a la función htmlVistaProducto.
     * 6-El resultado de la función deberá asignarse al elemento .vistaProducto capturado previamente.
     * 7-Se deberá capturar el elemento html correspondiente al anchor btnComprar y enlazar el evento click a la función registrarCompra.  
    */
    // Accede al objeto 'document' del navegador
    let d = document; 

    // Variable para almacenar la respuesta del servicio
    let res; 

    // Selecciona el elemento con la clase 'carrusel' en el DOM
    let carrusel = d.querySelector(".carrusel");

    // Selecciona el elemento con la clase 'seccionProductos' en el DOM
    let seccionProductos = d.querySelector(".seccionProductos");

    // Selecciona el elemento con la clase 'vistaProducto' en el DOM
    let vistaProducto = d.querySelector(".vistaProducto");

    // Vacía el contenido de los elementos HTML
    carrusel.innerHTML = "";
    let seccionLogin = d.querySelector(".seccionLogin");
    seccionLogin.innerHTML = "";
    seccionProductos.innerHTML = "";

    // Obtiene el valor del parámetro 'idProducto' de la URL
    let idProducto = leerParametro();

    // Obtiene la información del producto desde el servicio
    res = await productosServices.listar(idProducto);

    // Actualiza la vista del producto con la información obtenida
    vistaProducto.innerHTML = htmlVistaProducto(res.id, res.nombre, res.descripcion, res.precio, res.foto);

    // Captura los elementos del DOM correspondientes a cantidadProducto y precioProducto
    let cantidadProducto = d.getElementById("cantidadProducto");
    let precioProducto = d.getElementById("precioProducto");

    // Agrega un oyente de eventos al elemento cantidadProducto para actualizar el precio en tiempo real
    cantidadProducto.addEventListener("input", function() {
        // Manejador del evento input
        actualizarPrecio(parseInt(cantidadProducto.value), parseFloat(res.precio), precioProducto);
    });

    // Captura el elemento del DOM correspondiente al botón de comprar
    let btnComprar = d.getElementById("btnComprar");

    // Agrega un oyente de eventos al botón de comprar para manejar la acción de compra
    btnComprar.addEventListener("click", registrarCompra);

}

function actualizarPrecio(cantidad, precioUnitario, elementoPrecio) {
    // Calcula el nuevo precio y actualiza el elemento en el DOM
    const nuevoPrecio = cantidad * precioUnitario;
    elementoPrecio.textContent = `${nuevoPrecio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}`;
}


function htmlVistaProducto(id, nombre, descripcion, precio, imagen) {
    /**1- ESTA FUNCION RECIBE COMO PARAMETRO los siguiente datos id, nombre, descripcion, precio e imagen del producto */
    /**2- A ESTOS PARAMETROS LOS CONCATENA DENTRO DEL CODIGO CORRESPONDIENTE AL COMPONENTE vistaProducto ( ASSETS/MODULOS/vistaProducto.html)*/
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
            
            <div class="row p-5">
                <div class="col-lg-8 col-sm-12 my-5  ">
                  <div class="card text-center p-5  d-block">
                    <img src="${imagen}" alt="producto" height="300" width="300">
                    <h2 class="bg-white text-start mt-5 overflow-hidden rounded">Descripción</h2>
                    <hr class="bg-white">
                    <p id="descripcionProducto">${descripcion}</p>
                  </div>
                </div>
                <div class="col-lg-4 col-sm-12 my-5 ">
                    <div class="card  d-block  p-5 text-start">
                        <h1 id="nameProducto" data-idProducto=${id}>${nombre}</h1>
                        
                        <label class="mt-5 me-5" for="cantidadProducto">Cantidad:</label>
                        <div class="input-group">
                            <input type="number" step="1" min ="1" value="1" id="cantidadProducto" class="form-control me-5" placeholder="Username" aria-describedby="basic-addon1">
                        </div>
                        
                        <div class="d-flex flew-row align-items-center bg-white ">
                        
                            <p class="bg-white me-5 pt-5 text-nowrap">Total</p>
                            <h2 id="precioProducto" class=" mt-5 bg-white text-start pb-2 overflow-hidden"> ${precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} </h2>
                        </div>
                        <div class="text-center">
                            <a id="btnComprar" type="button" class="btn btn-primary mt-5" style="width: 100%;">Comprar</a>
                        </div>
                    </div>
                </div>
            </div>
      
            
            `;
    return cad; 
    
}
function leerParametro(){
    // Captura el idProducto de la dirección URL enviada por la página que llama
    const words = new URLSearchParams(window.location.search);
    let cad = words.get("idProducto");
    if (!cad) return null;
    return cad.trim();
}


function registrarCompra(){
    /**1-Esta función es la encargada de procesar el evento click del anchor btnComprar.
     * 2-Luego deberá recuperar con la función getUsuarioAutenticado presente en el módulo login.js el objeto session
     * 3-Si la propiedad autenticado del objeto session es falso, el usuario no ha iniciado sesión, y se deberá emitir 
     *   una alerta que comunique al usuario que antes de realizar una compra debe haber iniciado sesión y salir de la 
     * ejecución de la función.
     * 4-Si la propiedad autenticado es true la ejecución continua.
     * 5-En este punto se deben almacenar los datos necesario para registrar la venta.
     * 5-Necesitamos idUsuario, emailUsuario, idProducto, nameProducto, cantidad y fecha.
     * 6-Los dos primeros los extraemos del objeto session.
     * 7-El resto de los datos los capturamos desde el objeto document utilizando los id: nameProducto, cantidadProducto. 
     *   El idProducto lo recuperamos desde el atributo data-idproducto y a fecha la obtenemos desde la fecha del sistema con
     *   el objeto Date() de javascript.
     * 8-Una vez reunido todos los datos necesarios llamamos a la función ventasServices.crear pasando lo parámetros obtenidos. 
     * 9-Luego de registrar la venta utilizando el objeto location.replace("tienda.html") renderizamos nuevamente la página 
     *   dejando el sitio en el estado inicial.
     * 10-Finalmente emitimos una alerta con la leyenda "Compra finalizada."
     *     
     */

    
    // Accede al objeto 'document' del navegador
    let d = document;

    // Obtiene la información de sesión del usuario autenticado
    let session = getUsuarioAutenticado();

    // Verifica si el usuario está autenticado
    if (!session.autenticado) {
        // Muestra una alerta si el usuario no ha iniciado sesión
        alert("Antes de comprar debe iniciar sesión");
        // Sale de la función
        return;
    }

    // Captura la cantidad de productos seleccionada por el usuario
    let cantidad = d.getElementById("cantidadProducto").value;

    // Obtiene el id del usuario y su dirección de correo electrónico desde la información de sesión
    let idUsuario = session.idUsuario;
    let emailUsuario = session.email;

    // Captura el nombre del producto desde el elemento con id 'nameProducto' en el DOM
    let nameProducto = d.getElementById("nameProducto");

    // Obtiene el id del producto desde el atributo 'data-idproducto' del elemento nameProducto
    let idProducto = nameProducto.getAttribute("data-idproducto");

    // Obtiene la fecha actual
    const fecha = new Date();

    // Llama al servicio de ventas para registrar la compra
    ventasServices.crear(idUsuario, emailUsuario, idProducto, nameProducto.textContent, cantidad, fecha, 0);

    // Redirige a la página 'tienda.html'
    location.replace("tienda.html");

    // Muestra una alerta indicando que la compra se ha realizado
    alert("Compra realizada");

}