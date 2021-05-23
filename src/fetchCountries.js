import { debounce } from 'lodash';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
//import '@pnotify/core/dist/Material.css';
import "@pnotify/core/dist/PNotify.css";
//fetch('https://restcountries.eu/#api-endpoints-name')
//import './styles.css';
import './sass/main.scss';
//import CountriesTPL from './index.html';
import CountriesList from './countriesList.hbs';
import CountriesTPL from './countries.hbs';
//import CountriesList from './countriesList.hbs';
const refs = {

  cardContainer: document.querySelector('.card-container'),
  enterContainer: document.querySelector('#name-input'),

}
console.log(refs.enterContainer)
//const debounce = require('lodash.debounce');

refs.enterContainer.addEventListener('input', debounce(onEnterContainer,500));

function onEnterContainer(event) {
   resetPage();
  event.preventDefault();
  //const form = event.currentTarget;
  const searchQuery = event.target.value;

  //console.log(searchQuery)


function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => {
      // if (response.ok) return response.json();
      // throw new Error('Error fetching data');
      return response.json();

    })
  // .catch(error => {
  //       console.error("Error:",error) ;
  //   });

}

  fetchCountries(searchQuery)
    .then(countries => {
      if (countries.length === 1) {
        renderCountriesCard(countries);
        return;
      }
      if (countries.length > 1 && countries.length <= 10) {
        renderCountriesList(countries);
        return;
      }
      if (countries.length > 10) {
        error({
          text: `Too many matches found. Pleaise enter a more specific query!`,
          // mode: 'light',
          // closer: true,
          // sticker: false,
          // hide: true,
          delay: 2000,
        });
        return;
      }
      if (countries.status === 404) {
         error({
          text: `Error 404!!`,
          // mode: 'light',
          // closer: true,
          // sticker: false,
          // hide: true,
          delay: 2000,
        });
        return;
      }
    })

    .catch(error => {
        alert("Error 404") ;
    });
}
  //refs.enterContainer.textContent = event.currentTarget.value;

    //console.log(onEnterContainer)



function renderCountriesCard(name) {
  const markup = CountriesTPL(name);
    refs.cardContainer.innerHTML = markup;
}
function renderCountriesList(name) {
  const markup = CountriesList(name);
  refs.cardContainer.innerHTML = markup;
  //cardContainer.innerHTML = contriesList;
}

function onFetchError() {
  alert("Error!!!!");
  };
function resetPage() {
   refs.cardContainer.innerHTML = '';
}


