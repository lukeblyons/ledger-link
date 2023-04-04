const passwordInput = document.querySelector('#password-input');
const passwordToggle = document.querySelector('#password-toggle');
const passwordInputLogin = document.querySelector('#password-input-login');
const passwordToggleLogin = document.querySelector('#password-toggle-login');

passwordToggle.addEventListener('click', function () {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    passwordToggle.classList.remove('fi-rs-lock-filled');
    passwordToggle.classList.add('fi-rs-unlock');
  } else {
    passwordInput.type = 'password';
    passwordToggle.classList.remove('fi-rs-unlock');
    passwordToggle.classList.add('fi-rs-lock-filled');
  }
});

passwordToggleLogin.addEventListener('click', function () {
  if (passwordInputLogin.type === 'password') {
    passwordInputLogin.type = 'text';
    passwordToggleLogin.classList.remove('fi-rs-lock');
    passwordToggleLogin.classList.add('fi-rs-unlock');
  } else {
    passwordInputLogin.type = 'password';
    passwordToggleLogin.classList.remove('fi-rs-unlock');
    passwordToggleLogin.classList.add('fi-rs-lock');
  }
});

// Switch from signup to login
document.querySelector('.switch-to-login').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.signup-form').style.display = 'none';
  document.querySelector('.login-form').style.display = 'block';
});

// Switch from login to signup
document.querySelector('.switch-to-signup').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.signup-form').style.display = 'block';
  document.querySelector('.login-form').style.display = 'none';
});

// Signup-form submission goes to OTP page
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', function(event) {
  event.preventDefault();

  window.location.href = '/client/html/otp.html';
});

// Login-form submission goes to dashboard page
const loginForm = document.querySelector('.login-form');

loginForm.addEventListener('submit', function(event) {
  event.preventDefault();

  window.location.href = '/client/html/dashboard.html';
});
