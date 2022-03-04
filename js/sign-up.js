let signup = false;
let login = false;

const signupButton = document.getElementById('signup-button');
const loginButton = document.getElementById('login-button');
const preceptorList = document.getElementById('preceptors-list');
const username = document.getElementById('name');

if (signupButton) {
  signupButton.addEventListener('click', (event) => {
    const form = document.getElementById('form-signup')
    const validity = form.checkValidity();
    if(validity){
      event.preventDefault();
      signup = true;
      sendData();
    }
    
  });
}

if (loginButton) {
  loginButton.addEventListener('click', (event) => {
    event.preventDefault();
    login = true;
    sendData();
  });
}

function sendData() {
  let url = '';
  let email = document.getElementById('email').value;
  let pass = document.getElementById('password').value;
    

  let data = {};
  if (signup) {
    url = 'https://teleprecept.herokuapp.com/auth/signup';
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let role = document.getElementById('role').value;

    data = {
      role: role,
      email: email,
      password: pass,
      userInfo: {
        firstName: firstName,
        lastName: lastName,
      },
    };
  }

  if (login) {
    url = 'https://teleprecept.herokuapp.com/auth/login';
    data = {
      email: email,
      password: pass,
    };
  }

  let json = JSON.stringify(data);
  
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      api: '123',
    },
    method: 'POST',
    body: json,
  })
    .then((res) => {
      if(res.ok) {
        return res.json();
      } else {
        throw(new Error("User not found"))
      }
      
    })
    .then((res) => {
      localStorage.setItem('token', res['token']);
      window.location.href = 'profile.html';
    })
    .catch((err) => {
      document.getElementById("fail-message").style.display="block";
    });

  // console.log(json);
}

function getData() {
  //data = {};
  fetch('https://teleprecept.herokuapp.com/users', {
    headers: {
      api: '123',
      Authorization:
        // 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJyb2xlIjoicHJlY2VwdG9yIiwiaWF0IjoxNjQ0OTczMzk1fQ.SSuZS_FizK1c--ZGWKQqLUSDG32fZjqWE4bvE74WvbE',
        `Bearer ${localStorage.getItem('token')}`,
    },
    method: 'GET',
  })
    .then((res) => {
      //if (res.ok)
      //data = JSON.parse(res);

      return res.json();
    })
    .then((res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].role === 'preceptor') {
          let li = document.createElement('li');
          let p = document.createElement('p');
          let item = res[i].role + i + ': ' + res[i].email;
          if (res[i].userInfo?.firstName && res[i].userInfo?.lastName)
            item +=
              ' ' + res[i].userInfo.firstName + ' ' + res[i].userInfo.lastName;
          p.innerHTML = item;
          li.appendChild(p);
          preceptorList.appendChild(li);
        }
      }
    })
    .catch((err) => {
      alert(err);
    });

  //console.log(data);
}
