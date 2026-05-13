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

//When('eu palpito a letra {string} e a palavra actual é {string}', function (letra) {
 When('eu palpito a letra {string} e a palavra actual é {string}', function (string, string2) {
  currentGameState.display_word = string2;
  currentGameState = gameEngine.guessLetter(currentGameState, string);
  gameEngine.guessLetter(currentGameState.guessLetter, string);
  //assert.strictEqual(currentGameState.display_word, letra);
  // return 'pending';
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
    assert.strictEqual(currentGameState.guesses.includes(letter), true);
    //throw new Error("TODO: Implementar essa funcionalidade");
  },
);

Then(
  "eu devo ver uma mensagem dizendo que a letra {string} não está na palavra",
  function (letter) {
    //console.log("currentGameState.message=", currentGameState.message, "letter=", letter);
    assert.strictEqual(currentGameState.message.includes(`La lettera ${letter} non è nella parola.`), true);
    //assert.strictEqual(currentGameState.message.includes("La lettera") && currentGameState.message.includes("non è nella parola."), true);
    //throw new Error("TODO: Implementar essa funcionalidade");
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
  throw new Error("TODO: Implementar essa funcionalidade");
});

Then('eu devo ver uma mensagem dizendo que a letra {string} está na palavra', function (letter) {
  assert.strictEqual(currentGameState.message.includes(`Hai indovinato la lettera ${letter}!`), true);
});
  
Then('mostrar a palavra {string}', function (letter) {
  assert.strictEqual(currentGameState.display_word, letter);
  //return 'pending';
});

Then('o status do jogo deve passar para {string}', function (status) {
  assert.strictEqual(currentGameState.status, status);
});
