const GameEngine = require("../src/domain/game-engine");
const Config = require("../src/adapters/config");
const TestDictionaryAdapter = require("./helpers/test_dictionary");

describe("O jogo deve permitir que o jogador", () => {
  let gameEngine;

  beforeAll(() => {
    let test_dictionary = new TestDictionaryAdapter();
    Config.setDictionaryAdapter(test_dictionary);
  });

  beforeEach(() => {
    gameEngine = new GameEngine();
  });

  describe("inicie jogo", () => {
    it("e deve retornar o estado inicial do jogo", () => {
      const gameState = gameEngine.start_game();

      expect(gameState).toHaveProperty("status", "RUNNING");
      expect(gameState).toHaveProperty("word");
      expect(gameState).toHaveProperty("lives");
      expect(gameState).toHaveProperty("display_word");
      expect(gameState).toHaveProperty("guesses");
      expect(gameState).toHaveProperty("message");
      expect(gameState.lives).toBeGreaterThan(0);
      expect(gameState.guesses).toEqual([]);
    });
  });

  describe("faça um palpite errado", () => {
    it("e deve diminuir vidas e adicionar letra aos palpites quando letra errada é tentada", () => {
      const initialState = gameEngine.start_game();
      const wrongLetter = "r";

      const updatedState = gameEngine.guess_letter(initialState, wrongLetter);

      expect(updatedState.lives).toBe(initialState.lives - 1);
      expect(updatedState.guesses).toContain(wrongLetter);
      expect(updatedState.message).toMatch(/não está na palavra/);
    });
  });
});
