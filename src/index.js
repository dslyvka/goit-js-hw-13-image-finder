import './sass/main.scss';
import debounce from 'lodash.debounce';
import photoMarkup from './photoMarkup.hbs';

const searchFormRef = document.querySelector('input');
const galleryRef = document.querySelector('.gallery');
searchFormRef.addEventListener('input', debounce(onSearch, 500));
searchFormRef.addEventListener('keydown', e => {
  if (e.which === 13) e.preventDefault();
});

const queryStringParam = {
  KEY: '24204810-4c4e56177cf5555097dc8a654',
  page: 1,
  LINK: 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=',
};

function onSearch(event) {
  if (event.target.value.trim() === '') {
    clearMarkup();
    return;
  }
  //   console.log(event.target.value);
  clearMarkup();
  return fetchImage(event).then(renderMarkup).catch(error => console.log(error))
  // .then(data => renderMarkup(data.hits));
}

function fetchImage(event) {
  return fetch(
    `${queryStringParam.LINK}${event.target.value}&page=${queryStringParam.page}&per_page=12&key=${queryStringParam.KEY}`,
  )
    .then(data => data.json())
    .then(data => data.hits);
}

function renderMarkup(markup) {
  galleryRef.insertAdjacentHTML('beforeend', photoMarkup(markup));
}

function clearMarkup() {
  galleryRef.innerHTML = '';
}
