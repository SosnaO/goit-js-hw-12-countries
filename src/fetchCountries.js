import { debounce } from 'lodash';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import "@pnotify/core/dist/PNotify.css";

import './sass/main.scss';

import CountriesList from './countriesList.hbs';
import CountriesTPL from './countries.hbs';

const refs = {
  cardContainer: document.querySelector('.card-container'),
  enterContainer: document.querySelector('#name-input'),
}
refs.enterContainer.addEventListener('input', debounce(onEnterContainer,500));

function onEnterContainer(event) {
   resetPage();
  event.preventDefault();
  const searchQuery = event.target.value;

  function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => {
      return response.json();
    })
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
          delay: 2000,
        });
        return;
      }
      if (countries.status === 404) {
         error({
          text: `Error 404!!!`,
          delay: 2000,
        });
        return;
      }
    })

    .catch(error => {
        console.log("Error 404") ;
    });
}
function renderCountriesCard(name) {
  const markup = CountriesTPL(name);
    refs.cardContainer.innerHTML = markup;
}
function renderCountriesList(name) {
  const markup = CountriesList(name);
  refs.cardContainer.innerHTML = markup;
  }

function resetPage() {
   refs.cardContainer.innerHTML = '';
}


