import { recipes } from './recipes.mjs';

const recipesContainer = document.getElementById('recipes');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

/** Utility: create star rating span from a rating number (0-5) */
function createStars(rating){
  const span = document.createElement('span');
  span.className = 'rating';
  span.setAttribute('role','img');
  span.setAttribute('aria-label', `Rating: ${rating} out of 5 stars`);

  // Use whole-star logic: show filled stars up to floor(rating)
  // If you later want half-stars, extend this logic.
  const full = Math.floor(rating);
  for(let i = 1; i <= 5; i++){
    const s = document.createElement('span');
    s.setAttribute('aria-hidden','true');
    s.className = i <= full ? 'icon-star' : 'icon-star-empty';
    s.textContent = i <= full ? '⭐' : '☆';
    span.appendChild(s);
  }

  return span;
}

/** Render a single recipe object into an article element */
function renderRecipe(r){
  const article = document.createElement('article');
  article.className = 'recipe-card';

  const img = document.createElement('img');
  img.className = 'recipe-image';
  img.src = r.image || './images/placeholder.jpg';
  img.alt = r.name || 'Recipe image';

  const body = document.createElement('div');
  body.className = 'recipe-body';

  const h3 = document.createElement('h3');
  h3.className = 'recipe-title';
  h3.textContent = r.name || 'Untitled recipe';

  const meta = document.createElement('p');
  meta.className = 'meta';
  // prefer cookTime, fallback to prepTime, fallback to empty string
  const time = r.cookTime || r.prepTime || '';
  meta.textContent = `${(r.tags || []).join(' • ')}${time ? ' • ' + time : ''}`;

  const stars = createStars(r.rating || 0);

  const desc = document.createElement('p');
  desc.className = 'description';
  desc.textContent = r.description || '';

  const tagsWrap = document.createElement('div');
  tagsWrap.className = 'tags';
  (r.tags || []).forEach(t=>{
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = t;
    tagsWrap.appendChild(span);
  });

  body.append(h3, meta, stars, desc, tagsWrap);
  article.append(img, body);

  return article;
}

/** Render list of recipes into the container (clears previous content) */
function renderAll(list){
  recipesContainer.innerHTML = '';
  if(!list || list.length === 0){
    recipesContainer.innerHTML = '<p>No recipes found.</p>';
    return;
  }
  list.forEach(r => recipesContainer.appendChild(renderRecipe(r)));
}

/** Pick a random item from an array */
function getRandomListEntry(list){
  if(!list || list.length === 0) return null;
  const i = Math.floor(Math.random() * list.length);
  return list[i];
}

/** Filter recipes by query string (searches name, description, tags, ingredients) */
function filterRecipes(query){
  if(!query) return [...recipes].sort((a,b)=> (a.name || '').localeCompare(b.name || ''));
  const q = query.toLowerCase();

  const filtered = recipes.filter(r => {
    const nameMatch = (r.name || '').toLowerCase().includes(q);
    const descMatch = (r.description || '').toLowerCase().includes(q);
    const tagMatch = (r.tags || []).some(t => t.toLowerCase().includes(q));
    const ingMatch = (r.recipeIngredient || []).some(i => i.toLowerCase().includes(q));
    return nameMatch || descMatch || tagMatch || ingMatch;
  });

  return filtered.sort((a,b)=> (a.name || '').localeCompare(b.name || ''));
}

/** Init: render a random recipe on load (but also show full list as default) */
function init() {
  // If you want the page to show a single random recipe on load, uncomment:
  // const recipe = getRandomListEntry(recipes);
  // renderAll(recipe ? [recipe] : []);
  // For now render all (sorted) so search demonstrates filtering
  renderAll([...recipes].sort((a,b)=> (a.name || '').localeCompare(b.name || '')));
}

document.addEventListener('DOMContentLoaded', ()=> {
  init();

  // Search handler
  if(searchForm){
    searchForm.addEventListener('submit', (ev)=>{
      ev.preventDefault();
      const q = (searchInput && searchInput.value || '').trim();
      const results = filterRecipes(q);
      renderAll(results);
    });
  }
});
