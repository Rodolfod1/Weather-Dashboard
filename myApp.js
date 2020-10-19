// My script fo the weather dash board - Rodolfo Diaz Oct-17-2020
var City="";
var KEY="12091064ea4f5182ef297c189602e959"
var rainStat=false;

var qUrl= "";

$(document).ready(function (){
    var Ctime=moment();
    var Units="imperial";
    
    $("#search").on("click",fetchWeather);

    function fetchWeather(City){
     City=$("#citySelect").val();
      
        // qUrl="http://api.openweathermap.org/data/2.5/forecast?q="+City+"&appid="+KEY;
        qUrl="http://api.openweathermap.org/data/2.5/weather?q="+City+"&appid="+KEY+"&units="+Units;
        // calling our Ajax function 
        $.ajax({
            url:qUrl,
            method:"GET",
        }).then(function(response){
                     
            // // adding the city and the country from the response we got 
             $("#cityName").text(response.name+","+response.sys.country);
            // // getting the local current time using the moment.js
             $("#lTime").text(Ctime.format("llll")+ "  Your local time.");
            // to set the local time at destination city
             var theTime=moment.utc().seconds(response.timezone);
             // the data is displaye in seconds to utc and we transform it to user friendly date
            $("#daCt").text(theTime.format("llll"));
            // Retrieving the icon per https://openweathermap.org/weather-conditions method
             var iconCode= response.weather[0].icon;
             console.log(iconCode);
             var iconurl="http://openweathermap.org/img/wn/"+iconCode+"@2x.png";
             console.log(iconurl);
            //displaying the current condition statement including the icon
            $("#cCon").text(response.weather[0].description);
            $("#imicon").attr("src",iconurl);
            //displaying temperature 
            var tnow=(response.main.temp).toFixed(1);
             $("#cTemp").text("Temp: "+tnow+"F");
            // //feeiling 
             var feelnow=(response.main.feels_like).toFixed(1);
             $("#cFeel").text("Feels like:  "+feelnow+"F");
             //if there is a snow forecast then :
             if(response.snow){
                $("#cRain").text("Accumulation: "+JSON.stringify(response.snow));
             }
             //if there is ran then:
             if(response.rain){
              $("#cRain").text("Precipitation: "+JSON.stringify(response.rain));
            }
            //if there is no rain neither snow then:
            if(!response.rain&&!response.snow){
                $("#cRain").text("Precipitation: No data available ");
            }
            //displaying humidity 
            $("#wet").text("Humidity: "+response.main.humidity+" %");
            //displaying wind speed 
            $("#Wind").text("Wind Speed: "+response.wind.speed+" MPH");
 
        })
/// calling the 5 day forecast 
 var fUrl="http://api.openweathermap.org/data/2.5/forecast?q="+City+"&appid="+KEY;
// // calling our Ajax function 
 $.ajax({
     url:fUrl,
     method:"GET",
 }).then(function(prompt){

     console.log(prompt);

    })



   


//this bracket is for fetch weather function
    }









});

