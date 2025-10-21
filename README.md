# Synaptic Sprint

An educational AI-themed endless runner game built with JavaScript and the Kaplay game library. Learn AI concepts while playing!

## 🧠 Game Concept

Synaptic Sprint transforms traditional endless runner mechanics into an educational experience teaching artificial intelligence and machine learning concepts through gameplay.

## 🎮 Game Mechanics

### Data Points
Collect **Data Points** (formerly rings) scattered throughout the level. In AI, data is the fuel that powers machine learning models. The more data points you collect, the higher your score!

### Backpropagation Boost ⚡
Collect the purple **Backpropagation Boost** power-up to activate a temporary speed increase!

- **Duration**: 3 seconds
- **Speed Multiplier**: 1.5x
- **Visual Effect**: Purple pulsating aura around the player
- **Educational Tie-In**: Backpropagation is the algorithm that allows neural networks to learn by adjusting weights backward through the network, "boosting" the learning process!

### Enemies
Avoid or jump on enemies to maintain your run and build score multipliers.

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your system

### Installation
```bash
npm install
```

### Running the Game
```bash
npm run dev
```

## 🏗️ Project Structure

```
src/
├── entities/
│   ├── dataPoint.js         # Collectible data points (AI training data)
│   ├── backpropBoost.js     # Speed boost power-up
│   ├── sonic.js             # Player character
│   └── motobug.js           # Enemy character
├── scenes/
│   ├── game.js              # Main game scene
│   ├── mainMenu.js          # Title screen
│   ├── gameover.js          # Game over screen
│   └── disclaimer.js        # Initial disclaimer
├── kaplayCtx.js             # Kaplay context configuration
└── main.js                  # Game initialization & asset loading
```

## 🎓 Educational Goals

This game aims to teach:

1. **Data Collection**: Understanding the importance of gathering data (data points) in machine learning
2. **Backpropagation**: Learning how neural networks optimize through backward signal flow (boost mechanic)
3. **Iterative Learning**: Progressive difficulty represents how AI models improve over time

## 📝 Recent Changes

See [CHANGELOG.md](./CHANGELOG.md) for detailed information about recent updates and modifications.

## 🛠️ Built With

- [Kaplay](https://kaplayjs.com/) - Game library for JavaScript
- [Vite](https://vitejs.dev/) - Build tool and dev server

## 📄 License

See [LICENSE](./LICENSE) file for details.
