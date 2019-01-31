const signForm = (e) => {
  e.preventDefault();
  const userEmail = document.getElementById('email').value;
  const userPassword = document.getElementById('password').value;

  const url = 'http://localhost:3000/api/v1/auth/login';

  const signInData = {
    email: userEmail,
    password: userPassword,
  };
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signInData),
  })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 200) {
        localStorage.setItem('token', body.data[0]);
        window.location.href = 'dashboard.html';
      } else {
        document.getElementById('errorlog').innerHTML = Object.values(body);
      }
    });
};
const signBtn = document.getElementById('loginBtn');
signBtn.addEventListener('click', signForm);
