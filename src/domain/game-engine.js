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
      display_word: this.getInitialDisplayWord(word),
      guesses: [],
      message: "Adivinhe uma letra",
    };
  }
  
  updateDisplayWord(gameState) {
    return {
      ...gameState,
      display_word: this.getDisplayWord(gameState),
    };
  }
  
  getInitialDisplayWord(word) {
    return word
      .split("")
      .map(() => "_")
      .join(" ");
  }

  getDisplayWord(gameState) {
    return gameState.word
      .split("")
      .map((letter) => (gameState.guesses.includes(letter) ? letter : "_"))
      .join(" ");
  }

  guessLetter(gameState, letter) {
    if (gameState.word.indexOf(letter) == -1) {
      return {...gameState,
        lives: gameState.lives - 1,
        guesses: [...gameState.guesses, letter],
        message: `A letra "${letter}" não está na palavra.`,
      }
    } else {
      return this.updateDisplayWord({...gameState,
        display_word: this.getDisplayWord(gameState),
        guesses: [...gameState.guesses, letter],
        message: `Você acertou a letra "${letter}".`,
      })
    }
  }
}

module.exports = GameEngine;
