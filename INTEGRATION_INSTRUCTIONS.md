# Integration Instructions for Hangman Game Engine

This document provides instructions for integrating the student-developed game engine with the hangman-web server infrastructure.

## Overview

The students have been developing the game engine in a separate repository. This integration ensures that:
1. The game engine interface matches the server's expectations
2. Tests are updated to reflect the correct interface
3. GitHub Actions properly deploys files to the server via SCP
4. The dictionary file is properly integrated

## Current Server Interface

The server (`/Users/melomario/projetos/hangman-web/server.js`) expects the game engine at `/lib/engine/index.js` to export an object with the following methods:

### Required Methods

#### 1. `startGame(difficulty)`
**Parameters:**
- `difficulty` (optional string): `"easy"`, `"medium"`, or `"hard"` - only passed when difficulty feature flag is enabled

**Returns:** GameState object with:
```javascript
{
  status: "RUNNING" | "WON" | "LOST",
  word: string,              // The secret word (server uses for validation)
  lives: number,             // Remaining attempts
  display_word: string,      // Word with underscores for unguessed letters (e.g., "H_NG__N")
  guesses: array,            // Array of guessed letters (e.g., ["A", "E", "H", "N"])
  message: string,           // Message to display to player

  // Optional fields (only needed when feature flags are enabled):
  timer: number,             // Timer value (when timer flag enabled)
  difficulty: string,        // Current difficulty (when difficulty flag enabled)
  score: number,             // Player score (when leaderboard flag enabled)
  money_bag: boolean         // Whether money bag is visible (when moneyBag flag enabled)
}
```

#### 2. `guessLetter(currentGameState, letter)`
**Parameters:**
- `currentGameState` (object): Current game state
- `letter` (string): Single letter guess (uppercase, e.g., "A")

**Returns:** Updated GameState object

#### 3. `handleEvent(event, data, currentGameState)`
**Parameters:**
- `event` (string): Event name (`"tick"` for timer, `"money_bag"` for money bag click)
- `data` (any): Event-specific data (currently `undefined` for both events)
- `currentGameState` (object): Current game state

**Returns:** Updated GameState object

**Event Types:**
- `"tick"`: Sent every second when timer feature is enabled and game status is "RUNNING"
- `"money_bag"`: Sent when player clicks the money bag (when moneyBag feature is enabled)

#### 4. `version()`
**Returns:** String version identifier (e.g., `"1.0.0"`)

### Export Format

The module must export a **singleton instance** (not a class):

```javascript
class GameEngine {
  // ... methods implementation
}

module.exports = new GameEngine();
```

## Server API Endpoints

The server exposes these endpoints that call the game engine:

- `POST /api/start` → calls `gameEngine.startGame(difficulty)`
- `POST /api/guess` → calls `gameEngine.guessLetter(gameState, letter)`
- `POST /api/event` → calls `gameEngine.handleEvent(event, data, gameState)`
- `GET /api/version` → calls `gameEngine.version()`

## File Structure Requirements

### Engine Location
- **Path:** `/lib/engine/index.js` (required)
- **Additional files:** Any files in `/lib/engine/**/*.js` will trigger hot-reload

### Dictionary File
The dictionary should be located at:
- **Path:** `/lib/engine/dictionary.json` or `/lib/engine/words.json` (recommended)
- **Format:** JSON array of strings
```json
[
  "HANGMAN",
  "JAVASCRIPT",
  "PROGRAMMING",
  ...
]
```

Or structured by difficulty:
```json
{
  "easy": ["CAT", "DOG", "FISH"],
  "medium": ["COMPUTER", "KEYBOARD"],
  "hard": ["ALGORITHM", "ASYNCHRONOUS"]
}
```

## GitHub Actions SCP Deployment

The GitHub Actions workflow should:

1. **Copy all engine files to the server:**
   ```yaml
   - name: Deploy Engine to Server
     uses: appleboy/scp-action@master
     with:
       host: ${{ secrets.SERVER_HOST }}
       username: ${{ secrets.SERVER_USER }}
       key: ${{ secrets.SSH_PRIVATE_KEY }}
       source: "lib/engine/*"
       target: "/Users/melomario/projetos/hangman-web/"
       strip_components: 0
   ```

2. **Expected secrets in GitHub repository:**
   - `SERVER_HOST`: Server hostname or IP
   - `SERVER_USER`: SSH username (e.g., `melomario`)
   - `SSH_PRIVATE_KEY`: Private SSH key for authentication

3. **Target directory structure on server:**
   ```
   /Users/melomario/projetos/hangman-web/
   ├── lib/
   │   └── engine/
   │       ├── index.js         (main engine file)
   │       ├── dictionary.json  (word list)
   │       └── *.js             (any additional modules)
   ├── server.js
   ├── config.json
   └── ...
   ```

## Feature Flags (Currently Disabled)

All feature flags are currently set to `false` in `config.json`. Students will implement these features:

```json
{
  "featureFlags": {
    "virtualKeyboard": false,
    "timer": false,
    "difficulty": false,
    "leaderboard": false,
    "moneyBag": false
  }
}
```

**Students should implement the game engine to support these features, but they will be enabled by the instructor via the admin panel at `/adm`.**

## Testing Requirements

Tests should verify:

1. **Basic interface:**
   - `startGame()` returns valid GameState with all required fields
   - `guessLetter()` accepts gameState and letter, returns updated gameState
   - `version()` returns a string
   - `handleEvent()` accepts event name, data, and gameState

2. **GameState structure:**
   - `status` is one of: "RUNNING", "WON", "LOST"
   - `guesses` is an array of strings
   - `lives` is a number
   - `display_word` matches word length with underscores for unguessed letters
   - `message` is a string

3. **Game logic:**
   - Correct guesses reveal letters in `display_word`
   - Wrong guesses decrease `lives`
   - `guesses` array is updated with each guess
   - Game ends (status changes) when word is complete or lives reach 0

4. **Feature flag support (optional for students, required later):**
   - `startGame(difficulty)` accepts difficulty parameter
   - `handleEvent("tick")` is supported
   - `handleEvent("money_bag")` is supported
   - GameState includes `timer`, `score`, `money_bag` fields when relevant

## Hot-Reload Behavior

The server watches `/lib/engine/**/*.js` for changes:
- On file change, the module cache is cleared
- Engine is reloaded
- All connected browser clients are notified via Server-Sent Events
- Browsers automatically reload to get the new engine version

**Students can develop with instant feedback** - changes to engine files appear in the browser within 1-2 seconds.

## Integration Checklist

- [ ] Update `startGame()` signature to accept optional `difficulty` parameter
- [ ] Ensure `startGame()` returns all required GameState fields
- [ ] Implement `guessLetter(currentGameState, letter)` with correct signature
- [ ] Implement `handleEvent(event, data, currentGameState)` for timer and money bag
- [ ] Ensure module exports singleton instance: `module.exports = new GameEngine();`
- [ ] Move dictionary file to `/lib/engine/dictionary.json` or similar
- [ ] Update tests to match server interface expectations
- [ ] Configure GitHub Actions SCP deployment:
  - Source: `lib/engine/*`
  - Target: `/Users/melomario/projetos/hangman-web/`
  - Ensure all required secrets are set
- [ ] Verify hot-reload works by making a small change and observing browser update
- [ ] Test with all feature flags disabled (default state)

## Example GitHub Actions Workflow

```yaml
name: Deploy Engine to Server

on:
  push:
    branches: [ main ]
    paths:
      - 'lib/engine/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Deploy via SCP
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          source: "lib/engine/"
          target: "/Users/melomario/projetos/hangman-web/lib/"
          strip_components: 1
          rm: false
```

## Notes

- **Do not modify server.js, public/**, or any files outside `/lib/engine/`
- The server is already configured for all feature flags - students only implement the engine logic
- Feature flags are controlled via admin panel at `/adm` (instructor only)
- Documentation for students is available at `/docs` (updates automatically based on enabled flags)
- All communication happens via JSON over HTTP - no WebSockets or other protocols needed
