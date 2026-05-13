const Config = require('./config');

class GameEngine {
  startGame(difficulty) {
    const dictionary = Config.getCurrentDictionaryAdapter();
    const word = dictionary.getRandomWord(difficulty);

    return {
      status: 'RUNNING',
      word: word,
      lives: 5,
      timer: 60,
      display_word: this._getInitialDisplayWord(word),
      guesses: [],
      message: 'Adivinhe uma letra',
    };
  }

  guessLetter(currentGameState, letter) {
    let newState = { ...currentGameState}
    newState.guesses.push(letter)
    if(currentGameState.word.includes(letter)){
      newState.message = `Acertou, mas o jogo ainda não está implementado. =/`
      newState.display_word = this._getDisplayWord(newState)
    }
    else
    {
      newState.lives = currentGameState.lives - 1
      newState.message = `ERRRRRROOOOOOUUU! A letra ${letter} não está na palavra.`
    }
    return newState
  }

  handleEvent(event, data, currentGameState) {
    if(event === "tick"){
       return {...currentGameState,
         timer: currentGameState.timer - 1
       }
    }
  }

  version() {
    return '0.0.2-beta';
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
