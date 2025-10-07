const Config = require("./config");

class GameEngine {
	startGame(difficulty) {
		const dictionary = Config.getCurrentDictionaryAdapter();
		const word = dictionary.getRandomWord(difficulty);

		return {
			status: "RUNNING",
			word: word,
			lives: 6,
			display_word: this._getInitialDisplayWord(word),
			guesses: [],
			message: "Indovina una lettera",
		};
	}

	guessLetter(currentGameState, letter) {
		if (letter.length !== 1) {
			return {
				...currentGameState,
				message: "Inserisci una lettera",
			};
		}

		const word = currentGameState.word.toUpperCase();
		letter = letter.toUpperCase();

		if (word.includes(letter)) {
			const newGameState = {
				...currentGameState,
				guesses: [...currentGameState.guesses, letter],
				message: `La lettera ${letter} è nella parola.`,
			};
			newGameState.display_word = this._getDisplayWord(newGameState);

			if (!newGameState.display_word.includes("_")) {
				newGameState.status = "WIN";
				newGameState.message = "Hai indovinato la parola!";
				return newGameState;
			}

			return newGameState;
		} else {
			const newGameState = {
				...currentGameState,
				lives: currentGameState.lives - 1,
				guesses: [...currentGameState.guesses, letter],
				message: `La lettera ${letter} non è nella parola.`,
			};
			if (newGameState.lives <= 0) {
				newGameState.status = "LOSE";
				newGameState.message = `Hai perso! La parola era ${word}.`;
				newGameState.display_word = word.split("").join(" ");
				return newGameState;
			}
			return newGameState;
		}
	}

	handleEvent(event, data, currentGameState) {
		return currentGameState;
	}

	version() {
		return "0.0.2-beta";
	}

	_getInitialDisplayWord(word) {
		return word
			.split("")
			.map(() => "_")
			.join(" ");
	}

	_getDisplayWord(gameState) {
		return gameState.word
			.split("")
			.map((letter) => (gameState.guesses.includes(letter) ? letter : "_"))
			.join(" ");
	}
}

module.exports = new GameEngine();
