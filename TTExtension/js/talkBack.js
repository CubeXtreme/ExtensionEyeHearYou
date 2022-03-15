var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.getElementById("voces");
var languageSelect= document.getElementById("idiomas");

var voices = [];
var seleccionador = 'Español';

function listaDinamica(listaVoces,idiomaSeleccionado){
  var seleccionador= '';
  switch(idiomaSeleccionado){
    case 'Español':
      seleccionador='es-';
    break;
    case 'Ingles':
      seleccionador='en-';
    break;
  }

  voiceSelect.innerHTML = '';
  for(i=0; i<listaVoces.length;i++){
    if(listaVoces[i].lang.includes(seleccionador)){
      var option = document.createElement('option');
      option.textContent = listaVoces[i].name + ' (' + listaVoces[i].lang + ')';
      option.setAttribute('data-lang', listaVoces[i].lang);
      option.setAttribute('data-name', listaVoces[i].name);
      voiceSelect.appendChild(option); 
    }
  }
  voiceSelect.selectedIndex = 0;

}

function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
      if ( aname < bname ) return -1;
      else if ( aname == bname ) return 0;
      else return +1;
  });

  listaDinamica(voices,seleccionador);

}
populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

console.log("Voces ahora si cargadas");
console.log(voices);

function speak(){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (inputTxt.value !== '') {
    var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        utterThis.volume= 1;
        utterThis.pitch=1;
        utterThis.rate=1;
        break;
      }
    }
    
    synth.speak(utterThis);

  }
}

inputForm.onsubmit = function(event) {
  event.preventDefault();

  speak();

  inputTxt.blur();
}
languageSelect.onchange = function(){
  console.log("Idioma cambiado a: "+languageSelect.value);
  listaDinamica(voices,languageSelect.value);
}



