const fs = require("fs");

fs.readFile("basketball_game_example_input.txt", "utf8", (err, data) => {
  fs.writeFileSync("output.txt", "");

  data = data.split("\n");
  let game = new Game(),
    caseNum = 1;

  for (let i = 1, len = data.length; i < len; i++) {
    game = new Game(...data[i].split(" "));

    for (let j = 0; j < game.totalNumPlayers; j++) {
      i++;
      game.players.push(new Player(...data[i].split(" ")));
    }

    if (game.totalNumPlayers) simulateGame(game, caseNum++);

    players = [];
  }
});

/**
 * @param {Game} game
 * @param {Number} caseNum
 */
const simulateGame = (game, caseNum) => {
  let teams = [[], []];

  game.players.sort(playerComparator);

  for (let i = 0, len = game.players.length; i < len; i++)
    teams[i % 2].push(game.players[i]);

  for (let j = 0; j < game.minutesElapsed; j++) {
    teams[0] = rotate(teams[0], game.inGamePlayers);
    teams[1] = rotate(teams[1], game.inGamePlayers);
  }

  let playersIn = getInGamePlayerNames(teams[0], game.inGamePlayers);
  playersIn = playersIn.concat(
    getInGamePlayerNames(teams[1], game.inGamePlayers)
  );

  playersIn.sort();

  fs.appendFileSync(
    "output.txt",
    "Case #" + caseNum + ": " + playersIn.join(" ") + "\n"
  );
};

const getInGamePlayerNames = (team, numPlayers) =>
  team.splice(0, numPlayers).map(p => p.name);

/**
 * @param {Player} a
 * @param {Player} b
 */
const playerComparator = (a, b) => {
  if (a.perc > b.perc) return -1;
  if (a.perc < b.perc) return 1;
  if (a.height > b.height) return -1;
  if (a.height < b.height) return 1;
  return 0;
};

/**
 * @param {Array<Player>} players
 * @param {Number} inGamePlayers inGamePlayers
 */
const rotate = (players, inGamePlayers) => {
  if (inGamePlayers >= players.length) return players;

  incrementMinutes(players, inGamePlayers);

  let subOut = getSubOutIndex(players, inGamePlayers);
  let subIn = getSubInIndex(players, inGamePlayers);

  return swap(players, subIn, subOut);
};

/**
 * @param {Array<Player>} players
 * @param {Number} inGamePlayers
 */
const incrementMinutes = (players, inGamePlayers) => {
  for (let i = 0; i < inGamePlayers; i++) players[i].mins++;
};

/**
 * @param {Array} arr
 * @param {Number} i1
 * @param {Number} i2
 */
const swap = (arr, i1, i2) => {
  let temp = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = temp;

  return arr;
};

/**
 * @param {Number} minIndex
 * @param {Array} players
 */
const getSubInIndex = (players, minIndex) => {
  let subIn = players.length - 1;
  for (let i = subIn; i >= minIndex; i--) {
    if (
      players[i].mins < players[subIn].mins ||
      (players[i].mins == players[subIn].mins &&
        playerComparator(players[i], players[subIn]) == -1)
    )
      subIn = i;
  }
  return subIn;
};

const getSubOutIndex = (players, inGamePlayers) => {
  let subOut = 0;
  for (let i = 0; i < inGamePlayers; i++) {
    if (
      players[i].mins > players[subOut].mins ||
      (players[i].mins == players[subOut].mins &&
        playerComparator(players[i], players[subOut]) == 1)
    )
      subOut = i;
  }

  return subOut;
};

class Player {
  constructor(name, perc, height) {
    this.name = name;
    this.perc = Number(perc);
    this.height = Number(height);
    this.mins = 0;
  }
}

class Game {
  constructor(numPlayers, minutesElapsed, inGamePlayers) {
    this.totalNumPlayers = Number(numPlayers);
    this.inGamePlayers = Number(inGamePlayers);
    this.minutesElapsed = Number(minutesElapsed);
    this.players = [];
  }
}

module.exports = {
  getInGamePlayerNames,
  getSubInIndex,
  getSubOutIndex,
  incrementMinutes,
  playerComparator,
  rotate,
  swap,
  Game,
  Player
};
