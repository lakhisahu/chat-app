const socket = io('http://localhost:8000')
var music = new Audio("music.mp3")
var container = document.querySelector(".container")
var form = document.getElementById("send-container")
var inputelement = document.getElementById("messageInp")
const user = prompt('Enter name to Join')
socket.emit('new-join',user)


socket.on('new-user',(data)=>{
    console.log(data+" has join the chat");
    addElement(data+" has join the chat","right")
})
function addElement(message,position){
var element = document.createElement("div")
element.innerText= message
element.classList.add("message")
element.classList.add(position)
container.append(element)
music.play()
}
form.addEventListener("submit", (e) =>{
e.preventDefault()
var message = inputelement.value;
addElement("You:"+ message,"right")
socket.emit("send", message)
inputelement.value= ""
})
socket.on("send-message", (data)=>{
    addElement(data.name+":"+data.message,"left")
})
socket.on("left", (data)=>{
    addElement(data+" left the chat","left")
})

