const url = "https://65503ff17d203ab6626da4de.mockapi.io/category";

//API-REST USUARIOS//

async function listar(id) {
    let cadUrl;
    if(isNaN(id))
      cadUrl= url;
    else 
      cadUrl = url + "/" + id;  
    return await fetch(cadUrl)
        .then(respuesta => respuesta.json());
}

async function crear(nombre) {

    return await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre
        })
    })
}

async function editar(id, nombre) {

    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre: nombre

        })
    })
}

async function borrar(id){
  
    let urlPut = url + "/" + id;
    return await fetch(urlPut, {
            method: 'DELETE'
       })
}

export const categoriasServicios = {
    listar,
    crear,
    editar,
    borrar
}