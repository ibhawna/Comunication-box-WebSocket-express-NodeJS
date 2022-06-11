// establishing socket connection

const ws = new WebSocket("ws://localhost:3501");

// const func = `
// 1. customise own messages
// 2. customising the full ui of the chat
// 3. stores the msgs on backend in a room
// 4. can make it scalable(choosing api gateway +  websocket + redis/elasticache for manah=ging all the temporary storage)`

const username = localStorage.getItem('username') || prompt('what do you want us to call you?') || 'anonymous'

localStorage.setItem('username', username)

ws.addEventListener("open", connectionOpen);
ws.addEventListener("message", handleSocketMessage);

function connectionOpen() {
  console.log("WebSocket connection has established");
}

function appendtobox({ sender, message }) {
  const createdDIV = document.createElement("div");
  createdDIV.className = "created-box";

  const senderDIV = document.createElement("div");
  senderDIV.className = "sender";
  senderDIV.textContent = sender;

  const messageDIV = document.createElement("div");
  messageDIV.className = "message";
  messageDIV.textContent = message;

  createdDIV.appendChild(senderDIV);
  createdDIV.appendChild(messageDIV);

  document.getElementById("box").appendChild(createdDIV);
}
function handleSocketMessage(event) {
  console.log("socket message: ", event.data);
  try {
    const realmsg = JSON.parse(event.data);
    const { sender, message } = realmsg;
    appendtobox({ sender, message });
  } catch (error) {}
}

function runEvent(event) {
  event.preventDefault();
  console.log("runhandler is running");

  if (ws.readyState === WebSocket.OPEN) {
    const box = document.getElementById("msg-box");
    const message = box.value;
    box.value = "";

    console.log(`trying to send this message on socket:${message}`);

    ws.send(JSON.stringify({
        sender:username,
        message
    }))
  }
  else{
    console.log('trying to establish connection ')
  }
}
