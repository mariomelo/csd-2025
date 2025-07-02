const GameEnginePort = require("../ports/game-engine-port");
const Config = require("../adapters/config");

class GameEngine extends GameEnginePort {
  start_game() {
    const dictionary = Config.getCurrentDictionaryAdapter();
    const word = dictionary.get_random_word();

    return {
      status: "RUNNING",
      word: word,
      lives: 6,
      display_word: word
        .split("")
        .map(() => "_")
        .join(" "),
      guesses: [],
      message: "Adivinhe uma letra",
    };
  }

  guess_letter(game_state, letter) {
    return game_state;
  }
}

module.exports = GameEngine;
