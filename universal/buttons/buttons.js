const loginButtonBlur = document.querySelector('.login-button');
const loginButton = document.querySelector('.login-button');
const body = document.querySelector('body');
const elements = document.querySelectorAll('*');
const hidden = document.querySelector('.hidden');


// Page blurs when .login-button is clicked
loginButtonBlur.addEventListener('click', () => {
  elements.forEach(element => {
    const zIndex = parseInt(window.getComputedStyle(element).getPropertyValue('z-index'));
    if (zIndex > -10 && zIndex < 5) {
      element.classList.add('blur');
    }
  });
});

body.addEventListener('click', (event) => {
    const clickedElement = event.target;
    const zIndex = parseInt(window.getComputedStyle(clickedElement).getPropertyValue('z-index'));
    if (zIndex < 5) {
      elements.forEach(element => {
        element.classList.remove('blur');
        hidden.classList.add('hidden');
      });
    }
  });


// (signup-form) is hidden until the user clicks login-button
loginButton.addEventListener('click', () => {
  hidden.classList.remove('hidden');
});
