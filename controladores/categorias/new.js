import { categoriasServices } from "/servicios/categorias-servicios.js";


const htmlAmCategorias = `
<div class="card card-dark card-outline">

	<form  class="needs-validation frmAmCategoria"  enctype="multipart/form-data">
	
		<div class="card-header">
               
			<div class="col-md-8 offset-md-2">	
               
				<!--=====================================
                Descripcion
                ======================================-->
				
				<div class="form-group mt-5">
					
					<label>Categoría</label>

					<input 
					type="text" 
					class="form-control"
					onchange="validateJS(event,'t&n')"
					name="descripcion"
                    id="categoriaDescripcion"
					required>

					<div class="valid-feedback">Valid.</div>
            		<div class="invalid-feedback">Please fill out this field.</div>

				</div>			
			</div>
		</div>

		<div class="card-footer">			
			<div class="col-md-8 offset-md-2">	
				<div class="form-group mt-3">
					<a href="#/categorias" class="btn btn-light border text-left">Cancelar</a>					
					<button type="submit" class="btn bg-dark float-right">Guardar</button>
				</div>
			</div>
		</div>
	</form>
</div> `;
var formulario='';
var txtDescripcion='';

var idCategoria;

export async function newRegister(){
    // Accede al objeto 'document' del navegador
    let d = document;

    // Modifica el contenido de elementos HTML relacionados con el título y la sección secundaria
    d.querySelectorAll('.contenidoTitulo').innerHTML = 'Agregar Categoria';
    d.querySelector('.contenidoTituloSec').innerHTML += 'Agregar';

    // Llama a la función 'crearFormulario' para generar un formulario en la interfaz de usuario
    crearFormulario();

    // Captura el formulario generado
    formulario = d.querySelector(".frmAmCategoria");

    // Agrega un oyente de eventos al formulario para el evento 'submit', que llama a la función 'guardar'
    formulario.addEventListener("submit", guardar);

}

export async function editRegister(id){
    // Accede al objeto 'document' del navegador
    let d = document;

    // Asigna el valor de 'id' a la variable 'idCategoria'
    idCategoria = id;

    // Modifica el contenido de elementos HTML relacionados con el título y la sección secundaria
    d.querySelector('.contenidoTitulo').innerHTML = 'Editar Categoria';
    d.querySelector('.contenidoTituloSec').innerHTML += 'Editar';

    // Llama a la función 'crearFormulario' para generar un formulario en la interfaz de usuario
    crearFormulario();

    // Captura el formulario generado
    formulario = d.querySelector(".frmAmCategoria");

    // Agrega un oyente de eventos al formulario para el evento 'submit', que llama a la función 'modificar'
    formulario.addEventListener("submit", modificar);

    // Consulta la información de la categoría con el id proporcionado y espera la respuesta
    let categoria = await categoriasServices.listar(id);

    // Asigna el valor de la descripción de la categoría al campo de texto con id 'txtDescripcion'
    txtDescripcion.value = categoria.descripcion;
}

function crearFormulario(){
    // Accede al objeto 'document' del navegador
    let d = document;

    // Modifica el contenido y atributos de un elemento HTML relacionado con la ruta del menú
    d.querySelector('.rutaMenu').innerHTML = "Categorias";
    d.querySelector('.rutaMenu').setAttribute('href',"#/categorias");

    // Captura el elemento con id 'contenidoPrincipal'
    let cP = d.getElementById('contenidoPrincipal');

    // Modifica el contenido de 'cP' con el valor de 'htmlAmCategorias'
    cP.innerHTML = htmlAmCategorias;

    // Crea un elemento 'script' y establece sus atributos (tipo y fuente del script)
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = '../controladores/validaciones.js';

    // Agrega el elemento 'script' como hijo de 'cP'
    cP.appendChild(script);

    // Captura el elemento con id 'categoriaDescripcion' y lo asigna a la variable 'txtDescripcion'
    txtDescripcion = d.getElementById('categoriaDescripcion');
}

function guardar(e) {
   
    // Evita que se ejecute el comportamiento predeterminado del evento (en este caso, la acción de enviar el formulario)
    e.preventDefault();

    // Llama a la función 'crear' del servicio de categorías con el valor del campo de texto 'txtDescripcion'
    categoriasServices.crear(txtDescripcion.value)
        .then(respuesta => {
            // En caso de éxito, resetea el formulario y redirige a la página de categorías
            formulario.reset();
            window.location.href = "#/categorias";
        })
        .catch(error => {
            // En caso de error, maneja el error (puede imprimirlo en la consola o realizar otras acciones)
            console.error(error);
        });
}    

function modificar(e) {
   
    // Evita que se ejecute el comportamiento predeterminado del evento (en este caso, la acción de enviar el formulario)
    e.preventDefault();

    // Llama a la función 'editar' del servicio de categorías con el id de la categoría y el nuevo valor de 'txtDescripcion'
    categoriasServices.editar(idCategoria, txtDescripcion.value)
        .then(respuesta => {
            // En caso de éxito, resetea el formulario y redirige a la página de categorías
            formulario.reset();
            window.location.href = "#/categorias";
        })
        .catch(error => {
            // En caso de error, maneja el error (puede imprimirlo en la consola o realizar otras acciones)
            console.error(error);
        });
}   