var flagTTS;
const reGex = /[ ][(]e.*[)]/i;

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
        var synth = window.speechSynthesis,
            vozSelecionada, seleccionador = '', voices = [], idiomaD = "";

        testPromise();

        window.addEventListener('mouseup', selectedText);

        function selectedText() {
            let selection = window.getSelection().toString();
            cambiaVoz(selection);
        }

        function listaDinamica(listaVoces, idiomaSeleccionado) {
            var textoAEnviar = "";
            var textOption;
            switch (idiomaSeleccionado) {
                case 'Español':
                    seleccionador = 'es-';
                    break;
                case 'Inglés':
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
                    chrome.storage.sync.get('valTTS', function(result) {
                        idiomaD = result.valTTS.data2;
                        vozSelecionada = result.valTTS.data1;
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
                });
        }

        pF = new Promise(
            function(resolve, reject) {
                chrome.storage.sync.get('valTTS', function(result) {
                    vozSelecionada = result.valTTS.data1;
                });
                window.setTimeout(
                    function() {
                        resolve()
                    }, 120);
            });
        pF.then(
            function() {
                console.log("idk");
            });

        function cambiaVoz(hola) {
            pF2 = new Promise(
                function(resolve, reject) {
                    chrome.storage.sync.get('valTTS', function(result) {
                        vozSelecionada = result.valTTS.data1;
                    });
                    window.setTimeout(
                        function() {
                            resolve()
                        }, 50);
                });
            pF2.then(
                function() {
                    speak(hola);
                });
        }

        function speak(dialogo) {
            if (synth.speaking) {
                console.log('speechSynthesis.speaking');
                return;
            }
            if (dialogo !== '') {
                console.log(dialogo);
                var utterThis = new SpeechSynthesisUtterance(dialogo);
                utterThis.onend = function(event) {
                    console.log('SpeechSynthesisUtterance.onend');
                }
                utterThis.onerror = function(event) {
                    console.log('SpeechSynthesisUtterance.onerror');
                }
                var selectedOption = vozSelecionada.replace(reGex, "");
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
            } else {
                console.log("Oye, como llegaste aquí? XD");
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
    } else {
        console.log("Desactivado TalkBack");
    }
}