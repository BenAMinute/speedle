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

### Phase 3: Game Loop & Timer
- [x] Implement the main timer logic (countdown based on selected mode: Easy/90s, Medium/60s, Hard/30s).
- [x] Implement "Next Word" functionality:
    - [x] Fetch/select a new word from a list upon successful completion.
    - [x] Reset the local grid state for the new word.
- [x] Implement "Game Over" state for the overall game (timer hits zero).
- [x] Add a "Game Summary" screen showing total words completed and final time.

### Phase 4: Firebase & Backend Integration
- [ ] Set up Google Firebase project and initialize in the workspace.
- [ ] Configure Firestore database.
- [ ] Configure Firebase Authentication for user accounts.
- [ ] Design and implement Firestore schema for daily words (organized by mode).
- [ ] Implement logic to fetch daily words from Firestore based on the current date and selected mode.
- [ ] Seed Firestore with at least 25 words for each mode (Easy, Medium, Hard).
- [ ] Implement user profile and high score storage in Firestore.

### Phase 5: Polish & Features
- [ ] Add animations (letter flip, shake on error).
- [ ] Add sound effects (optional but nice).
- [ ] Implement "High Score" persistence using `localStorage` (or Firestore for cloud sync).
- [ ] Mobile responsiveness optimization.


### Important notes
- [ ] cache for first time users, whether it be cookies or what. but a tutorial that pops up when first loaded, and does not pop up when user has visited the site before
- [ ] Fix the lettering inside of the grid. Still unable to type through keyboard.