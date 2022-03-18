window.onload = prueba();

function prueba() {
    var elmt = document.getElementById("idiomas");
    var val;
    if (elmt.outerHTML) {
        console.log('outerHTML');
        val = elmt.outerHTML;
    }
    else if (XMLSerializer) {
        console.log('XMLSerializer');
        val = new XMLSerializer().serializeToString(elmt);
    }
    let msg = {
        data: val
    }
    chrome.storage.sync.set({'aidioma': msg},function() {
        console.log("Test");
    });
}

document.getElementById("test").addEventListener("click", function() {
    test();
});