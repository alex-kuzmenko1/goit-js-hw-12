import{a as h,S as b,i as l}from"./assets/vendor-DnBR8w-b.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const L="49323961-66159e96cf1899f53bae32983",v="https://pixabay.com/api/";async function m(s,r=1,a=15){try{return(await h.get(v,{params:{key:L,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:a}})).data}catch(o){throw console.error("Error fetching images:",o),o}}const q=document.querySelector(".gallery"),E=new b(".gallery a");function y(s){const r=s.map(({webformatURL:a,largeImageURL:o,tags:e,likes:t,views:i,comments:g,downloads:p})=>`
            <li class="gallery-item">
                <a href="${o}" class="gallery-link">
                    <img src="${a}" alt="${e}" class="gallery-image" />
                </a>
                <div class="info">
                    <p>❤️ ${t}</p>
                    <p>👀 ${i}</p>
                    <p>💬 ${g}</p>
                    <p>⬇️ ${p}</p>
                </div>
            </li>`).join("");q.insertAdjacentHTML("beforeend",r),E.refresh()}const S=document.querySelector(".form"),$=document.querySelector(".gallery"),d=document.querySelector(".loader"),u=document.querySelector(".load-more");let c="",n=1;const f=15;S.addEventListener("submit",async s=>{if(s.preventDefault(),c=s.target.elements["search-text"].value.trim(),!c){l.error({title:"Error",message:"Please enter a search query!"});return}$.innerHTML="",n=1,u.style.display="none",d.classList.add("visible");try{const{hits:r,totalHits:a}=await m(c,n,f);r.length===0?l.warning({title:"Oops!",message:"No images found. Try again!"}):(y(r),u.style.display=r.length<a?"block":"none")}catch{l.error({title:"Error",message:"Failed to fetch images. Try again later!"})}finally{d.classList.remove("visible")}});u.addEventListener("click",async()=>{n+=1,d.classList.add("visible");try{const{hits:s,totalHits:r}=await m(c,n,f);y(s,!0),n*f>=r&&(u.style.display="none",l.info({message:"We're sorry, but you've reached the end of search results."}))}catch{l.error({title:"Error",message:"Failed to fetch more images. Try again later!"})}finally{d.classList.remove("visible")}});
//# sourceMappingURL=index.js.map
