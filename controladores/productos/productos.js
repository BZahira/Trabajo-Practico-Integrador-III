import { productosServices } from "../../servicios/productos-servicios.js";
import { newRegister } from "./new.js";
import { editRegister } from "./new.js";



const htmlProductos = 
`<div class="card">
   <div class="card-header">
   
   <h3 class="card-title"> 
       <a class="btn bg-dark btn-sm btnAgregarProducto" href="#/newProducto">Agregar Producto</a>
   </h3>

   </div>

   <!-- /.card-header -->
   <div class="card-body">            
   <table id="productosTable" class="table table-bordered table-striped tableProducto" width="100%">
       <thead>
           <tr>
           <th># </th>
           <th>Nombre</th>
           <th>Precio</th>
           <th>Categoria</th>
           <th>Acciones</th>
           </tr>
       </thead>
   
   </table>
   </div>
   <!-- /.card-body -->
</div> `; 

export async function Productos(){
    // Captura el elemento document
    let d = document;

    // Variable para almacenar la respuesta del servicio
    let res = '';

    // Establece el título, la ruta del menú y el enlace de la ruta para la página de Productos
    d.querySelector('.contenidoTitulo').innerHTML = 'Productos';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Productos";
    d.querySelector('.rutaMenu').setAttribute('href', "#/productos");

    // Captura el contenido principal
    let cP = d.getElementById('contenidoPrincipal');

    // Obtiene la lista de productos desde el servicio
    res = await productosServices.listar();

    // Agrega acciones (botones de editar y borrar) a cada elemento de la lista de productos
    res.forEach(element => {
    element.action = "<div class='btn-group'><a class='btn btn-warning btn-sm mr-1 rounded-circle btnEditarProducto'  href='#/editProducto' data-idProducto='" + element.id + "'> <i class='fas fa-pencil-alt'></i></a><a class='btn btn-danger btn-sm rounded-circle removeItem btnBorrarProducto'href='#/delProducto' data-idProducto='" + element.id + "'><i class='fas fa-trash'></i></a></div>";
    });

    // Asigna el contenido y la estructura HTML para la página de Productos
    cP.innerHTML =  htmlProductos;

    // Llena la tabla con los datos de la lista de productos
    llenarTabla(res);

    // Captura los botones de agregar, editar y borrar
    let btnAgregar = d.querySelector(".btnAgregarProducto");
    let btnEditar = d.querySelectorAll(".btnEditarProducto");
    let btnBorrar = d.querySelectorAll(".btnBorrarProducto");

    // Asigna eventos a los botones de agregar, editar y borrar
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
    // Captura el valor del atributo data-idProducto del elemento que desencadenó el evento
    let id = this.getAttribute('data-idProducto');

    // Llama a la función editRegister pasando el id como parámetro
    editRegister(id);
}

async function borrar(){
    // Captura el valor del atributo data-idProducto del elemento que desencadenó el evento
    let id = this.getAttribute('data-idProducto');

    // Variable para determinar si se debe realizar la eliminación o no
    let borrar = 0;

    // Muestra un cuadro de diálogo de confirmación usando la biblioteca Swal
    await Swal.fire({
        title: 'Está seguro que desea eliminar el registro?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: 'Cancelar',
        focusDeny: true
    }).then((result) => {
        // Se ejecuta después de que el usuario responde al cuadro de diálogo
        if (result.isConfirmed) {
            borrar = 1;
        } else if (result.isDenied) {
            borrar = 0;
            Swal.fire('Se canceló la eliminación', '', 'info');
        }
    });

    // Verifica si se confirmó la eliminación y realiza la acción correspondiente
    if (borrar === 1) {
        await productosServices.borrar(id);
    }

    // Redirecciona a la página de productos
    window.location.href = "#/productos";

}

function llenarTabla(res){ 
   

    new DataTable('#productosTable', {
        responsive:true,
        data : res,
        columns: [
            { data: 'id' },    
            { data: 'nombre' },
            { data: 'precio' },
            { data: 'categoria' },
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
  