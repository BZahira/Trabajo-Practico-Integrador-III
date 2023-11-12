import { categoriasServicios } from "/servicios/categorias-servicios.js";


const htmlAmCategorias = `
<div class="card card-dark card-outline">

	<form  class="needs-validation frmAmCategoria"  enctype="multipart/form-data">
	
		<div class="card-header">
               
			<div class="col-md-8 offset-md-2">	
               
				<!--=====================================
                Nombre
                ======================================-->
				
				<div class="form-group mt-5">
					
					<label>Nombre</label>

					<input 
					type="text" 
					class="form-control"
					pattern="[A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,}"
					onchange="validateJS(event,'text')"
					name="nombre"
                    id="categoriaNombre"
					required>

					<div class="valid-feedback">Valid.</div>
            		<div class="invalid-feedback">Please fill out this field.</div>

				</div>
			
			</div>
		

		</div>

		<div class="card-footer">
			
			<div class="col-md-8 offset-md-2">
	
				<div class="form-group mt-3">

					<a href="#/usuarios" class="btn btn-light border text-left">Cancelar</a>
					
					<button type="submit" class="btn bg-dark float-right">Guardar</button>

				</div>

			</div>

		</div>


	</form>


</div> `;
var formulario='';
var txtNombre='';
var idCategoria;

export async function newRegister(){
    let d = document;
    
    d.querySelector('.contenidoTitulo').innerHTML = 'Agregar Categoria';
   
    crearFormulario();

    formulario = d.querySelector(".frmAmCategoria")
    formulario.addEventListener("submit", guardar);
}

export async function editRegister(id){
    let d = document;
    idCategoria = id;
    d.querySelector('.contenidoTitulo').innerHTML = 'Editar Categoria';
   
    crearFormulario();

    formulario = d.querySelector(".frmAmCategoria")
    formulario.addEventListener("submit", modificar);
    let categoria =  await categoriasServicios.listar(id);

    
    txtNombre.value= categoria.nombre;
}

function crearFormulario(){
    let d = document;
    d.querySelector('.rutaMenu').innerHTML = "Categorias";
    d.querySelector('.rutaMenu').setAttribute('href',"#/categorias");

    let cP =d.getElementById('contenidoPrincipal');
    cP.innerHTML =  htmlAmCategorias;
    
    var script = document.createElement( "script" );
    script.type = "text/javascript";
    script.src = '../controladores/validaciones.js';
    cP.appendChild(script);
    
    txtNombre= d.getElementById('categoriaNombre');


}

function guardar(e) {
   
    e.preventDefault();
   
    categoriasServicios.crear(txtNombre.value)
        .then(respuesta => {

            formulario.reset();
            window.location.href = "#/categorias";

        })
        .catch(error => console.log(error))        

}    

function modificar(e) {
   
    e.preventDefault();
   
    categoriasServicios.editar(idCategoria, txtNombre.value)
        .then(respuesta => {

            formulario.reset();
            window.location.href = "#/categorias";

        })
        .catch(error => console.log(error))        

}   