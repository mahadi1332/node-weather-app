const weatherForm = document.querySelector('form')
const searchAdress = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchAdress.value
    messageOne.textContent = 'Loading...' + location
    messageTwo.textContent = '' 
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = 'Error: ' + data.error
            } else {
                messageOne.textContent = 'Result Found for : ' + location
                messageTwo.textContent = data.temparature +' degree is the current temparature of ' + location +',' + data.country
            }
        })
    })
})