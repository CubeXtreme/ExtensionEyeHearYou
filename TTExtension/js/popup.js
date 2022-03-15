document.getElementById("test").addEventListener("click", function() {
    test();
});

function test() {
    console.log("Entra funcion");
    let value = "Esto deberia cambiar";
    chrome.storage.sync.set({
        'myValue': value
    }, function() {
        console.log('Value is set to ' + value);
    });
}