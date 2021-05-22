import { debounce } from 'lodash';

//fetch('https://restcountries.eu/#api-endpoints-name')
import './sass/main.scss';
//import CountriesTPL from './index.html';
import CountriesTPL from './countries.hbs';

const refs = {

  cardContainer: document.querySelector('.card-container'),
  enterContainer: document.querySelector('#name-input'),

}
console.log(refs.enterContainer)
//const debounce = require('lodash.debounce');

refs.enterContainer.addEventListener('input', debounce(onEnterContainer,500));

function onEnterContainer(event) {
  event.preventDefault();
  //const form = event.currentTarget;
  const searchQuery = event.target.value;

 console.log(searchQuery)

  fetchCountries(searchQuery)
    .then(renderCountriesCard)
    .catch(error => {
      console.log(error);
    });


  //refs.enterContainer.textContent = event.currentTarget.value;

}
//console.log(onEnterContainer)

function fetchCountries(searchQuery) {

  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => {
      return response.json();
    })
    // .then(renderCountriesCard)
    // .catch(error => {
    //   console.log(error);
    // });

}

function renderCountriesCard(name) {
  const markup = CountriesTPL(name);
    refs.cardContainer.innerHTML = markup;

}
