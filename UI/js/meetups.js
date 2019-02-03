const getallmeetups = () => {
  const url = 'https://young-brushlands-72186.herokuapp.com/api/v1/meetups/';

  let userToken = '';
  if (localStorage.getItem('token')) {
    userToken = localStorage.getItem('token');
  } else {
    window.location.href = 'signin.html';
  }
  document.getElementById('meetups').innerHTML = `<img src="img/loading.gif">`;
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': userToken,
    },
  })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 200) {
        let result = '';
        body.data[0].forEach((meetups) => {
          const fDate = moment(meetups.happeningon).format('dddd MMM YYYY HH:mm:ss');
          result += `<li>
          <figure class="entry-thumb">
                <img src="${meetups.images}" alt="">
          </figure>
          <div>
            <strong>${meetups.topic}</strong>
            <p>
            ${fDate}<br>${meetups.description}</p>
            <a href="meetups.html?id=${meetups.id}" data-meetup="${meetups.id}"><button>View Details</button></a>
          </div>
        </li>`;
        });
        document.getElementById('meetups').innerHTML = result;
      } else {
        document.getElementById('meetups').innerHTML = Object.values(body);
      }
    });
};

getallmeetups();
