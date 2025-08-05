import { petData } from "./pet.js";
import { enemyData } from "./enemy.js";

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
    const damegeValueEnemy =
      Math.floor(Math.random() * 11) + Number(`${isSpecial ? 10 : 5}`);
    enemy.hp = Math.max(0, enemy.hp - damegeValueEnemy);
    const reducePetEnergyValue =
      Math.floor(Math.random() * 4) + Number(`${isSpecial ? 5 : 1}`);
    this.energy = Math.max(0, this.energy - reducePetEnergyValue);
    return { damegeValueEnemy };
  }

  heal() {
    const healPetHpValue = Math.floor(Math.random() * 5) + 8;
    const healPetEnergyValue = Math.floor(Math.random() * 4) + 5;
    this.hp = Math.min(this.maxHp, this.hp + healPetHpValue);
    this.energy = Math.min(this.maxEnergy, this.energy + healPetEnergyValue);
    return { healPetHpValue, healPetEnergyValue };
  }
}

class Enemy extends Pets {
  constructor(name, image, hp, energy, maxHp, maxEnergy, attacks) {
    super(name, "enemy", image, hp, energy, maxHp, maxEnergy, attacks);
  }
  attack(pet) {
    const damegeValuePet = Math.floor(Math.random() * 19) + 8;
    pet.hp = Math.max(0, pet.hp - damegeValuePet);

    const reduceEnermyEnergyValue = Math.floor(Math.random() * 4) + 1;
    this.energy = Math.max(0, this.energy - reduceEnermyEnergyValue);

    return { damegeValuePet };
  }
}

const selectPetSection = document.getElementById("select-pet");
const vsSection = document.getElementById("vs-section");
const resultSection = document.getElementById("result-section");

const dogDiv = document.getElementById("dog-div");
const catDiv = document.getElementById("cat-div");
const randomPetDiv = document.getElementById("random-pet-div");

const petSelectBtns = Array.from(document.querySelectorAll(".pet button"));
const dogBtn = document.getElementById("dog");
const catBtn = document.getElementById("cat");
const randomPetBtn = document.getElementById("randomPet");

const startBtn = document.getElementById("start-btn");

// const petTypes = ["dog", "cat", "randomPet"];
const petTypes = [];
for (let pet of petData) {
  if (!petTypes.includes(pet.type)) {
    petTypes.push(pet.type);
  }
}

const pets = [];

//Pet

function renderRandomPets() {
  for (let i = 0; i < petTypes.length; i++) {
    const sameType = [];
    for (let pet of petData) {
      if (pet.type === petTypes[i]) {
        sameType.push(pet);
      }
    }
    const randomIndex = Math.floor(Math.random() * sameType.length);
    const pet = sameType[randomIndex];
    const hp = Math.floor(Math.random() * 21) + 60;
    const energy = Math.floor(Math.random() * 16) + 40;
    const imageSrc = `./image/pet-images/${pet.image}`;

    pets.push(
      new Pets(
        pet.name,
        pet.type,
        imageSrc,
        hp,
        energy,
        hp,
        energy,
        pet.attacks
      )
    );
    renderSelectSection(pet.name, pet.type, imageSrc, hp, energy);
  }
}

renderRandomPets();

function renderSelectSection(name, type, image, hp, energy) {
  if (type === "dog") {
    const dogImageEl = document.createElement("img");
    dogImageEl.src = `${image}`;
    dogImageEl.alt = `${type}-image`;
    dogBtn.appendChild(dogImageEl);
    dogBtn.setAttribute("data-name", name);
    dogDiv.innerHTML = `${name}--- ❤️HP ${hp}/${hp}, 🔋Energy: ${energy}/${energy}`;
  } else if (type === "cat") {
    const catImageEl = document.createElement("img");
    catImageEl.src = `${image}`;
    catImageEl.alt = `${type}-image`;
    catBtn.appendChild(catImageEl);
    catBtn.setAttribute("data-name", name);
    catDiv.innerHTML = `${name}--- ❤️HP ${hp}/${hp}, 🔋Energy: ${energy}/${energy}`;
  } else if (type === "random") {
    const randomPetImageEl = document.createElement("img");
    randomPetImageEl.src = `${image}`;
    randomPetImageEl.alt = `${type}-image`;
    randomPetBtn.appendChild(randomPetImageEl);
    randomPetBtn.setAttribute("data-name", name);
    randomPetDiv.innerHTML = `${name}--- ❤️HP ${hp}/${hp}, 🔋Energy: ${energy}/${energy}`;
  }
}

function getEnemy() {
  const randomIndex = Math.floor(Math.random() * enemyData.length);
  const randomEnemy = enemyData[randomIndex];
  const imageSrc = `./image/enemy-images/${randomEnemy.image}`;
  const hp = Math.floor(Math.random() * 21) + 80;
  const energy = Math.floor(Math.random() * 16) + 35;

  return new Enemy(
    randomEnemy.name,
    imageSrc,
    hp,
    energy,
    hp,
    energy,
    randomEnemy.attacks
  );
}

function renderPetVsEnemy(
  petImageSrc,
  petName,
  petType,
  petHp,
  maxPetHp,
  petEnergy,
  maxPetEnergy,
  enemyImageSrc,
  enemyName,
  enemyHp,
  maxEnemyHp,
  enemyEnergy,
  maxEnemyEnergy
) {
  /*
        <div id="vs-screen">
          <div id="pet-vs-enemy" class="flex-row">
            <div id="vs-pet"></div>
            <h2>VS</h2>
            <div id="vs-enemy"></div>
          </div>
          <h3>What will you do?</h3>
          <div class="vs-btns flex-row">
            <button id="attack-btn">⚔️ Attack</button>
            <button id="heal-btn">💖 Heal</button>
            <button id="skill-btn">✨ Special Skill</button>
            <button id="run-btn">🏃 Run Away</button>
          </div>
        </div>
        <div id="log"></div>
*/

  //<div id="vs-screen"></div>
  const vsScreenDiv = document.createElement("div");
  vsScreenDiv.setAttribute("id", "vs-screen");

  //<div id="pet-vs-enemy" class="flex-row">
  const petVsEnemyDiv = document.createElement("div");
  petVsEnemyDiv.setAttribute("id", "pet-vs-enemy");
  petVsEnemyDiv.setAttribute("class", "flex-row");

  /* 
<div id="vs-pet"></div>
<h2>VS</h2>
<div id="vs-enemy"></div>
*/
  //<div id="vs-pet"></div>
  const petDiv = document.createElement("div");
  petDiv.setAttribute("id", "vs-pet");

  const petImage = document.createElement("img");
  petImage.src = `${petImageSrc}`;
  petImage.alt = `${petName}-image`;
  const petHpEnergyDiv = document.createElement("div");
  const petNameP = document.createElement("P");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const spanPetName = `🐶 ${petName}`;
  petNameP.innerHTML = spanPetName;
  const spanContentP1 = `❤️ HP : <span id="${petType}-hp">${petHp}</span>/${maxPetHp}`;
  p1.innerHTML = spanContentP1;
  const spanContentP2 = `🔋 Energy : <span id="${petType}-energy">${petEnergy}</span>/${maxPetEnergy}`;
  p2.innerHTML = spanContentP2;
  petHpEnergyDiv.append(petNameP, p1, p2);

  petDiv.append(petImage, petHpEnergyDiv);

  //<h2>VS</h2>
  const h2El = document.createElement("h2");
  h2El.innerHTML = "VS";

  //<div id="vs-enemy"></div>
  const enemyDiv = document.createElement("div");
  enemyDiv.setAttribute("id", "vs-enemy");

  const enemyImage = document.createElement("img");
  enemyImage.src = `${enemyImageSrc}`;
  enemyImage.alt = `${enemyName}-image`;
  const enemyHpEnergyDiv = document.createElement("div");
  const enemyNameP = document.createElement("p");
  const p3 = document.createElement("p");
  const p4 = document.createElement("p");
  const spanEnemyName = `👹 ${enemyName}`;
  enemyNameP.innerHTML = spanEnemyName;
  const spanContent3 = `❤️ HP : <span id="enemy-hp">${enemyHp}</span>/${maxEnemyHp}`;
  p3.innerHTML = spanContent3;
  const spanContentP4 = `🔋 Energy : <span id="enemy-energy">${enemyEnergy}</span>/${maxEnemyEnergy}`;
  p4.innerHTML = spanContentP4;
  enemyHpEnergyDiv.append(enemyNameP, p3, p4);

  enemyDiv.append(enemyImage, enemyHpEnergyDiv);

  petVsEnemyDiv.append(petDiv, h2El, enemyDiv);

  //<h3>What will you do?</h3>
  const h3El = document.createElement("h3");
  h3El.innerHTML = "What will you do?";

  /*
  <div id="vs-btns" class="flex-row">
    <button id="attack-btn">⚔️ Attack</button>
    <button id="heal-btn">💖 Heal</button>
    <button id="skill-btn">✨ Special Skill</button>
    <button id="run-btn">🏃 Run Away</button>
  </div>
  */

  const vsBtnsDiv = document.createElement("div");
  vsBtnsDiv.setAttribute("id", "vs-btns");
  vsBtnsDiv.setAttribute("class", "flex-row");

  const attackBtn = document.createElement("button");
  attackBtn.setAttribute("id", "attack-btn");
  attackBtn.innerHTML = "⚔️ Attack";

  const healBtn = document.createElement("button");
  healBtn.setAttribute("id", "heal-btn");
  healBtn.disabled = true;
  healBtn.innerHTML = "💖 Heal";

  const skillBtn = document.createElement("button");
  skillBtn.setAttribute("id", "skill-btn");
  skillBtn.innerHTML = "✨ Special Skill";

  const runBtn = document.createElement("button");
  runBtn.setAttribute("id", "run-btn");
  runBtn.innerHTML = "🏃 Run Away";

  vsBtnsDiv.append(attackBtn, healBtn, skillBtn, runBtn);
  vsScreenDiv.append(petVsEnemyDiv, h3El, vsBtnsDiv);

  //<div id="log"></div>
  const logDiv = document.createElement("div");
  logDiv.setAttribute("id", "log");
  vsSection.append(vsScreenDiv, logDiv);
  return { attackBtn, healBtn, skillBtn, runBtn, logDiv, petVsEnemyDiv };
}

function isVisible(element, visible = true) {
  element.style.display = visible ? "block" : "none";
}

let selectedPetName = "";
petSelectBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    petSelectBtns.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    isVisible(startBtn, true);
    selectedPetName = btn.getAttribute("data-name");
  });
});

function getPet() {
  const pet = pets.find((p) => p.name === selectedPetName);
  if (!pet) return null;
  isVisible(selectPetSection, false);
  isVisible(vsSection, true);
  return pet;
}

startBtn.addEventListener("click", () => {
  const enemyValue = getEnemy();
  const petValue = getPet();
  console.log(petValue);
  const petVsEnemy = renderPetVsEnemy(
    petValue.image,
    petValue.name,
    petValue.type,
    petValue.hp,
    petValue.maxHp,
    petValue.energy,
    petValue.maxEnergy,
    enemyValue.image,
    enemyValue.name,
    enemyValue.hp,
    enemyValue.maxHp,
    enemyValue.energy,
    enemyValue.maxEnergy
  );

  const petHpEl = document.getElementById(`${petValue.type}-hp`);
  const petEnergyEl = document.getElementById(`${petValue.type}-energy`);
  const enemyHpEl = document.getElementById("enemy-hp");
  const enemyEnergyEl = document.getElementById("enemy-energy");

  //Attack
  function updateIndex() {
    const randomIndexEnemy = Math.floor(
      Math.random() * enemyValue.attacks.length
    );
    const randomIndexPet = Math.floor(Math.random() * petValue.attacks.length);
    return { randomIndexEnemy, randomIndexPet };
  }

  petVsEnemy.attackBtn.addEventListener("click", () => {
    const petAttack = petValue.attack(enemyValue, false);
    petAttackUI(
      false,
      petAttack,
      petValue.attacks,
      updateIndex().randomIndexPet
    );
    const enemyAttack = enemyValue.attack(petValue);

    setTimeout(() => {
      enemeyAttackUI(
        enemyAttack,
        enemyValue.attacks,
        updateIndex().randomIndexEnemy
      );
    }, 3500);
    changeHealBtnVisible();
  });

  petVsEnemy.skillBtn.addEventListener("click", () => {
    const petAttack = petValue.attack(enemyValue, true);
    petAttackUI(
      true,
      petAttack,
      petValue.attacks,
      updateIndex().randomIndexPet
    );
    const enemyAttack = enemyValue.attack(petValue);
    setTimeout(() => {
      enemeyAttackUI(
        enemyAttack,
        enemyValue.attacks,
        updateIndex().randomIndexEnemy
      );
    }, 3500);
    changeHealBtnVisible();
  });

  function petAttackUI(isSpecial = false, attack, attackArr, randomIndex) {
    addLogMessage(
      petVsEnemy.logDiv,
      `> The ${petValue.name} the ${
        isSpecial ? " ✨ special move and " : "⚔️"
      } ${attackArr[randomIndex]} the ${enemyValue.name}!`
    );

    setTimeout(() => {
      addLogMessage(
        petVsEnemy.logDiv,
        `> ${enemyValue.name} took ${attack.damegeValueEnemy} damage!`
      );

      enemyHpEl.textContent = enemyValue.hp;

      petEnergyEl.textContent = petValue.energy;

      addLogMessage(petVsEnemy.logDiv, "────────────");
      if (enemyValue.hp === 0) {
        setTimeout(() => {
          addLogMessage(petVsEnemy.logDiv, "> You Win!🔥");
          setTimeout(() => {
            showResult(
              petValue.image,
              petValue.name,
              `${enemyValue.name}👹has been defeated. ${petValue.name} wins!🎉`,
              `Great job, ${petValue.name}!🐾✨`
            );
            return;
          }, 2500);
        }, 3000);
      }
    }, 1000);
  }

  function enemeyAttackUI(attack, attackArr, randomIndex) {
    addLogMessage(
      petVsEnemy.logDiv,
      `>👹 The ${enemyValue.name} the ${attackArr[randomIndex]} the ${petValue.name}!`
    );

    setTimeout(() => {
      addLogMessage(
        petVsEnemy.logDiv,
        `> ${petValue.name} took ${attack.damegeValuePet} damage!`
      );
      addLogMessage(petVsEnemy.logDiv, "────────────");
      petHpEl.textContent = petValue.hp;
      enemyEnergyEl.textContent = enemyValue.energy;
      if (petValue.hp === 0) {
        setTimeout(() => {
          addLogMessage(petVsEnemy.logDiv, "> Game Over! 💀");
          setTimeout(() => {
            showResult(
              petValue.image,
              petValue.name,
              "Game Over!",
              `${enemyValue.name}👹was too powerful. ${petValue.name} has lost.😿`
            );
            return;
          }, 5000);
        }, 4500);
      }
    }, 3500);
  }

  //change HealBtn
  function changeHealBtnVisible() {
    if (
      !(
        petValue.hp === petValue.maxHp && petValue.energy === petValue.maxEnergy
      )
    ) {
      petVsEnemy.healBtn.disabled = false;
    } else {
      petVsEnemy.healBtn.disabled = true;
    }
  }

  //Heal
  petVsEnemy.healBtn.addEventListener("click", function () {
    if (
      !(
        petValue.hp === petValue.maxHp && petValue.energy === petValue.maxEnergy
      )
    ) {
      if (
        petValue.hp === petValue.maxHp &&
        petValue.energy < petValue.maxEnergy
      ) {
        const healValues = petValue.heal();
        petEnergyEl.textContent = petValue.energy;

        addLogMessage(
          petVsEnemy.logDiv,
          `> You have max HP❤️ and 🔋${healValues.healPetEnergyValue} Energ!`
        );
        addLogMessage(petVsEnemy.logDiv, "────────────");
      } else if (
        petValue.energy === petValue.maxEnergy &&
        petValue.hp < petValue.maxHp
      ) {
        const healValues = petValue.heal();
        petHpEl.textContent = petValue.hp;
        addLogMessage(
          petVsEnemy.logDiv,
          `> You have max Energy🔋 and ❤️${healValues.healPetHpValue} Energ!`
        );
      } else {
        const healValues = petValue.heal();
        petHpEl.textContent = petValue.hp;
        petEnergyEl.textContent = petValue.energy;
        addLogMessage(
          petVsEnemy.logDiv,
          `> ${petValue.name} healed ❤️${healValues.healPetHpValue} and 🔋${healValues.healPetEnergyValue} Energy!`
        );
        addLogMessage(petVsEnemy.logDiv, "────────────");
      }
    }
    changeHealBtnVisible();
  });

  petVsEnemy.runBtn.addEventListener("click", function () {
    addLogMessage(
      petVsEnemy.logDiv,
      `> ${petValue.name} ran away from the battle! 🏃‍♂️💨`
    );
    addLogMessage(petVsEnemy.logDiv, "────────────");

    setTimeout(() => {
      showResult(
        petValue.image,
        petValue.name,
        `🐾 ${petValue.name} ran away from the battle! 🏃‍♂️💨`,
        "There’s always next time!🦴"
      );
    }, 2500);
  });
});

//log message
let count = 0;
function addLogMessage(logDiv, message) {
  const pElement = document.createElement("p");
  pElement.innerText = `${message}`;
  logDiv.appendChild(pElement);

  count++;
  if (count > 5) {
    logDiv.scrollTop = logDiv.scrollHeight;
  }
}

function showResult(image, name, title, subtitle) {
  isVisible(vsSection, false);
  isVisible(resultSection, true);
  const divEl = document.createElement("div");
  divEl.setAttribute("id", "result-elements");

  const h1El = document.createElement("h1");
  h1El.textContent = title;
  const div2El = document.createElement("div");
  div2El.setAttribute("class", "flex-row");
  const h2El = document.createElement("h2");
  h2El.textContent = subtitle;

  const imgEl = document.createElement("img");
  imgEl.src = `${image}`;
  imgEl.alt = `${name}-image`;
  div2El.appendChild(h2El);
  div2El.appendChild(imgEl);
  const buttonEl = document.createElement("button");
  buttonEl.setAttribute("id", "play-again-btn");
  buttonEl.textContent = "Play Again";
  divEl.append(h1El, div2El, buttonEl);
  resultSection.append(divEl);
  const playAgainBtn = document.getElementById("play-again-btn");
  playAgainBtn.addEventListener("click", function () {
    isVisible(resultSection, false);
    resetVsSection();
  });
}

function resetVsSection() {
  count = 0;
  vsSection.innerHTML = "";
  resultSection.innerHTML = "";
  dogDiv.innerHTML = "";
  catDiv.innerHTML = "";
  randomPetDiv.innerHTML = "";
  dogBtn.innerHTML = "";
  catBtn.innerHTML = "";
  randomPetBtn.innerHTML = "";

  petSelectBtns.forEach((btn) => btn.classList.remove("selected"));
  isVisible(selectPetSection, true);

  pets.length = 0;

  renderRandomPets();

  isVisible(startBtn, false);
}
