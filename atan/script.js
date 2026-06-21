/* =====================================
   WORD FAMILY TRAIN ADVENTURE
===================================== */

/* ---------- WORDS ---------- */

const atWords = [
    { word: "cat", image: "assets/cat.jpg", family: "at" },
    { word: "bat", image: "assets/bat.jpg", family: "at" },
    { word: "hat", image: "assets/hat.png", family: "at" },
    { word: "mat", image: "assets/mat.png", family: "at" },
    { word: "rat", image: "assets/rat.png", family: "at" },
    { word: "fat", image: "assets/fat.png", family: "at" },
    { word: "sat", image: "assets/sat.png", family: "at" },
    { word: "pat", image: "assets/pat.png", family: "at" },
    { word: "chat", image: "assets/chat.png", family: "at" }
];

const anWords = [
    { word: "fan", image: "assets/fan.png", family: "an" },
    { word: "van", image: "assets/van.png", family: "an" },
    { word: "pan", image: "assets/pan.png", family: "an" },
    { word: "man", image: "assets/man.png", family: "an" },
    { word: "can", image: "assets/can.png", family: "an" },
    { word: "tan", image: "assets/tan.png", family: "an" },
    { word: "ran", image: "assets/ran.png", family: "an" },
    { word: "plan", image: "assets/plan.png", family: "an" },
    { word: "swan", image: "assets/swan.png", family: "an" }
];

/* ---------- PATTERNS ---------- */

const patterns = [
    ["at", "at", "an"],
    ["at", "an", "an"],
    ["an", "at", "an"],
    ["at", "an", "at"]
];

/* ---------- DOM ---------- */

const splashScreen = document.getElementById("splashScreen");
const gameContainer = document.getElementById("gameContainer");

const wordCard = document.getElementById("wordCard");
const wordImage = document.getElementById("wordImage");

const atBasket = document.getElementById("atBasket");
const anBasket = document.getElementById("anBasket");

const scoreText = document.getElementById("score");

const feedback = document.getElementById("feedback");

const endScreen = document.getElementById("endScreen");
const replayBtn = document.getElementById("replayBtn");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const backgroundMusic = document.getElementById("backgroundMusic");

/* ---------- VARIABLES ---------- */

let gameWords = [];
let currentIndex = 0;
let score = 0;
let dragging = false;

/* =====================================
   SHUFFLE
===================================== */

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

/* =====================================
   SPEECH
===================================== */

function speak(text, callback = null) {

    try {

        window.speechSynthesis.cancel();

        const utterance =
            new SpeechSynthesisUtterance(text);

        utterance.rate = 0.85;
        utterance.pitch = 1;

        if (callback) {
            utterance.onend = callback;
        }

        window.speechSynthesis.speak(utterance);

    } catch (error) {

        if (callback) {
            callback();
        }
    }
}

/* =====================================
   BUILD WORD ORDER
===================================== */

function buildWordSequence() {

    const atPool = shuffle([...atWords]);
    const anPool = shuffle([...anWords]);

    const pattern =
        patterns[
            Math.floor(
                Math.random() * patterns.length
            )
        ];

    gameWords = [];

    while (atPool.length || anPool.length) {

        for (const family of pattern) {

            if (family === "at" && atPool.length) {
                gameWords.push(atPool.shift());
            }

            if (family === "an" && anPool.length) {
                gameWords.push(anPool.shift());
            }
        }
    }
}

/* =====================================
   LOAD WORD
===================================== */

function loadWord() {

    if (currentIndex >= gameWords.length) {

        finishGame();
        return;
    }

    const current = gameWords[currentIndex];

    wordCard.textContent = current.word;

    wordImage.src = current.image;

    scoreText.textContent =
        `Score: ${score} / ${gameWords.length}`;

    setTimeout(() => {
        speak(current.word);
    }, 300);
}

/* =====================================
   FEEDBACK
===================================== */

function showFeedback(correct) {

    feedback.style.display = "flex";

    if (correct) {

        feedback.className = "correct";
        feedback.innerHTML = "👏👏👏";

        correctSound.currentTime = 0;
        correctSound.play();

    } else {

        feedback.className = "wrong";
        feedback.innerHTML = "❌";

        wrongSound.currentTime = 0;
        wrongSound.play();
    }

    setTimeout(() => {

        feedback.style.display = "none";

    }, 800);
}

/* =====================================
   CHECK ANSWER
===================================== */

function checkAnswer(family) {

    const current = gameWords[currentIndex];

    if (current.family === family) {

        score++;

        showFeedback(true);

        currentIndex++;

        setTimeout(loadWord, 900);

    } else {

        showFeedback(false);
    }
}

/* =====================================
   HIT TEST
===================================== */

function isInside(element, x, y) {

    const rect =
        element.getBoundingClientRect();

    return (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
    );
}

/* =====================================
   DRAG + TOUCH
===================================== */

wordCard.addEventListener("pointerdown", (e) => {

    dragging = true;

    wordCard.setPointerCapture(e.pointerId);
});

wordCard.addEventListener("pointermove", (e) => {

    if (!dragging) return;

    wordCard.style.position = "fixed";
    wordCard.style.zIndex = "5000";

    wordCard.style.left =
        (e.clientX - 60) + "px";

    wordCard.style.top =
        (e.clientY - 30) + "px";
});

wordCard.addEventListener("pointerup", (e) => {

    dragging = false;

    if (
        isInside(
            atBasket,
            e.clientX,
            e.clientY
        )
    ) {
        checkAnswer("at");
    }

    else if (
        isInside(
            anBasket,
            e.clientX,
            e.clientY
        )
    ) {
        checkAnswer("an");
    }

    wordCard.style.position = "static";
    wordCard.style.zIndex = "1";
});

/* =====================================
   END GAME
===================================== */

function finishGame() {

    endScreen.style.display = "flex";

    speak(
        "Fantastic! You sorted all the words."
    );
}

/* =====================================
   START GAME
===================================== */

function startGame() {

    buildWordSequence();

    currentIndex = 0;
    score = 0;

    scoreText.textContent =
        "Score: 0 / 18";

    loadWord();

    const intro =

        "Welcome to Word Family Train Adventure. " +
        "Drag and drop the word into the correct basket. " +
        "Put at words in the at basket. " +
        "Put an words in the an basket. " +
        "Let's begin.";

    speak(intro, () => {

        backgroundMusic.volume = 0.2;

        backgroundMusic.play()
            .catch(() => { });
    });
}

/* =====================================
   REPLAY
===================================== */

replayBtn.addEventListener(
    "click",
    () => {

        endScreen.style.display = "none";

        backgroundMusic.currentTime = 0;

        startGame();
    }
);

/* =====================================
   SPLASH SCREEN
===================================== */

window.addEventListener("load", () => {

    gameContainer.style.display = "none";

    setTimeout(() => {

        splashScreen.style.opacity = "0";

        setTimeout(() => {

            splashScreen.style.display = "none";

            gameContainer.style.display =
                "flex";

            startGame();

        }, 1000);

    }, 5000);
});
