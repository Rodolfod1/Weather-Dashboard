// My script fo the weather dash board - Rodolfo Diaz Oct-17-2020
var City="";
var KEY="12091064ea4f5182ef297c189602e959"
var rainStat=false;

var qUrl= "";

$(document).ready(function (){
    var Ctime=moment();
    
    $("#search").on("click",fetchWeather);

    function fetchWeather(City){
     City=$("#citySelect").val();
      
        // qUrl="http://api.openweathermap.org/data/2.5/forecast?q="+City+"&appid="+KEY;
        qUrl="http://api.openweathermap.org/data/2.5/weather?q="+City+"&appid="+KEY;
        // calling our Ajax function 
        $.ajax({
            url:qUrl,
            method:"GET",
        }).then(function(response){
            // console.log(response.city.name+","+response.city.country);
            console.log(response);

            
            // adding the city and the country from the response we got 
            $("#cityName").text(response.city.name+","+response.city.country);
            // getting the local current time using the moment.js
            $("#lTime").text(Ctime.format("llll"));
            // to set the local time at destination city
            var theTime=moment.utc().seconds(response.city.timezone);
            // the data is displaye in seconds to utc and we transform it to user friendly date
            $("#daCt").text(theTime.format("llll"));
            //change kelvins to fahrenheit 
            var tnow=((response.list[0].main.temp - 273.15) * 1.80 + 32).toFixed(1)
            $("#cTemp").text("Temp: "+tnow+"F")
            //feeiling 
            var feelnow=((response.list[0].main.feels_like - 273.15) * 1.80 + 32).toFixed(1)
            $("#cFeel").text("Feels like:  "+feelnow+"F");
            
            if (response.list[0].rain===undefined){
               
                $("#cRain").text("Chance of Rain on the next 3hrs: Data not available for this location");
            }
            else {
                
                 var cRain0=(response.list[0].rain["3h"]*10).toFixed(0);
                $("#cRain").text("Chance of Rain on the next 3hrs: "+cRain0+"%");
                 rainStat=true;
            }
          
            




            // var weathericon= response.weather[0].icon;
            // var iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
            // // The date format method is taken from the  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
            // var date=new Date(response.dt*1000).toLocaleDateString();
            // //parse the response for name of city and concanatig the date and icon.
            // $("#cityName").html(response.name +"("+date+")" + "<img src="+iconurl+">");
            // // parse the response to display the current temperature.
            // // Convert the temp to fahrenheit



        })

    }

   











});

