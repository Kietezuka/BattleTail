class Pets {
  constructor(name, type, image, hp, energy, maxHp, maxEnergy) {
    this.name = name;
    this.type = type;
    this.image = image;
    this.hp = hp;
    this.energy = energy;
    this.maxHp = maxHp;
    this.maxEnergy = maxEnergy;
  }

  attack(enemy, isSpecial) {
    const damegeValueEnemy =
      Math.floor(Math.random() * 16) + Number(`${isSpecial ? 10 : 1}`);
    enemy.hp = Math.max(0, enemy.hp - damegeValueEnemy);
    const reducePetEnergyValue = Math.floor(Math.random() * 4) + 1;
    this.energy = Math.max(0, this.energy - reducePetEnergyValue);
    const getPetAttackIndex = Math.floor(Math.random() * petAttacks.length);
    return { damegeValueEnemy, getPetAttackIndex };
  }

  heal() {
    const healPetHpValue = Math.floor(Math.random() * 5) + 6;
    const healPetEnergyValue = Math.floor(Math.random() * 3) + 3;
    this.hp = Math.min(this.maxHp, this.hp + healPetHpValue);
    this.energy = Math.min(this.maxEnergy, this.energy + healPetEnergyValue);
    return { healPetHpValue, healPetEnergyValue };
  }
}

class Enemy extends Pets {
  constructor(name, image, hp, energy, maxHp, maxEnergy) {
    super(name, "enemy", image, hp, energy, maxHp, maxEnergy);
  }
  attack(pet) {
    const damegeValuePet = Math.floor(Math.random() * 14) + 1;
    pet.hp = Math.max(0, pet.hp - damegeValuePet);

    const reduceEnermyEnergyValue = Math.floor(Math.random() * 4) + 1;
    this.energy = Math.max(0, this.energy - reduceEnermyEnergyValue);
    const getEnemyAttackIndex = Math.floor(Math.random() * enemyAttacks.length);
    return { damegeValuePet, getEnemyAttackIndex };
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

const petTypes = ["dog", "cat", "randomPet"];
//store 3 different type of pets(randamly)

const pets = [];
const dogNames = ["Waffles", "Tofu", "Lulu", "Toto", "Milly", "Biscuit"];
const catNames = ["Mochi", "Luna", "Whiskers", "Sora", "Pumpkin", "Muffin"];
const randomPetNames = ["Pebble", "Taco", "Mocha", "Ziggy", "Nibbles", "Pixie"];
const enemyNames = [
  "Varkon",
  "Nyxra",
  "Dreadfang",
  "Skorn",
  "Velgrath",
  "Ashbane",
];

const petAttacks = [
  "slaps",
  "scratches",
  "pounces on",
  "bites",
  "headbutts",
  "spins into",
];

const enemyAttacks = [
  "burns",
  "shoots dark energy at",
  "drains the life of",
  "lunges at",
  "crushes",
  "stomps",
];

const nameMap = {
  dog: dogNames,
  cat: catNames,
  randomPet: randomPetNames,
};

//Pet
for (let i = 0; i < petTypes.length; i++) {
  const randomNum = Math.floor(Math.random() * 6) + 1;
  const image = `./image/pet-images/${petTypes[i]}${randomNum}.png`;
  const hp = Math.floor(Math.random() * 20) + 50;
  const energy = Math.floor(Math.random() * 10) + 35;
  const type = petTypes[i];
  const name = nameMap[type][randomNum - 1];
  pets.push(new Pets(name, type, image, hp, energy));
  renderSelectSection(name, type, image, hp, energy);
}

function renderSelectSection(name, type, image, hp, energy) {
  if (type === "dog") {
    const dogImageEl = document.createElement("img");
    dogImageEl.src = `${image}`;
    dogImageEl.alt = `${type}-image`;
    dogBtn.appendChild(dogImageEl);
    dogDiv.innerHTML = `${name}--- ❤️HP ${hp}/${hp}, 🔋Energy: ${energy}/${energy}`;
  } else if (type === "cat") {
    const catImageEl = document.createElement("img");
    catImageEl.src = `${image}`;
    catImageEl.alt = `${type}-image`;
    catBtn.appendChild(catImageEl);
    catDiv.innerHTML = `${name}--- ❤️HP ${hp}/${hp}, 🔋Energy: ${energy}/${energy}`;
  } else if (type === "randomPet") {
    const randomPetImageEl = document.createElement("img");
    randomPetImageEl.src = `${image}`;
    randomPetImageEl.alt = `${type}-image`;
    randomPetBtn.appendChild(randomPetImageEl);
    randomPetDiv.innerHTML = `${name}--- ❤️HP ${hp}/${hp}, 🔋Energy: ${energy}/${energy}`;
  }
}

function getEnemy() {
  const randomNum = Math.floor(Math.random() * 6) + 1;
  const image = `./image/enemy-images/enemy${randomNum}.png`;
  const hp = Math.floor(Math.random() * 20) + 50;
  const energy = Math.floor(Math.random() * 10) + 35;
  const name = enemyNames[randomNum - 1];

  return new Enemy(name, image, hp, energy, hp, energy);
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

petSelectBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    petSelectBtns.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    isVisible(startBtn, true);
  });
});

function getPet() {
  const selectedPet = document.querySelector(".selected");
  let type = "";
  let image = "";
  let name = "";
  let hp = "";
  let energy = "";

  pets.forEach((pet) => {
    if (pet.type === selectedPet.id) {
      type = pet.type;
      image = pet.image;
      name = pet.name;
      hp = pet.hp;
      energy = pet.energy;

      isVisible(selectPetSection, false);
      isVisible(vsSection, true);
    }
  });
  return new Pets(name, type, image, hp, energy, hp, energy);
}

startBtn.addEventListener("click", () => {
  const enemyValue = getEnemy();
  const petValue = getPet();
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
  petVsEnemy.attackBtn.addEventListener("click", () => {
    const petAttack = petValue.attack(enemyValue, false);
    petAttackUI(false, petAttack);
    const enemyAttack = enemyValue.attack(petValue);
    enemeyAttackUI(enemyAttack);
  });

  petVsEnemy.skillBtn.addEventListener("click", () => {
    const petAttack = petValue.attack(enemyValue, true);
    petAttackUI(true, petAttack);
    const enemyAttack = enemyValue.attack(petValue);
    enemeyAttackUI(enemyAttack);
  });

  function petAttackUI(isSpecial = false, attack) {
    addLogMessage(
      petVsEnemy.logDiv,
      `> The ${petValue.name} the ${
        isSpecial ? " ✨ special move and " : "⚔️"
      } ${petAttacks[attack.getPetAttackIndex]} the ${enemyValue.name}!`
    );

    addLogMessage(
      petVsEnemy.logDiv,
      `> ${enemyValue.name} took ${attack.damegeValueEnemy} damage!`
    );
    addLogMessage(petVsEnemy.logDiv, "────────────");

    enemyHpEl.textContent = enemyValue.hp;

    petEnergyEl.textContent = petValue.energy;

    if (enemyValue.hp === 0) {
      addLogMessage(petVsEnemy.logDiv, "> You Win!🔥");
      win(petValue.image, petValue.name, enemyValue.name);
      return;
    }
  }

  function enemeyAttackUI(attack) {
    addLogMessage(
      petVsEnemy.logDiv,
      `>👹 The ${enemyValue.name} the ${
        enemyAttacks[attack.getEnemyAttackIndex]
      } the ${petValue.name}!`
    );

    addLogMessage(
      petVsEnemy.logDiv,
      `> ${petValue.name} took ${attack.damegeValuePet} damage!`
    );
    addLogMessage(petVsEnemy.logDiv, "────────────");
    petHpEl.textContent = petValue.hp;
    enemyEnergyEl.textContent = enemyValue.energy;
    if (petValue.hp === 0) {
      addLogMessage(petVsEnemy.logDiv, "> Game Over! 💀");
      gameover(petValue.image, petValue.name, enemyValue.name);
      return;
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
          `> ${petValue.name} healed ❤️${healValues.healPetHpValue} and 🔋${healValues.healPetEnergyValue} Energ!`
        );
        addLogMessage(petVsEnemy.logDiv, "────────────");
      }
    } else {
      addLogMessage(petVsEnemy.logDiv, `> You have max HP❤️ and max 🔋Energy!`);
      addLogMessage(petVsEnemy.logDiv, "────────────");
    }
  });

  petVsEnemy.runBtn.addEventListener("click", function () {
    addLogMessage(
      petVsEnemy.logDiv,
      `> ${petValue.name} ran away from the battle! 🏃‍♂️💨`
    );
    addLogMessage(petVsEnemy.logDiv, "────────────");

    setTimeout(() => {
      isVisible(vsSection, false);
      isVisible(resultSection, true);

      const divEl = document.createElement("div");
      divEl.setAttribute("id", "result-elements");

      const h1El = document.createElement("h1");
      h1El.textContent = `🐾 ${petValue.name} ran away from the battle! 🏃‍♂️💨`;
      const div2El = document.createElement("div");
      div2El.setAttribute("class", "flex-row");
      const h2El = document.createElement("h2");
      h2El.textContent = "There’s always next time!🦴";

      const imgEl = document.createElement("img");
      imgEl.src = `${petValue.image}`;
      imgEl.alt = `${petValue.name}-image`;
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
        isVisible(selectPetSection, true);
        resetVsSection();
      });
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

function gameover(image, name, enemyName) {
  isVisible(vsSection, false);
  isVisible(resultSection, true);
  const divEl = document.createElement("div");
  divEl.setAttribute("id", "result-elements");

  const h1El = document.createElement("h1");
  h1El.textContent = "Game Over!";
  const div2El = document.createElement("div");
  div2El.setAttribute("class", "flex-row");
  const h2El = document.createElement("h2");
  h2El.textContent = `${enemyName}👹was too powerful. ${name} has lost.😿💔`;

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

function win(image, name, enemyName) {
  isVisible(vsSection, false);
  isVisible(resultSection, true);
  const divEl = document.createElement("div");
  divEl.setAttribute("id", "result-elements");

  const h1El = document.createElement("h1");
  h1El.textContent = `${enemyName}👹has been defeated. ${name} wins!🎉`;
  const div2El = document.createElement("div");
  div2El.setAttribute("class", "flex-row");
  const h2El = document.createElement("h2");
  h2El.textContent = `Great job, ${name}!🐾✨`;

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

  /*
  <div id="result-elements">
    <h1>Victory!</h1>
    <div class="flex-row">
      <h2>Your pet defected enemey</h2>
      <img src="./image/pet-images/dog1.png" alt="" />
    </div>
    <button id="play-again-btn">Play Again</button>
    </div>
  */
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

  petSelectBtns.forEach((btn) => btn.classList.remove(".selected"));
  isVisible(selectPetSection, true);

  pets.length = 0;

  for (let i = 0; i < petTypes.length; i++) {
    const randomNum = Math.floor(Math.random() * 6) + 1;
    const image = `./image/pet-images/${petTypes[i]}${randomNum}.png`;
    const hp = Math.floor(Math.random() * 20) + 80;
    const energy = Math.floor(Math.random() * 10) + 45;
    const type = petTypes[i];
    const name = nameMap[type][randomNum - 1];
    pets.push(new Pets(name, type, image, hp, energy));
    renderSelectSection(name, type, image, hp, energy);
  }
  isVisible(startBtn, false);
}
