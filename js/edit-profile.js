let loc = document.getElementById('loc');
let locationEdit = document.getElementById('location-edit');
let bio = document.getElementById('bio');
let textChange = document.getElementById('text-change');
let specialties = document.getElementById('specialties');
let bioEdit = document.getElementById('bio-edit');
let specialtiesEdit = document.getElementById('specialties-edit');
let locationBox = document.getElementById('location-box');
let button = document.getElementById('edit-button');
let checkedSpecialty = document.getElementById('checked-specialty');
let available = document.getElementById('available');
let checks = document.getElementById

window.onload = async function () {
  let data = await getName();
  const userInfo = data.userInfo;
  const username = document.getElementById('username');
  username.innerHTML = `${!userInfo.firstName ? 'John Doe' : (userInfo.firstName + ' ' + userInfo.lastName)}`;
  bio.innerHTML = `Bio: ${!userInfo.bio ? 'Not added' : userInfo.bio}`;
  loc.innerHTML = `Location:  ${!userInfo.location ? 'Not specified' : userInfo.location}`;
  checkedSpecialty.textContent = `Specialty: ${!userInfo.specialty ? 'Not specified' : userInfo.specialty}`;
  available.checked = userInfo.availability;
  available.setAttribute('disabled', true);
};

async function getName()
{
  const userData = await fetch('https://teleprecept.herokuapp.com/userinfo', {
    headers: {
      'Content-Type': 'application/json',
      api: '123',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    method: 'GET',
  })
  .catch((err) => {
    console.log(err);
  });
  const data = await userData.json();
  return data
}


function editFunc() {
  if (document.getElementById('edit-button').textContent === 'Edit') {
    loc.style.display = 'none';
    bio.style.display = 'none';
    specialties.style.display = 'none';
    locationEdit.style.display = 'block';
    bioEdit.style.display = 'block';
    specialtiesEdit.style.display = 'block';
    var button = (document.getElementById('edit-button').innerHTML = 'Save');
    available.disabled = false;
  } 
  else {
    
    while (loc.firstChild) {
      loc.removeChild(loc.firstChild);
    }
    
    let newloc = document.createElement('p');
    newloc.setAttribute('id', 'bio-text');
    newloc.value = loc.textContent
    newloc.innerHTML = 'Location: ' + locationBox.value;
    loc.appendChild(newloc);

    while (bio.firstChild) {
      bio.removeChild(bio.firstChild);
    }

    var newbio = document.createElement('p');
    newbio.setAttribute('id', 'bio-text');
    newbio.innerHTML = textChange.value;
    bio.appendChild(newbio);


    if (document.getElementById('adhd').checked === true) {
      checkedSpecialty.textContent = 'ADHD';
    } else if (document.getElementById('ptsd').checked === true) {
      checkedSpecialty.textContent = 'PTSD';
    } else if (document.getElementById('substance').checked === true) {
      checkedSpecialty.textContent = 'Substance Abuse';
    } else if (document.getElementById('bipolar').checked === true) {
      checkedSpecialty.textContent = 'Bipolar Disorder';
    } else if (document.getElementById('stress').checked === true) {
      checkedSpecialty.textContent = 'Stress';
    } else if (document.getElementById('anxiety').checked === true) {
      checkedSpecialty.textContent = 'Anxiety';
    }
    specialties.innerHTML = "<p>Specialty: " + checkedSpecialty.textContent + "</p>";
    
    loc.style.display = 'block';
    bio.style.display = 'block';
    specialties.style.display = 'block';
    locationEdit.style.display = 'none';
    bioEdit.style.display = 'none';
    specialtiesEdit.style.display = 'none';
    var button = (document.getElementById('edit-button').innerHTML = 'Edit');

    let data = {
      bio: textChange.value,
      location: locationBox.value,
      specialty: checkedSpecialty?.textContent,
      availability: available.checked,
    }
    available.disabled = true;

    sendData(data);
  }
}


async function sendData(data) {
  try {
    const reqData = {
      userInfo: data
    }
    const req = await fetch('https://teleprecept.herokuapp.com/users', {
      headers: {
        'Content-Type': 'application/json',
        api: '123',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      method: 'PATCH',
      body: JSON.stringify(reqData)
    })
  } catch(err) {
    alert("Data not sent: " + err);
  }
  
}

