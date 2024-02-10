let playerText = document.getElementById("playerText");
let restartBtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box"));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);

const o_text = "O";
const x_text = "X";
let currentPlayer = x_text;
let spaces = Array(9).fill(null);

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon()) {
      playerText.innerText = `${currentPlayer} has won!`;
      let winning_blocks = playerHasWon();

      winning_blocks.forEach(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );
      boxes.forEach((box) => box.removeEventListener("click", boxClicked)); // جلوگیری از کلیک‌های بیشتر پس از برنده شدن
      return;
    }

    currentPlayer = currentPlayer === x_text ? o_text : x_text;
    playerText.innerText = `Player ${currentPlayer}`; // نمایش نوبت بازیکن فعلی
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

restartBtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null);
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.style.backgroundColor = ""; // ریست کردن رنگ بلوک‌ها به حالت اولیه
    box.addEventListener("click", boxClicked); // اضافه کردن دوباره event listener پس از ریست
  });

  playerText.innerText = "Tic Tac Toe";
  currentPlayer = x_text;
}

startGame();
