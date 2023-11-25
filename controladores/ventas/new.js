import { ventasServices } from "/servicios/ventas-servicios.js";


const htmlAmVentas = `
<div class="card card-dark card-outline">

	<form  class="needs-validation frmAmVentas"  enctype="multipart/form-data">
	
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

					<a href="#/ventas" class="btn btn-light border text-left">Cancelar</a>
					
					<button type="submit" class="btn bg-dark float-right">Guardar</button>

				</div>

			</div>

		</div>


	</form>


</div> `;
var formulario='';
var txtNombre='';
var idVenta;

export async function newRegister(){
    let d = document;
    
    d.querySelector('.contenidoTitulo').innerHTML = 'Agregar Venta';
   
    crearFormulario();

    formulario = d.querySelector(".frmAmVentas")
    formulario.addEventListener("submit", guardar);
}

export async function editRegister(id){
    let d = document;
    idVenta = id;
    d.querySelector('.contenidoTitulo').innerHTML = 'Editar Venta';
   
    crearFormulario();

    formulario = d.querySelector(".frmAmVentas")
    formulario.addEventListener("submit", modificar);
    let ventas =  await ventasServicios.listar(id);

    
    txtNombre.value= ventas.nombre;
}

function crearFormulario(){
    let d = document;
    d.querySelector('.rutaMenu').innerHTML = "Ventas";
    d.querySelector('.rutaMenu').setAttribute('href',"#/ventas");

    let cP =d.getElementById('contenidoPrincipal');
    cP.innerHTML =  htmlAmVentas;
    
    var script = document.createElement( "script" );
    script.type = "text/javascript";
    script.src = '../controladores/validaciones.js';
    cP.appendChild(script);
    
    txtNombre= d.getElementById('ventasNombre');


}

function guardar(e) {
   
    e.preventDefault();
   
    ventasServicios.crear(txtNombre.value)
        .then(respuesta => {

            formulario.reset();
            window.location.href = "#/ventas";

        })
        .catch(error => console.log(error))        

}    

function modificar(e) {
   
    e.preventDefault();
   
    ventasServicios.editar(idVenta, txtNombre.value)
        .then(respuesta => {

            formulario.reset();
            window.location.href = "#/ventas";

        })
        .catch(error => console.log(error))        

}   