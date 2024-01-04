const $gameStartBtn = document.querySelector("#startBtn");
const $gameInfoPanel = document.querySelector("#gameInfo");
const $gameScreen = document.querySelector("#gameScreen");
const $playerNameForm = document.querySelector("#playerForm");
const $cardPlayed = document.querySelectorAll(".card");
const $cpuCardPlayed = document.querySelector(".played");
const $cardDropZone = document.querySelector('.dropzone')

let dragSrcEl = null

$gameStartBtn.addEventListener("click", (e) => {
  $playerNameForm.classList.add("is-hidden");
  $gameInfoPanel.classList.remove("is-hidden");
  $gameScreen.classList.remove("is-hidden");
});

let usedCards = [];
const cardRandomizer = () => {

}
cardRandomizer();
//console.log(usedCards)
//console.log($cardPlayed)

$cardPlayed.forEach((cards) => {
  cards.addEventListener("click", (e) => {
    let cible = e.target;
    console.log(e);
    if (cible.className === "card") {
      if (cible.innerText === $cpuCardPlayed.innerText) {
        cardRandomizer();
        console.log("This is a match");
        cible.remove();
      } else {
        cardRandomizer();
        console.log("This is not a match");
        cible.remove();
      }
    }
  });
});

$cardPlayed.forEach(el => {
  el.addEventListener('dragstart', e => {
    dragSrcEl = e.target
    e.target.classList.add('active')
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', e.target)
  }, false)
})

$cardDropZone.addEventListener('dragover', e => {
  e.preventDefault()
  e.target.classList.remove('active')
  
}, false)
$cardDropZone.addEventListener('dragleave', e => {
  e.target.classList.remove('active')
})
$cardDropZone.addEventListener('drop', e => {
  e.preventDefault()
  e.stopPropagation()
  //let clonedElement = dragSrcEl.cloneNode(true)
  console.log(e.target)
  console.log(dragSrcEl)
  e.target.appendChild(dragSrcEl, e.target)
  dragSrcEl.classList.remove('active')
  dragSrcEl.removeAttribute('draggable')
  zone.classList.remove('active')
}, false)
