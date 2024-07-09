const { Server } = require("socket.io");

//Web socket initialization
module.exports = function initializeSocket(server) {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinJobRoom", (jobId) => {
      socket.join(jobId);
    });

    socket.on("joinPosterChatroom", (UserName) => {
      socket.join(UserName);
    });

    socket.on("joinSeekerChatroom", (UserName) => {
      socket.join(UserName);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  return io;
};
