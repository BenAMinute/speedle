# Speedle Todo List

### Phase 1: Project Foundation & Basic UI
- [x] Clean up `App.tsx` and `App.css` (remove boilerplate).
- [x] Define core types/interfaces (e.g., `Word`, `Guess`, `GameStatus`, `GameMode`).
- [x] Create a basic layout:
    - [x] Score/Timer display area (supporting 30s, 60s, 90s modes).
    - [x] Wordle grid area.
    - [x] Virtual keyboard component.
- [x] Setup basic state management for the current word and current guess.
- [x] Create Welcome Screen (speedle.fun) with tutorial and "Play" button.
- [x] Create Daily Game page (speedle.fun/daily).

#### Phase 1 assessment merge (2026-07-23)
- [x] Resolve rule/copy mismatch for word length:
    - `WelcomeScreen` says "Type a 6-letter word" but gameplay currently uses 5-letter words.
    - Decide and standardize one rule across tutorial, validation, and word lists.

- [x] Fix grid sizing to use dynamic target length:
    - Verified error: `TS6133` + ESLint unused var for `targetWordLength` in `Grid.tsx`.
    - Replace hardcoded `Array.from({ length: 5 })` with `Array.from({ length: targetWordLength })`.

- [x] Clean and stabilize CSS baseline (`App.css` and `index.css`):
    - Remove leftover template/nested blocks that reduce maintainability.
    - Keep responsive behavior explicit and verify desktop/mobile rendering.
    - Harmonize global theme variables with game-specific palette to avoid conflicts.

### Phase 2: Core Wordle Mechanics
- [x] Implement word validation logic (checking letters against the target word).
- [x] Create the logic for coloring letters (correct, present, absent).
- [x] Implement the virtual keyboard state (disabling used keys, coloring them).
- [x] Add "Game Over" state for a single word (e.g., 6 failed guesses).
- [ ] Implement "Next Word" functionality:
    - [ ] Fetch/select a new word from a list upon successful completion.
    - [ ] Reset the local grid state for the new word.
- [x] Implement "Game Over" state for the overall game (timer hits zero).
- [x] Add a "Game Summary" screen showing total words completed and final time.

#### Phase 2 assessment merge (2026-07-23)
- [x] Correct win-flow sequencing in `App.tsx`:
    - Current behavior sets `gameState = 'won'` before next-word reset.
    - This interrupts the speed session and routes to end-state UI.
    - Keep state in `'playing'` for successful rounds during timed session.

- [x] Reconcile "single word lost" vs "entire session lost":
    - Current logic can end the whole game after 6 failed guesses.
    - Choose one intended rule and apply consistently in logic and UI text.

- [x] Remove duplicate-letter restriction:

- [x] Add keyboard status precedence logic:
    - Prevent downgrading a key state (for example, `correct` should never become `present`/`absent`).
    - Use precedence: `correct` > `present` > `absent` > `empty`.

### Phase 3: Game Loop & Timer
- [x] Implement the main timer logic (countdown based on selected mode: Easy/90s, Medium/60s, Hard/30s).
- [x] Implement "Next Word" functionality:
    - [x] Fetch/select a new word from a list upon successful completion.
    - [x] Reset the local grid state for the new word.
- [x] Implement "Game Over" state for the overall game (timer hits zero).
- [x] Add a "Game Summary" screen showing total words completed and final time.

#### Phase 3 assessment merge (2026-07-23)
- [X] Add full physical keyboard support for gameplay:
    - Current handling is primarily virtual keyboard button clicks.
    - Add app-level `keydown` listener when state is `'playing'`.
    - Map `Enter` -> `ENTER`, `Backspace/Delete` -> `DELETE`, and `a-z` -> uppercase letters.

- [x] Align score/timer UI with real session data:
    - Header currently renders `Score: 0` statically.
    - Bind score to actual metrics (`totalWordsCompleted`, streak, or points).
    - Keep summary metrics and in-game header definitions consistent.

- [x] Verify session transition behavior:
    - Solve word -> continue same timed session.
    - Timer reaches zero -> summary/end state.
    - Confirm no premature summary trigger after a round win.

### Phase 4: Firebase & Backend Integration
- [ ] Set up Google Firebase project and initialize in the workspace.
- [ ] Configure Firestore database.
- [ ] Configure Firebase Authentication for user accounts.
- [ ] Design and implement Firestore schema for daily words (organized by mode).
- [ ] Implement logic to fetch daily words from Firestore based on the current date and selected mode.
- [ ] Seed Firestore with at least 25 words for each mode (Easy, Medium, Hard).
- [ ] Implement user profile and high score storage in Firestore.

#### Phase 4 assessment merge (2026-07-23)
- [ ] Resolve verified build blockers in `wordService.ts`:
    - `TS2307`: cannot find module `../firebase`.
    - `TS2307`: cannot find module `firebase/firestore`.
    - `TS7006`: implicit `any` on `doc` callback.

- [ ] Implement missing firebase foundation:
    - Add `src/firebase.ts` with Firebase app + Firestore init and exported `db`.
    - Install required dependency (`firebase`) in `vite-speedle`.
    - Use typed Firestore queries to remove implicit `any`.
    - Use env-driven config (`VITE_*`) and validation for missing keys.

- [ ] Complete Daily mode backend linkage:
    - Replace hardcoded daily target (`APPLE`) with date+mode deterministic source.
    - Integrate Firestore word fetch path and fallback strategy.

### Phase 5: Polish & Features
- [ ] Add animations (letter flip, shake on error).
- [ ] Add sound effects (optional but nice).
- [ ] Implement "High Score" persistence using `localStorage` (or Firestore for cloud sync).
- [ ] Mobile responsiveness optimization.

#### Phase 5 assessment merge (2026-07-23)
- [ ] Reduce duplication and improve maintainability:
    - Extract shared guess/key logic from `App.tsx` and `DailyGame.tsx` into reusable utilities/hooks.
    - Keep one source of truth for evaluation behavior.

- [ ] Add quality gates and tests:
    - Unit tests: guess scoring, repeated-letter handling, key precedence.
    - Integration tests: next-word session flow, timer expiry, physical keyboard path.
    - CI checks: enforce `npm run build` and `npm run lint` on PRs.

- [ ] Re-run and record verification after each milestone:
    - Build and lint must pass without TS/ESLint errors.
    - Keep this file updated with resolved vs outstanding issues.


### Important notes
- [ ] cache for first time users, whether it be cookies or what. but a tutorial that pops up when first loaded, and does not pop up when user has visited the site before
- [ ] Fix the lettering inside of the grid. Still unable to type through keyboard.

### Cross-phase priority order (merged)
- [ ] P0 (immediate): win-flow sequencing, physical keyboard support, duplicate-letter rule removal, dynamic grid width, resolve current build blockers.
- [ ] P1: Firebase initialization + Firestore integration, daily word determinism, shared logic extraction.
- [ ] P2: CSS cleanup/theming harmonization, tests and CI quality gates.

### Build/Lint verification snapshot (merged)
- Last verified command:
    - `Set-Location "c:\Users\c60506\Downloads\speedle-main\speedle-main\vite-speedle"; npm install; npm run build; npm run lint`
- Last verified outcome:
    - `npm install` succeeded.
    - `build` failed with 4 TS errors (Grid unused `targetWordLength`, missing Firebase module, missing Firestore package/types, implicit any in doc callback).
    - `lint` failed with 1 ESLint error (Grid unused `targetWordLength`).
