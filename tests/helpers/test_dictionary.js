const DictionaryPort = require("../../src/ports/dictionary-port");

class TestDictionary extends DictionaryPort {
  default_word = "casa";

  get_random_word() {
    return this.default_word;
  }

  set_current_word(word) {
    this.default_word = word;
  }
}

module.exports = TestDictionary;
