const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/WeatherProject'));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")

});

app.post("/",function(req,res){
    //console.log(req.body.cityName);
    //console.log("Post request recieved");
    const query=req.body.cityName;
    const apiKey="71d16f3ff8a7314da29c9282bc63d330";
    const unit="metric";
    const urll="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(urll,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
        const weatherData=JSON.parse(data);
        //console.log(weatherData);
        const temp=weatherData.main.temp;
        const feelsLike=weatherData.weather[0].description;
        const mintemp=weatherData.main.temp_min;
        const maxtemp=weatherData.main.temp_max;
        const iconn=weatherData.weather[0].icon;
        const longg=weatherData.coord.lon;
        const latt=weatherData.coord.lat;
        const countt=weatherData.sys.country;
        const pressu=weatherData.main.pressure;
        const humi=weatherData.main.humidity;
        const imageurll="http://openweathermap.org/img/wn/"+iconn+"@2x.png";
        console.log(temp,"\n",feelsLike);
        res.write("<p>.</p>");
        res.write("<h1>The temperature in "+query+" is "+temp+" degree Celcius.</h1>");
        res.write("<p>-- Co-ord --</p>");
        res.write("<p>Long: "+longg+"</p>");
        res.write("<p>Lat: "+latt+"</p>");
        res.write("<p>-- The weather is currently "+feelsLike+" --</p>");
        res.write("<p>-- Minimum temerpature ("+query+"): "+mintemp+" --</p>");
        res.write("<p>-- Maximum temerpature ("+query+"): "+maxtemp+" --</p>");
        res.write("<p>-- Country: "+countt+" --</p>");
        res.write("<p>-- Pressure: "+pressu+" --</p>");
        res.write("<p>-- Humidity: "+humi+" --</p>");
        res.write("...........................................<br>");
        res.write("...<img src="+imageurll+">...<br>");
        res.write("...........................................<br>");
        res.send();
   })

});
//res.send("Server is up and running.");


});

app.listen(3000,function(){
    console.log("Server running on port 3000.\nOpen your browser and type localhost:3000.");
})