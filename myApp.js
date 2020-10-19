// My script fo the weather dash board - Rodolfo Diaz Oct-17-2020
var City="";
var KEY="12091064ea4f5182ef297c189602e959"

var qUrl= "";

$(document).ready(function (){
    
    $("#search").on("click",fetchWeather);

    function fetchWeather(City){
     City=$("#citySelect").val();
      
        qUrl="http://api.openweathermap.org/data/2.5/forecast?q="+City+"&appid="+KEY;
        // calling our Ajax function 
        $.ajax({
            url:qUrl,
            method:"GET",
        }).then(function(response){
            console.log(response.city.name+","+response.city.country);
            console.log(response);
            $("#cityName").text(response.city.name+","+response.city.country);


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

