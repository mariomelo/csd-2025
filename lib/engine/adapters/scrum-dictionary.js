const DictionaryPort = require('../ports/dictionary-port');

/**
 * BaseDictionary - Simple dictionary implementation
 *
 * Students should implement:
 * - Load words from array or file
 * - Random selection logic
 */

class ScrumDictionary extends DictionaryPort {
  constructor() {
    super();
    this.words = ['SPRINT', 'BACKLOG', 'STORY', 'TASK', 'VELOCITY', 'RETROSPECTIVE', 'INCREMENT', 'SCRUMMASTER', 'PRODUCTOWNER', 'DEVELOPER', 'EPIC', 'BURNDOWN'];
  }

  getRandomWord(difficulty) {
    const size = this.words.length
    const randomIndex = Math.floor(Math.random() * size);
    return this.words[randomIndex];
  }
}

module.exports = ScrumDictionary;
