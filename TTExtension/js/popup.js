var flagVozp = true;
var flagTTSp = true;
TTsinicio = document.getElementById('TextToSpeech');
comandoInicio = document.getElementById('NavegacionPorVoz');
textTTsinicio = outer(TTsinicio);
textcomandoInicio = outer(comandoInicio);
window.onload = apply(0);

function apply(lol) {
    var idioma = document.getElementById("idiomas");
    var selIdioma = idioma.options[idioma.selectedIndex].text;
    var voz = document.getElementById("voces");
    var selVoz = voz.options[voz.selectedIndex].text;
    var val1 = outer(voz);
    var val2 = selIdioma;
    var val3 = selVoz;
    if(lol == 1) {
        console.log(flagTTSp);
        console.log(flagVozp);
        if(flagTTSp == true) {
            document.getElementById("ttsSwitch").innerHTML = '<input type="checkbox" id="TextToSpeech"><span class="slider round"></span>';
        } else {
            document.getElementById("ttsSwitch").innerHTML = '<input type="checkbox" id="TextToSpeech" checked><span class="slider round"></span>';
        }
        if(flagVozp == true) {
            document.getElementById("vozSwitch").innerHTML = '<input type="checkbox" id="NavegacionPorVoz"><span class="slider round"></span>';
        } else {
            document.getElementById("vozSwitch").innerHTML = '<input type="checkbox" id="NavegacionPorVoz" checked><span class="slider round"></span>';
        }
    }
    let msg = {data1: val1,data2: val2,data3: val3, banderaTTS:flagTTSp, banderaVoice: flagVozp}
    chrome.storage.sync.set({'container': msg},function() {
        console.log("Container Enviado");
        console.log(msg);
    });
}

function voiceTest() {
    var voz = document.getElementById("voces");
    var selVoz = voz.options[voz.selectedIndex].text;
    let mesange = {dato1:selVoz, bandera: flagTTSp};
    chrome.storage.sync.set({'testVoz': mesange},function() {
        console.log("TestVoz Enviado");
    });
}

function outer(element){
    var valor;
    if (element.outerHTML) {
        valor = element.outerHTML;
    }
    else if (XMLSerializer) {
        valor = new XMLSerializer().serializeToString(element);
    } else {
        console.log("WTF?!?!?!");
    }
    return valor;
}

/*
document.getElementById('idioma').addEventListener();
*/

document.getElementById("TextToSpeech").addEventListener("click", function() {
    if(textTTsinicio.includes('checked')) {
        flagTTSp = false;
    } else {
        flagTTSp = true;
    }
    console.log(flagTTSp);
});

document.getElementById("NavegacionPorVoz").addEventListener("click", function() {
    if(textcomandoInicio.includes('checked')) {
        flagVozp = false;
    } else {
        flagVozp = true;
    }
    console.log(flagVozp);
});

document.getElementById("aplicarCambios").addEventListener("click", function() {
    console.log('Funcion Aplicar Cambios');
    apply(1);
});

document.getElementById("pruebaVoz").addEventListener("click", function() {
    console.log('Funcion Prueba Voz');
    voiceTest();
});