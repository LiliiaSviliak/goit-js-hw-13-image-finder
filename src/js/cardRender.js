
import apiService from './apiService';
import refs from './getRefs';
import { updatePhotoMarkup, clearUl } from './cardSearch';
import { success, info, error } from './pnotify.js';

function render(e) {
  e.preventDefault();
  if (apiService.query === '') {
    refs.loadMoreBtn.classList.add('is-hidden');
    return;
  }

  apiService
    .axiosPixabayApi()
    .then(fullObj => {
      updatePhotoMarkup(fullObj);

      refs.loadMoreBtn.classList.remove('is-hidden');

      window.scrollTo({
        top: document.documentElement.offsetHeight,
        behavior: 'smooth',
      });

      if (e.type === 'submit') {
        success({
          title: 'Success!',
          text: 'Look! Cute pictures uploaded!',
        });
      }
    })
    .catch(axiosError => {
      refs.loadMoreBtn.classList.add('is-hidden');
      error({
        title: 'Sorry',
        text: axiosError,
      });
    });
}

function submitRender(e) {
  apiService.resetPage();

  clearUl();

  apiService.query = e.currentTarget.elements.query.value;

  render(e);
}

function clickRender(e) {
  if (refs.inputSearchForm.value === '') {
    refs.loadMoreBtn.classList.add('is-hidden');
    return;
  }

  if (apiService.query !== refs.inputSearchForm.value) {
    apiService.resetPage();

    clearUl();

    apiService.query = refs.inputSearchForm.value;
  }

  render(e);

  info({
    text: 'More cute pictures uploaded!',
  });
}

refs.searchForm.addEventListener('submit', e => {
  submitRender(e);
});

refs.loadMoreBtnLink.addEventListener('click', e => {
  clickRender(e);
});















// import getRefs from './get-refs.js';
// import { success, info, error } from './pnotify.js';
// import singleRenderCountry from '../templates/singleCountryRender.hbs';
// import multipleRenderCountry from '../templates/multipleCountryRender.hbs';

// const _ = require('lodash');

// const refs = getRefs();

// refs.searchInput.value = '';

// function fullRender(searchQuery) {
//     if (searchQuery === '') {
//       clearUl();
//       return;
//     }

//     fetchCountries(searchQuery)
//       .then(data =>
//         data.filter(country =>
//           country.name
//             .toLowerCase()
//             .includes(refs.searchInput.value.toLowerCase()),
//         ),
//       )
//       .then(countriesArray => markupRender(countriesArray))
//       .catch(e => {
//         refs.searchInput.value = '';
//         clearUl();
//         error({
//           title: 'Sorry',
//           text: e,
//         });
//       });
//   }

//   function clearUl() {
//     if (refs.searchInput.value === '') {
//       refs.cardContainer.innerHTML = '';
//     }
//   }

//   const debounced = _.debounce(() => {
//     fullRender(refs.searchInput.value);
//   }, 500);
  

//   function markupRender(countriesArray) {
//     if (countriesArray.length > 1 && countriesArray.length <= 10) {
//       refs.cardContainer.innerHTML = '';
//       countriesArray.map(country => {
//         multipleRender(country);
//       });
//       success({
//         title: 'Success!',
//         text: 'Look at the countries on your request',
//       });
//     } else if (countriesArray.length === 1) {
//       refs.cardContainer.innerHTML = '';
//       countriesArray.map(country => {
//         singleRender(country);
//       });
//       success({
//         title: 'Success!',
//         text: 'Country info loaded',
//       });
//     } else if (countriesArray.length > 10) {
//       info({
//         text: 'Too many matches found. Please enter a more specific query!',
//       });
//     }
//   }

//   function multipleRender(country) {
//     refs.cardContainer.insertAdjacentHTML(
//       'beforeend',
//       multipleRenderCountry([...country]),
//     );
//   }
  
//   function singleRender(country) {
//     refs.cardContainer.insertAdjacentHTML(
//       'beforeend',
//       singleRenderCountry([...country]),
//     );
//   }

  
//   refs.searchInput.addEventListener('input', debounced);
//   refs.searchContainer.addEventListener('submit', e => e.preventDefault());