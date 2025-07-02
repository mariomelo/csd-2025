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
    if (gameState.word.toLowerCase().includes(letter.toLowerCase())) {
      return gameState;
    } else {
      return {
        ...gameState,
        lives: gameState.lives - 1,
        guesses: [...gameState.guesses, letter],
        message: letter + " não está na palavra"
      };
    }
  }
}

module.exports = GameEngine;
