import{a as h,S as b,i as l}from"./assets/vendor-DnBR8w-b.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const v="49323961-66159e96cf1899f53bae32983",L="https://pixabay.com/api/";async function f(s,t=1,a=15){try{return(await h.get(L,{params:{key:v,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:a}})).data}catch(o){throw console.error("Error fetching images:",o),o}}const E=document.querySelector(".gallery"),q=new b(".gallery a");function m(s){const t=s.map(({webformatURL:a,largeImageURL:o,tags:e,likes:r,views:c,comments:g,downloads:p})=>`
            <li class="gallery-item">
                <a href="${o}" class="gallery-link">
                    <img src="${a}" alt="${e}" class="gallery-image" />
                </a>
                <div class="info">
                    <p>❤️ ${r}</p>
                    <p>👀 ${c}</p>
                    <p>💬 ${g}</p>
                    <p>⬇️ ${p}</p>
                </div>
            </li>`).join("");E.insertAdjacentHTML("beforeend",t),q.refresh()}const S=document.querySelector(".form"),w=document.querySelector(".gallery"),u=document.querySelector(".loader"),i=document.querySelector(".load-more");let d="",n=1;const y=15;S.addEventListener("submit",async s=>{if(s.preventDefault(),d=s.target.elements["search-text"].value.trim(),!d){l.error({title:"Error",message:"Please enter a search query!"});return}n=1,w.innerHTML="",i.style.display="none",u.classList.add("visible");try{const{hits:t,totalHits:a}=await f(d,n,y);if(t.length===0){l.warning({title:"Oops!",message:"No images found. Try again!"});return}m(t),i.style.display="block",n*y>=a&&(i.style.display="none",l.info({title:"End",message:"We're sorry, but you've reached the end of search results."}))}catch{l.error({title:"Error",message:"Failed to fetch images. Try again later!"})}finally{u.classList.remove("visible")}});i.addEventListener("click",async()=>{n+=1,i.style.display="none",u.classList.add("visible");try{const{hits:s,totalHits:t}=await f(d,n,y);m(s),P(),n*y>=t?(i.style.display="none",l.info({title:"End",message:"We're sorry, but you've reached the end of search results."})):i.style.display="block"}catch{l.error({title:"Error",message:"Failed to fetch images. Try again later!"})}finally{u.classList.remove("visible")}});function P(){const s=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
