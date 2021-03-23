
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
          text: 'Pictures uploaded!',
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
    text: 'More pictures uploaded!',
  });
}

refs.searchForm.addEventListener('submit', e => {
  submitRender(e);
});

refs.loadMoreBtnLink.addEventListener('click', e => {
  clickRender(e);
});