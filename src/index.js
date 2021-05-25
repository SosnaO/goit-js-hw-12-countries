import './sass/main.scss';
import { debounce } from 'lodash';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import "@pnotify/core/dist/PNotify.css";
import CountriesList from './countriesList.hbs';
import CountriesTPL from './countries.hbs';
import fetchCountries from './fetchCountries';

const refs = {
  cardContainer: document.querySelector('.card-container'),
  enterContainer: document.querySelector('#name-input'),
}
refs.enterContainer.addEventListener('input', debounce(onEnterContainer,500));
function onEnterContainer(event) {
  resetPage();
  event.preventDefault();
  const searchQuery = event.target.value.trim();

  fetchCountries(searchQuery)
    .then(countries => {
      if (countries.length === 1) {
        renderCountriesCard(countries);
        return;
      }
      if (countries.length >= 2 && countries.length <= 10) {
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
      })

    .catch(onFetchError);
}

  function renderCountriesCard(name) {
    const markup = CountriesTPL(name);
    refs.cardContainer.innerHTML = markup;
    refs.enterContainer.value = '';

  }
  function renderCountriesList(name) {
    const markup = CountriesList(name);
    refs.cardContainer.innerHTML = markup;
  }
  function resetPage() {
    refs.cardContainer.innerHTML = '';
  }
  function onFetchError(err) {
    error({
      text: `${err}`,
      delay: 2000,
    });
  }



