var flagTTS, idiomaD = 'Español';

var p2 = new Promise(
    function(resolve, reject) {
        chrome.storage.sync.get('container', function(result) {
            flagTTS = result.container.flag1;
        });
        window.setTimeout(
            function() {
                console.log('Dentro funcion 350ms');
                resolve()
            }, 350);
    });
p2.then(
    function() {
        banderaTB();
    });

function banderaTB() {
    if (flagTTS == true) {
        console.log('Entre TTS');
        var synth = window.speechSynthesis;
        var voiceSelect, tts, voiceCom;
        var vozSelecionada, dialogo;
        var voices = [];

        testPromise();

        function listaDinamica(listaVoces, idiomaSeleccionado) {
            var textoAEnviar = "";
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
                    textoAEnviar += textOption;
                }
            }
            let masange = {
                data1: textoAEnviar
            }
            chrome.storage.sync.set({
                'vocesCargadas': masange
            }, function() {
                console.log("vocesCargadas Enviadas");
            });
            //voiceSelect.selectedIndex = 0;
        }

        function populateVoiceList() {
            voices = synth.getVoices().sort(function(a, b) {
                const aname = a.name.toUpperCase(),
                    bname = b.name.toUpperCase();
                if (aname < bname) return -1;
                else if (aname == bname) return 0;
                else return +1;
            });
            listaDinamica(voices, idiomaD);
        }

        function testPromise() {
            var p1 = new Promise(
                function(resolve, reject) {
                    console.log("hola");
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
                });
        }

        pF = new Promise(
            function(resolve, reject) {
                chrome.storage.sync.get('valTTS', function(result) {
                    vozSelecionada = result.valTTS.data1;
                });
                chrome.storage.sync.get('pruebas',function(result) {
                    dialo = result.pruebas.test;
                });
                console.log(vozSelecionada);
                console.log(dialogo);
                window.setTimeout(
                    function() {
                        resolve()
                    }, 345);
            });
        pF.then(
            function() {
                if(dialo != "") {
                    speak(dialo);
                }
            });

        function speak(dialogo) {
            if (synth.speaking) {
                console.error('speechSynthesis.speaking');
                return;
            }
            if (dialogo !== '') {
                console.log("Dentro speaking!!");
                var utterThis = new SpeechSynthesisUtterance(dialogo);
                utterThis.onend = function(event) {
                    console.log('SpeechSynthesisUtterance.onend');
                }
                utterThis.onerror = function(event) {
                    console.error('SpeechSynthesisUtterance.onerror');
                }
                var selectedOption = vozSelecionada;
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
        /*
        languageSelect.onchange = function() {
            console.log("Idioma cambiado a: " + languageSelect.value);
            listaDinamica(voices, languageSelect.value);
        }*/
    } else {
        console.log("Desactivado TalkBack");
    }
}