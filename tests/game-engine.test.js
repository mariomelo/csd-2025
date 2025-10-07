const gameEngine = require("../lib/engine/index");
const Config = require("../lib/engine/config");
const TestDictionary = require("./helpers/test-dictionary");

/**
 * Basic tests for GameEngine interface
 *
 * Students should:
 * - Make these tests pass by implementing game logic
 * - Add more comprehensive tests
 * - Test edge cases and game completion scenarios
 */

describe("GameEngine Interface", () => {
  beforeAll(() => {
    const testDictionary = new TestDictionary("CASA");
    Config.setDictionaryAdapter(testDictionary);
  });

  describe("startGame()", () => {
    it("should return a valid GameState object", () => {
      const gameState = gameEngine.startGame();

      expect(gameState).toHaveProperty("status");
      expect(gameState).toHaveProperty("word");
      expect(gameState).toHaveProperty("lives");
      expect(gameState).toHaveProperty("display_word");
      expect(gameState).toHaveProperty("guesses");
      expect(gameState).toHaveProperty("message");
      expect(Array.isArray(gameState.guesses)).toBe(true);
    });
  });

  describe("guessLetter()", () => {
    it("should accept gameState and letter parameters", () => {
      const initialState = gameEngine.startGame();
      const updatedState = gameEngine.guessLetter(initialState, "a");

      expect(updatedState).toHaveProperty("status");
      expect(updatedState).toHaveProperty("guesses");
    });

    it("should accept gameState and letter parameters and error character", () => {
      const initialState = gameEngine.startGame();
      const updatedState = gameEngine.guessLetter(initialState, "e");

      expect(updatedState).toHaveProperty("status");
      expect(updatedState).toHaveProperty("guesses");
      expect(updatedState.lives).toBe(1);
    });

    it("should accept gameState and letter parameters and correct character", () => {
      const initialState = gameEngine.startGame();
      const updatedState = gameEngine.guessLetter(initialState, "a");

      expect(updatedState).toHaveProperty("status");
      expect(updatedState).toHaveProperty("guesses");
      expect(updatedState.lives).toBe(2);
    });
    it("should verify looser status", () => {
      const initialState = gameEngine.startGame();

      let updatedState = gameEngine.guessLetter(initialState, "e");
      updatedState = gameEngine.guessLetter(updatedState, "m");

      expect(updatedState).toHaveProperty("status");
      expect(updatedState).toHaveProperty("guesses");
      expect(updatedState.lives).toBe(0);
      expect(updatedState.status).toBe("LOST");
    });
  });

  describe("version()", () => {
    it("should return a version string", () => {
      const version = gameEngine.version();
      expect(typeof version).toBe("string");
      expect(version.length).toBeGreaterThan(0);
    });
  });
});
