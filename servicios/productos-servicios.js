const url = "https://65529c9e5c69a779032a33ea.mockapi.io/product";


async function listar(id) {
    let cadUrl;
    if(isNaN(id))
      cadUrl= url;
    else 
      cadUrl = url + "/" + id;  
    return await fetch(cadUrl)
        .then(respuesta => respuesta.json());
}

async function crear(nombre, categoria, descripcion, foto, precio, idCategoria) {

    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            categoria: categoria,
            descripcion: descripcion,
            foto: foto,
            precio: precio,
            idCategoria: idCategoria
        })
    })
}

async function editar(id, nombre, categoria, descripcion, foto, precio, idCategoria) {

    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre,
            categoria: categoria,
            descripcion: descripcion,
            foto: foto,
            precio: precio,
            idCategoria: idCategoria
        })
    })
}

async function borrar(id){
  
    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
            method: 'DELETE'
       })
}

async function listarPorCategoria(idCategoria) {
    const newUrl= new URL(url);
    newUrl.searchParams.append('idCategoria', idCategoria);
    return await fetch(newUrl)
        .then(respuesta => respuesta.json());
 
}
export const productosServices = {
    listar,
    crear,
    editar,
    borrar,
    listarPorCategoria
}