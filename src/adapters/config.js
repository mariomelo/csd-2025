const BaseDictionary = require("./dictionary/base-dictionary.js");
const AdvancedDictionary = require("./dictionary/advanced-dictionary.js");
const default_dictionary = new BaseDictionary();

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
