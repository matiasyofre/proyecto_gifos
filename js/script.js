// SELECTOR DE TEMA
let selectorTema = document.getElementById('desplegable');
let themeValue;
let icon = document.getElementById('icono')

function eligeTema() {
    if (selectorTema.style.display === "none") {
      selectorTema.style.display = "block";
    } else {
      selectorTema.style.display = "none";
    }
  }
function temaDia(){
        document.documentElement.setAttribute('theme', 'dia');
        themeValue = "dia";
        localStorage.setItem('themeValue', themeValue);
        selectorTema.style.display = "none";
        icon.setAttribute('href', '../assets/gifOF_logo.ico')
    }
function temaNoche(){
        document.documentElement.setAttribute('theme', 'noche');
        themeValue = "noche";
        localStorage.setItem('themeValue', themeValue);
        selectorTema.style.display = "none";
        icon.setAttribute('href', './assets/gifOF_logo_dark.ico')
    }
// CARGAR TEMA
function cargarTema(){
    let storedTheme = localStorage.getItem('themeValue');
    if(storedTheme == null){
        temaDia();
    }else{
      document.documentElement.setAttribute('theme', storedTheme);
  }
}
cargarTema();

// API GIPHY 
const GIPHY_KEY = '3OQCd4OOe8I3COjQL1TgtvLbyNToVUOW';
const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/';

// HOY TE SUGERIMOS - PEDIDO Y RENDERIZADO

async function GifSugerido1(){
  let url = GIPHY_API_URL + "random?api_key=" + GIPHY_KEY;
  let verMas1 = document.getElementById('verMas1');
  return fetch(url)
  .then(response => response.json())
  .then(content =>{
    let p = document.getElementById('texto1');
    let img = document.getElementById('random1');
    img.src = content.data.images.fixed_height.url;
    if(content.data.title == ""){
      p.innerHTML = "#Animated #GIF";
      verMas1.onclick = x => {
        buscar.value = "animated gif";
        getResultadosBusqueda(event);
      };
    } else{
      p.innerHTML = content.data.title.replace(/(^|\s+)/g, "$1#");
      verMas1.onclick = x => {
        buscar.value = content.data.title;
        getResultadosBusqueda(event);
      };
    }
  })
}

async function GifSugerido2(){
  let url = GIPHY_API_URL + "random?api_key=" + GIPHY_KEY;
  let verMas2 = document.getElementById('verMas2');
  return fetch(url).then(response => response.json())
  .then(content =>{
    let p = document.getElementById('texto2');
    let img = document.getElementById('random2');
    img.src = content.data.images.fixed_height.url;
    if(content.data.title == ""){
      p.innerHTML = "#Animated #GIF";
      verMas2.onclick = x => {
        buscar.value = "animated gif";
        getResultadosBusqueda(event);
      };
    } else{
      p.innerHTML = content.data.title.replace(/(^|\s+)/g, "$1#");
      verMas2.onclick = x => {
        buscar.value = content.data.title;
        getResultadosBusqueda(event);
      };
    }
  })
}

async function GifSugerido3(){
  let url = GIPHY_API_URL + "random?api_key=" + GIPHY_KEY;
  let verMas3 = document.getElementById('verMas3');
  return fetch(url).then(response => response.json())
  .then(content =>{
    let p = document.getElementById('texto3');
    let img = document.getElementById('random3');
    img.src = content.data.images.fixed_height.url;
    if(content.data.title == ""){
      p.innerHTML = "#Animated #GIF";
      verMas3.onclick = x => {
        buscar.value = "animated gif";
        getResultadosBusqueda(event);
      };
    } else{
      p.innerHTML = content.data.title.replace(/(^|\s+)/g, "$1#");
      verMas3.onclick = x => {
        buscar.value = content.data.title;
        getResultadosBusqueda(event);
      };
    }
  })
}

async function GifSugerido4(){
  let url = GIPHY_API_URL + "random?api_key=" + GIPHY_KEY;
  let verMas4 = document.getElementById('verMas4');
  return fetch(url).then(response => response.json())
  .then(content =>{
    let p = document.getElementById('texto4');
    let img = document.getElementById('random4');
    img.src = content.data.images.fixed_height.url;
    if(content.data.title == ""){
      p.innerHTML = "#Animated #GIF";
      verMas4.onclick = x => {
        buscar.value = "animated gif";
        getResultadosBusqueda(event);
      };
    } else{
      p.innerHTML = content.data.title.replace(/(^|\s+)/g, "$1#");
      verMas4.onclick = x => {
        buscar.value = content.data.title;
        getResultadosBusqueda(event);
      };
    }
  })
}
GifSugerido1();
GifSugerido2();
GifSugerido3();
GifSugerido4();

// TENDENCIAS - CONTENEDOR
const resultadosTendencias = document.getElementById('resultadosContainer');

// TENDENCIAS - PEDIDO
function getTendencias(ammount) {
  const url = GIPHY_API_URL + 'trending?api_key=' + GIPHY_KEY + '&limit=' + ammount;
  return fetch(url).then(response => response.json());
}

// RENDERIZACION DE RESULTADOS
function renderResultadosBusqueda(results) {
  results.data.forEach(item => renderGifItem(item));
}

// RENDERIZACION INDIVIDUAL
function renderGifItem(item) {
  const imgUrl = item.images.fixed_height.url;
  const div = document.createElement('div');
  const img = document.createElement('img');
  let div2 = document.createElement('div');
  let p = document.createElement('p');  

  div.classList.add('gif-item');
  div.append(img);
  img.setAttribute('src', imgUrl);
  p.innerHTML = item.title.replace(/(^|\s+)/g, "$1#");;
  div2.classList.add('tendenciaTit');
  div.appendChild(div2);
  div2.appendChild(p);

  resultadosTendencias.append(div);
  
}

// CANTIDAD DE GIFS
const ammount = 27;
getTendencias(ammount).then(response => renderResultadosBusqueda(response));


// CONTENEDOR DE RESULTADOS DE BUSQUEDA
const searchResults = document.getElementById('BusqResultados');
const searchTitle = document.getElementById('titResultado');
const searchHistory = [];
const searchHistoryCont = document.getElementById('historialBusqueda');

function searchCleaner(){
  if(searchResults !== ''){
    searchResults.innerHTML = '';
  }else{
    return false;
  }
}

//TRAER Y RENDERIZAR RESULTADOS DE BUSQUEDA
async function getResultadosBusqueda(event){
  event.preventDefault();
  searchCleaner();
  searchHistoryCont.innerHTML = "";
  let url = `${GIPHY_API_URL}search?api_key=${GIPHY_KEY}&limit=11&q=`;
  let str = document.getElementById('buscar').value.trim();
  url = url.concat(str);
  if(str !== ""){
    return fetch(url).then(response => response.json())
    .then(content =>{
      for (let i = 0; i < 10; i++) { 
        let div = document.createElement('div');
        let img = document.createElement('img');
        let div2 = document.createElement('div');
        let p = document.createElement('p');
        img.src = content.data[i].images.fixed_height.url;
        p.innerHTML = content.data[i].title.replace(/(^|\s+)/g, "$1#");
        searchResults.appendChild(div);
        div.appendChild(img);
        div2.classList.add('tendenciaTit');
        div.appendChild(div2);
        div2.appendChild(p);
        div.classList.add('gif-item');       
        }  
        document.getElementById('buscar').value = "";
        sugerencias.style.display = "none";
        boton.classList.remove('btnActivo');
        boton.classList.add('btn-Inactivo');
        searchTitle.classList.remove('hidden');
        searchTitle.innerHTML = str + "(resultados)";
        // AGREGAMOS LA BUSQUEDA AL ARRAY
        searchHistory.unshift(str);
        // CONTENEDOR VISIBLE DESPUES DE LA PRIMER BUSQUEDA
        searchHistoryCont.classList.remove('hidden');
        // ULTIMOS 3 BOTONES AZULES DE BUSQUEDA
        for(let i = 0; i < 3; i++){
          if(searchHistory[i] === undefined){
            return false;
          }else {
            let div = document.createElement('div');
            div.innerHTML = searchHistory[i];
            div.classList.add('historialItem');
            searchHistoryCont.appendChild(div);
          }
        }
    })
  }
}

//SUGERENCIAS DE BUSQUEDA Y EXTRAS

const searchInput = document.querySelector('#buscar');
const sugerencias = document.querySelector('.sugerencias');
const boton = document.getElementById('btnBuscar');
const ul = document.querySelector('.sugerencias');
let timerFetch = undefined;

searchInput.addEventListener('keyup', function(){
  const input = searchInput.value;
  sugerencias.innerHTML = "";
  if(input !== ""){
    sugerencias.style.display = "flex";
    boton.classList.remove('btn-Inactivo')
    boton.classList.add('btnActivo');
  }else{
    sugerencias.style.display = "none";
    boton.classList.remove('btnActivo')
    boton.classList.add('btn-Inactivo');
  }
  let dataMuse = 'https://api.giphy.com/v1/tags/related/';
  if(timerFetch !== undefined){
      clearTimeout(timerFetch);
  }
  if(input !== ""){
    timerFetch = setTimeout(()=> {
      dataMuse = dataMuse  + input + '?api_key=' + GIPHY_KEY + '&max=3';        
      return fetch(dataMuse).then(response => response.json())
      .then(content =>{
        for(let i = 0; i < 3; i++){   
          const li = document.createElement('li');
          li.innerHTML = content.data[i].name;
          ul.appendChild(li);
            li.onmousedown = x => {
            buscar.value = li.innerText;
            getResultadosBusqueda(event);
            }; 
        }   
      })
    },1000)
  }
})

// CONTADOR DE VISITAS
document.addEventListener('DOMContentLoaded', () =>{
    
  let contadorVisitas = document.getElementById('visitas') 
  
  if(localStorage){
      if(localStorage['visitas'] == undefined){
          localStorage['visitas'] = 0
      }
  
      let n = parseInt(localStorage['visitas'])
      
      localStorage['visitas'] = 1 + n
      
      let contador = localStorage['visitas']
  
      let mensaje = contador
  
      contadorVisitas.innerText = mensaje
  }
})






