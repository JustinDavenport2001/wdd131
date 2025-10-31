// Select the card and the CVV input
const cardFront = document.querySelector('.card-front');
const cardBack = document.querySelector('.card-back');
const cvvInput = document.getElementById('cvv');

// Optional: Add initial rotation for back
cardBack.style.transform = 'rotateY(180deg)';

// Listen for input in the CVV field
cvvInput.addEventListener('input', () => {
  const cvvValue = cvvInput.value;

  // Only flip if CVV has 3 digits
  if (/^\d{3}$/.test(cvvValue)) {
    cardFront.style.transform = 'rotateY(180deg)';
    cardBack.style.transform = 'rotateY(0deg)';
    cardBack.style.zIndex = 2;
    cardFront.style.zIndex = 1;
  } else {
    // Keep front visible if CVV is incomplete
    cardFront.style.transform = 'rotateY(0deg)';
    cardBack.style.transform = 'rotateY(180deg)';
    cardFront.style.zIndex = 2;
    cardBack.style.zIndex = 1;
  }
});
