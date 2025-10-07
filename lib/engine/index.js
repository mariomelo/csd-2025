const Config = require("./config");

class GameEngine {
  startGame(difficulty) {
    const dictionary = Config.getCurrentDictionaryAdapter();
    const word = dictionary.getRandomWord(difficulty, "it").toLowerCase();

    return {
      status: "RUNNING",
      word: word,
      lives: 2,
      display_word: this._getInitialDisplayWord(word),
      guesses: [],
      message: "Indovina una lettera",
      defaultTimer: 45,
    };
  }

  guessLetter(currentGameState, letter) {
    if (letter.length !== 1) {
      return {
        ...currentGameState,
        message: "Puoi inserire solo una lettera.",
      };
    }
    currentGameState.guesses.push(letter);
    if (currentGameState.word.includes(letter)) {
      currentGameState.display_word = this._getDisplayWord(currentGameState);

      currentGameState.status = currentGameState.display_word.includes("_")
        ? "RUNNING"
        : "WON";
      currentGameState.message = `La lettera ${letter} è corretta!`;

      return currentGameState;
    } else {
      currentGameState.lives -= 1;
      return {
        ...currentGameState,
        message: `La lettera ${letter} non è nella parola.`,
        status: currentGameState.lives === 0 ? "LOST" : "RUNNING",
      };
    }
  }

  handleEvent(event, data, currentGameState) {
    return currentGameState;
  }

  version() {
    return "0.0.3-beta";
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
