const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const GameEngine = require("../../lib/engine");
const Config = require("../../lib/engine/config");
const TestDictionaryAdapter = require("../../tests/helpers/test-dictionary");

let gameEngine;
let initialGameState;
let currentGameState;

Given("que a palavra secreta é {string}", function (palavra) {
  const testDictionary = new TestDictionaryAdapter(palavra);
  Config.setDictionaryAdapter(testDictionary);
});

Given("que o jogo foi iniciado", function () {
  gameEngine = GameEngine;
  initialGameState = gameEngine.startGame();
  currentGameState = { ...initialGameState };
});

When("eu palpito a letra {string}", function (letra) {
  currentGameState = gameEngine.guessLetter(currentGameState, letra);
});

Then('meu número de vidas deve permanecer o mesmo', function () {
  assert.strictEqual(currentGameState.lives, initialGameState.lives);
});

Then("meu número de vidas deve diminuir em {int}", function (livesDecrease) {
  assert.strictEqual(
    currentGameState.lives,
    initialGameState.lives - livesDecrease,
  );
});

Then(
  "a letra {string} deve ser adicionada aos meus palpites",
  function (letter) {
    assert(currentGameState.guesses.includes(letter));
  },
);

Then(
  "eu devo ver uma mensagem dizendo que a letra não está na palavra",
  function () {
    assert(currentGameState.message.includes("não está na palavra"));
  },
);

Then(
  "o status do jogo deve permanecer {string} se eu tiver vidas restantes",
  function (status) {
    if (currentGameState.lives > 0) {
      assert.strictEqual(currentGameState.status, status);
    }
  },
);

Then('as letras {string} devem ser adicionadas aos meus palpites', function (letras) {
  letters.forEach(letter => {
    assert(currentGameState.guesses.includes(letter));
  });
});
