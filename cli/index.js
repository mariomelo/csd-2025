const chalk = require("chalk");
const readlineSync = require("readline-sync");
const GameEngine = require("../src/domain/game-engine");
const BaseDictionary = require("../src/adapters/dictionary/base_dictionary");

class GameCLI {
  constructor() {
    this.gameEngine = new GameEngine();
    this.dictionary = new BaseDictionary();
  }

  displayWelcome() {
    console.log(chalk.blue.bold("\n🎯 BEM-VINDO AO JOGO DA FORCA! 🎯\n"));
    console.log(chalk.yellow("Adivinhe a palavra secreta letra por letra!"));
    console.log(chalk.gray("Digite uma letra por vez e pressione ENTER\n"));
  }

  displayGameState(gameState) {
    console.log(
      chalk.cyan("\n📝 Palavra: ") + chalk.bold(gameState.display_word),
    );
    console.log(chalk.red("❤️  Vidas restantes: ") + gameState.lives);

    if (gameState.guesses.length > 0) {
      console.log(
        chalk.gray("🔤 Letras tentadas: ") + gameState.guesses.join(", "),
      );
    }

    console.log(chalk.green("💭 " + gameState.message));
  }

  displayGameOver(gameState) {
    if (gameState.status === "WON") {
      console.log(chalk.green.bold("\n🎉 PARABÉNS! VOCÊ GANHOU! 🎉"));
    } else if (gameState.status === "LOST") {
      console.log(chalk.red.bold("\n💀 GAME OVER! VOCÊ PERDEU! 💀"));
      console.log(chalk.yellow("A palavra era: ") + chalk.bold(gameState.word));
    }
  }

  play() {
    this.displayWelcome();

    let gameState = this.gameEngine.start_game();

    while (gameState.status === "RUNNING") {
      this.displayGameState(gameState);

      const letter = readlineSync
        .question(chalk.blue("\n🔤 Digite uma letra: "))
        .toLowerCase();

      gameState = this.gameEngine.guess_letter(gameState, letter);
    }

    this.displayGameState(gameState);
    this.displayGameOver(gameState);
  }
}

// Executar o jogo se este arquivo for chamado diretamente
if (require.main === module) {
  const game = new GameCLI();
  game.play();
}

module.exports = GameCLI;
