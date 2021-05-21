

//fetch('https://restcountries.eu/#api-endpoints-name')
import './sass/main.scss';
import CountriesTPL from './index.html';



fetch("https://restcountries.eu/rest/v2/name/Switzerland")
  .then(response => {
    return response.json();

  })
  .then(name => {
    console.log(name)
    const markup = CountriesTPL(name);
    console.log(markup);
  })
  .catch(error => {
    console.log(error);

  });


