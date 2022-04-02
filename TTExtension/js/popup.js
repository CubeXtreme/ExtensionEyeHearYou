window.onload = apply();

function apply() {
    var flagVoice, flagTTS;
    var idioma = document.getElementById("idiomas");
    var selIdioma = idioma.options[idioma.selectedIndex].text;
    var voz = document.getElementById("voces");
    var selVoz = voz.options[voz.selectedIndex].text;
    var textToSpeech = document.getElementById("TextToSpeech");
    var navegacionPorVoz =document.getElementById("NavegacionPorVoz")
    var val1 = outer(voz);
    var val2 = outer(textToSpeech);
    var val3 = outer(navegacionPorVoz);
    var val4 = selIdioma;
    var val5 = selVoz;
    if(val2.includes('checked')) {
        flagTTS = true;
    } else {
        flagTTS = false;
    }
    if (val3.includes('checked')) {
        flagVoice = true;
    } else {
        flagVoice = false;
    }
    let msg = {data1: val1,data2: val2,data3: val3,data4: val4,data5: val5, banderaTTS:flagTTS, banderaVoice: flagVoice}
    chrome.storage.sync.set({'container': msg},function() {
        console.log("Container Enviado");
    });
}

function voiceTest() {
    var flagTTS;
    var textToSpeech = document.getElementById("TextToSpeech");
    var funcionalidad = outer(textToSpeech);
    if(funcionalidad.includes('checked')) {
        flagTTS = true;
    } else {
        flagTTS = false;
    }
    var voz = document.getElementById("voces");
    var selVoz = voz.options[voz.selectedIndex].text;
    let mesange = {dato1:selVoz, bandera: flagTTS};
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

document.getElementById("aplicarCambios").addEventListener("click", function() {
    console.log('Funcion Aplicar Cambios');
    apply();
});

document.getElementById("pruebaVoz").addEventListener("click", function() {
    console.log('Funcion Prueba Voz');
    voiceTest();
});