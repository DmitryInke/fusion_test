# Multiplayer Tic-Tac-Toe Game

This project is a multiplayer Tic-Tac-Toe game developed using Node.js, Express, and Socket.IO. Below is the structure and flow of the game.

## Server-Side (Node.js and Express)

### `index.js` (Server Setup)
- Initializes an Express application.
- Serves static files from the 'client' directory.
- Sets up HTTP and Socket.IO servers.
- Listens for incoming connections on port 3000.

### `socketHandlers.js` (Game Logic)
- Manages socket connections and game-related events.
- Functions:
  - `handleFindPlayer`: Adds players to the waiting list and pairs them for a game.
  - `handlePlayerMove`: Processes players' moves and broadcasts updated game state.
  - `handleGameOver`: Cleans up after a game is finished.
  - `createGame`: Initializes a new game with two players.

### `routes/index.js` (Routing)
- Sets up a route to serve the main HTML page for the game.

## Client-Side (HTML, CSS, JavaScript)

### `index.html`
- Basic HTML structure with links to stylesheets and scripts.
- Contains elements for displaying game state and player interactions.

### `main.js` (Client-side Logic)
- Manages UI elements and their visibility.
- Handles user interactions like entering a name, finding a player, and making moves.
- Communicates with the server via Socket.IO for game state updates.

## Game Flow
1. Players connect to the server and enter their names.
2. The server pairs two players for a game.
3. Players take turns making moves, which are sent to the server.
4. The server broadcasts the updated game state to both players.
5. The game checks for a win condition or a draw after each move.
6. Once a game concludes (win or draw), the server processes the end of the game.

## Win Condition Checking
- In `main.js`, the function `checkForGameEnd` evaluates the board state after each move.
- Uses `getWinnerName` to check if any player has achieved a winning combination.
- If a winner is found or if the game reaches a draw (all spaces filled without a winner), an alert is shown, and the game concludes.

This structure allows for a real-time, interactive Tic-Tac-Toe game where players can compete against each other over the internet.

# Running the Multiplayer Tic-Tac-Toe Game

This guide will help you set up and run the multiplayer Tic-Tac-Toe game on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (Download from [Node.js official website](https://nodejs.org/))
- npm (Comes with Node.js installation)

## Installation

1. **Clone the Repository**
   - Clone this repository to your local machine using Git:
     ```
     git clone https://github.com/DmitryInke/fusion_test.git
     ```

2. **Navigate to the Project Directory**
   - Open your terminal and navigate to the cloned repository's directory:
     ```
     cd path/to/repository
     ```

3. **Install Dependencies**
   - Run the following command to install the required Node.js packages:
     ```
     npm install
     ```

## Running the Game

1. **Start the Server**
   - In the project directory, run the following command to start the server:
     ```
     npm start
     ```
   - The server should start, and you will see a message indicating that it's listening on port 3000.

2. **Accessing the Game**
   - Open a web browser and go to `http://localhost:3000`.
   - To play with someone else, they should also open `http://localhost:3000` in their browser on the same network.

3. **Playing the Game**
   - Each player enters their name and clicks 'Search for a player' to find an opponent.
   - Once matched, players take turns to make their move in the Tic-Tac-Toe grid.

## Notes
- Ensure that the server is running for the game to function.
- Both players need to be on the same local network to connect to the server and play against each other.


