//299 Thunderstorm https://images.genius.com/4982536b226670f77717d1a71f43efba.1000x750x1.jpg
//499 Drizzle https://img00.deviantart.net/ea88/i/2012/198/6/b/drizzle__by_niki91-d57kcpt.jpg
//599 Rain https://static.pexels.com/photos/110874/pexels-photo-110874.jpeg
//699 Snow https://static.pexels.com/photos/60561/winter-snow-nature-60561.jpeg
//799 Fog https://images.unsplash.com/photo-1444724334165-e7050f2229a1?dpr=1&auto=format&fit=crop&w=376&h=564&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D
//800 Clear http://ak8.picdn.net/shutterstock/videos/723328/thumb/1.jpg
//>800 Cloudy http://sunmodo.com/wp-content/uploads/2015/08/solar-on-cloudy-days.jpg
//appid=a92e2fcb0ca70831c96e8c03414bafbb


$(function() {
  
  var C = false;
  var apiData;
  
  backgroundImg = [ "https://images.genius.com/4982536b226670f77717d1a71f43efba.1000x750x1.jpg", 
                   "https://img00.deviantart.net/ea88/i/2012/198/6/b/drizzle__by_niki91-d57kcpt.jpg", 
                   "https://static.pexels.com/photos/110874/pexels-photo-110874.jpeg", 
                   "https://static.pexels.com/photos/60561/winter-snow-nature-60561.jpeg", 
                   "https://images.unsplash.com/photo-1444724334165-e7050f2229a1?dpr=1&auto=format&fit=crop&w=376&h=564&q=60&cs=tinysrgb&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D", 
                   "http://ak8.picdn.net/shutterstock/videos/723328/thumb/1.jpg", "http://sunmodo.com/wp-content/uploads/2015/08/solar-on-cloudy-days.jpg",
    ]

  function displayTemp(F, C) {
    if(C) return Math.round((F -32) *(5/9)) + "&deg; C";
    return Math.round(F) + "&deg; F";
  }
  

function render(data, C) {
  var currentWeather = data.weather[0].description;
  var currentTemp = displayTemp(data.main.temp, C);
  var icon = data.weather[0].icon;
  
  $("#currentTemp").html(currentTemp);
  $("#currentWeather").html(currentWeather);
  
  var apiIcon = "https://openweathermap.org/img/w/" + icon + ".png";
  $("currentTemp").prepend("<img src=" + apiIcon + ">");
}
  
$.getJSON('https://freegeoip.net/json/').done(function(location) {
                                              console.log(location);
  $("#country").html(location.country_name);
  $("#city").html(location.city);
  $("#Latitude").html(location.latitude);
  $("#Longitude").html(location.longitude);
  
  $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + location.latitude + "&lon=" + location.longitude + "&units=imperial&appid=a92e2fcb0ca70831c96e8c03414bafbb", function(data){
    apiData = data;
    render(apiData, C);
    
    $("#toggle").click(function() {
      C = !C;
      render(apiData, C);
    });
    var id = data.weather[0].id,
        bgIndex,
        backgroundId = [299, 499, 599, 699, 799, 800];
    
    backgroundId.push(id);
    
    bgIndex = backgroundId.sort().indexOf(id);
    console.log(backgroundId);
    
    $('body').css('background-image', 'url(' + backgroundImg[bgIndex] + ')');
    
  }); 
  });
});