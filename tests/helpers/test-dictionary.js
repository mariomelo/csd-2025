const DictionaryPort = require('../../lib/engine/ports/dictionary-port');

/**
 * TestDictionary - Dictionary adapter for testing
 * Returns predictable words to make tests deterministic
 */
class TestDictionary extends DictionaryPort {
  constructor(word = 'CASA') {
    super();
    this.defaultWord = word;
    this.definitions = {
      'CASA': 'Una struttura abitativa per una famiglia o un individuo.',
    }
  }

  getRandomWord(difficulty) {
    return this.defaultWord;
  }

  setCurrentWord(word) {
    this.defaultWord = word;
  }
}

module.exports = TestDictionary;
