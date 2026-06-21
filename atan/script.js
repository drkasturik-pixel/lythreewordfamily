/* ==========================================
   WORD FAMILY TRAIN ADVENTURE
   SCRIPT.JS
========================================== */

/* ---------- WORD DATA ---------- */

const atWords = [
    { word:"cat", image:"assets/cat.jpg", family:"at" },
    { word:"bat", image:"assets/bat.jpg", family:"at" },
    { word:"hat", image:"assets/hat.png", family:"at" },
    { word:"mat", image:"assets/mat.png", family:"at" },
    { word:"rat", image:"assets/rat.png", family:"at" },
    { word:"fat", image:"assets/fat.png", family:"at" },
    { word:"sat", image:"assets/sat.png", family:"at" },
    { word:"pat", image:"assets/pat.png", family:"at" },
    { word:"chat", image:"assets/Chat.png", family:"at" }
];

const anWords = [
    { word:"fan", image:"assets/fan.png", family:"an" },
    { word:"van", image:"assets/van.png", family:"an" },
    { word:"pan", image:"assets/pan.png", family:"an" },
    { word:"man", image:"assets/man.png", family:"an" },
    { word:"can", image:"assets/can.png", family:"an" },
    { word:"tan", image:"assets/tan.png", family:"an" },
    { word:"ran", image:"assets/ran.png", family:"an" },
    { word:"plan", image:"assets/plan.png", family:"an" },
    { word:"swan", image:"assets/swan.png", family:"an" }
];

/* ---------- PATTERNS ---------- */

const patterns = [
    ["at","at","an"],
    ["at","an","an"],
    ["an","at","an"],
    ["at","an","at"]
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

const correctSound =
document.getElementById("correctSound");

const wrongSound =
document.getElementById("wrongSound");

const backgroundMusic =
document.getElementById("backgroundMusic");

/* ---------- GAME VARIABLES ---------- */

let gameWords = [];

let currentIndex = 0;

let score = 0;

let dragActive = false;

/* ==========================================
   UTILITY FUNCTIONS
========================================== */

function shuffle(array){

    for(let i=array.length-1;i>0;i--){

        const j =
        Math.floor(Math.random()*(i+1));

        [array[i],array[j]] =
        [array[j],array[i];
    }

    return array;
}

/* ==========================================
   SPEECH
========================================== */

function speak(text, callback=null){

    speechSynthesis.cancel();

    const utterance =
    new SpeechSynthesisUtterance(text);

    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.volume = 1;

    if(callback){

        utterance.onend = callback;

    }

    speechSynthesis.speak(utterance);
}

/* ==========================================
   BUILD RANDOM SEQUENCE
========================================== */

function buildWordSequence(){

    let atPool = shuffle([...atWords]);

    let anPool = shuffle([...anWords]);

    const pattern =
    patterns[
        Math.floor(
            Math.random()*patterns.length
        )
    ];

    gameWords = [];

    while(atPool.length || anPool.length){

        for(const family of pattern){

            if(
                family==="at" &&
                atPool.length
            ){

                gameWords.push(
                    atPool.shift()
                );
            }

            if(
                family==="an" &&
                anPool.length
            ){

                gameWords.push(
                    anPool.shift()
                );
            }

        }

    }

}

/* ==========================================
   LOAD WORD
========================================== */

function loadWord(){

    if(currentIndex >= gameWords.length){

        finishGame();

        return;
    }

    const current =
    gameWords[currentIndex];

    wordCard.textContent =
    current.word;

    wordImage.src =
    current.image;

    setTimeout(()=>{

        speak(current.word);

    },400);

    scoreText.textContent =
    `Score: ${score} / ${gameWords.length}`;
}

/* ==========================================
   FEEDBACK
========================================== */

function showFeedback(correct){

    feedback.style.display = "flex";

    if(correct){

        feedback.className =
        "correct";

        feedback.innerHTML =
        "👏👏👏";

        correctSound.currentTime = 0;

        correctSound.play();

    }
    else{

        feedback.className =
        "wrong";

        feedback.innerHTML =
        "❌";

        wrongSound.currentTime = 0;

        wrongSound.play();

    }

    setTimeout(()=>{

        feedback.style.display =
        "none";

    },800);

}

/* ==========================================
   CHECK ANSWER
========================================== */

function checkAnswer(selectedFamily){

    const current =
    gameWords[currentIndex];

    if(
        current.family ===
        selectedFamily
    ){

        score++;

        showFeedback(true);

        currentIndex++;

        setTimeout(()=>{

            loadWord();

        },900);

    }
    else{

        showFeedback(false);

    }

}

/* ==========================================
   BASKET HIT TEST
========================================== */

function isInsideBasket(
    basket,
    x,
    y
){

    const rect =
    basket.getBoundingClientRect();

    return (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
    );

}

/* ==========================================
   TOUCH + DRAG SUPPORT
========================================== */

wordCard.addEventListener(
    "pointerdown",
    e=>{

    dragActive = true;

    wordCard.setPointerCapture(
        e.pointerId
    );

});

wordCard.addEventListener(
    "pointermove",
    e=>{

    if(!dragActive) return;

    wordCard.style.position =
    "fixed";

    wordCard.style.left =
    (e.clientX-60)+"px";

    wordCard.style.top =
    (e.clientY-30)+"px";

});

wordCard.addEventListener(
    "pointerup",
    e=>{

    dragActive = false;

    if(
        isInsideBasket(
            atBasket,
            e.clientX,
            e.clientY
        )
    ){

        checkAnswer("at");

    }

    else if(
        isInsideBasket(
            anBasket,
            e.clientX,
            e.clientY
        )
    ){

        checkAnswer("an");

    }

    wordCard.style.position =
    "static";

});

/* ==========================================
   FINISH GAME
========================================== */

function finishGame(){

    endScreen.style.display =
    "flex";

    speak(
        "Fantastic. You sorted all the words."
    );

}

/* ==========================================
   START GAME
========================================== */

function startGame(){

    buildWordSequence();

    currentIndex = 0;

    score = 0;

    loadWord();

    const instructions =

    "Welcome to Word Family Train Adventure. " +

    "Drag and drop the word into the correct basket. " +

    "Put at words in the at basket. " +

    "Put an words in the an basket. " +

    "Let's begin.";

    speak(
        instructions,
        ()=>{

            backgroundMusic.volume =
            0.20;

            backgroundMusic.play()
            .catch(()=>{});

        }
    );

}

/* ==========================================
   REPLAY
========================================== */

replayBtn.addEventListener(
    "click",
    ()=>{

    endScreen.style.display =
    "none";

    buildWordSequence();

    currentIndex = 0;

    score = 0;

    loadWord();

});
/* ==========================================
   SPLASH SCREEN
========================================== */

window.onload = ()=>{

    gameContainer.style.display =
    "none";

    setTimeout(()=>{

        splashScreen.style.opacity =
        "0";

        setTimeout(()=>{

            splashScreen.style.display =
            "none";

            gameContainer.style.display =
            "flex";

            startGame();

        },1000);

    },5000);

};
