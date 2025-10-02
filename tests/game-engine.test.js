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

    it('should accept optional difficulty parameter', () => {
      const gameState = gameEngine.startGame('easy');
      expect(gameState).toHaveProperty('status');
    });
  });

  describe('guessLetter()', () => {
    it('should accept gameState and letter parameters', () => {
      const initialState = gameEngine.startGame();
      const updatedState = gameEngine.guessLetter(initialState, 'A');

      expect(updatedState).toHaveProperty('status');
      expect(updatedState).toHaveProperty('guesses');
    });
  });

  describe('handleEvent()', () => {
    it('should accept event name, data, and gameState parameters', () => {
      const initialState = gameEngine.startGame();
      const updatedState = gameEngine.handleEvent('tick', undefined, initialState);

      expect(updatedState).toHaveProperty('status');
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

/**
 * Game logic tests - Students will implement these
 *
 * Uncomment and implement game logic to make these pass
 */

/*
describe('Game Logic (Students will implement)', () => {
  beforeAll(() => {
    const testDictionary = new TestDictionary('CASA');
    Config.setDictionaryAdapter(testDictionary);
  });

  describe('Correct guess', () => {
    it('should reveal letter in display_word and maintain lives', () => {
      const initialState = gameEngine.startGame();
      const updatedState = gameEngine.guessLetter(initialState, 'A');

      expect(updatedState.lives).toBe(initialState.lives);
      expect(updatedState.display_word).toContain('A');
      expect(updatedState.guesses).toContain('A');
    });
  });

  describe('Wrong guess', () => {
    it('should decrease lives and add letter to guesses', () => {
      const initialState = gameEngine.startGame();
      const updatedState = gameEngine.guessLetter(initialState, 'X');

      expect(updatedState.lives).toBe(initialState.lives - 1);
      expect(updatedState.guesses).toContain('X');
      expect(updatedState.display_word).not.toContain('X');
    });
  });

  describe('Game completion', () => {
    it('should set status to WON when all letters are guessed', () => {
      // Students implement
    });

    it('should set status to LOST when lives reach 0', () => {
      // Students implement
    });
  });
});
*/
