import SocketIO from "socket.io-client";
const io = SocketIO("http://localhost:3000");
import { Room } from "haxball-room";

const room = new Room().createRoom({ roomName: "Hi", noPlayer: true });

io.on("sendMessage", (player) => {
    room.sendAnnouncement(player.name + ": " + player.message);
});

room.onPlayerJoin = (player) => {
    new Room(room).updateAdmins();
};

room.onPlayerLeave = (player) => {
    new Room(room).updateAdmins();
};

room.onPlayerChat = (player, message) => {

    room.sendAnnouncement(player.name + ": " + message);

    io.emit("getMessage", { ...player, message });
    return false;
};
