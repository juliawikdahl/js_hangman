const wordList = ["hund", "katt", "krokodil", "get", "gris", "schimpans"]; 
const maxAttempts = 6; 

let selectedWord = "";
let displayedWord = "";
let attempts = 0;

function startGame() {
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    displayedWord = "_".repeat(selectedWord.length);
    updateWordDisplay();
    document.addEventListener("keydown", handleKeyPress);
  
}

function handleKeyPress(event) {
    if (event.key.match(/[a-zA-Z]/)) {
        const letter = event.key.toUpperCase();
        checkLetter(letter);
    }
}

function checkLetter(letter) {
    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                displayedWord = displayedWord.substring(0, i) + letter + displayedWord.substring(i + 1);
            }
        }
        updateWordDisplay();
        if (displayedWord === selectedWord) {
            handleWin();
        }
    } else {
        attempts++;
        drawHangman();
        if (attempts >= maxAttempts) {
            handleLoss();
            
        }
    }
}

function drawHangman() {
    const bodyParts = ["head", "body", "left-arm", "right-arm", "left-leg", "right-leg"];
    for (let i = 0; i < attempts; i++) {
        document.getElementById(bodyParts[i]).style.backgroundColor = "#fff";
    }
}

function updateWordDisplay() {
    document.getElementById("word-display").textContent = displayedWord;
}


function handleWin() {
    alert("Grattis, du har vunnit. Ordet var: " + selectedWord.toLowerCase() + "!");
    removeKeyboardListener();
    startGame();
}

function handleLoss() {
    alert("Du har förlorat. Ordet var: " + selectedWord);
    removeKeyboardListener();
    startGame();
}
