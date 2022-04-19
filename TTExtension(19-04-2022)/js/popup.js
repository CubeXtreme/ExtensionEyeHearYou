var flagTTSp, flagVozp, opcMSG, test;
switchesBien();
TeTeEse(0);

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

function voiceTest() {
    var voz = document.getElementById("voces");
    var selVoz = voz.options[voz.selectedIndex].text;
    let mesange = {
        dato1: selVoz,
        bandera: flagTTSp
    };
    chrome.storage.sync.set({
        'testVoz': mesange
    }, function() {
        console.log("TestVoz Enviado");
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
    var idioma = document.getElementById("idiomas");
    var selIdioma = idioma.options[idioma.selectedIndex].text;
    var voz = document.getElementById("voces");
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
            test = result.vocesCargadas.data1;
            document.getElementById("voces").innerHTML = test;
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

document.getElementById("ttsSwitch").addEventListener("change", function() {
    console.log('Cambio TTS');
    if (outer(document.getElementById("ttsSwitch")).includes('checked')) {
        flagTTSp = false;
    } else {
        flagTTSp = true;
    }
    opcMSG = opcCambio(flagTTSp, flagVozp);
    let msgTTS = {
        dato: opcMSG
    }
    chrome.runtime.sendMessage(msgTTS, function(response) {
        console.log(response);
    });
});

document.getElementById("vozSwitch").addEventListener("change", function() {
    if (outer(document.getElementById("vozSwitch")).includes('checked')) {
        flagVozp = false;
    } else {
        flagVozp = true;
    }
    opcMSG = opcCambio(flagTTSp, flagVozp);
    let msgTTS = {
        dato: opcMSG
    }
    chrome.runtime.sendMessage(msgTTS, function(response) {
        console.log(response);
    });
});


document.getElementById("aplicarCambios").addEventListener("click", function() {
    console.log('Funcion Aplicar Cambios');
    TeTeEse(1);
});

document.getElementById("pruebaVoz").addEventListener("click", function() {
    console.log('Funcion Prueba Voz');
    voiceTest();
});