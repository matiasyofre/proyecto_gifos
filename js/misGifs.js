// MIS GIFS
function getMyGifs () {
    let items = [];
    for (var i = 0; i < localStorage.length; i++){
      let item = localStorage.getItem(localStorage.key(i))
      if (item.includes('data')) {
        itemJson = JSON.parse(item)
        items.push(itemJson.data.images.fixed_height.url)
      }
    }
    return items
  }
  
  window.addEventListener('load', () => {
    const localGifs = getMyGifs()
    localGifs.forEach(item => {
      const img = document.createElement('img')
      img.src = item;
      img.classList.add('resultadosThumb');
      document.getElementById('resultados').appendChild(img);
    })
  })
  
  getMyGifs();

// SELECTOR DE TEMA
let selectorTema = document.getElementById('desplegable');
let themeValue;

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
        }
function temaNoche(){
        document.documentElement.setAttribute('theme', 'noche');
        themeValue = "noche";
        localStorage.setItem('themeValue', themeValue);
        selectorTema.style.display = "none";
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