const DictionaryPort = require("../ports/dictionary-port");

/**
 * BaseDictionary - Simple dictionary implementation
 *
 * Students should implement:
 * - Load words from array or file
 * - Random selection logic
 */

class BaseDictionary extends DictionaryPort {
  constructor() {
    super();
    // TODO: Students should implement word loading
    this.words = ["EXEMPLO", "PALAVRA", "TESTE"];
    this.italianWords = ["ESEMPIO", "PAROLA", "TESTE"];
  }

  getRandomWord(difficulty, lang) {
    if (lang === "it") {
      return this.italianWords[0];
    } else {
      return this.words[0];
    }
  }
}

module.exports = BaseDictionary;
