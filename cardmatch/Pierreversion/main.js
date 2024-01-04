let cardsPlayed = []; //cartes jouées
let cardsDisponibles = []; //plus tard
let level = 0;
let score = 0;
let cardsVisible = 5; //nb de cartes affichées
const $cardDropZone = document.querySelector(".dropzone");
let dragSrcEl = null;

//plus tard
let symbols = [
  {
    symbol: "❤",
    color: "red",
  },
  {
    symbol: "♦️",
    color: "red",
  },
  {
    symbol: "♣️",
    color: "black",
  },
  ,
  {
    symbol: "♠️",
    color: "black",
  },
];

const nextLevel = () => {
  level++;
  /*
    switch(level) {
        case 1 : 
            cardsDisponibles = [1,2,3,4,5,6,7,8,9,10]
            break
        case 2 :
            cardsDisponibles = shuffleArray([1,2,3,4,5,6,7,8,9,10])
            break
    }
    */
  //console.log(cardsDisponibles)
  //startLevel()
};

//mélanger un array - plus tard
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// cartes attribuées au joueur
let cardsPlayer = [];

//liste des joueurs (classement) + tard
let players = [];

//passer au niveau suivant (ici premier niveau)
nextLevel();

//elements HTML
const $formLogin = document.querySelector(".login form");
const $myCards = document.querySelector(".my-cards");
const $played = document.querySelector(".played");
const $score = document.querySelector(".score");
const $pass = document.querySelector(".pass button");

//login
$formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  let userLogin = $formLogin.querySelector("input").value;
  sessionStorage.userLogin = userLogin;
  gameStart();
});

//début du jeu
const gameStart = () => {
  document.querySelector("section.hidden").classList.remove("hidden");
  document.querySelector(".hero.game").classList.remove("hidden");
  document.querySelector(".hero.welcome").classList.add("hidden");
  document.querySelector(".login").classList.add("hidden");
  document.querySelector(".pseudo").innerText = sessionStorage.userLogin;
  startLevel();
};
const dragInit=()=>{
    const $formLogin = document.querySelector(".login form");
const $myCards = document.querySelector(".my-cards");
const $played = document.querySelector(".played");
const $score = document.querySelector(".score");
const $pass = document.querySelector(".pass button");
}
//début d'un niveau
function startLevel() {
  //remise à zérodes arrays cartes users et cartes jouées
  cardsPlayed = [];
  cardsPlayer = [];
  // mise à jour du nombre de cartes affichées
  cardsDisponibles = 5;
  //prendre un n° aléatoire pour chaque carte du joeur
  for (i = 1; i < 6; i++) {
    const uniqueNumber = generateUniqueNumber(cardsPlayer);
  }
  //trier par ordre si level = 1
  if (level == 1) {
    cardsPlayer.sort();
  }
  //affichage des cartes
  let template = "";
  cardsPlayer.forEach((card) => {
    template += `
            <div class="column">
                <div class="card" draggable="true">${card}</div>
            </div>
        `;
  });
  document.querySelector(".my-cards").innerHTML = template;
  dragInit();
  //lancement du premier tour
  playTour();
}

//gestion d'un tour
const playTour = () => {
  //console.log(cardsPlayed)
  //si l'ordi a déjà tiré toutes les cartes
  if (cardsPlayed.length > 8) {
    // c'est la fin
    //nextLevel()

    sessionStorage.score = score;
    location.href = "end.html";
  }
  //sinon on tire une carte
  else {
    const uniqueNumber = generateUniqueNumber(cardsPlayed);
    //console.log(uniqueNumber)
    $played.innerText = uniqueNumber;
  }
};

//générateur d'un nombre aléatoire
const generateRandomNumber = () => {
  return Math.floor(Math.random() * 9) + 1;
};

//génération d'un nombre aléatoire UNIQUE
function generateUniqueNumber(cible) {
  let randomNumber;
  // Générer un nombre jusqu'à ce qu'il soit unique
  do {
    randomNumber = generateRandomNumber();
  } while (cible.includes(randomNumber));

  // Ajouter le nombre au tableau
  cible.push(randomNumber);

  return randomNumber;
}

//démarer le jeu si l'user est connu
if (sessionStorage.userLogin) {
  gameStart();
}

// drag une carte
$myCards.addEventListener("dragstart", (e) => {
  // store a ref. on the dragged elem
  dragSrcEl = e.target;
  e.target.classList.add("active");
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", e.target);
  console.log(dragSrcEl + "dragstart event");
});

$cardDropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.target.classList.add('dragover')
});
$cardDropZone.addEventListener("dragleave", (e) => {
    e.preventDefault()
    e.target.classList.remove('dragover')
})
$cardDropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  e.stopPropagation();
  let cible = e.target;
  if (cible.classList.contains("card")) {
    //si valeur de la carte est égale à la valeur de la carte tirée au sort
    if (dragSrcEl.innerText == $played.innerText) {
      score++;
    }
    //sinon
    else {
      score--;
    }
    //masquer la carte
    $cardDropZone.appendChild(dragSrcEl)
    dragSrcEl.style.rotate = generateRandomNumber() + 'deg'
    dragSrcEl.removeAttribute('draggable');
    $cardDropZone.classList.remove('dragover')
    // réduire le nombre de cartes visible
    cardsVisible--;
    //modifier le score
    $score.innerText = score + " pt";
    //si plus de carte visible
    if (cardsVisible < 1) {
      //stocker le score dans la cache
      sessionStorage.score = score;
      //afficher la page de fin
      //nextLevel()
      window.location.href = "end.html";
    }
    //passer au tour suivant
    playTour();
  }
});

// si click sur "passer"
$pass.addEventListener("click", (e) => {
  e.preventDefault();
  //est-ce que la carte tirée au sort ne fait pas partie des cartes de l'user
  if (!cardsPlayer.includes(parseInt($played.innerText))) {
    //alert('cool')
    //ajout d'un point
    score++;
    //sinon, retrait d'un point
  } else {
    //alert('bad')
    score--;
  }
  //modifier l'affichage du score
  $score.innerText = score + " pt";

  //tour suivant
  playTour();
});
