module.exports = function (io) {
  let waitingPlayers = [];
  let playingArray = [];

  io.on("connection", (socket) => {
    socket.on("find", (playerData) => handleFindPlayer(io, playerData));
    socket.on("playing", (moveData) => handlePlayerMove(io, moveData));
    socket.on("gameOver", (playerData) => handleGameOver(playerData));
  });

  function handleFindPlayer(io, playerData) {
    if (playerData.name) {
      waitingPlayers.push(playerData.name);

      if (waitingPlayers.length >= 2) {
        const game = createGame(waitingPlayers);
        playingArray.push(game);

        waitingPlayers.splice(0, 2);
        io.emit("find", { allPlayers: playingArray });
      }
    }
  }

  function handlePlayerMove(io, moveData) {
    const game = playingArray.find(
      (g) => g.p1.p1name === moveData.name || g.p2.p2name === moveData.name
    );

    if (game) {
      if (moveData.value === "X") {
        game.p1.p1move = moveData.id;
      } else if (moveData.value === "O") {
        game.p2.p2move = moveData.id;
      }
      game.sum++;

      io.emit("playing", { allPlayers: playingArray });
    }
  }

  function handleGameOver(playerData) {
    playingArray = playingArray.filter(
      (game) => game.p1.p1name !== playerData.name
    );
  }

  function createGame(players) {
    return {
      p1: { p1name: players[0], p1value: "X", p1move: "" },
      p2: { p2name: players[1], p2value: "O", p2move: "" },
      sum: 1,
    };
  }
};
