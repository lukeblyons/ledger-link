const passwordInput = document.querySelector('#password-input');
const passwordToggle = document.querySelector('#password-toggle');
const passwordInputLogin = document.querySelector('#password-input-login');
const passwordToggleLogin = document.querySelector('#password-toggle-login');

passwordToggle.addEventListener('click', function() {
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

passwordToggleLogin.addEventListener('click', function() {
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

const form = document.querySelector('.form-signup');
const loginForm = document.querySelector('.form-login');

// Modified signup form event listener
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');
  
  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    
    if (response.ok) {
      window.location.href = '/universal/OTP/otp.html';
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

// Modified login form event listener
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const loginFormData = new FormData(loginForm);

  const username = loginFormData.get('username');
  const password = loginFormData.get('password');
  
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    
    if (response.ok) {
      window.location.href = '/dashboard/dashboard.html';
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});


// Switch from signup to login
document.querySelector(".switch-to-login").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".signup-form").style.display = "none";
  document.querySelector(".login-form").style.display = "block";
});

// Switch from login to signup
document.querySelector(".switch-to-signup").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".signup-form").style.display = "block";
  document.querySelector(".login-form").style.display = "none";
});
