const getUserToken = () => {
  if (localStorage.getItem('token')) {
    const userToken = localStorage.getItem('token');
    return userToken;
  }
  window.location.href = 'signin.html';
};
const getId = () => {
  const urlString = window.location.href;
  const url = new URL(urlString);
  const meetupId = url.searchParams.get('id');
  return meetupId;
};
const meetupId = getId();

const postQuestion = () => {
  const qTitle = document.getElementById('qtitle').value;
  const qBody = document.getElementById('qbody').value;
  const userid = '1';

  const url = `https://young-brushlands-72186.herokuapp.com/api/v1/questions/${meetupId}`;

  const questionData = {
    title: qTitle,
    body: qBody,
    meetup: meetupId,
    createdby: userid,
  };
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getUserToken(),
      // body: new FormData(document.getElementById('postQuestion')),
    },
    body: JSON.stringify(questionData),
  })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 201) {
        setTimeout(() => { window.location.reload(); }, 10);
      } else {
        document.getElementById('qerror').innerHTML = Object.values(body);
      }
    });
};

const getSingleMeetup = () => {
  const url = `https://young-brushlands-72186.herokuapp.com/api/v1/meetups/${meetupId}`;
  document.getElementById('singleMeetup').innerHTML = '<img src="img/loading.gif">';
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getUserToken(),
    },
  })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 200) {
        const fDate = moment(body.data[0].happeningon).format('dddd MMM YYYY HH:mm:ss');
        const result = `
        <div class="container2">
      <h1 class="shead">${body.data[0].topic}</h1>
    </div>

  <section id="main-col1">
    <div class="container">
    <aside id="sidebar">

        <div class="card">
          <h1>Infomation on meetup</h1>
            <p>${fDate}</p>
            <p class="title">${body.data[0].location}</p>
            <p><a href="#openModal"><button>Are you going?</button></a></p>

          </div>
          <img src="./img/map.png" alt="">
      </aside>

      <article id="main-col1">
        <div class="meetup_head">
            <img src="${body.data[0].images}" width="100%">
            <p>${body.data[0].description}</p>
          </div>
          <div class="meetup_head">
          
              <form id="postQuestion" onSubmit="return false">
                  <p> <strong>Post a Question:</strong> </p>
                  <p id="qerror" class="warning"></p>
                 <input type="text" id="qtitle" placeholder="Title">
                 <textarea id="qbody" placeholder="Type in your question"></textarea>
                 <br>
                 <input type="submit" id="questionBtn" onClick="postQuestion()" value="Submit">
              </form>
              <div id="getQuestionsId"></div>
              </div>
    </article>
  </div>
  </section>
        `;
        document.getElementById('singleMeetup').innerHTML = result;
      } else {
        document.getElementById('singleMeetup').innerHTML = Object.values(body);
      }
    });
};
getSingleMeetup();

const getQuestions = () => {
  const url = 'https://young-brushlands-72186.herokuapp.com/api/v1/questions';
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': getUserToken(),
    },
  })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 200) {
        let result = '';
        body.data[0].forEach((questions) => {
          result += `<ul id="comment">
          <li>
            <p><img src="img/avatar.png" class="img">James's Question: <br>${questions.body}<br>
              <a href="#"><img src="img/thumb1.png" alt="Upvote"></a> 1200 
              <a href="#"><img src="img/thumbdown.png" alt="Downvote"></a> 98 
              <a href="comment.html"><button>Comment</button></a>
              </p>
            </li>
    </ul>`;
        });
        document.getElementById('getQuestionsId').innerHTML = result;
      } else {
        document.getElementById('getQuestionsId').innerHTML = Object.values(body);
      }
    });
};
getQuestions();
