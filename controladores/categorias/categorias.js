import { categoriasServices } from "../../servicios/categorias-servicios.js";
import { newRegister } from "./new.js";
import { editRegister } from "./new.js";



const htmlCategorias = 
`<div class="card">
   <div class="card-header">
   
   <h3 class="card-title"> 
       <a class="btn bg-dark btn-sm btnAgregarCategoria" href="#/newCategoria">Agregar Categoria</a>
   </h3>

   </div>

   <!-- /.card-header -->
   <div class="card-body">            
   <table id="categoriasTable" class="table table-bordered table-striped tableCategoria" width="100%">
       <thead>
           <tr>
           <th># </th>
           <th>Categorias</th>
           <th>Acciones</th>
           </tr>
       </thead>
   
   </table>
   </div>
   <!-- /.card-body -->
</div> `; 

export async function Categorias(){
    // Accede al objeto 'document' del navegador
    let d = document;

    // Variable para almacenar la respuesta del servicio
    let res = '';

    // Modifica el contenido de elementos HTML relacionados con la visualización de categorías
    d.querySelector('.contenidoTitulo').innerHTML = 'Categorías';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Categorías";
    d.querySelector('.rutaMenu').setAttribute('href', "#/categorias");
    let cP = d.getElementById('contenidoPrincipal');

    // Obtiene la lista de categorías del servicio
    res = await categoriasServices.listar();

    // Agrega un botón de acción (editar y borrar) a cada elemento de la lista de categorías
    res.forEach(element => {
    element.action = "<div class='btn-group'><a class='btn btn-warning btn-sm mr-1 rounded-circle btnEditarCategoria'  href='#/editCategoria' data-idCategoria='" + element.id + "'> <i class='fas fa-pencil-alt'></i></a><a class='btn btn-danger btn-sm rounded-circle removeItem btnBorrarCategoria'href='#/delCategoria' data-idCategoria='" + element.id + "'><i class='fas fa-trash'></i></a></div>";
    });

    // Actualiza el contenido del elemento con id 'contenidoPrincipal' con el HTML de categorías
    cP.innerHTML = htmlCategorias;

    // Llena la tabla con las categorías
    llenarTabla(res);

    // Captura elementos del DOM relacionados con la interfaz de usuario
    let btnAgregar = d.querySelector(".btnAgregarCategoria");
    let btnEditar = d.querySelectorAll(".btnEditarCategoria");
    let btnBorrar = d.querySelectorAll(".btnBorrarCategoria");

    // Agrega oyentes de eventos a los botones
    btnAgregar.addEventListener("click", agregar);
    for (let i = 0; i < btnEditar.length; i++) {
        btnEditar[i].addEventListener("click", editar);
        btnBorrar[i].addEventListener("click", borrar);
    }


}

function agregar(){
    newRegister();
}

function editar(){
    // Captura el valor del atributo 'data-idCategoria' del elemento actual
    let id = this.getAttribute('data-idCategoria');

    // Llama a la función 'editRegister' pasando el id como parámetro
    editRegister(id);

}

async function borrar(){
    // Captura el valor del atributo 'data-idCategoria' del elemento actual
    let id = this.getAttribute('data-idCategoria');

    // Variable para indicar si se confirmó la eliminación (1) o se canceló (0)
    let borrar = 0;

    // Muestra un cuadro de diálogo de confirmación utilizando la biblioteca SweetAlert
    await Swal.fire({
        title: 'Está seguro que desea eliminar el registro?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `Cancelar`,
        focusDeny: true
    }).then((result) => {
        // Verifica la decisión del usuario
        if (result.isConfirmed) {
            // Si el usuario hizo clic en "Si", actualiza la variable 'borrar' a 1
            borrar = 1;
        } else if (result.isDenied) {
            // Si el usuario hizo clic en "Cancelar", actualiza la variable 'borrar' a 0
            borrar = 0;
            // Muestra un mensaje informativo
            Swal.fire('Se canceló la eliminación', '', 'info');
        }
    });

    // Si la eliminación fue confirmada (borrar es igual a 1), llama al servicio para borrar la categoría
    if (borrar === 1)
        await categoriasServices.borrar(id);

    // Redirige a la página de categorías después de realizar la eliminación
    window.location.href = "#/categorias";

}

function llenarTabla(res){ 
    
    new DataTable('#categoriasTable', {
        responsive:true,
        data : res,
        columns: [
            { data: 'id' },    
            { data: 'nombre' },
            { data: 'action', "orderable":false }
            
        ],
        deferRender: true,
        retrive: true,
        processing: true,
        language: {
            sProcessing:     "Procesando...",
            sLengthMenu:     "Mostrar _MENU_ registros",
            sZeroRecords:    "No se encontraron resultados",
            sEmptyTable:     "Ningún dato disponible en esta tabla",
            sInfo:           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
            sInfoEmpty:      "Mostrando registros del 0 al 0 de un total de 0",
            sInfoFiltered:   "(filtrado de un total de _MAX_ registros)",
            sInfoPostFix:    "",
            sSearch:         "Buscar:",
            sUrl:            "",
            sInfoThousands:  ",",
            sLoadingRecords: "Cargando...",
            oPaginate: {
                sFirst:    "Primero",
                sLast:     "Último",
                sNext:     "Siguiente",
                sPrevious: "Anterior"
            },
            oAria: {
                sSortAscending:  ": Activar para ordenar la columna de manera ascendente",
                sSortDescending: ": Activar para ordenar la columna de manera descendente"
            }
                            
        }                           
    });

} 
  