const DictionaryPort = require("../../ports/dictionary-port");

class AdvancedDictionary extends DictionaryPort {
  getRandomWord() {
    return ["cadeira", "mesa", "computador", "livro", "janela", "porta", "carro", "bicicleta", "telefone", "televisão"][Math.floor(Math.random() * 10)];
  }
}

module.exports = AdvancedDictionary;
