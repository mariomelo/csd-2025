const DictionaryPort = require("../../ports/dictionary-port");

class BaseDictionary extends DictionaryPort {
  getRandomWord() {
    return "cadeira";
  }
}

module.exports = BaseDictionary;
