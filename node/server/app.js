var express = require('express');
var app = express();

app.use(express.static(__dirname + "/public"));
app.set('views', __dirname);
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});
app.listen(8080);

var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({
    port: 8081
  });

let gpio = require('./workshop.js');

wss.on('connection', function (ws) {
  connection = ws;

  console.log('Client connected');
  gpio.init();

  // Refresh state every second
  let refreshInterval = setInterval(() => {
    ws.send(JSON.stringify({ 'light': 'rot', 'state': gpio.getStateRequest('rot') }));
    ws.send(JSON.stringify({ 'light': 'gelb', 'state': gpio.getStateRequest('gelb') }));
    ws.send(JSON.stringify({ 'light': 'gruen', 'state': gpio.getStateRequest('gruen') }));
  }, 1000);


  ws.on('message', function (message) {
    console.log('Received Message: ' + message);
    let messageStruct = JSON.parse(message);
    if (messageStruct.operation === 'on') {
      console.log('Switching LED on');
      gpio.stateChange(messageStruct.light, 'on');
      let response = JSON.stringify({ 'light': messageStruct.light, 'state': gpio.getStateRequest(messageStruct.light) });
      console.log('Sending response ', response);
      ws.send(response);
    } else if (messageStruct.operation === 'off') {
      console.log('Switching LED off');
      gpio.stateChange(messageStruct.light, 'off');
      let response = JSON.stringify({ 'light': messageStruct.light, 'state': gpio.getStateRequest(messageStruct.light) });
      console.log('Sending response', response);
      ws.send(response);
    } else if (messageStruct.operation === 'blink') {
      console.log('Blink LED: ', messageStruct.amount, ' times');
      gpio.blinkChange(messageStruct.light, messageStruct.amount);
    } else if(messageStruct.operation === 'switchTrafficLight') {
      gpio.switchTrafficLight(messageStruct.light);   
    }
  });
  ws.on('close', function () {
    if(refreshInterval != null) {
      clearInterval(refreshInterval);
    }
    console.log('Client disconnected');
  });
});
