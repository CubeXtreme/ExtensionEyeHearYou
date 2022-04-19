var mensaje;

chrome.runtime.onMessage.addListener(receiver);

function receiver(request, sender, sendResponse) {
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
    let msgResp = {
        text: lol
    }
    sendResponse(msgResp);
}