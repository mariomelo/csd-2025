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
    this.italianWords = ["ESEMPIO", "PAROLA", "TESTO"];
  }

  getRandomWord(difficulty, lang) {
    // TODO: Students should implement random selection
    // TODO: Optionally filter by difficulty
    const indiceCasuale = Math.floor(Math.random() * this.words.length);
    return lang === "it"
      ? this.italianWords[indiceCasuale]
      : this.words[indiceCasuale];
  }

  addWordToDictionary(word) {
    // Optional: Implement adding words to dictionary
    this.words.push(word.toUpperCase());
  }
}

module.exports = BaseDictionary;
