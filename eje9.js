window.addEventListener('DOMContentLoaded', fcargar)

let recetas = document.querySelector('#recetas')
let ingredientes = document.querySelector('#ingredientes')
let resultado = document.querySelector('#resultado')
let buscarR = document.querySelector('#buscarR')
let buscarV = document.querySelector('#buscarV')
let tabla = document.querySelector('#tabla')
let receta = document.querySelector('#receta')
let precio = document.querySelector('#precio')

buscarR.addEventListener('click', fbuscar)
buscarV.addEventListener('click', fbuscarV)

function fbuscarV() {
    let url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/wine/pairing?food=' + recetas.value + '&maxPrice=' + precio.value
    fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            'X-RapidAPI-Key': '00aa47d390msh1eb31d1d90a8f7cp1ee233jsn31e9c519e447'
        }
    })

    .then(response => {
        return response.json();
    })

    .then(datos => {
        console.log(datos);
        mostrarVinos(datos);
    })

    .catch(err => {
        console.error(err)
    });
}

function mostrarVinos(datos) {
    resultado.innerHTML = ''
    console.log(datos.productMatches)

    for (let i of datos.productMatches) {
        let vino = document.createElement('div');
        vino.className = 'vino'
        resultado.append(vino)


        let img = document.createElement('img');
        img.src = i.imageUrl

        let precio = document.createElement('h4');
        precio.append('Precio: ' + i.price)

        let descripcion = document.createElement('h5')
        descripcion.textContent = i.description


        vino.append(img, precio, descripcion)
    }
}

function fcargar() {


    let url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=22'
    fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            'X-RapidAPI-Key': '00aa47d390msh1eb31d1d90a8f7cp1ee233jsn31e9c519e447'
        }
    })

    .then(response => {
        return response.json();
    })

    .then(datos => {
        console.log(datos);
        mostrarRecetas(datos);
    })

    .catch(err => {
        console.error(err)
    });


}

function mostrarRecetas(datos) {
    console.log(datos.recipes)

    for (let i of datos.recipes) {
        let receta = document.createElement('div');
        receta.className = 'receta'
        resultado.append(receta)

        let nombre = document.createElement('h4');
        nombre.append(i.title)

        let img = document.createElement('img');
        img.src = i.image

        let btn = document.createElement('button');
        btn.textContent = 'Información nutricional'

        let btn2 = document.createElement('button');
        btn2.textContent = 'Similares'

        btn2.addEventListener('click', freceta)

        let id = document.createElement('input')
        id.setAttribute('type', 'hidden')
        id.value = i.id
            //console.log(id.textContent)
        btn.addEventListener('click', finfo)
            //console.log(id)

        receta.append(id, nombre, img, btn, btn2)
    }



}

function fbuscar() {


    let url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=' + recetas.value + '&number=12&ignorePantry=true&ranking=1'
    fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            'X-RapidAPI-Key': '00aa47d390msh1eb31d1d90a8f7cp1ee233jsn31e9c519e447'
        }
    })

    .then(response => {
        return response.json();
    })

    .then(datos => {
        console.log(datos);
        mostrarDatos(datos);
    })

    .catch(err => {
        console.error(err)
    });


}

function mostrarDatos(datos) {
    resultado.innerHTML = ''
    for (let i of datos) {


        let receta = document.createElement('div');
        receta.className = 'receta'
        resultado.append(receta)

        let nombre = document.createElement('h4');
        nombre.append(i.title)

        let img = document.createElement('img');
        img.src = i.image

        let btn = document.createElement('button');
        btn.textContent = 'Información nutricional'

        let btn2 = document.createElement('button');
        btn2.textContent = 'Similares'

        btn2.addEventListener('click', freceta)

        let id = document.createElement('input')
        id.setAttribute('type', 'hidden')
        id.value = i.id
            //console.log(id.textContent)
        btn.addEventListener('click', finfo)
            //console.log(id)

        receta.append(id, nombre, img, btn, btn2)




    }
}

function freceta(e) {

    //location.href = "receta.html";
    console.log(e.target.parentNode.firstChild.value);

    id = e.target.parentNode.firstChild.value;
    let url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/' + id + '/similar'
    fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            'X-RapidAPI-Key': '00aa47d390msh1eb31d1d90a8f7cp1ee233jsn31e9c519e447'
        }
    })

    .then(response => {
        return response.json();
    })

    .then(datos => {
        //console.log(datos);
        fmostrarReceta(datos);
    })

    .catch(err => {
        console.error(err)
    });


    function fmostrarReceta(datos) {
        resultado.innerHTML = ''

        console.log(datos)
        for (let i of datos) {


            let receta = document.createElement('div');
            receta.className = 'receta'
            resultado.append(receta)

            let nombre = document.createElement('h4');
            nombre.append(i.title)

            let enlace = document.createElement('a');
            enlace.textContent = 'Visita la web'
            enlace.setAttribute('href', i.sourceUrl)


            let btn = document.createElement('button');
            btn.textContent = 'Información nutricional'

            let btn2 = document.createElement('button');
            btn2.textContent = 'Similares'

            btn2.addEventListener('click', freceta)

            let id = document.createElement('input')
            id.setAttribute('type', 'hidden')
            id.value = i.id
                //console.log(id.textContent)
            btn.addEventListener('click', finfo)
                //console.log(id)

            receta.append(id, nombre, btn, btn2, enlace)




        }




    }

}

function finfo(e) {

    console.log(e.target.parentNode.firstChild.value);

    id = e.target.parentNode.firstChild.value;
    let url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/' + id + '/nutritionWidget.json'
    fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
            'X-RapidAPI-Key': '00aa47d390msh1eb31d1d90a8f7cp1ee233jsn31e9c519e447'
        }
    })

    .then(response => {
        return response.json();
    })

    .then(datos => {
        console.log(datos);
        fmostrarInfo(datos);
    })

    .catch(err => {
        console.error(err)
    });


    function fmostrarInfo(datos) {


        alert(`Calorias: ` + datos.calories +
            ` , Carbohidratos: ` + datos.carbs + ` , Proteinas: ` + datos.protein + ` , Grasas: ` + datos.fat

        )

    }
}