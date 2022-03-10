var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
var phrases = ['inicio', 'fin', 'subir página', 'bajar página', 'atrás', 'recargar', 'f5'];
var phrasePara = document.querySelector('.phrase');
var resultPara = document.querySelector('.result');
var diagnosticPara = document.querySelector('.output');
var testBtn = document.querySelector('button');
var test = 0;
var aumento = (document.body.scrollHeight / 5) | 0;

function randomPhrase() {
  var number = Math.floor(Math.random() * phrases.length);
  return number;
}

String.prototype.removeCharAt = function(i) {
	var tmp = this.split('');
	tmp.splice(i - 1, 1);
	return tmp.join('');
}

function sonido() {
	var audio = new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-77317/zapsplat_fantasy_magic_wand_ping_single_fairy_002_80469.mp3');
	audio.play();
}

function testSpeech() {
	sonido();
	var phrase = phrases[randomPhrase()];
	var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase + ';';
	var recognition = new SpeechRecognition();
	var speechRecognitionList = new SpeechGrammarList();
	speechRecognitionList.addFromString(grammar, 1);
	recognition.grammars = speechRecognitionList;
	recognition.lang = 'es-MX';
	recognition.interimResults = false;
	recognition.maxAlternatives = 1;
	recognition.start();
	console.log("Test");
	recognition.onresult = function(event) {
		var speechResult = event.results[0][0].transcript.toLowerCase();
		tam = speechResult.length;
		if (speechResult.indexOf(".") != -1) {
			var NspeechResult = speechResult.removeCharAt(tam);
			speechResult = NspeechResult;
		}
		console.log(speechResult);
		console.log('Confidence: ' + event.results[0][0].confidence);
		//if (speechResult == 'recargar' || speechResult == 'f5') {
		//	test = 0;
		//	window.scrollTo(0, 0);
		//	console.log(test);
		//	location.reload();

		//}
		if (speechResult == 'inicio.' || speechResult == 'inicio' || speechResult == 'recargar' || speechResult == 'f5' || speechResult == "f 5") {
			test = 0;
			window.scrollTo(0, 0);
			console.log("test= "+test);
			if (speechResult == 'recargar' || speechResult == 'f5' || speechResult == "f 5"){
					location.reload();
			}
		}
		if (speechResult == 'fin' || speechResult == 'fin.') {
			test = document.body.scrollHeight;
			window.scrollTo(0, document.body.scrollHeight);
			console.log(test);
		}
		if (speechResult == 'subir página' || speechResult == 'subir página.') {
			if (test > 0) {
				test -= aumento;
				window.scrollTo(0, test);
				console.log("test= "+test);
			}
		}
		if (speechResult == 'bajar página' || speechResult == 'bajar página.') {
			if (test < document.body.scrollHeight) {
				test += aumento;
				window.scrollTo(0, test);
				console.log("test= "+test);
			}
		}
		if (speechResult == 'atrás' || speechResult == 'atrás.') {
			window.history.back()
			console.log(test);
		}
	}
	recognition.onspeechend = function() {
		recognition.stop();
	}
	recognition.onerror = function(event) {
		console.error(event.error);
	}
	recognition.onaudiostart = function(event) {
		console.log('SpeechRecognition.onaudiostart');
	}
	recognition.onaudioend = function(event) {
		console.log('SpeechRecognition.onaudioend');
	}
	recognition.onend = function(event) {
		console.log('SpeechRecognition.onend');
	}
	recognition.onnomatch = function(event) {
		console.log('SpeechRecognition.onnomatch');
	}
	recognition.onsoundstart = function(event) {
		console.log('SpeechRecognition.onsoundstart');
	}
	recognition.onsoundend = function(event) {
		console.log('SpeechRecognition.onsoundend');
	}
	recognition.onspeechstart = function(event) {
		console.log('SpeechRecognition.onspeechstart');
	}
	recognition.onstart = function(event) {
		console.log('SpeechRecognition.onstart');
	}
}
setInterval(testSpeech,8000);