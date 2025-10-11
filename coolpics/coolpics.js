

document.addEventListener('DOMContentLoaded', () => {

  const menuButton = document.getElementById('menu-button');
  const nav = document.querySelector('nav');


  menuButton.addEventListener('click', () => {
    nav.classList.toggle('open');

    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !expanded);
  });


  function handleResize() {

    if (window.innerWidth > 1000) {
      nav.classList.remove('open');
    }
  }

 
  handleResize();


  window.addEventListener('resize', handleResize);


  const gallery = document.querySelector('.gallery');


  const modal = document.createElement('dialog');
  modal.id = 'viewer';
  modal.innerHTML = `
    <img src="" alt="">
    <button class="close-viewer">X</button>
  `;
  document.body.appendChild(modal);

  const modalImg = modal.querySelector('img');
  const closeBtn = modal.querySelector('.close-viewer');


  gallery.addEventListener('click', (event) => {
    const clickedImg = event.target.closest('img');
    if (!clickedImg) return; 

   
    const src = clickedImg.getAttribute('src');
    const baseName = src.split('-')[0];


    const fullSrc = `${baseName}-full.jpeg`;


    modalImg.src = fullSrc;
    modalImg.alt = clickedImg.alt;


    modal.showModal();
  });


  closeBtn.addEventListener('click', () => {
    modal.close();
  });


  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
});
