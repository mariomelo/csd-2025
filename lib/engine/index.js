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
			timer: 0,
		};
	}

	guessLetter(currentGameState, letter) {
		// If "letter" == "help" && gameState.helps > 0,
		// add to "guesses" a letter not in the word,
		// and print the guesses in the message

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
				message: `La lettera ${letter} é nella parola.`,
			};
			newGameState.display_word = this._getDisplayWord(newGameState);

			if (!newGameState.display_word.includes("_")) {
				newGameState.status = "WON";
				newGameState.message = "Hai indovinato la parola! La sua definizione é: " + Config.getCurrentDictionaryAdapter().definitions[word];
				return newGameState;
			}

			return newGameState;
		} else {
			const newGameState = {
				...currentGameState,
				lives: currentGameState.lives - 1,
				guesses: [...currentGameState.guesses, letter],
				message: `La lettera ${letter} non é nella parola.`,
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

		const sentences = [
			"The daily scrum meeting should be quick and focused.",
			"The Scrum Master should facilitate team collaboration.",
			"Test Driven Development helps ensure code quality.",
			"Continuous Integration helps catch issues early.",
			"Backlog items must generate an increment of value.",
		]

		if(event === "tick") {
			const newTimer = currentGameState.timer + 1;
			let message = currentGameState.message;
			if(newTimer % 5 === 0) {
				message = sentences[Math.floor(Math.random() * sentences.length)];
			}

			return {
				...currentGameState,
				message: message,
				timer: currentGameState.timer + 1,
			};
	
		}
		return currentGameState;
	}

	version() {
		return "0.0.7-beta";
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
