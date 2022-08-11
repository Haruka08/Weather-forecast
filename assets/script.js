var search = document.getElementById('search');
var city = document.getElementById('city')

function getApi() {
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city.value + '&limit=5&appid=9930c8e1ad3e8334e459a1c1a853b1dd';
  
  console.log(requestUrl);

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data[1])
      console.log(data[1].lat)
      console.log(data[1].lon)
      console.log(data[1].name)
      $('h3#city').html(data[1].name); 
    
      var history = data[1].name
      $("ol").append($("<button type=button class=btn btn-light history>" + history + "</button>"))
     
    var i = 0
    var historyNo = i++
      console.log(i++)
        localStorage.setItem("history" + i+1, history)

      var current = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data[1].lat + '&lon=' + data[1].lon + '&units=metric&appid=9930c8e1ad3e8334e459a1c1a853b1dd';
      console.log(current);

      var forecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + data[1].lat + '&lon=' + data[1].lon + '&units=metric&appid=9930c8e1ad3e8334e459a1c1a853b1dd';
      console.log(forecast);

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

      return fetch(forecast) 
      .then (function (response){
        return response.json();
      })
      .then (function (data){
        console.log(data)
        for (var i = 0; i < data.list.length; i+=8){
          var forecastedPresent = moment.unix(data.list[0].dt).utc().format('HH')
          var forecastedTime = moment.unix(data.list[i].dt).utc().format('HH')
          var forecastedDay = moment.unix(data.list[i].dt).utc().format('DD/MM/YYYY')
          var icon = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png"

          if(forecastedTime === forecastedPresent){
            console.log(forecastedDay)
            console.log(icon)
            console.log(temp)
            console.log(humid)
            console.log(wind)
            $('div#day' + i).html(forecastedDay);
            $('img#icon' + i).attr('src', icon);
            $('p#temp' + i).html('Temperature: ' + data.list[i].main.temp);
            $('p#wind' + i).html('Wind: ' + data.list[i].main.humidity);
            $('p#humid' + i).html('Humidity: ' + data.list[i].wind.speed);
          }
        }
      })
    })
  })
  }

$('#search').on('click', getApi);

$('button .history').on('click', function(event) {
  localStorage.getItem('history1')
  console.log(  localStorage.getItem('history1'))
})
