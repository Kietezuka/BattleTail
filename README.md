# 🐾 BattleTail - Pet Battle Adventure Game

**BattleTail** is a dynamic, browser-based combat game built with **HTML**, **CSS**, and **JavaScript**. Players choose a pet and face off against a random enemy in turn-based battles filled with strategy, random events, and cute visuals.

This updated version features **modular structure using `petData.js` and `enemyData.js`**, improved object-oriented design, dynamic rendering, and better state management.

> 🎨 Pet and enemy images are sourced from [いらすとや (irasutoya)](https://www.irasutoya.com/p/terms.html).

---

## 🎮 Play the Game

**Live Demo:** [https://battletail.netlify.app/](https://battletail.netlify.app/)

---

## 🕹️ How to Play

1. **Select a Pet:**

   - Choose from a randomly generated **Dog**, **Cat**, or **Random Pet**.
   - Each pet has its own stats (HP & Energy) and an image.
   - Selection panel is dynamically generated from `pet.js`.

2. **Start the Battle:**

   - Press "Start Game" after selecting a pet.
   - A random enemy is selected from `enemy.js` with its own stats and image.

3. **Battle Options:**

   - ⚔️ **Attack** – Deal damage to enemy, consumes energy.
   - ✨ **Special Skill** – Stronger attack, higher energy cost.
   - 💖 **Heal** – Restore HP and energy.
   - 🏃 **Run Away** – End the game early.

4. **Battle Log:**

   - Displays messages for every action taken.
   - Scrolls automatically to show latest messages.

5. **Victory or Defeat:**
   - Enemy HP hits 0 → **You win!** 🎉
   - Your HP hits 0 → **Game Over!** 💀
   - Either way, retry via the **Play Again** button.

---

## ⚙️ Features

### 🧠 Object-Oriented Design

- `class Pets` handles shared pet/enemy logic.
- `class Enemy extends Pets` adds custom enemy logic.
- Pets and enemies are instantiated using data from:
  - `petData.js` – contains all pet info (`name`, `type`, `image`, `attacks`).
  - `enemyData.js` – contains enemy info (`name`, `image`, `attacks`).

### 🛠️ Game Mechanics

| Action           | Description                                    |
| ---------------- | ---------------------------------------------- |
| ⚔️ Attack        | Deal 5–15 damage, costs 1–3 energy             |
| ✨ Special Skill | Deal 15–20 damage, costs 5–8 energy            |
| 💖 Heal          | Restore 8–12 HP and 5–8 energy                 |
| 🏃 Run Away      | Exit the battle and return to selection screen |

### 📦 Modular Code

- Uses **module imports** for `petData` and `enemyData`.
- Cleaner codebase with separated concerns.

### 🔀 Randomization

- Pets are chosen randomly from their respective type.
- All names, images, HP, energy, and attack strings are randomized.
- Each attack is selected randomly from the pet/enemy’s personal list.

### 🔁 Full State Reset

- All game state and DOM elements are reset on each round.
- Game can be restarted without refreshing the page.

---

## 🧪 Technical Highlights

- Pure **Vanilla JavaScript**: No libraries or frameworks.
- DOM is built entirely using `document.createElement()` (no innerHTML spaghetti).
- Reusable helper functions:
  - `isVisible(element, show)` – toggles visibility.
  - `addLogMessage(container, text)` – handles battle log with scroll.

---

## 🧠 Code Example: Pet Class

```js
class Pets {
  constructor(name, type, image, hp, energy, maxHp, maxEnergy, attacks) {
    this.name = name;
    this.type = type;
    this.image = image;
    this.hp = hp;
    this.energy = energy;
    this.maxHp = maxHp;
    this.maxEnergy = maxEnergy;
    this.attacks = attacks;
  }

  attack(enemy, isSpecial) {
    const damage = Math.floor(Math.random() * 11) + (isSpecial ? 10 : 5);
    enemy.hp = Math.max(0, enemy.hp - damage);
    this.energy = Math.max(
      0,
      this.energy - (Math.floor(Math.random() * 4) + (isSpecial ? 5 : 1))
    );
    const index = Math.floor(Math.random() * this.attacks.length);
    return { damage, index };
  }

  heal() {
    const hpGain = Math.floor(Math.random() * 5) + 8;
    const energyGain = Math.floor(Math.random() * 4) + 5;
    this.hp = Math.min(this.maxHp, this.hp + hpGain);
    this.energy = Math.min(this.maxEnergy, this.energy + energyGain);
    return { hpGain, energyGain };
  }
}
```

## 📌 Notes

- Built for practicing:
  - Constructor functions and inheritance
  - `for...of` loop for cleaner iteration
  - ES6 **`import` / `export`** syntax for modularization
  - DOM interaction and dynamic rendering
  - Game state management and full reset system
  - Battle log UI using auto-scroll and FIFO (First In, First Out)

## 💡 Future Improvements

- Add **audio effects** for each action
- Show **pet/enemy animations** when attacked
- Add **difficulty levels** or multiple enemies
- Improve UI/UX for mobile devices

## 📜 License

This project is for educational purposes. Image assets are from [irasutoya](https://www.irasutoya.com/p/terms.html) and subject to their terms of use.
