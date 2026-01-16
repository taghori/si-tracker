# Spirit Island Game Tracker 🏝️🔥🌊

A modern, responsive web application designed to track games of the board game **Spirit Island**. This tool helps players manage game phases, track time, and calculate scores easily on smartphones, tablets, or desktops.

**Live Version:** [https://spirit.taghor.de](https://spirit.taghor.de)

## Features ✨

- **Multi-language Support:** Fully localized in English and German, using official terminology and card text.
- **Advanced Adversary Logic:** 
  - Automatic phase injection for complex rules (e.g., **England's High Immigration** phase).
  - Dynamic rule handling (e.g., High Immigration is removed at appropriate times for Level 3).
  - **Note:** Currently, full rule logic and level data are verified and implemented only for **Base Game Adversaries** (Prussia, England, Sweden). Other expansion adversaries are placeholders and require playtesting.
- **Phase Tracking:** Navigate through the game phases (Spirit, Fast Power, Invader, Slow Power, Time) with detailed sub-step guidance.
- **In-Game Assistance:**
  - **Active Rules Overview:** View current Level effects, Escalation, and additional Loss Conditions at any time.
  - **Setup vs. Play:** Clear separation of one-time setup instructions and persistent gameplay effects.
- **Game Timer:** Built-in timer with pause functionality to track the duration of your sessions.
- **Round Management:** Easily track the current round and transition between rounds.
- **Game Setup:**
  - Support for 1-6 players.
  - Select Spirits from the Base game and all major expansions (*Branch & Claw, Jagged Earth, Horizons, Nature Incarnate, Feather & Flame*).
  - Configure Adversaries (with levels) and Scenarios.
- **Scoring System:** Comprehensive scoring calculator that accounts for:
  - Victory/Defeat type.
  - Difficulty level.
  - Dahan count.
  - Blight on board.
  - Invader cards remaining/discarded.
  - Terror Level and Round count tracking.
- **Game History:** Save and review your past games with detailed statistics.
- **Data Management:** Export and Import your game history as JSON files to keep your data across devices.

## Tech Stack 🛠️

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** TypeScript

## Getting Started 🚀

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/spirit-island-tracker.git
   cd spirit-island-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3001`.

## Building for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist/` directory, ready to be hosted on any static web server.

## License 📜

This project is created for private use. Spirit Island is a trademark of Greater Than Games. This tracker is a fan-made tool and is not affiliated with Greater Than Games or Pegasus Spiele.
