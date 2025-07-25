# 🐾 BattleTail - Pet Battle Adventure Game

BattleTail is a simple, interactive browser game where players choose a pet and battle against a random enemy using strategy, healing, and powerful attacks. The game is built using **HTML**, **CSS**, and **JavaScript** and uses class-based structure, constructor functions, and DOM manipulation for dynamic gameplay.

> 🎨 Pet and enemy images are from [いらすとや (irasutoya)](https://www.irasutoya.com/p/terms.html).

## 🧠 Demo

<https://holaquiz.netlify.app/>

## 🚀 How to Play

1. **Choose Your Pet:**

   - Select one from **Dog**, **Cat**, or a **Random Pet**.
   - Each pet has a **random name**, **HP**, and **energy**.
   - The selection is dynamically rendered with an image and stats.

2. **Start the Game:**

   - The **Start Game** button appears once a pet is selected.
   - Clicking it transitions to the **Battle Section**.

3. **Battle Interface:**

   - Your pet faces a randomly generated enemy (with its own name, HP, and energy).
   - You’ll see real-time stats for both characters.

4. **Battle Options:**

   - ⚔️ **Attack:** Inflicts 1–15 damage to the enemy and reduces pet energy by 1–4.
   - 💖 **Heal:** Restores 6–10 HP and 3–5 energy to your pet (capped at max).
   - ✨ **Special Skill:** Doubled attack damage (11–25) with additional energy cost.
   - 🏃 **Run Away:** Ends the battle and shows a defeat screen with a retry option.

5. **Battle Log:**

   - Every action is logged with clear messages.
   - Auto-scrolls to always show the newest message.

6. **Victory or Defeat:**
   - If the **enemy HP hits 0**, you win!
   - If your **pet’s HP hits 0**, it's game over.
   - In both cases, you can click **Play Again** to restart with a new random pet lineup.

---

## 🧠 Game Logic & Features

### 🐕 Pet & 👹 Enemy

- Defined via **constructor functions** (`class Pets`, `class Enemy` extends `Pets`).
- Stores `name`, `image`, `hp`, `energy`, `maxHp`, `maxEnergy`.
- Includes methods:
  - `attack(target, isSpecial)` – calculate damage and energy use.
  - `heal()` – randomly restore HP and energy.

### 🧪 Gameplay Mechanics

| Action        | Effect                                               |
| ------------- | ---------------------------------------------------- |
| Attack        | Deals random damage (1–15) to enemy, uses 1–4 energy |
| Special Skill | Deals higher damage (11–25), uses extra energy       |
| Heal          | Regain HP (6–10) and energy (3–5), up to max         |
| Run Away      | Ends the game early, displays result screen          |

---

## ✨ Technical Highlights

- **Dynamic DOM manipulation:** All game content is built using `document.createElement`.
- **Reusable utility functions:**
  - `isVisible(element, true/false)` – toggles section visibility.
  - `addLogMessage(logDiv, message)` – manages 5-line FIFO battle log.
- **Responsive layouts** using Flexbox (`.flex-column`, `.flex-row`).
- **Randomization logic** for pet/enemy stats and attack types.
- **State Reset:** `resetVsSection()` completely clears and regenerates pet stats, buttons, and DOM elements after each game session.

## 📌 Notes

- Built for practicing:
  - Constructor functions, inheritance
  - DOM interaction, dynamic rendering
  - Game state logic, reset systems
  - Log UI behavior using scroll and FIFO---

## 💡 Future Improvements

- Add **audio effects** for each action
- Show **pet/enemy animations** when attacked
- Add **difficulty levels** or multiple enemies
- Improve UI/UX for mobile devices

## 📜 License

This project is for educational purposes. Image assets are from [irasutoya](https://www.irasutoya.com/p/terms.html) and subject to their terms of use.
