var search = document.getElementById('search');
var city = document.getElementById('city')
// empty array to contain serach history
var cityarray = []

function getApi() {

  var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city.value + '&limit=5&appid=9930c8e1ad3e8334e459a1c1a853b1dd';
  
  console.log(requestUrl);
  // fetch request to obtain the city data of interest as objects
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    // following to extract the data required for the search & enters the city name in html
    .then(function (data) {
      console.log(data[0])
      console.log(data[0].lat)
      console.log(data[0].lon)
      console.log(data[0].name)
      $('h3#city').html(data[0].name); 
    
      // once a city is searched, a button is created under <ol>
      var history = data[0].name
      $("ol").append($("<button type=button class=search-history>" + history + "</button>"))
      $(".search-history").addClass("btn btn-light btn-block")

      // city is added to cityarray & changed into a string
      cityarray.push(history)
        localStorage.setItem("history", JSON.stringify(cityarray))

        // when search history is clicked, the following function is triggered
        $(".search-history").on("click", function (event){
        console.log("History button has been clicked!")
     
        // this is the html content of the search history button clicked
        var cityrecall = $(this).text()
        console.log(cityrecall);

        // the html content obtained from search history entered into Url
        var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityrecall + '&limit=5&appid=9930c8e1ad3e8334e459a1c1a853b1dd';
      
        // fetch request to obtain city data
        fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        // following to extract the data required for the search & enters the city name in html
        .then(function (data) {
          console.log(data[0])
          console.log(data[0].lat)
          console.log(data[0].lon)
          console.log(data[0].name)
          $('h3#city').html(data[0].name);

        var current = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data[0].lat + '&lon=' + data[0].lon + '&units=metric&appid=9930c8e1ad3e8334e459a1c1a853b1dd';
        console.log(current);
      
        var forecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + data[0].lat + '&lon=' + data[0].lon + '&units=metric&appid=9930c8e1ad3e8334e459a1c1a853b1dd';
        console.log(forecast);
      
        // fetch request to get weather data of the specific city & collects the specific data required
        fetch(current)
        .then (function (response){
          return response.json();
        })
        .then (function (data){
          var currentDay = moment.unix(data.dt).utc().format('DD/MM/YYYY')
          console.log(data);
          console.log(data.main.temp);
          console.log(data.main.humidity);
          var icon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
          console.log(data.wind.speed);
          $('h3#today').html(currentDay);
          $('img#icon').attr('src', icon);
          $('p#temp').html('Temperature: ' + data.main.temp);
          $('p#wind').html('Wind: ' + data.main.humidity);
          $('p#humid').html('Humidity: ' + data.wind.speed);
      
        // fetch request to obtain 5 day forecast of the same city
        fetch(forecast)
            .then (function (response){
              return response.json();
            })
            .then (function (data){
              console.log(data)
              // obtains data every 8 objects
              for (var i = 0; i < data.list.length; i+=8){
                var forecastedDay = moment.unix(data.list[i].dt).utc().format('DD/MM/YYYY')
                var icon = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png"
      
                // enters data to specified element/id
                  $('div#day' + i).html(forecastedDay);
                  $('img#icon' + i).attr('src', icon);
                  $('p#temp' + i).html('Temperature: ' + data.list[i].main.temp);
                  $('p#wind' + i).html('Wind: ' + data.list[i].main.humidity);
                  $('p#humid' + i).html('Humidity: ' + data.list[i].wind.speed);
              }
            })
          })
        })
      })
      
      // when a city is manually inputted and searched, the following is triggered
      var current = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data[1].lat + '&lon=' + data[1].lon + '&units=metric&appid=9930c8e1ad3e8334e459a1c1a853b1dd';
      console.log(current);

      var forecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + data[1].lat + '&lon=' + data[1].lon + '&units=metric&appid=9930c8e1ad3e8334e459a1c1a853b1dd';
      console.log(forecast);

      // fetch request to get weather data of the specific city & collects the specific data required
      return fetch(current) 
      .then (function (response){
        return response.json();
      })
      .then (function (data){
        var currentDay = moment.unix(data.dt).utc().format('DD/MM/YYYY')
        console.log(data);
        console.log(data.main.temp);
        console.log(data.main.humidity);
        var icon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
        console.log(data.wind.speed);
        $('h3#today').html(currentDay);
        $('img#icon').attr('src', icon);
        $('p#temp').html('Temperature: ' + data.main.temp);
        $('p#wind').html('Wind: ' + data.main.humidity);
        $('p#humid').html('Humidity: ' + data.wind.speed);

      // fetch request to obtain 5 day forecast of the same city
      return fetch(forecast) 
      .then (function (response){
        return response.json();
      })
      .then (function (data){
        console.log(data)
        for (var i = 0; i < data.list.length; i+=8){

          var forecastedDay = moment.unix(data.list[i].dt).utc().format('DD/MM/YYYY')
          var icon = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png"

            $('div#day' + i).html(forecastedDay);
            $('img#icon' + i).attr('src', icon);
            $('p#temp' + i).html('Temperature: ' + data.list[i].main.temp);
            $('p#wind' + i).html('Wind: ' + data.list[i].main.humidity);
            $('p#humid' + i).html('Humidity: ' + data.list[i].wind.speed);
          }
        })
      }
    )}
    )}
// trigers the getApi function
$('#search').on('click', getApi);