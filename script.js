const action = document.getElementById('action')
const pausa = document.getElementById('pausa')

const sections = document.getElementById('sections')
const btnInitial = document.getElementById('btn-inciar');
const timer = document.getElementById('timer');
const config = document.getElementById('config');
const titleSection = document.getElementById('title_section')
const minutesOk = document.getElementById('minutes_ok')
const secondsOk = document.getElementById('seconds_ok')
const fim = document.getElementById('fim');
const btnBack = document.getElementById('btn-back')


const lofi = document.getElementById('lofi')
const pause = document.getElementById('pause')
const play = document.getElementById('play')

let segundos;

var bell = new Audio("/audio/bell.mp3")
var volta = new Audio("/audio/volta.mp3")
var final = new Audio("/audio/final.mp3")



const pausar = () => {
  lofi.pause()

  play.style.setProperty('display', 'block', 'important')
  pause.style.setProperty('display', 'none', 'important')
}
const played = () => {
  lofi.play()

  play.style.setProperty('display', 'none', 'important')
  pause.style.setProperty('display', 'block', 'important')
}

const iniciar = () => {

  if (action.value == 0) {
    document.getElementById('error_action').innerHTML = "Adicione os minutos"
    action.focus()
  } else if (pausa.value == 0) {

    document.getElementById('error_pausa').innerHTML = "Adicione a pausa"
    pausa.focus()
  } else if (sections.value == 0) {
    document.getElementById('error_sections').innerHTML = "Adicione as sections"
    sections.focus()
  } else {
    lofi.play()
    pause.style.setProperty('display', 'block', 'important');

    localStorage.setItem('action', String(action.value));
    localStorage.setItem('pausa', String(pausa.value));
    localStorage.setItem('sections', String(sections.value));

    timer.style.setProperty('display', 'block', 'important')
    config.style.setProperty('display', 'none', 'important')
    momentAction();

  }
}

const momentAction = () => {

  let sections_Valor = localStorage.getItem('sections')

  if (sections_Valor != '1') {
    titleSection.innerHTML = sections_Valor + ' sessões restantes'
  } else {
    titleSection.innerHTML = sections_Valor + ' sessão restante'
  }
  let title = document.getElementById('title');
  title.innerHTML = "Minutos"
  title.style.fontSize = '25pt'
  title.style.fontWeight = 'bold'
  title.style.setProperty('color', '#000', 'important')

  min = Number(localStorage.getItem('action'))

  min = min - 1
  segundos = 59

  minutesOk.innerHTML = min
  secondsOk.innerHTML = segundos

  var min_interval = setInterval(minTimer, 60000)
  var seg_interval = setInterval(segTimer, 1000)

  function minTimer() {
    min = min - 1
    minutesOk.innerHTML = min
  }
  function segTimer() {
    segundos = segundos - 1
    secondsOk.innerHTML = segundos

    if (segundos <= 0) {
      if (min <= 0) {
        clearInterval(min_interval)
        clearInterval(seg_interval)
        bell.play()
        momentoPausa()
      }
      segundos = 60
    }
  }

}
const momentoPausa = () => {
  let title = document.getElementById('title');
  title.innerHTML = "Pausa"
  title.style.fontSize = '25pt'
  title.style.fontWeight = 'bold'
  title.style.setProperty('color', '#000000', 'important')

  min_pausa = Number(localStorage.getItem('pausa'))

  min_pausa = min_pausa - 1
  segundos = 59

  minutesOk.innerHTML = min_pausa
  secondsOk.innerHTML = segundos

  var min_interval = setInterval(minTimer, 60000)
  var seg_interval = setInterval(segTimer, 1000)
  function minTimer() {
    min_pausa = min_pausa - 1
    minutesOk.innerHTML = min_pausa
  }

  function segTimer() {
    segundos = segundos - 1
    secondsOk.innerHTML = segundos

    if (segundos <= 0) {
      if (min_pausa <= 0) {
        ses = Number(localStorage.getItem('sections'))
        ses = ses - 1

        localStorage.setItem('sections', String(ses))

        clearInterval(min_interval)
        clearInterval(seg_interval)

        if (ses <= 0) {
          final.play();
          localStorage.clear();
          timer.style.setProperty('display', 'none', 'important');
          config.style.setProperty('display', 'none', 'important');
          fim.style.setProperty('display', 'block', 'important');

        } else {
          volta.play();
          momentAction();
        }

      }
      segundos = 60
    }

  }

}




btnInitial.addEventListener('click', iniciar);
pause.addEventListener('click', pausar);
play.addEventListener('click', played);




