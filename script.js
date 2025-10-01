const input = document.getElementById("search-input");
const button = document.getElementById("search-button");

const nameEl = document.getElementById("creature-name");
const idEl = document.getElementById("creature-id");
const weightEl = document.getElementById("weight");
const heightEl = document.getElementById("height");
const typesEl = document.getElementById("types");

const hpEl = document.getElementById("hp");
const attackEl = document.getElementById("attack");
const defenseEl = document.getElementById("defense");
const spAttackEl = document.getElementById("special-attack");
const spDefenseEl = document.getElementById("special-defense");
const speedEl = document.getElementById("speed");

button.addEventListener("click", async () => {
  const searchValue = input.value.trim().toLowerCase();
  if (!searchValue) return;

  try {
    const response = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${searchValue}`);
    if (!response.ok) throw new Error("Creature not found");

    const data = await response.json();

    const { name, id, weight, height, stats, types } = data;

    nameEl.textContent = name.toUpperCase();
    idEl.textContent = `#${id}`;
    weightEl.textContent = `Weight: ${weight}`;
    heightEl.textContent = `Height: ${height}`;

    typesEl.innerHTML = "";
    types.forEach(type => {
      const span = document.createElement("span");
      span.textContent = type.name.toUpperCase();
      typesEl.appendChild(span);
    });

    
    hpEl.textContent = attackEl.textContent = defenseEl.textContent =
      spAttackEl.textContent = spDefenseEl.textContent = speedEl.textContent = "";

    stats.forEach(stat => {
      const { name, base_stat } = stat;
      switch (name) {
        case "hp":
          hpEl.textContent = base_stat;
          break;
        case "attack":
          attackEl.textContent = base_stat;
          break;
        case "defense":
          defenseEl.textContent = base_stat;
          break;
        case "special-attack":
          spAttackEl.textContent = base_stat;
          break;
        case "special-defense":
          spDefenseEl.textContent = base_stat;
          break;
        case "speed":
          speedEl.textContent = base_stat;
          break;
      }
    });

  } catch (error) {
    alert("Creature not found");
  }
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") button.click();
});

input.addEventListener("input", () => {
  nameEl.textContent = "";
  idEl.textContent = "";
  weightEl.textContent = "";
  heightEl.textContent = "";
  typesEl.innerHTML = "";
  hpEl.textContent = "";
  attackEl.textContent = "";
  defenseEl.textContent = "";
  spAttackEl.textContent = "";
  spDefenseEl.textContent = "";
  speedEl.textContent = "";
});
