const Dictionary = require("./dictionary/base_dictionary.js");
const default_dictionary = new Dictionary();

let currentDictionaryAdapter = default_dictionary;

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
