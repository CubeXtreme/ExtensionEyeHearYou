var flagTTSp, flagVozp, opcMSG, cargaVoces, idMCombo,
    banderaTestVoice = false,
    banderaSwitches = false,
    banderaIdioma = false,
    banderaInicio = false;
var idioma = document.getElementById("idiomas");
var voz = document.getElementById("voces");
let msgTTS = {
    dato: ""
};
let mesange = {
    dato1: "",
    dato2: "",
    control: banderaTestVoice,
    swITch: banderaSwitches,
    idIOma: banderaIdioma,
    inicio: banderaInicio
};

switchesBien();
TeTeEse(0);
document.onload = preCarga();

function switchesBien() {
    TTs = document.getElementById('TextToSpeech');
    textTTs = outer(TTs);
    if (textTTs.includes('checked')) {
        flagTTSp = true;
    } else {
        flagTTSp = false;
    }
    comando = document.getElementById('NavegacionPorVoz');
    textcomando = outer(comando);
    if (textcomando.includes('checked')) {
        flagVozp = true;
    } else {
        flagVozp = false;
    }
    opcMSG = opcCambio(flagTTSp, flagVozp);
    let msg = {
        flag1: flagTTSp,
        flag2: flagVozp
    }
    chrome.storage.sync.set({
        'container': msg
    }, function() {
        console.log("Container Enviado");
        console.log(msg);
    });
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

function TeTeEse(flag) {
    var selIdioma = idioma.options[idioma.selectedIndex].text;
    var selVoz = voz.options[voz.selectedIndex].text;
    var val1 = selVoz;
    var val2 = selIdioma;
    let lolo = {
        data1: val1,
        data2: val2
    }
    chrome.storage.sync.set({
        'valTTS': lolo
    }, function() {
        console.log("valTTS Enviado");
        console.log(lolo);
    });
    if (flag == 0) {
        chrome.storage.sync.get('vocesCargadas', function(result) {
            cargaVoces = result.vocesCargadas.data1;
            document.getElementById("voces").innerHTML = cargaVoces;
        });
    }
}

function opcCambio(flag1, flag2) {
    if (flag1 == true && flag2 == true) {
        console.log("tts true, comandos true");
        choice = "11";
    } else if (flag1 == true && flag2 == false) {
        console.log("tts true, comandos false");
        choice = "10";
    } else if (flag1 == false && flag2 == true) {
        console.log("tts false, comandos true");
        choice = "01";
    } else if (flag1 == false && flag1 == false) {
        console.log("tts false, comandos false");
        choice = "00";
    } else {
        console.log("Espera pero que carajos xddddd");
        return -1;
    }
    return choice;
}

function preCarga() {
    var selVoz = voz.options[voz.selectedIndex].text;
    var selIdioma = idioma.options[idioma.selectedIndex].text;
    mesange.dato1 = selIdioma;
    mesange.dato2 = selVoz;
    mesange.control = banderaTestVoice;
    mesange.swITch = banderaSwitches;
    mesange.idIOma = banderaIdioma;
    mesange.inicio = banderaInicio;
    if (selIdioma == "Inglés") {
        idMCombo = "EN";
    } else if (selIdioma == "Español") {
        idMCombo = "ES";
    } else {
        console.log("WTF?!");
    }
    var PpreCarga = new Promise(
        function(resolve, reject) {
            banderaInicio = true;
            mesange.inicio = banderaInicio;
            chrome.storage.sync.set({
                'testVoice': mesange
            }, function() {
                console.log("testVoice Enviado true precarga");
                console.log(mesange);
            });
            window.setTimeout(
                function() {
                    resolve()
                }, 1500);
        });
    PpreCarga.then(
        function() {
            banderaInicio = false;
            mesange.inicio = banderaInicio;
            chrome.storage.sync.set({
                'testVoice': mesange
            }, function() {
                console.log("testVoice Enviado then precarga");
                console.log(mesange);
            });
        });
}

document.getElementById("ttsSwitch").addEventListener("change", function() {
    var PswitchTTS = new Promise(
        function(resolve, reject) {
            if (outer(document.getElementById("ttsSwitch")).includes('checked')) {
                flagTTSp = false;
            } else {
                flagTTSp = true;
            }
            opcMSG = opcCambio(flagTTSp, flagVozp);
            opcMSG += idMCombo;
            msgTTS.dato = opcMSG;
            chrome.runtime.sendMessage(msgTTS, function(response) {
                console.log(response);
            });
            banderaSwitches = true;
            mesange.swITch = banderaSwitches;
            chrome.storage.sync.set({
                'testVoice': mesange
            }, function() {
                console.log("testVoice Enviado true inicio");
                console.log(mesange);
            });
            window.setTimeout(
                function() {
                    resolve()
                }, 3000);
        });
    PswitchTTS.then(
        function() {
            banderaSwitches = false;
            mesange.swITch = banderaSwitches;
            chrome.storage.sync.set({
                'testVoice': mesange
            }, function() {
                console.log("testVoice Enviado true fin");
                console.log(mesange);
            });
        });
});

document.getElementById("vozSwitch").addEventListener("change", function() {
    var PswitchVoz = new Promise(
        function(resolve, reject) {
            if (outer(document.getElementById("vozSwitch")).includes('checked')) {
                flagVozp = false;
            } else {
                flagVozp = true;
            }
            opcMSG = opcCambio(flagTTSp, flagVozp);
            opcMSG += idMCombo;
            msgTTS.dato = opcMSG;
            chrome.runtime.sendMessage(msgTTS, function(response) {
                console.log(response);
            });
            banderaSwitches = true;
            mesange.swITch = banderaSwitches;
            chrome.storage.sync.set({
                'testVoice': mesange
            }, function() {
                console.log("testVoice Enviado true inicio");
                console.log(mesange);
            });
            window.setTimeout(
                function() {
                    resolve()
                }, 6000);
        });
    PswitchVoz.then(
        function() {
            banderaSwitches = false;
            mesange.swITch = banderaSwitches;
            chrome.storage.sync.set({
                'testVoice': mesange
            }, function() {
                console.log("testVoice Enviado true fin");
                console.log(mesange);
            });
        });
});

document.getElementById("idiomas").addEventListener("change", function() {
    var selIdioma = idioma.options[idioma.selectedIndex].text;
    var PIdiomasRefresh = new Promise(
        function(resolve, reject) {
            if (selIdioma == "Inglés") {
                idMCombo = "EN";
            } else if (selIdioma == "Español") {
                idMCombo = "ES";
            } else {
                console.log("WTF?!");
            }
            msgTTS.dato = opcMSG += idMCombo;
            chrome.runtime.sendMessage(msgTTS, function(response) {
                console.log(response);
            });
            banderaIdioma = true;
            mesange.idIOma = banderaIdioma;
            chrome.storage.sync.set({
                'testVoice': mesange
            }, function() {
                console.log("testVoice Enviado true inicio");
                console.log(mesange);
            });
            window.setTimeout(
                function() {
                    resolve()
                }, 6000);
        });
    PIdiomasRefresh.then(
        function() {
            banderaIdioma = false;
            mesange.idIOma = banderaIdioma;
            chrome.storage.sync.set({
                'testVoice': mesange
            }, function() {
                console.log("testVoice Enviado true fin");
                console.log(mesange);
            });
        });
});

document.getElementById("pruebaVoz").addEventListener("click", function() {
    var selIdioma = idioma.options[idioma.selectedIndex].text;
    var selVoz = voz.options[voz.selectedIndex].text;
    if (flagTTSp == true) {
        var PVoiceTest = new Promise(
            function(resolve, reject) {
                banderaTestVoice = true;
                mesange.dato1 = selIdioma;
                mesange.dato2 = selVoz;
                mesange.control = banderaTestVoice;
                chrome.storage.sync.set({
                    'testVoice': mesange
                }, function() {
                    console.log("testVoice Enviado true inicio");
                    console.log(mesange);
                });
                window.setTimeout(
                    function() {
                        resolve()
                    }, 3000);
            });
        PVoiceTest.then(
            function() {
                banderaTestVoice = false;
                mesange.dato1 = selIdioma;
                mesange.dato2 = selVoz;
                mesange.control = banderaTestVoice;
                chrome.storage.sync.set({
                    'testVoice': mesange
                }, function() {
                    console.log("testVoice Enviado true fin");
                    console.log(mesange);
                });
            });
    } else {
        banderaTestVoice = false;
        mesange.dato1 = selIdioma;
        mesange.dato2 = selVoz;
        mesange.control = banderaTestVoice;
        chrome.storage.sync.set({
            'testVoice': mesange
        }, function() {
            console.log("testVoice Enviado false");
            console.log(mesange);
        });
        console.log("¿XD?");
    }
});

document.getElementById("aplicarCambios").addEventListener("click", function() {
    console.log('Funcion Aplicar Cambios');
    TeTeEse(1);
});