// Interface para o adaptador de dicionário
// Este é um port na arquitetura hexagonal - define o contrato

class DictionaryPort {
  getRandomWord() {
    throw new Error('Method getRandomWord must be implemented');
  }
}

module.exports = DictionaryPort;