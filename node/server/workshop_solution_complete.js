

function schalteLED(ledName, status) {
  // Hier muss geschaut werden welche LED geschaltet wird und
  // dann die Funktion schalteRot(status)/ schalteGelb(status) oder schalteGruen(status) aufgerufen werden.
  if ('rot' === ledName) {
    schalteRot(status);
  } else if ('gelb' === ledName) {
    schalteGelb(status);
  } else if ('gruen' === ledName) {
    schalteGruen(status);
  }
}

async function blinkeLED(anzahl) {
  // Die gelbe LED soll so oft blinken, wie der Wert 'anzahl' angibt.
  // Dafür wird sie an und wieder ausgeschaltet. Zwischen den Schaltvorgängen soll 
  // mindestens eine Sekunde gewartet werden.
  let zaehler = 0;
  while (zaehler < anzahl) {
    schalteGelb('on');
    await sleep(1);
    schalteGelb('off');
    await sleep(1);
    zaehler = zaehler + 1;
  }
}

async function schalteAmpelZu(ledName) {
  // Die LED soll zu dem Wert von 'ledName' geschaltet werden.
  // Der Wert ist entweder 'rot' oder 'gruen'.
  if ('rot' === ledName) {
    if (getState('rot') === 'off') {
      schalteLED('gelb', 'on');
      schalteLED('gruen', 'off');
      await sleep(3);
      schalteLED('rot', 'on');
      schalteLED('gelb', 'off');
    }
  } else if ('gruen' === ledName) {
    if (getState('gruen') === 'off') {
      schalteGelb('on');
      await sleep(3);
      schalteRot('off');
      schalteGelb('off')
      schalteGruen('on');
    }
  }
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