const main = require("./main");

test("comparator compares by perc asc then height asc", () => {
  expect(
    main.playerComparator(
      new main.Player("john", 89, 123),
      new main.Player("jerry", 88, 123)
    )
  ).toBe(-1);
  expect(
    main.playerComparator(
      new main.Player("john", 88, 123),
      new main.Player("jerry", 88, 122)
    )
  ).toBe(-1);
  expect(
    main.playerComparator(
      new main.Player("john", 88, 122),
      new main.Player("jerry", 89, 122)
    )
  ).toBe(1);
  expect(
    main.playerComparator(
      new main.Player("john", 88, 122),
      new main.Player("jerry", 88, 123)
    )
  ).toBe(1);
  expect(
    main.playerComparator(
      new main.Player("john", 88, 122),
      new main.Player("jerry", 88, 122)
    )
  ).toBe(0);
});

test("swap swaps indexes in an array", () => {
  expect(main.swap([1, 2, 3], 1, 2)).toEqual([1, 3, 2]);
  expect(main.swap([1, 2, 3], 0, 1)).toEqual([2, 1, 3]);
});

test("getInGamePlayerNames returns spliced array of names", () => {
  expect(
    main.getInGamePlayerNames(
      [
        new main.Player("john", 89, 123),
        new main.Player("jerry", 89, 123),
        new main.Player("tom", 89, 123),
        new main.Player("tim", 89, 123)
      ],
      2
    )
  ).toEqual(["john", "jerry"]);
});

test("getSubOutIndex to return player in-game that has highest minutes or lowest stats", () => {
  let player1 = new main.Player("john", 89, 123);
  player1.mins = 10;
  let player2 = new main.Player("jerry", 89, 123);
  player2.mins = 9;
  let player3 = new main.Player("jack", 89, 123);
  let player4 = new main.Player("tim", 89, 123);
  expect(main.getSubOutIndex([player1, player2, player3, player4], 2)).toBe(0);

  player1.mins = 10;
  player2.mins = 11;
  expect(main.getSubOutIndex([player1, player2, player3, player4], 2)).toBe(1);

  player1.mins = 10;
  player2.mins = 10;
  player1.perc = 88;
  player2.perc = 89;
  expect(main.getSubOutIndex([player1, player2, player3, player4], 2)).toBe(0);

  player1.mins = 10;
  player2.mins = 10;
  player1.perc = 88;
  player2.perc = 88;
  player1.height = 123;
  player2.height = 124;
  expect(main.getSubOutIndex([player1, player2, player3, player4], 2)).toBe(0);
});

test("getSubInIndex to return player out of game that has lowest minutes or highest stats", () => {
  let player1 = new main.Player("john", 89, 123);
  let player2 = new main.Player("jerry", 89, 123);
  let player3 = new main.Player("jack", 89, 123);
  player3.mins = 10;
  let player4 = new main.Player("tim", 89, 123);
  player4.mins = 9;
  expect(main.getSubInIndex([player1, player2, player3, player4], 2)).toBe(3);

  player3.mins = 10;
  player4.mins = 11;
  expect(main.getSubInIndex([player1, player2, player3, player4], 2)).toBe(2);

  player3.mins = 10;
  player4.mins = 10;
  player3.perc = 88;
  player4.perc = 89;
  expect(main.getSubInIndex([player1, player2, player3, player4], 2)).toBe(3);

  player3.mins = 10;
  player4.mins = 10;
  player3.perc = 88;
  player4.perc = 88;
  player3.height = 123;
  player4.height = 124;
  expect(main.getSubInIndex([player1, player2, player3, player4], 2)).toBe(3);
});

test("incrementMinutes increments in-game player minutes", () => {
  let player1 = new main.Player("john", 89, 123);
  let player2 = new main.Player("jerry", 89, 123);
  player1.mins = 10;
  player2.mins = 10;

  main.incrementMinutes([player1, player2], 1);
  expect(player1.mins).toEqual(11);
  expect(player2.mins).toEqual(10);
});

test("rotate does nothing if all players are in game", () => {
  let player1 = new main.Player("john", 89, 123);
  let player2 = new main.Player("jerry", 89, 123);
  let player3 = new main.Player("jack", 89, 123);
  let player4 = new main.Player("tim", 89, 123);
  let players = [player1, player2, player3, player4];

  expect(main.rotate(players, 4)).toEqual(players);
});

test("rotate increments minutes and rotates players", () => {
  let player1 = new main.Player("john", 89, 123);
  let player2 = new main.Player("jerry", 88, 121);
  let player3 = new main.Player("jack", 89, 122);
  let player4 = new main.Player("tim", 89, 121);

  expect(main.rotate([player1, player2, player3, player4], 2)).toEqual([
    player1,
    player3,
    player2,
    player4
  ]);

  expect(player1.mins).toBe(1);
  expect(player2.mins).toBe(1);
});
