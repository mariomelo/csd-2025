const BaseDictionary = require('./adapters/base-dictionary');
const ScrumDictionary = require('./adapters/scrum-dictionary');

/**
 * Config - Manages dictionary adapter selection
 *
 * Allows switching between different dictionary implementations at runtime.
 * Students can create new dictionary adapters and set them here.
 */

let currentDictionaryAdapter = new ScrumDictionary();

const setDictionaryAdapter = (adapterInstance) => {
  currentDictionaryAdapter = adapterInstance;
};

const getCurrentDictionaryAdapter = () => {
  return currentDictionaryAdapter;
};

module.exports = {
  setDictionaryAdapter,
  getCurrentDictionaryAdapter,
};
