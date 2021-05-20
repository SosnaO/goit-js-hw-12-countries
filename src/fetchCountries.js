

//fetch('https://restcountries.eu/#api-endpoints-name')
fetch("https://restcountries.eu/rest/v2/name/Switzerland")
  .then(response => {
    return response.json();

  })
  .then(name => {
console.log(name)
  })
  .catch(error => {
    console.log(error);

  });


