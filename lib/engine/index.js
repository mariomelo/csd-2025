const Config = require('./config');

class GameEngine {
  startGame(difficulty) {
    const dictionary = Config.getCurrentDictionaryAdapter();
    const word = dictionary.getRandomWord(difficulty);

    return {
      status: 'RUNNING',
      word: word,
      lives: 6,
      display_word: this._getInitialDisplayWord(word),
      guesses: [],
      message: 'Indovina una lettera',
    };
  }

  guessLetter(currentGameState, letter) {
    if(currentGameState.word.includes(letter)) {
      return {
        ...currentGameState,
        display_word: this._getDisplayWord({
          ...currentGameState,
          guesses: [...currentGameState.guesses, letter],
        }),
        guesses: [...currentGameState.guesses, letter],
        message: `La lettera ${letter} è nella parola!`,
      }
    }
    else{
    return {
      ...currentGameState,
      lives: currentGameState.lives - 1,
      message: `La lettera ${letter} non è nella parola.`,
    }
    }
  }

  handleEvent(event, data, currentGameState) {
    return currentGameState;
  }

  version() {
    return '0.0.1-beta';
  }

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

module.exports = new GameEngine();
