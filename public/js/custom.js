const getWeather = (location) => {
  fetch('/weather?address=' + encodeURI(location)).then((response) => {
    response.json().then((data) => {
      paintUI(data);
    });
  });
};

const paintUI = (data) => {
  document.getElementById('card').style.display = 'block';

  if (data.error) {
    document.getElementById('location').innerHTML = data.error;
    document.getElementById('temp').innerHTML = '';
    document.getElementById('desc').innerHTML = '';
    document.getElementById('card').style.border = 'none';
    return;
  }
  document.getElementById('card').style.border = '1px solid grey';
  document.getElementById('location').innerHTML = data.location;
  document.getElementById('temp').innerHTML = data.temp;
  document.getElementById('desc').innerHTML = data.description;
};

const weatherForm = document.querySelector('form');
const searchField = document.getElementById('searchField');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = searchField.value;
  getWeather(location);
});
