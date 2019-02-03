const signUpForm = (e) => {
  e.preventDefault();
  const firstName = document.getElementById('fname').value;
  const lastName = document.getElementById('lname').value;
  const otherName = document.getElementById('othername').value;
  const phoneNumber = document.getElementById('phoneno').value;
  const userEmail = document.getElementById('email').value;
  const userPassword = document.getElementById('password').value;
  const userName = document.getElementById('username').value;

  const url = 'https://young-brushlands-72186.herokuapp.com/api/v1/auth/signup';

  const signUpData = {
    email: userEmail,
    password: userPassword,
    firstname: firstName,
    othername: otherName,
    lastname: lastName,
    phonenumber: phoneNumber,
    username: userName,
  };
  document.getElementById('errorlog').innerHTML = `<img src="img/loading.gif">`;
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signUpData),
  })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 201) {
        localStorage.setItem('token', body.data[0]);
        window.location.href = 'dashboard.html';
      } else {
        document.getElementById('errorlog').innerHTML = Object.values(body);
      }
    });
};
const signupBtn = document.getElementById('signupBtn');
signupBtn.addEventListener('click', signUpForm);
