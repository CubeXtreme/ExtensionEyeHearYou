var synth = window.speechSynthesis;
var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect, tts, voiceCom;
var voices = [];
var seleccionador = 'Español';

testPromise();

function listaDinamica(listaVoces, idiomaSeleccionado) {
    var seleccionador = '';
    var textOption;
    switch (idiomaSeleccionado) {
        case 'Español':
            seleccionador = 'es-';
            break;
        case 'Ingles':
            seleccionador = 'en-';
            break;
    }
    for (i = 0; i < listaVoces.length; i++) {
        if (listaVoces[i].lang.includes(seleccionador)) {
            var option = document.createElement('option');
            option.textContent = listaVoces[i].name + ' (' + listaVoces[i].lang + ')';
            option.setAttribute('data-lang', listaVoces[i].lang);
            option.setAttribute('data-name', listaVoces[i].name);
            textOption = outer(option);
        }
    }
    voiceSelect.selectedIndex = 0;
}

function populateVoiceList() {
    voices = synth.getVoices().sort(function(a, b) {
        const aname = a.name.toUpperCase(),
            bname = b.name.toUpperCase();
        if (aname < bname) return -1;
        else if (aname == bname) return 0;
        else return +1;
    });
    listaDinamica(voices, seleccionador);
}

function testPromise() {
    var p1 = new Promise(
        function(resolve, reject) {
            chrome.storage.sync.get('container', function(result) {
                console.log(result);
                voiceSelect = result.container.data1;
                tts = result.container.data2;
                voiceCom = result.container.data3;
                seleccionIdioma = result.container.data4;
                seleccionVoz = result.container.data5;
            });
            window.setTimeout(
                function() {
                    resolve()
                }, 250);
        });
    p1.then(
        function() {
            populateVoiceList();
            if (speechSynthesis.onvoiceschanged !== undefined) {
                speechSynthesis.onvoiceschanged = populateVoiceList;
            }
            console.log(voiceSelect);
            console.log(tts);
            console.log(voiceCom);
            console.log(seleccionIdioma);
            console.log(seleccionVoz);
        });
}

function speak() {
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (inputTxt.value !== '') {
        var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
        utterThis.onend = function(event) {
            console.log('SpeechSynthesisUtterance.onend');
        }
        utterThis.onerror = function(event) {
            console.error('SpeechSynthesisUtterance.onerror');
        }
        var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
        for (i = 0; i < voices.length; i++) {
            if (voices[i].name === selectedOption) {
                utterThis.voice = voices[i];
                utterThis.volume = 1;
                utterThis.pitch = 1;
                utterThis.rate = 1;
                break;
            }
        }
        synth.speak(utterThis);
    }
}

function outer(element) {
    var valor;
    if (element.outerHTML) {
        valor = element.outerHTML;
    } else if (XMLSerializer) {
        valor = new XMLSerializer().serializeToString(element);
    } else {
        console.log("WTF?!?!?!");
    }
    return valor;
}

inputForm.onsubmit = function(event) {
    event.preventDefault();

    speak();

    inputTxt.blur();
}

/*
languageSelect.onchange = function() {
    console.log("Idioma cambiado a: " + languageSelect.value);
    listaDinamica(voices, languageSelect.value);
}*/