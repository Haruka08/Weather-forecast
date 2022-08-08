var search = document.getElementById('search');
var city = document.getElementById('city')

function getApi() {
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=9930c8e1ad3e8334e459a1c1a853b1dd';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      //Loop over the data to generate a table, each table row will have a link to the repo url

      // for (var i = 0; i < data.length; i++) {

      //   var createTableRow = document.createElement('tr');
      //   var tableData = document.createElement('td');
      //   var link = document.createElement('a');


      //   link.textContent = data[i].html_url;
      //   link.href = data[i].html_url;

 
      //   tableData.appendChild(link);
      //   createTableRow.appendChild(tableData);
      //   tableBody.appendChild(createTableRow);
      // }
    });
}

search.addEventListener('click', getApi);