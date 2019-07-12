const name = document.getElementById('name');
const email = document.getElementById('email');
const country = document.getElementById('country');
const state = document.getElementById('state');
const city = document.getElementById('city');
const number = document.getElementById('phonenumber');
const address = document.getElementById('adress');
const about_me = document.getElementById('aboutme');
const userslist = document.querySelector('.userlist');
const button = document.querySelector('button');
let users;
let countries;
let states;

fetch("http://localhost:3000/countries")
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    countries = data;
    addcountry(countries);
  });

function addcountry(countries) {
  countries.forEach(function (item) {
    const option = document.createElement('option');
    option.innerHTML = `${item.name}`;
    option.value = `${item.id}`;

    country.appendChild(option);
  })
}

fetch("http://localhost:3000/states")
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    states = data;
    addstate(states);
  });

function addstate(states) {
  states.forEach(function (item) {
    const option = document.createElement('option');
    option.innerHTML = `${item.name}`;
    option.value = `${item.id}`;

    state.appendChild(option);
  })
}

fetch("http://localhost:3000/cities")
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    cities = data;
    addcity(cities);
  });

function addcity(cities) {
  cities.forEach(function (item) {
    const option = document.createElement('option');
    option.innerHTML = `${item.name}`;
    option.value = `${item.id}`;

    city.appendChild(option);
  })
}

function validate(event) {

  event.preventDefault();

  if (!name.value.match(/^[a-zA-Z\s]*$/)) {
    mane.classList.add("error");
  }
  if (!email.value.match(/^\w{1,}@\w{1,}\.\w{2,}$/)) {
    email.classList.add("error");
  }
  if (!number.value.match(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/)) {
    number.classList.add("error");
  }
  return false;
  if (!address.value) {
    return address.value = 'null';
  }
  if (!about_me.value) {
    return about_me.value = 'null';
  }
}

user = {
  "name": "name.value",
  "email": "email.value",
  "phone_number": "number.value",
  "about_me": "about_me.value",
  "country_id": "country.value",
  "state_id": "state.value",
  "city_id": "city.value"
}

button.addEventListener('click', () => {
  function sendNewUser(user) {
    return fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify('user')
    });
  }
});

window.onload = fetch("http://localhost:3000/users")
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function (data) {
    users = data;
    display(users);
  });

function display(users) {
  users.forEach(function (elem) {
    elem.createdAt = normaldata(elem);
    elem.country_id = idToName(countries, elem.country_id);
    elem.state_id = idToName(states, elem.state_id);
    elem.city_id = idToName(cities, elem.city_id);

    const div = document.createElement('div');
    div.className = 'user';
    const nameelem = document.createElement('div');
    nameelem.innerHTML = `${elem.name}`;
    div.appendChild(nameelem);
    const emailelem = document.createElement('div');
    emailelem.innerHTML = `${elem.email}`;
    div.appendChild(emailelem);
    const phoneelem = document.createElement('div');
    phoneelem.innerHTML = `${elem.phone_number}`;
    div.appendChild(phoneelem);
    const locationelem = document.createElement('div');
    locationelem.innerHTML = `${elem.country_id}, ${elem.state_id}, ${elem.city_id}`;
    div.appendChild(locationelem);
    const dataelem = document.createElement('div');
    dataelem.innerHTML = `${elem.createdAt}`;
    div.appendChild(dataelem);

    userslist.appendChild(div);
  });
};

function normaldata(elem) {
  let d = new Date(elem.createdAt);
  return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
}

function idToName(countries, elem) {
  const c = countries.find(x => x.id == elem);
  return c && c.name;
}

country.addEventListener('click', () => {
  if (country.value !== "null") {
    return state.hidden = false
  }
})

state.addEventListener('click', () => {
  if (state.value !== "null") {
    return city.hidden = false
  }
})