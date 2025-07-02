const DictionaryPort = require("../../ports/dictionary-port");

class BaseDictionary extends DictionaryPort {
  get_random_word() {
    return "placeholder";
  }
}

module.exports = BaseDictionary;
