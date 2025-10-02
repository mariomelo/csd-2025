const Config = require('./config');

/**
 * GameEngine - Main game logic for Hangman
 *
 * This is a boilerplate for students to implement the game logic.
 * The interface must match the server expectations.
 *
 * Students will implement:
 * - Complete game logic in startGame() and guessLetter()
 * - Optional features: timer, difficulty, score, money_bag
 * - Event handling in handleEvent() for advanced features
 */

class GameEngine {
  /**
   * Starts a new game
   * @param {string} difficulty - Optional: 'easy', 'medium', or 'hard'
   * @returns {object} GameState
   */
  startGame(difficulty) {
    const dictionary = Config.getCurrentDictionaryAdapter();
    const word = dictionary.getRandomWord(difficulty);

    // TODO: Students should implement complete game initialization
    return {
      status: 'RUNNING',           // 'RUNNING' | 'WON' | 'LOST'
      word: word,                   // The secret word
      lives: 6,                     // Remaining attempts
      display_word: this._getInitialDisplayWord(word),
      guesses: [],                  // Array of guessed letters
      message: 'Adivinhe uma letra',

      // Optional fields for advanced features (students will implement):
      // timer: 60,                 // Timer value (when timer flag enabled)
      // difficulty: difficulty,    // Current difficulty (when difficulty flag enabled)
      // score: 0,                  // Player score (when leaderboard flag enabled)
      // money_bag: false           // Money bag visibility (when moneyBag flag enabled)
    };
  }

  /**
   * Processes a letter guess
   * @param {object} currentGameState - Current game state
   * @param {string} letter - Guessed letter (uppercase)
   * @returns {object} Updated GameState
   */
  guessLetter(currentGameState, letter) {
    // TODO: Students should implement:
    // - Check if letter is in word
    // - Update display_word
    // - Update lives if wrong
    // - Update guesses array
    // - Update status (WON/LOST)
    // - Update message

    return currentGameState;
  }

  /**
   * Handles game events (timer tick, money bag click, etc)
   * @param {string} event - Event name ('tick', 'money_bag')
   * @param {any} data - Event data
   * @param {object} currentGameState - Current game state
   * @returns {object} Updated GameState
   */
  handleEvent(event, data, currentGameState) {
    // TODO: Students will implement event handling for advanced features:
    // - 'tick': Decrement timer, check for timeout
    // - 'money_bag': Handle money bag collection

    return currentGameState;
  }

  /**
   * Returns the current version of the game engine
   * @returns {string} Version string
   */
  version() {
    return '1.0.0';
  }

  // Helper methods (students can use or modify these)

  _getInitialDisplayWord(word) {
    return word
      .split('')
      .map(() => '_')
      .join(' ');
  }

  _getDisplayWord(gameState) {
    return gameState.word
      .split('')
      .map((letter) => (gameState.guesses.includes(letter) ? letter : '_'))
      .join(' ');
  }
}

// Export as singleton instance (required by server)
module.exports = new GameEngine();
