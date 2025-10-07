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
    this.definitions = {
      'SPRINT': 'A period of time during which specific work has to be completed and made ready for review.',
      'BACKLOG': 'A list of tasks or features that need to be completed in a project.',
      'STORY': 'A user story is a tool used in Agile software development to capture a description of a software feature from an end-user perspective.',
      'TASK': 'A piece of work to be done or undertaken.',
      'VELOCITY': 'A measure of the amount of work a team can tackle during a single sprint.',
      'RETROSPECTIVE': 'A meeting held at the end of a sprint to discuss what went well, what didn’t, and how to improve.',
      'INCREMENT': 'The sum of all the Product Backlog items completed during a Sprint and the value of the increments of all previous Sprints.',
      'SCRUMMASTER': 'A facilitator for an Agile development team.',
      'PRODUCTOWNER': 'The person responsible for maximizing the value of the product resulting from the work of the Development Team.',
      'DEVELOPER': 'A member of the Scrum Team who is committed to creating any aspect of a usable Increment each Sprint.',
      'EPIC': 'A large body of work that can be broken down into a number of smaller tasks (user stories).',
      'BURNDOWN': 'A graphical representation of work left to do versus time.',
    }
  }

  getRandomWord(difficulty) {
    const size = this.words.length
    const randomIndex = Math.floor(Math.random() * size);
    return this.words[randomIndex];
  }
}

module.exports = ScrumDictionary;
