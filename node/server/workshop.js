// Hier muss geprüft werden welche LED geschaltet werden soll und
// dann die Funktion schalteRot(status)/ schalteGelb(status) 
// oder schalteGruen(status) aufgerufen werden.
function schalteLED(ledName, status) {
  // TODO Aufgabe 1


}



// Die gelbe LED soll so oft blinken, wie der Wert 'anzahl' angibt.
// Dafür wird sie an und wieder ausgeschaltet. Zwischen den Schaltvorgängen soll 
// mindestens eine Sekunde gewartet werden.
// Hinweis: gewartet wird mit 'await sleep(3);'
async function blinkeLED(anzahl) {
  // TODO Aufgabe 2


}

// Die LED soll zu dem Wert von 'ledName' geschaltet werden.
// Der Wert ist entweder 'red' oder 'green'.
// Hinweis: gewartet wird mit 'await sleep(3);'
async function schalteAmpelZu(ledName) {
  // TODO Aufgabe 3


}















































//
// !!!!!!!!!!!!!!!!!
// TECHNICAL STUFF. 
// DON'T TOUCH THIS
// !!!!!!!!!!!!!!!!!
// 
module.exports = {
  init: function () {
    schalteLED('gruen', 'on');
    schalteLED('gelb', 'off');
    schalteLED('rot', 'off');
  },
  stateChange: function (light, status) {
    schalteLED(light, status);
  },
  blinkChange: function (light, amount) {
    blinkeLED(amount);
  },
  getStateRequest: function (light) {
    return getState(light);
  },
  switchTrafficLight: function (light) {
    return schalteAmpelZu(light);
  }

};

var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED_RED = new Gpio(14, 'out'); //use GPIO pin and specify that it is output
var LED_YELLOW = new Gpio(15, 'out'); //use GPIO pin and specify that it is output
var LED_GREEN = new Gpio(18, 'out'); //use GPIO pin and specify that it is output

function getState(light) {
  // TODO diese Methode kann im Kurs implementiert werden
  let state = null;
  if ('rot' === light) {
    state = LED_RED.readSync();
  } else if ('gelb' === light) {
    state = LED_YELLOW.readSync();
  } else if ('gruen' === light) {
    state = LED_GREEN.readSync();
  }
  console.log('State: ', state, ' returning', state === 0 ? "off" : "on");
  return state === 0 ? "off" : "on";
}


let sleep = function (seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

function schalteRot(status) {
  LED_RED.writeSync(status === 'off' ? 0 : 1);
}
function schalteGelb(status) {
  LED_YELLOW.writeSync(status === 'off' ? 0 : 1);
}
function schalteGruen(status) {
  LED_GREEN.writeSync(status === 'off' ? 0 : 1);
}