const Config = require("./config");

class GameEngine {
  startGame(difficulty) {
    const dictionary = Config.getCurrentDictionaryAdapter();
    const word = dictionary.getRandomWord(difficulty).toLowerCase();

    return {
      status: "RUNNING",
      word: word,
      lives: 2,
      display_word: this._getInitialDisplayWord(word),
      guesses: [],
      message: "Indovina una lettera",
    };
  }

  guessLetter(currentGameState, letter) {
    if (currentGameState.word.includes(letter)) {
      currentGameState.guesses.push(letter);
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
