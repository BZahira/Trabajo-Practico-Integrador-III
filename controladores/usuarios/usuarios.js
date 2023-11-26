import { usuariosServices } from "../../servicios/usuarios-servicios.js";
import { newRegister } from "./new.js";
import { editRegister } from "./new.js";



const htmlUsuarios = 
`<div class="card">
   <div class="card-header">
   
   <h3 class="card-title"> 
       <a class="btn bg-dark btn-sm btnAgregarUsuario" href="#/newUsuario">Agregar Usuario</a>
   </h3>

   </div>

   <!-- /.card-header -->
   <div class="card-body">            
   <table id="usuariosTable" class="table table-bordered table-striped tableUsuario" width="100%">
       <thead>
           <tr>
           <th># </th>
           <th>Apellido</th>
           <th>Nombre</th>
           <th>Correo</th>
           <th>Ciudad</th>
           <th>Acciones</th>
           </tr>
       </thead>
   
   </table>
   </div>
   <!-- /.card-body -->
</div> `; 

export async function Usuarios(){
    let d = document;

    // Configuración del título y la ruta del menú
    d.querySelector('.contenidoTitulo').innerHTML = 'Usuarios';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Usuarios";
    d.querySelector('.rutaMenu').setAttribute('href',"#/usuarios");

    // Obtención del contenedor principal
    let cP = d.getElementById('contenidoPrincipal');

    // Obtención y configuración de la lista de usuarios desde el servicio
    let res = await usuariosServices.listar();
    res.forEach(element => {
    // Agregar acciones de editar y borrar a cada elemento de la lista
    element.action = "<div class='btn-group'><a class='btn btn-warning btn-sm mr-1 rounded-circle btnEditarUsuario'  href='#/editUsuario' data-idUsuario='"+ element.id +"'> <i class='fas fa-pencil-alt'></i></a><a class='btn btn-danger btn-sm rounded-circle removeItem btnBorrarUsuario'href='#/delUsuario' data-idUsuario='"+ element.id +"'><i class='fas fa-trash'></i></a></div>";
    });

    // Llenar la tabla de usuarios con la lista obtenida
    cP.innerHTML =  htmlUsuarios;
    llenarTabla(res);

    // Configuración de los botones de agregar, editar y borrar
    let btnAgregar = d.querySelector(".btnAgregarUsuario");
    let btnEditar = d.querySelectorAll(".btnEditarUsuario");
    let btnBorrar = d.querySelectorAll(".btnBorrarUsuario");

    btnAgregar.addEventListener("click", agregar);
    for(let i=0 ; i< btnEditar.length ; i++){
        btnEditar[i].addEventListener("click", editar);
        btnBorrar[i].addEventListener("click", borrar);
    }

}

function agregar(){
    newRegister();

}
function editar(){
   let id = this.getAttribute('data-idUsuario') ;
   editRegister(id);
    
}

async function borrar(){
    // Obtener el ID del usuario desde el atributo data-idUsuario
    let id = this.getAttribute('data-idUsuario');

    // Variable para confirmar o cancelar el borrado
    let borrar = 0;

    // Mostrar un cuadro de diálogo de confirmación
    await Swal.fire({
        title: 'Está seguro que desea eliminar el registro?',
        showDenyButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `Cancelar`,
        focusDeny: true
    }).then((result) => {
        // Verificar la respuesta del usuario
        if (result.isConfirmed) {
            borrar = 1;  // Confirmado
        } else if (result.isDenied) {
            borrar = 0;  // Cancelado
            Swal.fire('Se canceló la eliminación', '', 'info');
        }
    });

    // Borrar el usuario si la confirmación fue exitosa
    if (borrar === 1) {
        await usuariosServices.borrar(id);
    }

    // Redireccionar a la página de usuarios
    window.location.href = "#/usuarios";
    
}

function llenarTabla(res){ 
   
    new DataTable('#usuariosTable', {
        responsive:true,
        data : res,
        columns: [
            { data: 'id' },    
            { data: 'apellido' },
            { data: 'nombre' },
            { data: 'correo' },
            { data: 'ciudad' },
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
  