

//fetch('https://restcountries.eu/#api-endpoints-name')
import './sass/main.scss';
//import CountriesTPL from './index.html';
import CountriesTPL from './countries.hbs';

const refs = {

  cardContainer:document.querySelector('.body')

}





fetch("https://restcountries.eu/rest/v2/name/Switzerland")
  .then(response => {
    return response.json();

  })
  .then(name => {
    console.log(name)
    const markup = CountriesTPL(name);
    console.log(markup);
    body.innerHTML = markup;
  })
  .catch(error => {
    console.log(error);

  });


