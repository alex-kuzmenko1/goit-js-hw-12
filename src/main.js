import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
const perPage = 15;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  query = event.target.elements['search-text'].value.trim();
  
  if (!query) {
    iziToast.error({ title: 'Error', message: 'Please enter a search query!' });
    return;
  }

  gallery.innerHTML = '';
  page = 1;
  loadMoreBtn.style.display = 'none';
  loader.classList.add('visible');

  try {
    const { hits, totalHits } = await fetchImages(query, page, perPage);
    if (hits.length === 0) {
      iziToast.warning({ title: 'Oops!', message: 'No images found. Try again!' });
    } else {
      renderImages(hits);
      loadMoreBtn.style.display = hits.length < totalHits ? 'block' : 'none';
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to fetch images. Try again later!' });
  } finally {
    loader.classList.remove('visible');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  loader.classList.add('visible');
  
  try {
    const { hits, totalHits } = await fetchImages(query, page, perPage);
    renderImages(hits, true);
    
    if (page * perPage >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to fetch more images. Try again later!' });
  } finally {
    loader.classList.remove('visible');
  }
});













