let teams = [];
let players = [];
const fs = require("fs");

fs.readFile("basketball_game.txt", "utf8", (err, data) => {
  fs.writeFileSync("output.txt", "");

  data = data.split("\n");
  let meta = [],
    players = [],
    caseNum = 1,
    player;

  for (let i = 1, len = data.length; i < len; i++) {
    if (!meta[0]) {
      if (players.length) {
        main(players, Number(meta[2]), Number(meta[1]), caseNum++);
      }
      meta = data[i].split(" ");

      players = [];
    } else {
      meta[0]--;
      player = data[i].split(" ");
      player.push(0);
      player[1] = Number(player[1]);
      player[2] = Number(player[2]);
      players.push(player);
    }
  }
});

const main = (players, P, M, caseNum) => {
  let teams = [[], []];

  players.sort((a, b) => {
    if (a[1] > b[1]) return -1;
    if (a[1] < b[1]) return 1;
    if (a[2] > b[2]) return -1;
    if (a[2] < b[2]) return 1;
    return 0;
  });

  for (let i = 0, len = players.length; i < len; i++)
    teams[i % 2].push(players[i]);

  while (M--) {
    teams[0] = rotate(teams[0], P);
    teams[1] = rotate(teams[1], P);
  }

  let playersIn = teams[0]
    .splice(0, P)
    .map(subOut => subOut[0])
    .concat(teams[1].splice(0, P).map(subOut => subOut[0]));

  playersIn.sort();

  fs.appendFileSync(
    "output.txt",
    "Case #" + caseNum + ": " + playersIn.join(" ") + "\n"
  );
};

const rotate = (players, P) => {
  let Ptemp = P - 1;
  if (P >= players.length) return players;

  let subOut = Ptemp;
  while (P--) {
    players[P][3]++;

    if (
      players[P][3] > players[subOut][3] ||
      (players[P][3] == players[subOut][3] &&
        players[P][1] < players[subOut][1]) ||
      (players[P][3] == players[subOut][3] &&
        players[P][1] == players[subOut][1] &&
        players[P][2] < players[subOut][2])
    )
      subOut = P;
  }

  let subIn = players.length - 1;
  for (let i = subIn; i > Ptemp; i--) {
    if (
      players[i][3] < players[subIn][3] ||
      (players[i][3] == players[subIn][3] &&
        players[i][1] > players[subIn][1]) ||
      (players[i][3] == players[subIn][3] &&
        players[i][1] == players[subIn][1] &&
        players[i][2] > players[subIn][2])
    )
      subIn = i;
  }

  let temp = players[subIn];
  players[subIn] = players[subOut];
  players[subOut] = temp;

  return players;
};
