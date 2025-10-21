# Changelog

All notable changes to Synaptic Sprint will be documented in this file.

## [0.2.0] - 2025-10-21

### Added

#### New Game Concepts
- **Data Points System**: Introduced AI-themed collectibles replacing the original ring mechanics
  - Created new `dataPoint.js` entity in `src/entities/`
  - Data Points use the same visual assets as rings but with updated terminology
  - Score display now shows "DATA POINTS" instead of "SCORE"

- **Backpropagation Boost Power-Up**: New speed boost mechanic teaching AI backpropagation concepts
  - Created new `backpropBoost.js` entity in `src/entities/`
  - Spawns less frequently than Data Points (every 5-10 seconds vs 0.5-3 seconds)
  - Provides 3-second speed boost at 1.5x normal speed when collected
  - Visual feedback includes:
    - Purple aura effect around the player during boost
    - "BOOST!" text indicator
    - Pulsating aura animation using wave effect
  - Speed boost affects all game elements:
    - Background scrolling speed
    - Platform movement speed
    - Enemy (motobug) movement speed
    - Data Point movement speed
    - Other boost power-ups movement speed

### Changed

#### Core Game Files

**src/main.js**
- Renamed sprite loading from `"ring"` to `"dataPoint"`
- Added new `"backpropBoost"` sprite loading with pulse animation
- Both sprites currently use the same graphic asset (`graphics/ring.png`) as placeholder

**src/scenes/game.js**
- Updated imports: replaced `makeRing` with `makeDataPoint` and added `makeBackpropBoost`
- Changed score text from "SCORE : 0" to "DATA POINTS : 0"
- Renamed collision tag from `"ring"` to `"dataPoint"`
- Updated all score display texts to use "DATA POINTS" terminology
- Implemented speed boost collision detection and effect application
- Modified all spawning functions to apply speed multiplier when boost is active:
  - `spawnMotoBug()`: Enemies move 1.5x faster during boost
  - `spawnDataPoint()`: Data points move 1.5x faster during boost
  - `spawnBackpropBoost()`: New spawning function with longer intervals
- Updated main game loop to apply speed multiplier to background and platform scrolling

**src/scenes/mainMenu.js**
- Changed game title from "SONIC RING RUN" to "SYNAPTIC SPRINT"

**src/entities/sonic.js**
- Renamed `ringCollectUI` property to `dataPointCollectUI`
- Added `speedBoostActive` boolean property to track boost state
- Added `speedBoostAura` visual effect component:
  - Purple circular aura (color: RGB 150, 50, 255)
  - Initially hidden (opacity: 0)
  - Positioned at player's center
  - Scaled and animated during boost

### Removed

**src/entities/ring.js**
- Deprecated in favor of new `dataPoint.js` entity
- File can be safely deleted as all references have been updated

### Technical Notes

#### Asset Placeholder
- Both Data Points and Backpropagation Boost currently use `graphics/ring.png`
- Future update should replace with custom AI-themed graphics:
  - Data Points: Could use node/neuron visualization
  - Backpropagation Boost: Could use gradient/arrow visualization representing backward signal flow

#### Game Balance
- Backpropagation Boost spawn rate: 5-10 seconds (less frequent than data points)
- Boost duration: 3 seconds
- Speed multiplier: 1.5x
- Boost effects are multiplicative across all game speed elements

#### Code Architecture
- Maintained consistent entity pattern with other game objects
- Used Kaplay's built-in collision and animation systems
- Implemented boost state management within sonic entity for easy access
- Visual effects use Kaplay's wave function for smooth pulsating animation

### Educational Alignment

These changes align with the goal of teaching AI concepts through gameplay:

1. **Data Points**: Represent training data in machine learning, emphasizing the importance of data collection in AI systems

2. **Backpropagation Boost**: References the backpropagation algorithm used to train neural networks:
   - The speed boost represents how backpropagation accelerates learning
   - The temporary nature reflects iterative learning processes
   - Purple coloring creates visual distinction from regular data points
   - The "boost" mechanic metaphorically represents optimization in neural networks

---

## [0.1.0] - Initial Release

### Initial Features
- Basic Sonic runner game with ring collection
- Enemy avoidance mechanics
- Score system with multipliers
- Jump controls
- Progressive difficulty increase
