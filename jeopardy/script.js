// ---------- DATA ----------
// Each clue is [clue, answer]. Row 1 = 200 ... row 5 = 1000.
const categories = [
  {
    name: "Lore",
    clues: [
      ["¿Cuál era el nombre original del espíritu del viento que posteriormente se convirtió en el Arconte Anemo?",
       "No tenía un nombre propio conocido. Era un espíritu del viento que posteriormente adoptó el nombre de Barbatos."],
      ["¿Cuál es el nombre original de Zhongli como Arconte Geo?",
       "Morax."],
      ["¿Cómo se llamaba la hermana gemela de Ei y antigua Arconte Electro?",
       "Makoto."],
      ["¿Cómo fue creada Lesser Lord Kusanali?",
       "Nació de una rama de Irminsul, creada por Greater Lord Rukkhadevata."],
      ["¿Qué separó Focalors de sí misma para llevar a cabo su plan de salvar Fontaine?",
       "Su divinidad, separándola de su parte humana, Furina."]
    ]
  },
  {
    name: "Mecánicas del juego",
    clues: [
      ["¿Qué estadística determina cuánta energía obtiene un personaje de las partículas y orbes elementales?",
       "Recarga de Energía."],
      ["¿Qué dos elementos no pueden participar en la reacción de Torbellino?",
       "Geo y Dendro."],
      ["¿Cuáles son las dos condiciones que determinan el enfriamiento estándar de aplicación elemental (ICD)?",
       "Cada 2.5 segundos o cada tres golpes, lo que ocurra primero."],
      ["¿Qué tres factores determinan el daño de las reacciones transformativas, como Sobrecarga y Electrocargado?",
       "El nivel del personaje, la Maestría Elemental y la resistencia elemental del enemigo."],
      ["¿Qué significa el término snapshotting en el sistema de combate de Genshin Impact?",
       "Es cuando una habilidad registra las estadísticas del personaje en el momento de activarse y utiliza esos valores durante su duración."]
    ]
  },
  {
    name: "Teyvat",
    clues: [
      ["¿Qué nación es conocida como la Nación Cryo?",
       "Snezhnaya."],
      ["¿Cuáles son las dos nuevas áreas explorables introducidas en Snezhnaya durante la versión 7.2?",
       "Novokitezhgrad y Wingspan Peak."],
      ["¿Cómo se llama la antigua civilización subterránea ubicada debajo de Inazuma?",
       "Enkanomiya."],
      ["¿Qué antigua civilización fue destruida durante la Catástrofe hace 1000 años?",
       "Khaenri'ah."],
      ["¿Cómo se llamaba la civilización antigua cuya historia quedó registrada en el libro «Antes del Sol y la Luna»?",
       "Byakuyakoku."]
    ]
  },
  {
    name: "The Fatui Files",
    clues: [
      ["¿Cuántos Mensajeros existen dentro de los Fatui?",
       "Once."],
      ["¿Cuál es el título de Tartaglia dentro de los Fatui?",
       "Childe."],
      ["¿Qué Mensajera es conocida como «La Sota»?",
       "Arlecchino."],
      ["¿Qué posición ocupa Il Dottore entre los Mensajeros?",
       "El Segundo puesto."],
      ["¿Quién es el director de los Once Mensajeros y de qué nación proviene?",
       "Pierro, originario de Khaenri'ah."]
    ]
  },
  {
    name: "Moon",
    clues: [
      ["¿Cómo se llaman los dos gemelos protagonistas de Genshin Impact?",
       "Aether y Lumine."],
      ["¿Cuáles son los nombres de las tres Hermanas Lunares?",
       "Aria, Sonnet y Canon."],
      ["¿Cuál de las Hermanas Lunares está relacionada con la Luna Helada (Frost Moon)?",
       "Canon."],
      ["¿Quién fue responsable de crear las Tres Lunas y elevarlas al cielo?",
       "Nibelung, el Rey Dragón."],
      ["¿Por qué el gemelo del Viajero no es considerado un Descender según la explicación de Nahida?",
       "Porque su existencia está registrada en Irminsul, a diferencia de la del Viajero."]
    ]
  },
  {
    name: "Anime & Pop Culture",
    clues: [
      ["¿De qué tipo es Pikachu en Pokémon?",
       "Eléctrico."],
      ["¿Cómo se llama la aldea natal de Naruto?",
       "Konohagakure, también conocida como la Aldea Oculta de la Hoja."],
      ["¿En qué anime aparecen Gojo Satoru y Yuji Itadori?",
       "Jujutsu Kaisen."],
      ["¿Cómo se llama el shinigami que deja caer la Death Note en el mundo humano?",
       "Ryuk."],
      ["En Fullmetal Alchemist: Brotherhood, ¿qué Homúnculo se hace pasar por Selim Bradley?",
       "Pride (Orgullo)."]
    ]
  }
];

const finalData = {
  category: "Los secretos de Teyvat",
  clue: "Según el libro Antes del Sol y la Luna, ¿cuáles fueron los tres reinos originales que existieron antes de la llegada del Segundo Usurpador y qué elemento caracterizaba a cada uno?",
  answer:
    "Reino Vishap: asociado a los dragones y a la energía elemental.\n" +
    "Reino Humano: asociado a los humanos.\n" +
    "Reino Lunar: asociado a las entidades lunares."
};

// ---------- STATE ----------
let teams = [];
let currentTeam = 0;     // team that has control of the board
let answeringTeam = 0;   // team answering the open clue
let currentValue = 0;
let ddCat = 0;           // Double Jeopardy tile position
let ddRow = 0;
let wagers = [];
let finalResults = [];
let penalized = false; // evita restar puntos dos veces al equipo que respondió

// ---------- ELEMENTS ----------
const setup = document.getElementById("setup");
const teamCountInput = document.getElementById("team-count");
const teamNamesDiv = document.getElementById("team-names");
const startBtn = document.getElementById("start-btn");
const game = document.getElementById("game");
const scoreboard = document.getElementById("scoreboard");
const board = document.getElementById("board");
const finalBtn = document.getElementById("final-btn");
const resetBtn = document.getElementById("reset-btn");

const modal = document.getElementById("modal");
const modalBanner = document.getElementById("modal-banner");
const modalTeam = document.getElementById("modal-team");
const modalValue = document.getElementById("modal-value");
const modalClue = document.getElementById("modal-clue");
const modalAnswer = document.getElementById("modal-answer");
const revealBtn = document.getElementById("reveal-btn");
const judgeBtns = document.getElementById("judge-btns");
const correctBtn = document.getElementById("correct-btn");
const wrongBtn = document.getElementById("wrong-btn");
const passBtn = document.getElementById("pass-btn");
const stealPanel = document.getElementById("steal-panel");
const stealBtns = document.getElementById("steal-btns");
const nobodyBtn = document.getElementById("nobody-btn");
const revealRow = document.getElementById("reveal-row");
const stealBtn = document.getElementById("steal-btn");
const closeClueBtn = document.getElementById("close-clue-btn");

const finalScreen = document.getElementById("final");
const finalCategory = document.getElementById("final-category");
const wagerSection = document.getElementById("wager-section");
const wagerList = document.getElementById("wager-list");
const showFinalBtn = document.getElementById("show-final-btn");
const finalQuestionSection = document.getElementById("final-question-section");
const finalClue = document.getElementById("final-clue");
const finalRevealBtn = document.getElementById("final-reveal-btn");
const finalAnswerSection = document.getElementById("final-answer-section");
const finalAnswer = document.getElementById("final-answer");
const finalJudgeList = document.getElementById("final-judge-list");
const finishBtn = document.getElementById("finish-btn");
const winnerSection = document.getElementById("winner-section");
const winnerText = document.getElementById("winner-text");
const finalScores = document.getElementById("final-scores");
const closeFinalBtn = document.getElementById("close-final-btn");

// ---------- SETUP SCREEN ----------
function renderNameInputs() {
  let count = parseInt(teamCountInput.value) || 1;
  count = Math.max(1, Math.min(8, count));
  teamNamesDiv.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Team " + (i + 1);
    teamNamesDiv.appendChild(input);
  }
}

teamCountInput.addEventListener("input", renderNameInputs);
renderNameInputs();

startBtn.addEventListener("click", () => {
  const inputs = teamNamesDiv.querySelectorAll("input");
  teams = [];
  inputs.forEach((input, i) => {
    teams.push({ name: input.value.trim() || "Team " + (i + 1), score: 0 });
  });
  currentTeam = 0;
  setup.classList.add("hidden");
  game.classList.remove("hidden");
  buildBoard();
  renderScoreboard();
});

resetBtn.addEventListener("click", () => {
  if (!confirm("Start a new game? Scores will be lost.")) return;
  teams = [];
  game.classList.add("hidden");
  setup.classList.remove("hidden");
});

// ---------- SCOREBOARD ----------
function renderScoreboard() {
  scoreboard.innerHTML = "";
  teams.forEach((team, i) => {
    const card = document.createElement("div");
    card.className = "team-card" + (i === currentTeam ? " active" : "");

    const name = document.createElement("div");
    name.className = "team-name";
    name.textContent = team.name;

    const score = document.createElement("div");
    score.className = "team-score";
    score.textContent = team.score;

    card.appendChild(name);
    card.appendChild(score);
    card.addEventListener("click", () => {
      currentTeam = i;
      renderScoreboard();
    });
    scoreboard.appendChild(card);
  });
}

// ---------- BUILD BOARD ----------
function buildBoard() {
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${categories.length}, 1fr)`;

  // Pick the Double Jeopardy tile (rows 2-5, like the real show)
  ddCat = Math.floor(Math.random() * categories.length);
  ddRow = 1 + Math.floor(Math.random() * 4);

  categories.forEach(cat => {
    const header = document.createElement("div");
    header.className = "tile category";
    header.textContent = cat.name;
    board.appendChild(header);
  });

  for (let row = 0; row < 5; row++) {
    categories.forEach((cat, ci) => {
      const baseValue = (row + 1) * 200;
      const isDouble = ci === ddCat && row === ddRow;
      const [clue, answer] = cat.clues[row];

      const tile = document.createElement("div");
      tile.className = "tile clue-tile";
      tile.textContent = "$" + baseValue;

      tile.addEventListener("click", () => {
        if (tile.classList.contains("used")) return;
        tile.classList.add("used");
        openClue(isDouble ? baseValue * 2 : baseValue, clue, answer, isDouble);
      });

      board.appendChild(tile);
    });
  }
}

// ---------- CLUE POPUP ----------
function openClue(value, clue, answer, isDouble) {
  currentValue = value;
  answeringTeam = currentTeam;
  penalized = false;
  modalBanner.classList.toggle("hidden", !isDouble);
  modalTeam.textContent = "Responde: " + teams[answeringTeam].name;
  modalValue.textContent = "$" + value;
  modalClue.textContent = clue;
  modalAnswer.textContent = answer;
  modalAnswer.classList.add("hidden");
  judgeBtns.classList.add("hidden");
  stealPanel.classList.add("hidden");
  closeClueBtn.classList.add("hidden");
  revealRow.classList.remove("hidden");
  modal.classList.remove("hidden");
}

function closeClue() {
  modal.classList.add("hidden");
  renderScoreboard();
}

// Revelar respuesta -> jueces correcta / incorrecta
revealBtn.addEventListener("click", () => {
  modalAnswer.classList.remove("hidden");
  revealRow.classList.add("hidden");
  judgeBtns.classList.remove("hidden");
});

// Robar ANTES de revelar: el equipo que respondía falla y se abre el robo
stealBtn.addEventListener("click", () => {
  if (!penalized) {
    teams[answeringTeam].score -= currentValue;
    penalized = true;
    renderScoreboard();
  }
  revealRow.classList.add("hidden");
  startSteal();
});

function startSteal() {
  judgeBtns.classList.add("hidden");

  // Si solo hay un equipo, no hay a quién robarle
  if (teams.length < 2) {
    modalAnswer.classList.remove("hidden");
    closeClueBtn.classList.remove("hidden");
    return;
  }

  stealBtns.innerHTML = "";
  teams.forEach((team, i) => {
    if (i === answeringTeam) return;

    const row = document.createElement("div");
    row.className = "steal-row";

    const label = document.createElement("span");
    label.textContent = team.name;

    const ok = document.createElement("button");
    ok.textContent = "Correcta";
    ok.addEventListener("click", () => {
      team.score += currentValue;
      currentTeam = i; // quien roba toma el control del tablero
      modalAnswer.classList.remove("hidden");
      closeClue();
    });

    const no = document.createElement("button");
    no.textContent = "Incorrecta";
    no.addEventListener("click", () => {
      team.score -= currentValue;
      row.classList.add("done");
    });

    const btns = document.createElement("div");
    btns.appendChild(ok);
    btns.appendChild(no);

    row.appendChild(label);
    row.appendChild(btns);
    stealBtns.appendChild(row);
  });

  stealPanel.classList.remove("hidden");
}

correctBtn.addEventListener("click", () => {
  teams[answeringTeam].score += currentValue;
  currentTeam = answeringTeam;
  closeClue();
});

wrongBtn.addEventListener("click", () => {
  if (!penalized) {
    teams[answeringTeam].score -= currentValue;
    penalized = true;
  }
  renderScoreboard();
  startSteal();
});

passBtn.addEventListener("click", () => {
  startSteal();
});

// Nadie robó: se muestra la respuesta y luego se cierra
nobodyBtn.addEventListener("click", () => {
  currentTeam = (answeringTeam + 1) % teams.length;
  stealPanel.classList.add("hidden");
  modalAnswer.classList.remove("hidden");
  closeClueBtn.classList.remove("hidden");
});

closeClueBtn.addEventListener("click", closeClue);

// ---------- FINAL JEOPARDY ----------
finalBtn.addEventListener("click", openFinal);

function openFinal() {
  finalCategory.textContent = "Category: " + finalData.category;

  wagerList.innerHTML = "";
  teams.forEach(team => {
    const max = Math.max(0, team.score);
    const row = document.createElement("div");
    row.className = "wager-row";

    const label = document.createElement("span");
    label.textContent = `${team.name} ($${team.score})`;

    const input = document.createElement("input");
    input.type = "number";
    input.min = 0;
    input.max = max;
    input.value = 0;

    row.appendChild(label);
    row.appendChild(input);
    wagerList.appendChild(row);
  });

  wagerSection.classList.remove("hidden");
  finalQuestionSection.classList.add("hidden");
  finalAnswerSection.classList.add("hidden");
  winnerSection.classList.add("hidden");
  finalRevealBtn.classList.remove("hidden");
  finalScreen.classList.remove("hidden");
}

showFinalBtn.addEventListener("click", () => {
  wagers = [];
  wagerList.querySelectorAll("input").forEach((input, i) => {
    const max = Math.max(0, teams[i].score);
    let w = parseInt(input.value) || 0;
    w = Math.max(0, Math.min(max, w));
    wagers.push(w);
  });

  finalClue.textContent = finalData.clue;
  wagerSection.classList.add("hidden");
  finalQuestionSection.classList.remove("hidden");
});

finalRevealBtn.addEventListener("click", () => {
  finalAnswer.textContent = finalData.answer;
  finalRevealBtn.classList.add("hidden");
  buildFinalJudge();
  finalAnswerSection.classList.remove("hidden");
});

function buildFinalJudge() {
  finalResults = teams.map(() => null);
  finalJudgeList.innerHTML = "";

  teams.forEach((team, i) => {
    const row = document.createElement("div");
    row.className = "judge-row";

    const label = document.createElement("span");
    label.textContent = `${team.name} (wagered $${wagers[i]})`;

    const ok = document.createElement("button");
    ok.textContent = "Correct";
    const no = document.createElement("button");
    no.textContent = "Wrong";

    ok.addEventListener("click", () => {
      finalResults[i] = true;
      ok.classList.add("selected");
      no.classList.remove("selected");
    });
    no.addEventListener("click", () => {
      finalResults[i] = false;
      no.classList.add("selected");
      ok.classList.remove("selected");
    });

    const buttons = document.createElement("div");
    buttons.appendChild(ok);
    buttons.appendChild(no);

    row.appendChild(label);
    row.appendChild(buttons);
    finalJudgeList.appendChild(row);
  });
}

finishBtn.addEventListener("click", () => {
  teams.forEach((team, i) => {
    if (finalResults[i] === true) team.score += wagers[i];
    else team.score -= wagers[i];
  });

  const top = Math.max(...teams.map(t => t.score));
  const winners = teams.filter(t => t.score === top).map(t => t.name);
  winnerText.textContent =
    winners.length > 1 ? "It's a tie: " + winners.join(" & ") : "Winner: " + winners[0] + "!";

  finalScores.innerHTML = "";
  [...teams].sort((a, b) => b.score - a.score).forEach(team => {
    const line = document.createElement("div");
    line.className = "final-score-line";
    line.textContent = `${team.name}: $${team.score}`;
    finalScores.appendChild(line);
  });

  finalAnswerSection.classList.add("hidden");
  finalQuestionSection.classList.add("hidden");
  winnerSection.classList.remove("hidden");
});

closeFinalBtn.addEventListener("click", () => {
  finalScreen.classList.add("hidden");
  renderScoreboard();
});