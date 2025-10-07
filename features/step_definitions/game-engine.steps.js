const { Given, When, Then } = require("@cucumber/cucumber");
const assert = require("assert");
const GameEngine = require("../../lib/engine");
const Config = require("../../lib/engine/config");
const TestDictionaryAdapter = require("../../tests/helpers/test-dictionary");

let gameEngine;
let initialGameState;
let currentGameState;

Given("la parola segreta {string}", function (parola) {
	const testDictionary = new TestDictionaryAdapter(parola);
	Config.setDictionaryAdapter(testDictionary);
});

Given("il gioco è stato avviato", function () {
	gameEngine = GameEngine;
	initialGameState = gameEngine.startGame();
	currentGameState = { ...initialGameState };
});

When("indovino la lettera {string}", function (lettera) {
	currentGameState = gameEngine.guessLetter(currentGameState, lettera);
});

Then("il mio numero di vite dovrebbe rimanere lo stesso", function () {
	assert.strictEqual(currentGameState.lives, initialGameState.lives);
});

Then(
	"il mio numero di vite dovrebbe diminuire di {int}",
	function (livesDecrease) {
		assert.strictEqual(
			currentGameState.lives,
			initialGameState.lives - livesDecrease
		);
	}
);

Then(
	"la lettera {string} dovrebbe essere aggiunta ai miei tentativi",
	function (letter) {
		assert.ok(currentGameState.guesses.includes(letter.toUpperCase()));
	}
);


Then("dovrei vedere un messaggio che dice {string}", function (message) {
	assert.strictEqual(message, currentGameState.message);
});

Then(
	"dovrei vedere un messaggio che dice che la lettera non é nella parola",
	function () {
		throw new Error("TODO: Implementare questa funcionalità");
	}
);

Then(
	"lo stato del gioco dovrebbe rimanere {string} se ho vite rimanenti",
	function (status) {
		if (currentGameState.lives > 0) {
			assert.strictEqual(currentGameState.status, status);
		}
	}
);

Then(
	"le lettere {string} dovrebbero essere aggiunte ai miei tentativi",
	function (lettere) {
		throw new Error("TODO: Implementare questa funcionalità");
	}
);
