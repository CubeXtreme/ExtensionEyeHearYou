console.log("Chrome Extension Go?");

function test() {
    console.log("Entra funcion");
    let message = {
        text: "hola",
        data: "No se, lo que sea"
    };
    chrome.runtime.sendMessage(message);
}