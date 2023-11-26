import { ventasServices } from "../../servicios/ventas-servicios.js";

const htmlVentas = 
`<div class="card">
   <div class="card-header">
   
   <h3 class="card-title"> 
      
   </h3>

   </div>

   <!-- /.card-header -->
   <div class="card-body">            
   <table id="ventasTable" class="table table-bordered table-striped tableVenta" width="100%">
       <thead>
           <tr>
           <th># </th>
           <th>Email</th>
           <th>Producto</th>
           <th>Cantidad</th>
           <th>Fecha</th>
           <th>Despachado</th>
           </tr>
       </thead>
   
   </table>
   </div>
   <!-- /.card-body -->
</div> `; 

export async function Ventas(){
    // Obtener el documento
    let d = document;

    // Variable para almacenar el contenido HTML
    let res = '';

    // Configurar el título y la ruta del menú
    d.querySelector('.contenidoTitulo').innerHTML = 'Ventas';
    d.querySelector('.contenidoTituloSec').innerHTML = '';
    d.querySelector('.rutaMenu').innerHTML = "Ventas";
    d.querySelector('.rutaMenu').setAttribute('href', "#/ventas");

    // Obtener el contenedor principal
    let cP = d.getElementById('contenidoPrincipal');

    // Obtener la lista de ventas
    res = await ventasServices.listar();

    // Agregar el checkbox en la tabla para marcar los pedidos despachados
    res.forEach(element => {
        let estado = '';
        if (element.despachado == true) 
            estado = "checked"; // Estado en HTML para que el checkbox se muestre con el tilde. 
        element.action = `<input type="checkbox" class="ckboxDespachado" data-idVenta=${element.id} ${estado} >`;
    });  

    // Asignar el contenido HTML al contenedor principal
    cP.innerHTML =  htmlVentas;

    // Llenar la tabla con los datos de ventas
    llenarTabla(res);

    // Obtener todos los checkboxes de despacho
    let chkBoxDespachado = d.querySelectorAll(".ckboxDespachado");

    // Agregar un evento de cambio a cada checkbox
    for(let i = 0; i < chkBoxDespachado.length; i++) {
        chkBoxDespachado[i].addEventListener("change", chkBoxChange);
    }

}


function chkBoxChange(event){
    // Obtener el id de la venta desde el elemento actual
    let id = this.getAttribute('data-idVenta');

    // Obtener el estado del checkbox (marcado o no)
    let check = event.target.checked;

    // Llamar a la función editar de ventasServices para actualizar el estado de despacho
    ventasServices.editar(id, check);    
}


function llenarTabla(res){ 
    
    new DataTable('#ventasTable', {
        responsive:true,
        data : res,
        columns: [
            { data: 'id' },    
            { data: 'emailUsuario' },
            { data: 'nombreProducto' },
            { data: 'cantidad' },
            { data: 'fecha' },
            { data: 'action', 'orderable': false},
            
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
  