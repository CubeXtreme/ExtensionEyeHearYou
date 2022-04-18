var mensaje;

chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse) {
    var lol = "";
    if (request.mensaje === "switches") {
        var opciones = request.dato;
        switch (opciones) {
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
        lol = "Switches";
    }
    if (request.mensaje === "Hola") {
        testss = "Hola Mundo";
        let envia = {
            test: testss
        }
        chrome.storage.sync.set({
            'pruebas': envia
        }, function() {
            
        });
        console.log("Salio speak!");
        lol = "TTS";
    }
    let msgResp = {
        text: lol
    }
    sendResponse(msgResp);
}