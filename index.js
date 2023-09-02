var express = require('express');
var request = require('request');
var http = require('http');
const systemSleep = require('system-sleep');
var app = express();
var PORT = 9000;
var destPORT=8000;
var endpoint="/inyection";
var a=true;
var dataValue=0;
var ms=300;
while(1)
{
        dataValue=Math.floor(Math.random() * 20) + 70;
        envio('4HAA','MB-LR-PLV');

        while (!a)
        {systemSleep(ms);}

        dataValue=Math.floor(Math.random() * 40) + 150;
        envio('4F4PC','MPLC');

        while (!a)
        {systemSleep(ms);}

        dataValue=Math.floor(Math.random() * 5) + 120;
        envio('STM411','TEP');

        while (!a)
        {systemSleep(ms);}

        dataValue=Math.floor(Math.random() * 3) + 138;
        envio('ESP32','MEFL');

        while (!a)
        {systemSleep(ms);}
        
}


function envio(idb,valb)
{  
    a=false;
    request.post(
        'http://localhost:'+destPORT+endpoint,
        { json: { id: idb,tipo: valb ,valor: dataValue } },//{ json: { id:"4HAAAAA",tipo:"MB-LR-PLC",valor: dataValue } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Respuesta del body = "+ JSON.stringify(body));
                a=true;
            }
        }
    );
}

app.use(express.json());

// var options = {
//     host: 'localhost',
//     path: '/inyection',
//     port: '8000',
//     method: 'POST'
//   };
//   callback = function(response) {
//     var str = ''
//     response.on('data', function (chunk) {
//       str += chunk;
//     });
  
//     response.on('end', function () {
//       console.log(str);
//     });
//   }
//   var req = http.request(options, callback);
//   //This is the data we are posting, it needs to be a string or a buffer
//   req.write("hola");
//   req.end();
// app.get('/inyection',(req,res)=>{
        
//     req.body.json={"id":"4HAAAAA","tipo":"MB-LR-PLC","valor":"Activo"};
//     console.log("Envío");
// });


app.listen(PORT, function(req, res) {
    console.log("Inyector working on port " + PORT);
});