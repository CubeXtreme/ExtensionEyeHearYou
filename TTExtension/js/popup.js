window.onload = prueba();

function prueba() {
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
    let msg = {data1: val1,data2: val2,data3: val3,data4: val4,data5: val5}
    chrome.storage.sync.set({'container': msg},function() {
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