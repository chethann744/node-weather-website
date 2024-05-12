console.log("client side java script file is loaded")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) =>{

    e.preventDefault()

    const location =search.value

    messageone.textContent = 'Loading...'
    messagetwo.textContent = ''
    
fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageone.textContent = data.error
        }else{
           messageone.textContent=data.locationname
           messagetwo.textContent=data.weatherforecast.message
        }
    })
})

})