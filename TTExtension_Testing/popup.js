document.getElementById("test").addEventListener("click", function() {
	test();
});

function test() {
    console.log("Entra funcion");
    let message = {
        text: "hola",
        data: "No se, lo que sea"
    };
    chrome.runtime.sendMessage(message);
}