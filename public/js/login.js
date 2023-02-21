const loginFormHandler = async (e) => {
  e.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      // If successful, redirect the browser to the home page

      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};


document.querySelector('#login-form').addEventListener('submit', loginFormHandler);