const DictionaryPort = require("../../src/ports/dictionary-port");

class TestDictionary extends DictionaryPort {
  constructor(word = "casa") {
    super();
    this.defaultWord = word;
  }

  getRandomWord() {
    return this.defaultWord;
  }

  setCurrentWord(word) {
    this.defaultWord = word;
  }
}

module.exports = TestDictionary;
