var ver='200227-01'
var MD5 = require("md5");
var dgram = require('dgram');
var client = dgram.createSocket('udp4');

var incmd = 3; // 0..11

var PORT = 9090;
var HOST='127.0.0.1';
var client = dgram.createSocket('udp4');
var ts = new Date();
var message = new Buffer(36);
var id= new Buffer(4);
var hash = new Buffer(32);
var timeid=ts.getTime();
function hexdump(msg){  
  var tmpstr='.';
  for (var i=0;i<msg.length;i++) {
    if (msg[i]<16 ) tmpstr+='0'+(msg[i].toString(16)) + '.';
    else tmpstr+=(msg[i].toString(16)) + '.';
  }
  return tmpstr;
}


id[3] = timeid  & 0x000000ff;
id[2] = (timeid & 0x0000ff00) >> 8;
id[1] = (timeid & 0x00ff0000) >> 16;
id[0] = (timeid & 0xff000000) >> 24;
console.log(timeid+" " +incmd+" "+ (timeid) );
hash=MD5(timeid ^ incmd);

//for (var i=0; i<32;i++) console.log(hash[i]);


console.log(timeid+" "+ hexdump(id) + " " + hash);

console.log(ts.getTime()+ ' Client start.');

/*
client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
  if (err) throw err;
  ts = new Date();
  console.log(ts.getTime()+' SND UDP client message [' +hexdump(message)+ '] sent to ' + HOST +':'+ PORT);
});

client.on('message', function (message, remote) {
  ts = new Date();
  console.log(ts.getTime()+' RCV '+remote.address + ':' + remote.port +' - [' + hexdump(message)+']');
  client.close();
});
*////////////
