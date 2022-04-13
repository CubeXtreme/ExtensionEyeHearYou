var mensaje;

// Listen for messages
chrome.runtime.onMessage.addListener(receiver);

// Callback for when a message is received
function receiver(request, sender, sendResponse) {
    var opciones = request.dato;
    switch(opciones) {
        case "11":
            chrome.action.setPopup({
                popup: "popup1.html"
            })
            break;
        case "00":
            chrome.action.setPopup({
                popup: "popup2.html"
            })
            break;
        case "10":
            chrome.action.setPopup({
                popup: "popup3.html"
            })
            break;
        case "01":
            chrome.action.setPopup({
                popup: "popup4.html"
            })
            break;
    }
    let msgResp = {
        text: "Respuesta"
    }
    sendResponse(msgResp);
}

/*
var pB = new Promise(
    function(resolve, reject) {
        console.log("promais");
        setTimeout(
            function() {
                console.log('Dentro funcion 132ms');
                resolve();
            }, 10000);
    });
pB.then(
    function() {
        console.log("Dentro resolve promise");
        chrome.action.setPopup({
            popup: "popup2.html"
        })
    });

var pB = new Promise(
    function(resolve, reject) {
        chrome.storage.sync.get('container', function(result) {
            mensaje = result.container;
        });
        setTimeout(
            function() {
                console.log('Dentro funcion 132ms');
                resolve();
            }, 4000);
    });
pB.then(
    function() {
        console.log("Ready!!");
        console.log(mensaje);
    });
*/