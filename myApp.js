// My script fo the weather dash board - Rodolfo Diaz Oct-17-2020
var City="";
var KEY="12091064ea4f5182ef297c189602e959"
var qUrl= "";
var Clst,Cities=[];
var longi,lati=0;

$(document).ready(function (){
    var Ctime=moment();
    var Units="imperial";

    // if there is historical data then load it 
   var isData=localStorage.getItem("City-list");
   
   if (isData) {
    
    Clst=JSON.parse(isData)
     for(i=0; i<Clst.length; i++){          
             $("#city"+i).text(Clst[i].Ct);
         }
    }
   
    $("#search").on("click",fetchWeather);

    function fetchWeather(City){
        $(".target1").empty(); // removes all previous information from the cards 
     City=$("#citySelect").val();
     Cities={Ct:City};
     writeMem();
        // qUrl="http://api.openweathermap.org/data/2.5/forecast?q="+City+"&appid="+KEY;
        qUrl="http://api.openweathermap.org/data/2.5/weather?q="+City+"&appid="+KEY+"&units="+Units;
        // calling our Ajax function 
        $.ajax({
            url:qUrl,
            method:"GET",
        }).then(function(response){ 
            longi=response.coord.lon;
            lati=response.coord.lat;
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
             
             var iconurl="http://openweathermap.org/img/wn/"+iconCode+"@2x.png";
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


            //creating the url for uv index function 
    var Vurl="http://api.openweathermap.org/data/2.5/uvi?lat="+lati+"&lon="+longi+"&appid="+KEY;   
    // calling our Ajax function for uv index
     $.ajax({
         url:Vurl,
         method:"GET",
     }).then(function(answer){     
console.log(answer);
var idx=answer.value
$("#UV").text(idx);
//all conditions for the uv index
if(idx<3){
return false;
}
else if (idx<6){
$("#UV").removeClass("badge-success");
$("#UV").addClass("badge-warning");
}
else {
$("#UV").removeClass("badge-success");
$("#UV").addClass("badge-danger");
}    



//bracket for uv index
     });

 
        });
/// calling the 5 day forecast 
 var fUrl="http://api.openweathermap.org/data/2.5/forecast?q="+City+"&appid="+KEY+"&units="+Units;
// // calling our Ajax function 
 $.ajax({
     url:fUrl,
     method:"GET",
 }).then(function(prompt){
              //this part we will recreate the cards dynamically 
     for (i=3; i<36;i+=8){
        var day=moment(prompt.list[i].dt,"X").format("ll");
        var icon2=prompt.list[i].weather[0].icon;
        var icon2Url="http://openweathermap.org/img/wn/"+icon2+"@2x.png";
    
        var div1=$("<div class='col-sm mycard'>");
        var div2=$("<div class='card bg-transparent border-light '>");
        var div3=$("<div class='card-body bgcrd'>");
        var div4=$("<h5 class='card-title' id='tit1'>").text(day); // add here the day of forecast
        var im1=$("<img id='imicon' alt='iconimage'>");
        im1.attr("src",icon2Url);
        var im2=$("<Span id='cCon'>");
        var im3=$("<h6>").text(prompt.list[i].weather[0].description); //ad icon and description
        var list=$("<ul>");
        var mem1=$("<li id='tpMax'>").text("Temp Max: "+prompt.list[i].main.temp_max+" F");
        var mem2=$("<li id='tpMin'>").text("Humidity: "+prompt.list[i].main.humidity+"%");
        var mem3=$("<li id='wnSpd'>").text("Wind: "+prompt.list[i].wind.speed+" MPH");
        var ftr=$("<p class='card-text'>");
        var ftr2=$("<small class='text-muted'>").text("Weather Forecast at Noon") /// add last updated 
        // appending all blocks
        div3.append(div4);
        div3.append(im1).append(im2).append(im3);
        list.append(mem1);
        list.append(mem2);
        list.append(mem3);
        div3.append(list);
        div3.append(ftr).append(ftr2);
        div1.append(div2).append(div3);
        //rendering the bocks 
        $(".target1").append(div1);
      
    }
    


//this bracket is for the 2nd Ajax function 
    })
//fetching for UV index




//this bracket is for fetch weather function
    }




});

 function writeMem() {
//     //if localStore is empty then stringify Cities
     var isData=localStorage.getItem("City-list");
     if(isData===null){
         localStorage.setItem("City-list",JSON.stringify([Cities]));
     }
     else{
          // if there is data in localStorage then convert booking into array and assign it to Clst
         Clst=JSON.parse(isData);
         // now we can add the updated array Cities into the Clst
             Clst.push(Cities);
             //adding the updating array to our Clinch localStorage
             localStorage.setItem("City-list",JSON.stringify(Clst));
         }
         loadHis();
     };

function loadHis(){
    // write on the list of cities 
    isData=localStorage.getItem("City-list");
    Clst=JSON.parse(isData);
       for(i=0; i<Clst.length; i++){
              $("#city"+i).text(Clst[i].Ct);}
 };