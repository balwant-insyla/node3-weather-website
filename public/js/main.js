//console.log('Client side JS')




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')



weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()

    msgOne.textContent = 'Loading...'
msgTwo.textContent = ''
    fetch('http://localhost:3000/weather?address='+search.value).then((response) => {
    response.json().then((data) => {
        if(data.error) {
             msgOne.textContent = data.error
             msgTwo.textContent = ''   
            //console.log(data.error)
        } else {
            msgOne.textContent = data.location
            msgTwo.textContent = data.forecast
            //console.log(data.location)
            //console.log(data.forecast)
        }
        
    })
})

})