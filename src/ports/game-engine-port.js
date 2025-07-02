// Interface para o game engine
// Este é um port na arquitetura hexagonal - define o contrato

class GameEnginePort {
  startGame() {
    throw new Error('Method startGame must be implemented');
  }

  guessLetter(gameStatus, letter) {
    throw new Error('Method guessLetter must be implemented');
  }
}

module.exports = GameEnginePort;