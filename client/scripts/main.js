let socket;
document.addEventListener("DOMContentLoaded", function () {
  initializeUI();
  socket = io();

  document.getElementById("find").addEventListener("click", function () {
    handleFindPlayer(socket);
  });

  socket.on("find", (data) => handleFindResponse(data));
  socket.on("playing", (data) => handlePlayingResponse(data));

  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function () {
      handlePlayerMove(socket, button);
    });
  });
});

function initializeUI() {
  hideElements([
    "loading",
    "bigcont",
    "userCont",
    "oppNameCont",
    "valueCont",
    "whosTurn",
  ]);
}

function hideElements(elementIds) {
  elementIds.forEach((id) => {
    document.getElementById(id).style.display = "none";
  });
}

function handleFindPlayer(socket) {
  playerName = document.getElementById("name").value;
  document.getElementById("user").innerText = playerName;

  if (!playerName) {
    alert("Please enter a name");
    return;
  }

  socket.emit("find", { name: playerName });
  document.getElementById("loading").style.display = "block";
  document.getElementById("find").disabled = true;
}

function handleFindResponse(data) {
  if (!playerName) return;

  showGameUI();
  updateGameStatus(data, playerName);
}

function showGameUI() {
  showElements(["userCont", "oppNameCont", "valueCont", "bigcont", "whosTurn"]);
  hideElements(["loading", "name", "find", "enterName"]);
  document.getElementById("whosTurn").innerText = "X's Turn";
}

function showElements(elementIds) {
  elementIds.forEach((id) => {
    document.getElementById(id).style.display = "block";
  });
}

function updateGameStatus(data, playerName) {
  let opponentName, playerValue;
  const foundGame = data.allPlayers.find(
    (game) => game.p1.p1name === playerName || game.p2.p2name === playerName
  );

  if (foundGame.p1.p1name === playerName) {
    opponentName = foundGame.p2.p2name;
    playerValue = foundGame.p1.p1value;
  } else {
    opponentName = foundGame.p1.p1name;
    playerValue = foundGame.p2.p2value;
  }
  currentPlayerTurn = data.sum % 2 === 0 ? "0" : "X";
  document.getElementById("oppName").innerText = opponentName;
  document.getElementById("value").innerText = playerValue;
}

function handlePlayerMove(socket, button) {
  let value = document.getElementById("value").innerText;
  if (value !== currentPlayerTurn) {
    alert("It's not your turn!");
    return;
  }
  button.innerText = value;
  socket.emit("playing", { value: value, id: button.id, name: playerName });
}

function handlePlayingResponse(data) {
  const game = data.allPlayers.find(
    (g) => g.p1.p1name === playerName || g.p2.p2name === playerName
  );
  updateBoard(game);
  checkForGameEnd(socket, playerName, game.sum);
}

function updateBoard(game) {
  updateButtonState(game.p1.p1move, "X");
  updateButtonState(game.p2.p2move, "O");

  const turnText = game.sum % 2 === 0 ? "O's Turn" : "X's Turn";
  currentPlayerTurn = game.sum % 2 === 0 ? "O" : "X";
  document.getElementById("whosTurn").innerText = turnText;
}

function updateButtonState(buttonId, value) {
  if (!buttonId) return;

  const button = document.getElementById(buttonId);
  button.innerText = value;
  button.disabled = true;
  button.style.color = "black";
}

function checkForGameEnd(socket, playerName, sum) {
  let buttons = [];
  for (let i = 1; i <= 9; i++) {
    buttons[i] = document.getElementById("btn" + i).innerText || "-";
  }

  const winningSymbol = getWinnerName(buttons);
  if (winningSymbol) {
    const winnerName =
      winningSymbol === document.getElementById("value").innerText
        ? "You"
        : "Opponent";
    socket.emit("gameOver", { name: playerName });
    setTimeout(() => {
      alert(winnerName + " WON !!"); // Display the winner's name
      setTimeout(() => location.reload(), 2000);
    }, 100);
  } else if (sum > 9) {
    socket.emit("gameOver", { name: playerName });
    setTimeout(() => {
      alert("DRAW!!");
      setTimeout(() => location.reload(), 2000);
    }, 100);
  }
}

function getWinnerName(buttons, playerName) {
  const wins = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  for (const combination of wins) {
    const [a, b, c] = combination;
    if (
      buttons[a] !== "-" &&
      buttons[a] === buttons[b] &&
      buttons[b] === buttons[c]
    ) {
      return buttons[a];
    }
  }

  return null; // No winner yet
}
