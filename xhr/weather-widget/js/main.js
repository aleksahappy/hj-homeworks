const request = new XMLHttpRequest();
request.addEventListener('load', loadWeatherWidget);
request.open('GET', 'https://neto-api.herokuapp.com/weather');
request.send();

function loadWeatherWidget() {
  if (request.status === 200) {
    const response = JSON.parse(request.responseText);
    setData(response);
  }
}
