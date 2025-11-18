const tg = window.Telegram?.WebApp;
if (tg) {
  tg.expand();
  tg.setHeaderColor('#2e3192');
  tg.setBackgroundColor('#1b1464');
} else {
  console.log("Running outside Telegram (dev mode)");
}

// === Елементи ===
const introStage   = document.getElementById('stage-intro');
const shuffleStage = document.getElementById('stage-shuffle');
const pickStage    = document.getElementById('stage-pick');

const btnShuffle   = document.getElementById('btn-shuffle');
const cardsWrap    = document.getElementById('cards');
const cardTitle    = document.getElementById('card-title');
const sendBlock    = document.getElementById('send-block');
const btnSend      = document.getElementById('btn-send');

const cardModal    = document.getElementById('card-modal');
const cardModalImg = document.getElementById('card-modal-img');

const shuffleAudio = document.getElementById('shuffle-audio');
const flipAudio    = document.getElementById('flip-audio');

if (flipAudio) {
  flipAudio.volume = 0.25;
}

// === Карти (повна мапа) ===
const CARD_MAP = {
  "The Fool": { ua: "🤹‍♂️ Блазень", img: "images/cards/the_fool_upright.jpg" },
  "The Magician": { ua: "🪄 Маг", img: "images/cards/the_magician_upright.jpg" },
  "The High Priestess": { ua: "🌙 Жриця", img: "images/cards/the_high_priestess_upright.jpg" },
  "The Empress": { ua: "🌸 Імператриця", img: "images/cards/the_empress_upright.jpg" },
  "The Emperor": { ua: "👑 Імператор", img: "images/cards/the_emperor_upright.jpg" },
  "The Hierophant": { ua: "📜 Ієрофант", img: "images/cards/the_hierophant_upright.jpg" },
  "The Lovers": { ua: "💞 Закохані", img: "images/cards/the_lovers_upright.jpg" },
  "The Chariot": { ua: "🚗 Колісниця", img: "images/cards/the_chariot_upright.jpg" },
  "Strength": { ua: "🦁 Сила", img: "images/cards/strength_upright.jpg" },
  "The Hermit": { ua: "🕯 Відлюдник", img: "images/cards/the_hermit_upright.jpg" },
  "Wheel of Fortune": { ua: "🎡 Колесо Фортуни", img: "images/cards/wheel_of_fortune_upright.jpg" },
  "Justice": { ua: "⚖️ Справедливість", img: "images/cards/justice_upright.jpg" },
  "The Hanged Man": { ua: "🪶 Повішений", img: "images/cards/the_hanged_man_upright.jpg" },
  "Death": { ua: "💀 Смерть", img: "images/cards/death_upright.jpg" },
  "Temperance": { ua: "🌈 Помірність", img: "images/cards/temperance_upright.jpg" },
  "The Devil": { ua: "😈 Диявол", img: "images/cards/the_devil_upright.jpg" },
  "The Tower": { ua: "🏰 Вежа", img: "images/cards/the_tower_upright.jpg" },
  "The Star": { ua: "⭐ Зірка", img: "images/cards/the_star_upright.jpg" },
  "The Moon": { ua: "🌕 Місяць", img: "images/cards/the_moon_upright.jpg" },
  "The Sun": { ua: "🌞 Сонце", img: "images/cards/the_sun_upright.jpg" },
  "Judgement": { ua: "🎺 Суд", img: "images/cards/judgement_upright.jpg" },
  "The World": { ua: "🌍 Світ", img: "images/cards/the_world_upright.jpg" },

  // WANDS
  "Ace of Wands": { ua: "🔥 Туз Жезлів", img: "images/cards/wands_ace.jpg" },
  "Two of Wands": { ua: "🔥 Двійка Жезлів", img: "images/cards/wands_2.jpg" },
  "Three of Wands": { ua: "🔥 Трійка Жезлів", img: "images/cards/wands_3.jpg" },
  "Four of Wands": { ua: "🔥 Четвірка Жезлів", img: "images/cards/wands_4.jpg" },
  "Five of Wands": { ua: "🔥 П’ятірка Жезлів", img: "images/cards/wands_5.jpg" },
  "Six of Wands": { ua: "🔥 Шістка Жезлів", img: "images/cards/wands_6.jpg" },
  "Seven of Wands": { ua: "🔥 Сімка Жезлів", img: "images/cards/wands_7.jpg" },
  "Eight of Wands": { ua: "🔥 Вісімка Жезлів", img: "images/cards/wands_8.jpg" },
  "Nine of Wands": { ua: "🔥 Дев’ятка Жезлів", img: "images/cards/wands_9.jpg" },
  "Ten of Wands": { ua: "🔥 Десятка Жезлів", img: "images/cards/wands_10.jpg" },
  "Page of Wands": { ua: "🔥 Паж Жезлів", img: "images/cards/wands_page.jpg" },
  "Knight of Wands": { ua: "🔥 Лицар Жезлів", img: "images/cards/wands_knight.jpg" },
  "Queen of Wands": { ua: "🔥 Королева Жезлів", img: "images/cards/wands_queen.jpg" },
  "King of Wands": { ua: "🔥 Король Жезлів", img: "images/cards/wands_king.jpg" },

  // PENTACLES
  "Ace of Pentacles": { ua: "⭐ Туз Пентаклів", img: "images/cards/pentacles_ace.jpg" },
  "Two of Pentacles": { ua: "⭐ Двійка Пентаклів", img: "images/cards/pentacles_2.jpg" },
  "Three of Pentacles": { ua: "⭐ Трійка Пентаклів", img: "images/cards/pentacles_3.jpg" },
  "Four of Pentacles": { ua: "⭐ Четвірка Пентаклів", img: "images/cards/pentacles_4.jpg" },
  "Five of Pentacles": { ua: "⭐ П’ятірка Пентаклів", img: "images/cards/pentacles_5.jpg" },
  "Six of Pentacles": { ua: "⭐ Шістка Пентаклів", img: "images/cards/pentacles_6.jpg" },
  "Seven of Pentacles": { ua: "⭐ Сімка Пентаклів", img: "images/cards/pentacles_7.jpg" },
  "Eight of Pentacles": { ua: "⭐ Вісімка Пентаклів", img: "images/cards/pentacles_8.jpg" },
  "Nine of Pentacles": { ua: "⭐ Дев’ятка Пентаклів", img: "images/cards/pentacles_9.jpg" },
  "Ten of Pentacles": { ua: "⭐ Десятка Пентаклів", img: "images/cards/pentacles_10.jpg" },
  "Page of Pentacles": { ua: "⭐ Паж Пентаклів", img: "images/cards/pentacles_page.jpg" },
  "Knight of Pentacles": { ua: "⭐ Лицар Пентаклів", img: "images/cards/pentacles_knight.jpg" },
  "Queen of Pentacles": { ua: "⭐ Королева Пентаклів", img: "images/cards/pentacles_queen.jpg" },
  "King of Pentacles": { ua: "⭐ Король Пентаклів", img: "images/cards/pentacles_king.jpg" },

  // SWORDS
  "Ace of Swords": { ua: "⚔️ Туз Мечів", img: "images/cards/swords_ace.jpg" },
  "Two of Swords": { ua: "⚔️ Двійка Мечів", img: "images/cards/swords_2.jpg" },
  "Three of Swords": { ua: "⚔️ Трійка Мечів", img: "images/cards/swords_3.jpg" },
  "Four of Swords": { ua: "⚔️ Четвірка Мечів", img: "images/cards/swords_4.jpg" },
  "Five of Swords": { ua: "⚔️ П’ятірка Мечів", img: "images/cards/swords_5.jpg" },
  "Six of Swords": { ua: "⚔️ Шістка Мечів", img: "images/cards/swords_6.jpg" },
  "Seven of Swords": { ua: "⚔️ Сімка Мечів", img: "images/cards/swords_7.jpg" },
  "Eight of Swords": { ua: "⚔️ Вісімка Мечів", img: "images/cards/swords_8.jpg" },
  "Nine of Swords": { ua: "⚔️ Дев’ятка Мечів", img: "images/cards/swords_9.jpg" },
  "Ten of Swords": { ua: "⚔️ Десятка Мечів", img: "images/cards/swords_10.jpg" },
  "Page of Swords": { ua: "⚔️ Паж Мечів", img: "images/cards/swords_page.jpg" },
  "Knight of Swords": { ua: "⚔️ Лицар Мечів", img: "images/cards/swords_knight.jpg" },
  "Queen of Swords": { ua: "⚔️ Королева Мечів", img: "images/cards/swords_queen.jpg" },
  "King of Swords": { ua: "⚔️ Король Мечів", img: "images/cards/swords_king.jpg" },

  // CUPS
  "Ace of Cups": { ua: "💧 Туз Кубків", img: "images/cards/cups_ace.jpg" },
  "Two of Cups": { ua: "💧 Двійка Кубків", img: "images/cards/cups_2.jpg" },
  "Three of Cups": { ua: "💧 Трійка Кубків", img: "images/cards/cups_3.jpg" },
  "Four of Cups": { ua: "💧 Четвірка Кубків", img: "images/cards/cups_4.jpg" },
  "Five of Cups": { ua: "💧 П’ятірка Кубків", img: "images/cards/cups_5.jpg" },
  "Six of Cups": { ua: "💧 Шістка Кубків", img: "images/cards/cups_6.jpg" },
  "Seven of Cups": { ua: "💧 Сімка Кубків", img: "images/cards/cups_7.jpg" },
  "Eight of Cups": { ua: "💧 Вісімка Кубків", img: "images/cards/cups_8.jpg" },
  "Nine of Cups": { ua: "💧 Дев’ятка Кубків", img: "images/cards/cups_9.jpg" },
  "Ten of Cups": { ua: "💧 Десятка Кубків", img: "images/cards/cups_10.jpg" },
  "Page of Cups": { ua: "💧 Паж Кубків", img: "images/cards/cups_page.jpg" },
  "Knight of Cups": { ua: "💧 Лицар Кубків", img: "images/cards/cups_knight.jpg" },
  "Queen of Cups": { ua: "💧 Королева Кубків", img: "images/cards/cups_queen.jpg" },
  "King of Cups": { ua: "💧 Король Кубків", img: "images/cards/cups_king.jpg" }
};

const TAROT = Object.keys(CARD_MAP);

const state = {
  cards: [],          // 9 карт
  selectedIndices: [] // індекси в порядку кліків
};

// === Хелпери ===
function setStage(stage) {
  [introStage, shuffleStage, pickStage].forEach(el => el.classList.add('hidden'));
  stage.classList.remove('hidden');
  stage.classList.add('fade');
}

function getRandomCards(count) {
  const pool = [...TAROT];
  const result = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    const name = pool.splice(idx, 1)[0];
    result.push({ name, upright: Math.random() > 0.3 });
  }
  return result;
}

function createCardNode(cardData, index) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.index = String(index);
  card.style.animationDelay = (Math.random() * 1.5).toFixed(2) + 's';

  const inner = document.createElement('div');
  inner.className = 'card-inner';

  const back = document.createElement('div');
  back.className = 'face back';

  const front = document.createElement('div');
  front.className = 'face front';
  front.style.backgroundImage = `url('${CARD_MAP[cardData.name].img}')`;
  if (!cardData.upright) {
    front.classList.add('reversed');
  }

  inner.append(back, front);
  card.append(inner);

  card.addEventListener('click', () => handleCardClick(index, card));

  return card;
}

// === Клік по карті ===
function handleCardClick(index, node) {
  if (state.selectedIndices.includes(index)) return;
  if (state.selectedIndices.length >= 3) return;

  state.selectedIndices.push(index);

  if (flipAudio) {
    flipAudio.currentTime = 0;
    flipAudio.play().catch(() => {});
  }

  node.classList.add('flip', 'revealed');

  const left = 3 - state.selectedIndices.length;
  if (left > 0) {
    cardTitle.textContent =
      left === 2 ? "Обери ще 2 карти" :
      left === 1 ? "Обери ще 1 карту" :
      "Обери 3 карти";
    return;
  }

  // після 3-ї карти даємо фліпу дограти
  setTimeout(finalizeSelection, 700);
}

// === Фінальна анімація: 3 карти з’їжджають в центр зі своїх місць ===
// function finalizeSelection() {
//   cardTitle.textContent = "Твої 3 карти:";

//   const allNodes = Array.from(document.querySelectorAll('.card'));
//   const selectedNodes = [];

//   const wrapRect   = cardsWrap.getBoundingClientRect();
//   const wrapHeight = cardsWrap.offsetHeight;
//   const wrapWidth  = cardsWrap.offsetWidth;

//   // 3 вибрані карти (дані)
//   const chosenData = state.selectedIndices.map(i => state.cards[i]);

//   // показати назви вибраних карт
//   const namesDiv = document.getElementById("selected-names");
//   if (namesDiv) {
//     namesDiv.innerHTML = chosenData
//       .map(c => `<div>${CARD_MAP[c.name].ua}</div>`)
//       .join("");
//     namesDiv.classList.remove("hidden");
//   }

//   // фіксуємо висоту контейнера, щоб при absolute він не схлопнувся
//   cardsWrap.style.height = wrapHeight + 'px';

//   allNodes.forEach(node => {
//     const idx = Number(node.dataset.index);

//     if (state.selectedIndices.includes(idx)) {
//       selectedNodes.push(node);

//       const rect = node.getBoundingClientRect();
//       const currentLeft = rect.left - wrapRect.left;
//       const currentTop  = rect.top  - wrapRect.top;

//       // переводимо вибрані карти в absolute з їх поточного місця
//       node.style.position = 'absolute';
//       node.style.left = currentLeft + 'px';
//       node.style.top  = currentTop  + 'px';
//       node.style.zIndex = '2';
//       node.classList.add('revealed');
//     } else {
//       // затемнюємо і прибираємо невибрані
//       node.classList.add('dimmed');
//       node.style.opacity = '0';
//       node.style.transform = 'scale(0.85)';
//       setTimeout(() => node.remove(), 350);
//     }
//   });

//   if (!selectedNodes.length) return;

//   const cardWidth  = selectedNodes[0].offsetWidth;
//   const cardHeight = selectedNodes[0].offsetHeight;
//   const gap        = 24;
//   const totalWidth = cardWidth * selectedNodes.length + gap * (selectedNodes.length - 1);
//   const startX     = (wrapWidth - totalWidth) / 2;
//   const targetTop  = (wrapHeight - cardHeight) / 2;

//   // компактний режим сцени (менше сірої зони)
//   pickStage.classList.add('compact');

//   // даємо невибраним час згаснути, потім з'їжджаємо 3 карти в центр
//   setTimeout(() => {
//     selectedNodes.forEach((node, idx) => {
//       const targetLeft = startX + idx * (cardWidth + gap);
//       node.style.left = targetLeft + 'px';
//       node.style.top  = targetTop  + 'px';
//       node.style.animation = 'none'; // вже без "float"

//       // клік — повноекранний перегляд
//       const cardIndex = state.selectedIndices[idx];
//       const data = state.cards[cardIndex];
//       node.addEventListener('click', () => openCardModal(data));
//     });

//     // трішки зменшуємо висоту контейнера під 3 карти
//     cardsWrap.style.height = (cardHeight + 30) + 'px';

//     // показати кнопку "Зробити розклад"
//     setTimeout(() => {
//       sendBlock.style.display = "flex";
//       requestAnimationFrame(() => {
//         sendBlock.classList.add("visible");
//       });
//     }, 500);
//   }, 380);
// }

function finalizeSelection() {
  cardTitle.textContent = "Твої 3 карти:";

  const allNodes = Array.from(document.querySelectorAll(".card"));

  const wrapRect = cardsWrap.getBoundingClientRect();
  const wrapWidth = cardsWrap.offsetWidth;
  const wrapHeight = cardsWrap.offsetHeight;

  const selected = [];
  const chosenData = state.selectedIndices.map(i => state.cards[i]);

  // Показуємо назви
  const namesDiv = document.getElementById("selected-names");
  namesDiv.innerHTML = chosenData
    .map(c => `<div>${CARD_MAP[c.name].ua}</div>`)
    .join("");
  namesDiv.classList.remove("hidden");

  // Фіксована висота під анімацію
  cardsWrap.style.height = wrapHeight + "px";

  // --- 1. Переводимо вибрані карти в absolute
  allNodes.forEach(node => {
    const idx = Number(node.dataset.index);

    if (state.selectedIndices.includes(idx)) {
      const rect = node.getBoundingClientRect();
      const left = rect.left - wrapRect.left;
      const top = rect.top - wrapRect.top;

      node.style.position = "absolute";
      node.style.left = left + "px";
      node.style.top = top + "px";
      node.style.zIndex = "10";
      node.style.animation = "none";

      selected.push({ node, idx });
    } else {
      // Невибрані — плавно зникають
      node.classList.add("dimmed");
      node.style.opacity = "0";
      node.style.transform = "scale(0.85)";
      setTimeout(() => node.remove(), 350);
    }
  });

  // --- 2. Центр для 3 карт
  const cardW = selected[0].node.offsetWidth;
  const gap = 24;
  const totalWidth = cardW * 3 + gap * 2;
  const startX = (wrapWidth - totalWidth) / 2;

  // Картки повинні стояти трохи нижче центру сцени
  const cardH = selected[0].node.offsetHeight;
  const targetTop = (wrapHeight - cardH) * 0.10;

  pickStage.classList.add("compact");
  pickStage.classList.add("final-compact");


  // --- 3. Плавний переїзд у центр
  setTimeout(() => {
    selected.forEach(({ node }, i) => {
      const finalLeft = startX + i * (cardW + gap);

      node.style.transition =
        "left .85s ease, top .85s ease, transform .85s ease, opacity .85s ease";

      node.style.left = finalLeft + "px";
      node.style.top = targetTop + "px";
    });

    // --- 4. Показати кнопку "Зробити розклад"
    setTimeout(() => {
      sendBlock.style.display = "flex";
      requestAnimationFrame(() => sendBlock.classList.add("visible"));
    }, 450);

  }, 380);

  // через 900мс після руху — знімаємо фіксовану висоту, даємо контейнеру стиснутися
  setTimeout(() => {
    cardsWrap.style.height = "200px";
  }, 900);

}


// === Старт сцени вибору 9 карт ===
function startPickStage() {
  state.cards = getRandomCards(9);
  state.selectedIndices = [];

  cardsWrap.classList.remove('center-row');
  cardsWrap.innerHTML = '';
  cardsWrap.style.height = ''; // скинемо, далі воно само

  sendBlock.classList.remove('visible');
  sendBlock.style.display = "none";

  const namesDiv = document.getElementById("selected-names");
  if (namesDiv) {
    namesDiv.innerHTML = '';
    namesDiv.classList.add('hidden');
  }

  cardTitle.textContent = "Довірся своїй інтуїції та обери 3 карти";

  state.cards.forEach((c, i) => {
    cardsWrap.appendChild(createCardNode(c, i));
  });

  setStage(pickStage);
}

// === Обробники ===
btnShuffle.addEventListener('click', () => {
  setStage(shuffleStage);

  if (shuffleAudio) {
    shuffleAudio.currentTime = 0;
    shuffleAudio.play().catch(() => {});
  }

  // даємо анімації тасування відпрацювати
  setTimeout(() => {
    if (shuffleAudio) {
      shuffleAudio.pause();
      shuffleAudio.currentTime = 0;
    }
    startPickStage();
  }, 1800);
});

btnSend.addEventListener('click', () => {
  const chosen = state.selectedIndices.map(i => state.cards[i]);

  const payload = {
    action: "three_cards",
    chosen,
    candidates: state.cards
  };

  if (tg) {
    tg.sendData(JSON.stringify(payload));
    tg.close();
  } else {
    alert("DEBUG payload:\n" + JSON.stringify(payload, null, 2));
  }
});

// === Модалка карти ===
function openCardModal(cardData) {
  if (!cardModal || !cardModalImg) return;

  const info = CARD_MAP[cardData.name];
  if (!info) return;

  cardModalImg.src = info.img;
  cardModalImg.style.transform = cardData.upright ? 'none' : 'rotate(180deg)';
  cardModal.classList.remove('hidden');
}

function closeCardModal() {
  if (!cardModal) return;
  cardModal.classList.add('hidden');
}

if (cardModal) {
  cardModal.addEventListener('click', closeCardModal);
}

// Стартова сцена
setStage(introStage);

