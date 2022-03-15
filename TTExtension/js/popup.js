window.onload = prueba();

function prueba() {
    value = document.getElementById('voces')
    chrome.storage.sync.set({'aidioma': value}, function() {
        console.log(value);
      });
}

document.getElementById("test").addEventListener("click", function() {
    test();
});