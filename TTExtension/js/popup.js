window.onload = prueba();

function prueba() {
    var idioma = document.getElementById("idiomas");
    var voz = document.getElementById("voces");
    var textToSpeech = document.getElementById("TextToSpeech");
    var navegacionPorVoz =document.getElementById("NavegacionPorVoz")
    var val1 = outer(idioma);
    var val2 = outer(voz);
    var val3 = outer(textToSpeech);
    var val4 = outer(navegacionPorVoz);
    
    let msg = {
        data1: val1,
        data2: val2,
        data3: val3,
        data4: val4
    }
    chrome.storage.sync.set({'aidioma': msg},function() {
        console.log("Mensaje Enviado");
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

document.getElementById("test").addEventListener("click", function() {
    test();
});