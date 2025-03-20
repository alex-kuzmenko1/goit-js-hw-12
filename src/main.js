// import { renderImages } from "./js/render-functions";
// import { fetchImages } from "./js/pixabay-api";
// import iziToast from "izitoast";
// import 'izitoast/dist/css/iziToast.min.css';
// const form = document.querySelector(`form`);
// const gallery = document.querySelector(`.gallery`);
// const loader = document.querySelector(`.loader`);
// let query = '';
// let page = 1;
// const perPage = 15;
// form.addEventListener(`submit`, async(event)=>{
//     event.preventDefault();

// searchQuery = event.target.elements[`search-text`].value.trim();
//     if (!searchQuery){
//         iziToast.error({title: `Error`, message: `Please enter a search query!`});
//         return;
//     }

//     page = 1;
//     clearGallery();
//     loadMoreBtn.classList.add('hidden');
//     loader.classList.add('visible');


//     gallery.innerHTML = ``;
//     loader.classList.add(`visible`);
//     try{
//         const images = await fetchImages(query);
//         console.log(images);
        
//         if(images.length === 0){
//             iziToast.warning({title: `Oops!`, message: `No images found. Try again!`});
//         }else{
//             renderImages(images);
//         }
//     }catch(error){
//         iziToast.error({title: `Error`, message: ` Failed to fetch images. Try again later!`});
//     }finally{
//         loader.classList.remove(`visible`);
//     }

// });
// loadMoreBtn.addEventListener('click', async () => {
//   page += 1;
//   loader.classList.add('visible');

//   try {
//     const images = await fetchImages(query, page, perPage);
//     if (images.length === 0) {
//       iziToast.warning({ title: 'Oops!', message: 'No more images found!' });
//       loadMoreBtn.classList.add('hidden');
//     } else {
//       renderImages(images);
//     }
//   } catch (error) {
//     iziToast.error({ title: 'Error', message: 'Failed to fetch more images.' });
//   } finally {
//     loader.classList.remove('visible');
//   }
// });


import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let searchQuery = '';
let page = 1;
const perPage = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();
  
  searchQuery = event.target.elements['search-text'].value.trim();
  if (!searchQuery) {
    iziToast.error({ title: 'Error', message: 'Please enter a search query!' });
    return;
  }

  page = 1;
  clearGallery();
  loadMoreBtn.classList.add('hidden');
  loader.classList.add('visible');

  try {
    const { hits, totalHits } = await fetchImages(searchQuery, page, perPage);

    if (hits.length === 0) {
      iziToast.warning({ title: 'Oops!', message: 'No images found. Try again!' });
      return;
    }

    renderImages(hits);
    loadMoreBtn.classList.toggle('hidden', totalHits <= perPage);
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
    const { hits, totalHits } = await fetchImages(searchQuery, page, perPage);

    renderImages(hits);

    if (page * perPage >= totalHits) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    }

    smoothScroll();
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to load more images.' });
  } finally {
    loader.classList.remove('visible');
  }
});

function smoothScroll() {
  const { height } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({ top: height * 2, behavior: 'smooth' });
}














