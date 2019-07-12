"use strict"
const init = () => {

  const form = document.getElementById('form')
  form.addEventListener('submit', event => {
    event.preventDefault()
    const isValid = validate(event)
    console.log(isValid)
    if (isValid) {
      const user = {
        "name": event.target[0].value,
        "email": event.target[1].value,
        "country_id": event.target[2].value,
        "state_id": event.target[3].value,
        "city_id": event.target[3].value,
        "phone_number": event.target[4].value,
        "address": event.target[5].value,
        "about_me": event.target[6].value,
        "createdAt": new Date(),
        "id": Math.random(10)
      }
      console.log(JSON.stringify(user))
      fetch('http://localhost:3000/users', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
    }
  })

  const validate = event => {
    let isValid = true
    const {
      target
    } = event

    const name = target[0]
    if (!name.value.match(/^[a-zA-Z\s]*$/)) {
      name.classList.add("error")
      isValid = false
    }

    const email = target[1]
    if (!email.value.match(/^\w{1,}@\w{1,}\.\w{2,}$/)) {
      email.classList.add("error")
      isValid = false
    }
    //and other validates
    return isValid

  }

  const fetchCountries = () =>
    fetch('./countries.json')
    .then(response => response.json())
    .then(result => setCountries(result))

  const setCountries = countries => {
    document.getElementById('country').innerHTML += countries.map(country => `<option value=${country.id}>${country.name}</option>`)
  }
  fetchCountries()

  const fetchCities = () =>
    fetch('./cities.json')
    .then(response => response.json())
    .then(result => setCities(result))

  const setCities = cities => {
    document.getElementById('city').innerHTML += cities.map(city => `<option value=${city.id}>${city.name}</option>`)
  }
  fetchCities()

  const fetchStates = () =>
    fetch('./states.json')
    .then(response => response.json())
    .then(result => setStates(result))

  const setStates = states => {
    document.getElementById('state').innerHTML += states.map(state => `<option value=${state.id}>${state.name}</option>`)
  }
  fetchStates()



}

init()