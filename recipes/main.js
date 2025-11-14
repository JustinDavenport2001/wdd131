// main.js
import { recipes } from './recipes.mjs';

const recipesContainer = document.getElementById('recipes');

function createStars(rating){
  const span = document.createElement('span');
  span.className = 'rating';
  span.setAttribute('role','img');
  span.setAttribute('aria-label', `Rating: ${rating} out of 5 stars`);
  for(let i=1;i<=5;i++){
    const s = document.createElement('span');
    s.setAttribute('aria-hidden','true');
    s.className = i <= rating ? 'icon-star' : 'icon-star-empty';
    s.textContent = i <= rating ? '⭐' : '☆';
    span.appendChild(s);
  }
  return span;
}

function renderRecipe(r){
  const article = document.createElement('article');
  article.className = 'recipe-card';

  const img = document.createElement('img');
  img.className = 'recipe-image';
  img.src = apple-crisp.jpg;
  img.alt = r.title;

  const body = document.createElement('div');
  body.className = 'recipe-body';

  const h3 = document.createElement('h3');
  h3.className = 'recipe-title';
  h3.textContent = r.title;

  const meta = document.createElement('p');
  meta.className = 'meta';
  meta.textContent = `${r.tags.join(' • ')} • ${r.time}`;

  const stars = createStars(r.rating);

  const desc = document.createElement('p');
  desc.className = 'description';
  desc.textContent = r.description;

  const tags = document.createElement('div');
  tags.className = 'tags';
  r.tags.forEach(t=>{
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = t;
    tags.appendChild(span);
  });

  body.append(h3, meta, stars, desc, tags);
  article.append(img, body);
  return article;
}

function renderAll(){
  // Clear any server-side example card(s)
  recipesContainer.innerHTML = '';
  recipes.forEach(r => recipesContainer.appendChild(renderRecipe(r)));
}

document.addEventListener('DOMContentLoaded', ()=> {
  renderAll();

  // simple search handler for demo
  const form = document.getElementById('searchForm');
  form.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    const q = document.getElementById('searchInput').value.trim().toLowerCase();
    const filtered = recipes.filter(r => r.title.toLowerCase().includes(q) || r.tags.join(' ').includes(q));
    recipesContainer.innerHTML = '';
    filtered.forEach(r => recipesContainer.appendChild(renderRecipe(r)));
  });
});
