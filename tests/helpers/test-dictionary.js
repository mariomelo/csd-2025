const DictionaryPort = require("../../src/ports/dictionary-port");

class TestDictionary extends DictionaryPort {
  defaultWord = "casa";

  getRandomWord() {
    return this.defaultWord;
  }

  setCurrentWord(word) {
    this.defaultWord = word;
  }
}

module.exports = TestDictionary;
