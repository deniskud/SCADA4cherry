/// UDP server       ///////////////////////
var MD5 = require("crypto-js/md5");
var version=201001.1
var debug=1;
var PORT = 9090;
var KEY=380973332333
//var HOST = '172.22.22.102';
var HOST='127.0.0.1';
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
///////////////////////my function
/////////////////////////////////////
function consolelog(msg){
  if (debug) {
    ts = new Date();
    console.log(ts.getTime()+'. ' + msg);
  }
}
///////////////////////my variables
function hexdump(msg){  
  var tmpstr='.';
  for (var i=0;i<msg.length;i++) {
    if (msg[i]<16 ) tmpstr+='0'+(msg[i].toString(16)) + '.';
    else tmpstr+=(msg[i].toString(16)) + '.';
  }
  return tmpstr;
}
function num2hex1(num){if (num<255) return String.fromCharCode(num); }
function minecmd(msg){
  if (msg.length!=36) return 0;
  id=new Buffer(4);
  data=new Buffer(32);
  for (var i=0;i<4;i++) id[i]=msg[i];
  for (var i=4;i<35;i++) data[i-4]=msg[i];
  for (var i=0;i<16;i++ ){
    if (MD5((id)^(i))==data) return i;
  }
  return 0;
}

///////////////////////server function
server.on('listening', function () {
  lastcmd=0;
  var address = server.address();
  consolelog('* Start UDP Server listening on ' + 
  address.address + ":" + 
  address.port);
});
server.on('message', function (message, remote) {
  var packetResponse=new Buffer('');
  var msglog='';
  consolelog('< rcv from ' + remote.address + ':' + remote.port + 
  ' - [' + hexdump(message) + ']');
  var command=minecmd(message);
  if (command==0) msgResponse='Pnhdlb!';
  else if (command==1)  ;// включаем свет
  else if (command==2)  ;// выключаем свет
  else if (command==3)  ;// блокируем замок
  else if (command==4)  ;// открываем замок
  else if (command==5)  ;// проверяем дверь
  consolelog(consolelog +' from ' + remote.address + ':' + remote.port);

  packetResponse=new Buffer(msgResponse);  

///////// response function
  server.send(packetResponse, 0, packetResponse.length, remote.port, 
  remote.address, function(err, bytes) {
    if (err) throw err;
    consolelog('> snt UDP server message response to ' + remote.address + ':' + 
      remote.port +' [' + hexdump(packetResponse) + ']');
    consolelog('____________');
  });  
});
server.bind(PORT, HOST);

console.log('-----------------------------');
//for (var i=shtok_min;i<shtok_max;i++) consolelog(' '+i+' alp=' +(alpha(i)*180/Math.PI)+' zeta='+(zeta(i)*180/Math.PI));
//console.log(shtoksize(0) + ' ' + shtoksize(Math.PI/2));
//consolelog('rad 0   ='+rad2div(0)+'  0       ='+ div2rad(0));
//consolelog('rad Pi/2='+rad2div(Math.PI/2)+' 524288='+div2rad(524288));
//consolelog('rad Pi  ='+rad2div(Math.PI)+'  1048576='+div2rad(524288+524288));
