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
			const updatedState = gameEngine.guessLetter(initialState, "A");

			expect(updatedState).toHaveProperty("status");
			expect(updatedState).toHaveProperty("guesses");
			expect(updatedState).toHaveProperty("lives");
			expect(updatedState).toHaveProperty("display_word");

			expect(updatedState.status).toBe("RUNNING");
			expect(updatedState.lives).toBe(6);
			expect(updatedState.display_word).toBe("_ A _ A");
      expect(updatedState.message).toBe("La lettera A è nella parola.");
		});
	});

  describe("guessWord()", () => {
		it("should go to state WIN", () => {
			const initialState = gameEngine.startGame();
      const stateOne = gameEngine.guessLetter(initialState, "C");
			const stateTwo = gameEngine.guessLetter(stateOne, "A");
      const stateThree = gameEngine.guessLetter(stateTwo, "S");

			expect(stateThree).toHaveProperty("status");
			expect(stateThree).toHaveProperty("guesses");
			expect(stateThree).toHaveProperty("lives");
			expect(stateThree).toHaveProperty("display_word");

			expect(stateThree.status).toBe("WIN");
			expect(stateThree.lives).toBe(6);
			expect(stateThree.display_word).toBe("C A S A");
      expect(stateThree.message).toBe("Hai indovinato la parola!");
		});
	});

  describe("guessWordCaseInsensitive()", () => {
		it("should go to state WIN", () => {
			const initialState = gameEngine.startGame();
      const stateOne = gameEngine.guessLetter(initialState, "C");
			const stateTwo = gameEngine.guessLetter(stateOne, "a");
      const stateThree = gameEngine.guessLetter(stateTwo, "S");

			expect(stateThree).toHaveProperty("status");
			expect(stateThree).toHaveProperty("guesses");
			expect(stateThree).toHaveProperty("lives");
			expect(stateThree).toHaveProperty("display_word");

			expect(stateThree.status).toBe("WIN");
			expect(stateThree.lives).toBe(6);
			expect(stateThree.display_word).toBe("C A S A");
      expect(stateThree.message).toBe("Hai indovinato la parola!");
		});
	});

  describe("wrongWord()", () => {
		it("should go to state LOSE", () => {
			const initialState = gameEngine.startGame();
      let newState = gameEngine.guessLetter(initialState, "Q");
			newState = gameEngine.guessLetter(newState, "W");
      newState = gameEngine.guessLetter(newState, "E");
      newState = gameEngine.guessLetter(newState, "R");
      newState = gameEngine.guessLetter(newState, "T");
      newState = gameEngine.guessLetter(newState, "Y");


			expect(newState).toHaveProperty("status");
			expect(newState).toHaveProperty("guesses");
			expect(newState).toHaveProperty("lives");
			expect(newState).toHaveProperty("display_word");

			expect(newState.status).toBe("LOSE");
			expect(newState.lives).toBe(0);
			//expect(newState.display_word.includes("_")).toBe(true);
      expect(newState.message).toBe("Hai perso! La parola era CASA.");
		});
	});

  describe("wrongLetter()", () => {
		it("should accept gameState and letter parameters", () => {
			const initialState = gameEngine.startGame();
			const updatedState = gameEngine.guessLetter(initialState, "X");

			expect(updatedState).toHaveProperty("status");
			expect(updatedState).toHaveProperty("guesses");
			expect(updatedState).toHaveProperty("lives");
			expect(updatedState).toHaveProperty("display_word");

			expect(updatedState.status).toBe("RUNNING");
			expect(updatedState.lives).toBe(5);
			expect(updatedState.display_word).toBe("_ _ _ _");
      expect(updatedState.message).toBe("La lettera X non è nella parola.");
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
