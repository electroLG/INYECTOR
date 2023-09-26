var express = require('express');
var request = require('request');
var http = require('http');
const systemSleep = require('system-sleep');
var app = express();
var PORT = 9000;
var destServer="localhost";
var destPORT=8000;
var endpoint="/inyection";
var a=true;
var dataValue=0;
var ms=300;
var deviceArray=[   ['4HAA','MB-LR-PLV',10 ,20 ,30 ,40 ,50 ,60],
                    ['4F4PC','MPLC',11 ,25 ,28 ,48 ,55 ,72],
                    ['MCP','TEP',28 ,32 ,30 ,33 ,76 ,100],
                    ['LPC','MPLC',27 ,27 ,27 ,27 ,27 ,27],
                    ['STM411','TEP',10 ,20 ,30 ,40 ,50 ,80],
                    ['F57HC','MPLC',10 ,20 ,30 ,40 ,50 ,60],
                    ['STM103','TEP',10 ,20 ,30 ,40 ,50 ,60],
                    ['ESP32','MEFL',10 ,20 ,30 ,40 ,50 ,60]];
var devNum=0;
while(1)
{
        console.log("Sending information of device id= "+ deviceArray[devNum][0]);
        envio(deviceArray[devNum]);
        while (!a)
        {systemSleep(ms);}
        devNum++;
        if (devNum==7) devNum=0;
}

function envio(devARR)
{  
    a=false;
    const timeoutId = setTimeout(function(){ a=true; console.log("No answer from Server")}, 5000);
    request.post(
        'http://'+destServer+':'+destPORT+endpoint,
        { json: {   id: devARR[0],
                    tipo: devARR[1],
                    value:  Math.floor(Math.random() * 20)/10 + devARR[2],
                    value2: Math.floor(Math.random() * 10) + devARR[3],
                    value3: Math.floor(Math.random() * 5)  + devARR[4],
                    value4: Math.floor(Math.random() * 2)  + devARR[5],
                    value5: Math.floor(Math.random() * 1)  + devARR[6],
                    value6: Math.floor(Math.random() * 20)/10 + devARR[7]
                 } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Body response= "+ JSON.stringify(body));
                clearTimeout(timeoutId);
                a=true;
            }
        }
    );
}

app.use(express.json());

app.listen(PORT, function(req, res) {
    console.log("Inyector working on port " + PORT);
});