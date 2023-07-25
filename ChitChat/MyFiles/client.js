const socket = io();

let naame;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

do{
  naame =  prompt('Please enter your name: ')
}while(!naame)



textarea.addEventListener('keyup' , (e)=>{
    if(e.key ==='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user: naame,
        message: message.trim()
    }

    // Append
    appendMessage(msg,'outgoing')

    // clear append
    textarea.value='';
    scrollToBottom();

    // send to server via web socket connection

    socket.emit('message',msg)




}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)
}


// Recived message from server

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom();
})


// for automatically scroll message
function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight;
}