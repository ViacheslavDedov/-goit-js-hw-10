import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import countryInfo from './templates/countryInfo.hbs';
import countryList from './templates/countryList.hbs';

const DEBOUNCE_DELAY = 300;
const refs = {
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
  }
  
  refs.searchBox.addEventListener('input', debounce (searchBox, DEBOUNCE_DELAY));

  function searchBox (evt) {
    const currentCountry = evt.target.value.trim();
  
    if (currentCountry.length === 0) { 
      return;
    }
    fetchCountries (currentCountry)
      .then(appendContriesArray) 
      .catch(() => {
          refs.countryList.innerHTML = '';
          Notify.failure("Oops, there is no country with that name")
    })
  }
  
  function appendContriesArray (countriesArray) {
    if (countriesArray.length > 10) {
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';
      return Notify.info('Too many matches found. Please enter a more specific name.');
    }
    if (countriesArray.length === 1) {
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';
      refs.countryInfo.insertAdjacentHTML('afterbegin', countryInfo(countriesArray[0])); 
    } 
    if (countriesArray.length >= 2 && countriesArray.length <= 10) {
      refs.countryInfo.innerHTML = '';
      refs.countryList.insertAdjacentHTML('afterbegin', countryList(countriesArray)); 
    }
  }

