chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse) {
    var opciones = request.dato;
    switch (opciones) {
        case "11EN":
            chrome.action.setPopup({
                popup: "popup1en.html"
            })
            break;
        case "00EN":
            chrome.action.setPopup({
                popup: "popup2en.html"
            })
            break;
        case "10EN":
            chrome.action.setPopup({
                popup: "popup3en.html"
            })
            break;
        case "01EN":
            chrome.action.setPopup({
                popup: "popup4en.html"
            })
            break;
        case "11ES":
            chrome.action.setPopup({
                popup: "popup1es.html"
            })
            break;
        case "00ES":
            chrome.action.setPopup({
                popup: "popup2es.html"
            })
            break;
        case "10ES":
            chrome.action.setPopup({
                popup: "popup3es.html"
            })
            break;
        case "01ES":
            chrome.action.setPopup({
                popup: "popup4es.html"
            })
            break;
    }
    let msgResp = "Respuesta";
    sendResponse(msgResp);
}