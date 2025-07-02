// Interface para o game engine
// Este é um port na arquitetura hexagonal - define o contrato

class GameEnginePort {
  start_game() {
    throw new Error('Method start_game must be implemented');
  }

  guess_letter(game_status, letter) {
    throw new Error('Method guess_letter must be implemented');
  }
}

module.exports = GameEnginePort;