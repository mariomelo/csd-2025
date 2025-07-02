const GameEnginePort = require("../ports/game-engine-port");
const Config = require("../adapters/config");

class GameEngine extends GameEnginePort {
  startGame() {
    const dictionary = Config.getCurrentDictionaryAdapter();
    const word = dictionary.getRandomWord();

    return {
      status: "RUNNING",
      word: word,
      lives: 6,
      display_word: word,
      guesses: [],
      message: "Adivinhe uma letra",
    };
  }

  guessLetter(gameState, letter) {
      return gameState;
  }
}

module.exports = GameEngine;
