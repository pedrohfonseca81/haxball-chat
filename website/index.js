import SocketIO from "socket.io-client";
const io = SocketIO("http://localhost:3000");

function sendMessage(name, message) {

    if(!name.value || !message.value) return alert("You need to enter the user's nickname and the message you want to send.")

    io.emit("getMessage", { ...{ name: name.value }, message: message.value });
    document.getElementsByClassName("messages")[0].innerHTML += `<div class="player"><p class="name">${name.value}</p><div class="divider">: </div><p class="message">${message.value}</p></div>`

    io.emit("sendMessage", { name: name.value, message: message.value });

    name.value = "";
    message.value = "";
};

document.getElementById("send_message").addEventListener("click", () => {
    let name = document.getElementById("send_message_name");
    let message = document.getElementById("send_message_message");

    name.addEventListener("keyup", (ev) => {
        if (ev.key === 'Enter' || ev.keyCode === 13) {
            return sendMessage(name, message);
        };
    });

    message.addEventListener("keyup", (ev) => {
        if (ev.key === 'Enter' || ev.keyCode === 13) {
            return sendMessage(name, message);
        };
    });
    sendMessage(name, message);
});

io.on("getMessages", (players) => {
    for (const player of players) {
        document.getElementsByClassName("messages")[0].innerHTML += `<div class="player"><p class="name">${player.name}</p><div class="divider">: </div><p class="message">${player.message}</p></div>`
        window.scrollTo(0,document.body.scrollHeight);
    };
});

io.on("getMessage", (player) => {
    document.getElementsByClassName("messages")[0].innerHTML += `<div class="player"><p class="name">${player.name}</p><div class="divider">: </div><p class="message">${player.message}</p></div>`
    window.scrollTo(0,document.body.scrollHeight);
});