const startButton = document.querySelector('[data-start]')
const pausarButton = document.querySelector('[data-pause]')
const pararButton = document.querySelector('[data-stop]')
const tiempoElement = document.querySelector('[data-time]')
let milissegundos = 0, 
    segundos = 0, 
    minutos = 0, 
    horas = 0
let interval

const renderTiempo = (milissegundos, segundos, minutos, horas) => {
    const horasValue = horas < 10 ? "0" + horas:horas
    const minutosValue = minutos < 10 ? "0" + minutos:minutos
    const segundosValue = segundos < 10 ? "0" + segundos:segundos
    const milissegundosValue = milissegundos < 10 ? "0" + milissegundos:milissegundos
    
    
    tiempoElement.innerHTML =  horasValue  + ":" + minutosValue + ":" + segundosValue + ":" + milissegundosValue
}

const startTime = (startValue) => {
    startButton.setAttribute("disabled", "true");
    pausarButton.removeAttribute("disabled");
    pararButton.removeAttribute("disabled");

    if (startValue === "start" || startValue === "restart") {
        (milissegundos = milissegundos != 0 ? -1 : 0),(milissegundos = 0), (minutos = 0), (horas = 0)
        interval = setInterval(() => {
          milissegundos++
        while(milissegundos === 99){
          milissegundos = 0
          segundos++
        }
        while(segundos === 60){
          segundos = 0
          minutos++
        }
        while(minutos === 60){
          minutos = 0
          horas++
        }
        renderTiempo(milissegundos, segundos, minutos, horas)
    }, .3)
  } else if (startValue === "continue") {
    interval = setInterval(() => {
      milissegundos++
      while(milissegundos === 99){
        milissegundos = 0
        segundos++
      }
      while (segundos === 60) {
        segundos = 0;
        minutos++;
      }
      while (minutos === 60) {
        minutos = 0;
        horas++;
      }
      renderTiempo(milissegundos, segundos, minutos, horas);
    }, .3);
  }
}

const pauseTime = () => {
    startButton.removeAttribute("disabled");
    startButton.setAttribute("data-start", "continue");
    startButton.innerHTML = "Continuar";
    pararButton.setAttribute("disabled", "true");
  
    clearInterval(interval);
  }
  
  const stopTime = () => {
    startButton.removeAttribute("disabled");
    startButton.setAttribute("data-start", "restart");
    pausarButton.setAttribute("disabled", "true");
    startButton.innerHTML = "Reiniciar";
    pararButton.setAttribute("disabled", "true");

  
    clearInterval(interval);
  }
  
  startButton.onclick = () => {
    const startValue = startButton.getAttribute("data-start");
    startTime(startValue);
  }
  
  pausarButton.onclick = () => {
    pauseTime();
  }
  
  pararButton.onclick = () => {
    stopTime();
  }
