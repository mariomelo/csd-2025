const DictionaryPort = require("../../ports/dictionary-port");

class BaseDictionary extends DictionaryPort {
  getRandomWord() {
    return "placeholder";
  }
}

module.exports = BaseDictionary;
