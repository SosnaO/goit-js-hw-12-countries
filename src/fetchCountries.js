

//fetch('https://restcountries.eu/#api-endpoints-name')
fetch("https://restcountries.eu/rest/v2/name/Ukraine")
  .then(response => {
    return response.json();

  })
  .then(name => {
console.log(name)
  })
  .catch(error => {
    console.log(error);

  });


