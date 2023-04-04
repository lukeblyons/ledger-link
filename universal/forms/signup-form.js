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



// Add event listeners for the signup and login forms
document.querySelector('.form-signup').addEventListener('submit', async (event) => {
	event.preventDefault();
  
	const username = event.target.querySelector('input[type="text"]').value;
	const email = event.target.querySelector('input[type="email"]').value;
	const password = event.target.querySelector('input[type="password"]').value;
  
	const response = await fetch('/register', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({ username, email, password }),
	});
  
	const data = await response.json();
	if (response.status === 201) {
	  alert(data.message);
	  // Redirect to the dashboard or login page
	} else {
	  alert(data.error);
	}
  });
  
  document.querySelector('.form-login').addEventListener('submit', async (event) => {
	event.preventDefault();
  
	const email = event.target.querySelector('input[type="text"]').value;
	const password = event.target.querySelector('input[type="password"]').value;
  
	const response = await fetch('/login', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({ email, password }),
	});
  
	const data = await response.json();
	if (response.status === 200) {
	  alert(data.message);
	  // Redirect to the dashboard
	} else {
	  alert(data.error);
	}
  });
  