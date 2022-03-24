window.onload = prueba();

function prueba() {
    var idioma = document.getElementById("idiomas");
    var voz = document.getElementById("voces");
    var val1 = outer(idioma);
    var val2 = outer(voz);
    let msg = {
        data1: val1,
        data2: val2
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