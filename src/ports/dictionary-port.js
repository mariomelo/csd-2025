// Interface para o adaptador de dicionário
// Este é um port na arquitetura hexagonal - define o contrato

class DictionaryPort {
  get_random_word() {
    throw new Error('Method get_random_word must be implemented');
  }
}

module.exports = DictionaryPort;