const gameEngine = require('../lib/engine/index');
const Config = require('../lib/engine/config');
const TestDictionary = require('./helpers/test-dictionary');

/**
 * Basic tests for GameEngine interface
 *
 * Students should:
 * - Make these tests pass by implementing game logic
 * - Add more comprehensive tests
 * - Test edge cases and game completion scenarios
 */

describe('GameEngine Interface', () => {
  beforeAll(() => {
    const testDictionary = new TestDictionary('CASA');
    Config.setDictionaryAdapter(testDictionary);
  });

  describe('startGame()', () => {
    it('should return a valid GameState object', () => {
      const gameState = gameEngine.startGame();

      expect(gameState).toHaveProperty('status');
      expect(gameState).toHaveProperty('word');
      expect(gameState).toHaveProperty('lives');
      expect(gameState).toHaveProperty('display_word');
      expect(gameState).toHaveProperty('guesses');
      expect(gameState).toHaveProperty('message');
      expect(Array.isArray(gameState.guesses)).toBe(true);
    });

  });

  describe('guessLetter()', () => {
    it('should accept gameState and letter parameters', () => {
      const initialState = gameEngine.startGame();
      const updatedState = gameEngine.guessLetter(initialState, 'A');
 
      expect(updatedState).toHaveProperty('status');
      expect(updatedState).toHaveProperty('guesses');
    });

    it('Deve ser case insensitive', () => {
         const inicial = {
          status: 'RUNNING',
          word: "Pensamento",
          lives: 6,
          display_word: "",
          guesses: [],
          message: 'Indovina una lettera',
        };

        const updatedState = gameEngine.guessLetter(inicial, 'A');
        console.log("state=", updatedState);
        //expect(updatedState.lives).toBe(inicial.lives);
        expect(updatedState.guesses).toContain('A');
    });

     it('Deve penalizar uma tentativa inválida', () => {
         const inicial = {
          status: 'RUNNING',
          word: "Pensamento",
          lives: 6,
          display_word: "",
          guesses: [],
          message: 'Indovina una lettera',
        };

        const updatedState = gameEngine.guessLetter(inicial, 'B');
        console.log("state=", updatedState);
        expect(updatedState.lives).toBe(inicial.lives - 1);
        expect(updatedState.guesses).toContain('B');
      });

  });

  

  describe('version()', () => {
    it('should return a version string', () => {
      const version = gameEngine.version();
      expect(typeof version).toBe('string');
      expect(version.length).toBeGreaterThan(0);
    });
  });
});
