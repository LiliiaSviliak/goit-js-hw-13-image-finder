
  
import refs from './getRefs';
import markupRender from '../templates/cardMarkup.hbs';

function updatePhotoMarkup(photo) {
  const markup = markupRender(photo);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearUl() {
  refs.gallery.innerHTML = '';
}

export { updatePhotoMarkup, clearUl };
