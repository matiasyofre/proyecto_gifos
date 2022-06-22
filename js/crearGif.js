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

const cancel = document.getElementById('cancelar');
const restart = document.getElementById('restart');
const upload = document.getElementById('subido');
const progressBar = document.getElementsByClassName('barraAvanceItem');
const uploadMessage = document.getElementById('mensajeGifSubido')
const download = document.getElementById('descargar')
const copy = document.getElementById('copiar')
const main = document.getElementById('menuContenedor');
const header = document.getElementById('header');
const mainLogo = document.getElementById('menu');
const start = document.getElementById('btnComenzar');
const record = document.getElementById('btnCapturar');
const stop = document.getElementById('stop');
let btnStage4 = document.getElementById('btnPaso4');
let preview = document.getElementById('preview');
let gifCapturaHead = document.getElementById('encabezadoCapturaGif');
const btnContainer = document.getElementById('btnContainer');
const video = document.querySelector('video');

const stage1 = document.getElementById('paso1');
const stage2= document.getElementById('paso2');
const stage3 = document.getElementById('paso3');


// API GIPHY
const apiKey = '3OQCd4OOe8I3COjQL1TgtvLbyNToVUOW';
const apiBaseUrl = 'https://api.giphy.com/v1/gifs/';

// RECORDRTC

let recorder;

let recording = false;

function getStreamAndRecord () {

    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { 
      height: { max: 480 }
    }
  })
    .then(function(stream) {
      video.srcObject = stream;
      video.play()
      
      record.addEventListener('click', () => {
        recording = !recording
        document.getElementById('btnCamara').src = './assets/recording.svg'
      if (recording === true) {
        this.disabled = true;
        recorder = RecordRTC(stream, {
          type: 'gif',
          frameRate: 1,
          quality: 10,
          width: 360,
          hidden: 240,
          onGifRecordingStarted: function() {
          },
        });
        
        recorder.startRecording();
        getDuration()
      
        record.classList.add('btnGrabando');
        record.innerHTML = 'Listo';
        stop.classList.add('btnGrabando');
        document.getElementById('contadorTiempo').classList.remove('hidden');
        btnContainer.style.justifyContent = "space-between";
        gifCapturaHead.innerHTML = "Capturando Tu Guifo";

        // CORTAR EL STREAM DE LA CAMARA
        recorder.camera = stream; 

    } else {
        this.disabled = true;
        recorder.stopRecording(stopRecordingCallback);
        recording = false;      
      }
    });
  });
}


function stopRecordingCallback() {

  recorder.camera.stop();


  let form = new FormData();
  form.append("file", recorder.getBlob(), 'test.gif');
  
  upload.addEventListener('click', () => {
    uploadMessage.classList.remove('hidden');
    preview.classList.add('hidden');
    animateProgressBar(progressBar);
    uploadGif(form);
    btnStage4.classList.add('hidden');
    cancel.classList.remove('hidden');
    document.getElementById('contadorTiempo').classList.add('hidden');
    btnContainer.style.justifyContent = "flex-end";
    gifCapturaHead.innerHTML = "Subiendo Gifo";
  })

  objectURL = URL.createObjectURL(recorder.getBlob());
  preview.src = objectURL;


  preview.classList.remove('hidden')
  video.classList.add('hidden')
  record.classList.add('hidden');
  btnStage4.classList.remove('hidden');
  document.getElementById('btnGrabarVideo').classList.add('hidden');
  gifCapturaHead.innerHTML = "Vista Previa";

  recorder.destroy();
  recorder = null;
}

start.addEventListener('click', () => {
  stage1.classList.add('hidden');
  stage2.classList.remove('hidden');  
  getStreamAndRecord()
});

restart.addEventListener('click', () => {
  location.reload();
  getStreamAndRecord()
})


function getDuration() {
  let seconds = 0;
  let minutes = 0;
  let timer = setInterval(() => {
    if (recording) {
      if (seconds < 60) {
        if (seconds <= 9) {
          seconds = '0' + seconds;
        }
        document.getElementById('contadorTiempo').innerHTML=`00:00:0${minutes}:${seconds}`;
        seconds++;
      } else {
        minutes++;
        seconds = 0;
      }
    }
    else {
      clearInterval(timer)
    }
  }, 1000);
} 

// CANCELAR SUBIDA DE GIF

let controller = new AbortController();
let signal = controller.signal;

cancel.addEventListener('click' , () => {
    controller.abort();
    controler = new AbortController();
    location.reload();
})

// BARRA DE PROGRESO - SUBIR GIFO

let counter = 0;
function animateProgressBar (bar) {
    setInterval(() => {
      if (counter < bar.length) {
        bar.item(counter).classList.toggle('barraAvanceItemActivo')
        counter++;
      } else {
        counter = 0;
      }
    }, 200)
} 

function uploadGif(gif) {

  fetch('https://upload.giphy.com/v1/gifs' + '?api_key=' + apiKey, {
    signal: controller.signal,
    method: 'POST',
    body: gif,
  }).then(res => {
    console.log(res.status)
    if (res.status != 200 ) {
      uploadMessage.innerHTML = `<h3>Hubo un error subiendo tu Guifo</h3>`
    }
    return res.json();  
  }).then(data => {  
    uploadMessage.classList.add('hidden');
    document.getElementById('compartirContenedor').classList.remove('hidden')
    const gifId = data.data.id
    getGifDetails(gifId)
  })
}

function getGifDetails (id) {

  fetch(apiBaseUrl + id + '?api_key=' + apiKey) 
      .then((response) => {
        return response.json()
      }).then(data => {
          const gifUrl = data.data.url
          localStorage.setItem('gif' + data.data.id, JSON.stringify(data));

          document.getElementById('prevCompartir').src = data.data.images.fixed_height.url;
          const copyModal = document.getElementById('copiadoExitoso');
          preview.classList.remove('hidden');
          main.classList.add('gray');
          header.classList.add('gray');
          mainLogo.classList.add('gray');
        
          download.href = gifUrl

          copy.addEventListener('click', async () => {
            await navigator.clipboard.writeText(gifUrl);
            copyModal.innerHTML = 'Link copiado con éxito!'
            copyModal.classList.remove('hidden')
            setTimeout(() => { copyModal.classList.add('hidden') }, 1500);
          })

          document.getElementById('embed').addEventListener('click', async () => {
            await navigator.clipboard.writeText(data.data.embed_url)
            copyModal.innerHTML = 'Código copiado con éxito!'
            copyModal.classList.remove('hidden')
            setTimeout(() => { copyModal.classList.add('hidden') }, 500);
          })

          document.getElementById('finalizar').addEventListener('click', () => {
            location.reload();
          })
      })
      .catch((error) => {
          return error
      })
}

function getMyGifs () {
  let items = [];
  for (var i = 0; i < localStorage.length; i++){
    let item = localStorage.getItem(localStorage.key(i))
    console.log(item)
    if (item.includes('data')) {
      itemJson = JSON.parse(item)
      items.push(itemJson.data.images.fixed_height.url)
      console.log(items)
    }
  }
  return items
}

window.addEventListener('load', () => {
  const localGifs = getMyGifs()
  console.log(localGifs)
  localGifs.forEach(item => {
    const img = document.createElement('img')
    img.src = item;
    img.classList.add('resultadosThumb');
    document.getElementById('resultados').appendChild(img);
  })
})

getMyGifs()

document.getElementById('compartido').addEventListener('click', () => {
  location.reload();
})









