var express = require('express');
var request = require('request');
var http = require('http');
const systemSleep = require('system-sleep');
var app = express();
var PORT = 9000;
var destServer="192.168.1.131";
var destPORT=8000;
var endpoint="/logdata";        //var endpoint="/tepelco";
var a=true;
var dataValue=0;
var ms=1500;
var deviceArray=[   ['4HAA','MB-LR-PLV',10 ,20 ,30 ,0 ,50 ,60, 70 ,80 ,90 ,100 ,0 ,0 ,0,19 ,120 ,130]];    //['4HAA','MB-LR-PLV',10 ,20 ,30 ,40 ,50 ,60],    
                    // ['4F4PC','MPLC',11 ,25 ,28 ,48 ,55 ,72],
                    // ['MCP','TEP',28 ,32 ,30 ,33 ,76 ,100],
                    // ['LPC','MPLC',27 ,27 ,27 ,27 ,27 ,27],
                    // ['STM411','TEP',10 ,20 ,30 ,40 ,50 ,80],
                    // ['F57HC','MPLC',10 ,20 ,30 ,40 ,50 ,60],
                    // ['STM103','TEP',10 ,20 ,30 ,40 ,50 ,60],
                    // ['ESP32','MEFL',10 ,20 ,30 ,40 ,50 ,60]];
var devNum=0;
while(1)
{
        console.log("Sending information of device id= "+ deviceArray[devNum][0]);
        this.dataValue=Math.floor(Math.random() * 10);//this.dataValue=2;//
        console.log(this.dataValue);
        envio(deviceArray[devNum], this.dataValue);
        while (!a)
        {systemSleep(ms);}
        // devNum++;
        // if (devNum==7) devNum=0;
}

function envio(devARR,devNumID)
{  
    a=false;
    const timeoutId = setTimeout(function(){ a=true; console.log("No answer from Server")}, 5000);
    request.post(
        'http://'+destServer+':'+destPORT+endpoint,
        { json: {   id: devARR[0],
            tipo: devARR[1],
            d1:  Math.floor(Math.random() * 20) + devARR[2],
            d2: Math.floor(Math.random() * 10) + devARR[3],
            d3: Math.floor(Math.random() * 5)  + devARR[4],
            d4: Math.floor(Math.random() * 2)*10  + devARR[5],
            d5: Math.floor(Math.random() * 1)  + devARR[6],
            d6: Math.floor(Math.random() * 5)  + devARR[7],
            d7: Math.floor(Math.random() * 2)  + devARR[8],
            d8: Math.floor(Math.random() * 1)  + devARR[9],
            d9: Math.floor(Math.random() * 5)  + devARR[10],
            d10: Math.floor(Math.random() * 2)  + devARR[11],
            d11:  Math.floor(Math.random() *2) + devARR[12],
            d12: Math.floor(Math.random() * 2) + devARR[13],
            d13: Math.floor(Math.random() * 2)  + devARR[14],//d13: 0,//
            d14: Math.floor(Math.random() * 2)  + devARR[15],
            d15: Math.floor(Math.random() * 1)  + devARR[16],
            d16: Math.floor(Math.random() * 5)  + devARR[17],
            devId: devNumID
         } },
        // { json: {   id: devARR[0],
        //     tipo: devARR[1],
        //     dp_cartucho:  Math.floor(Math.random() * 20)/10 + devARR[2],
        //     dp_filtro: Math.floor(Math.random() * 10) + devARR[3],
        //     ciclo_ev1: Math.floor(Math.random() * 5)  + devARR[4],
        //     ciclo_ev2: Math.floor(Math.random() * 2)  + devARR[5],
        //     ciclo_ev3: Math.floor(Math.random() * 1)  + devARR[6],
        //     ciclo_ev4: Math.floor(Math.random() * 5)  + devARR[7],
        //     ciclo_ev5: Math.floor(Math.random() * 2)  + devARR[8],
        //     ciclo_ev6: Math.floor(Math.random() * 1)  + devARR[9],
        //     ciclo_ev7: Math.floor(Math.random() * 5)  + devARR[10],
        //     ciclo_ev8: Math.floor(Math.random() * 2)  + devARR[11],
        //     devId: 2
        //  } },
        // { json: {   id: devARR[0],
        //             tipo: devARR[1],
        //             value:  Math.floor(Math.random() * 20)/10 + devARR[2],
        //             value2: Math.floor(Math.random() * 10) + devARR[3],
        //             value3: Math.floor(Math.random() * 5)  + devARR[4],
        //             value4: Math.floor(Math.random() * 2)  + devARR[5],
        //             value5: Math.floor(Math.random() * 1)  + devARR[6],
        //             value6: Math.floor(Math.random() * 20)/10 + devARR[7]
        //          } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Body response = "+ JSON.stringify(body));
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