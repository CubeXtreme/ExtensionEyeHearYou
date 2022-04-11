var mensaje;

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