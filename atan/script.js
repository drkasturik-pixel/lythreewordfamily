/* =====================================
   WORD FAMILY TRAIN ADVENTURE
===================================== */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial, Helvetica, sans-serif;
}

html,
body{
    width:100%;
    height:100%;
    overflow:hidden;
    background:#F8F3E8;
}

/* =====================================
   SPLASH SCREEN
===================================== */

#splashScreen{
    position:fixed;
    inset:0;
    background:#ffffff;
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:9999;
    transition:opacity 1s ease;
}

#logo{
    width:min(350px,80%);
    max-width:350px;
}

/* =====================================
   GAME CONTAINER
===================================== */

#gameContainer{
    width:100%;
    height:100vh;
    padding:10px;
    display:none;
    flex-direction:column;
    justify-content:space-between;
}

/* =====================================
   HEADER
===================================== */

header{
    text-align:center;
}

h1{
    color:#2E6F95;
    font-size:clamp(1.5rem,3vw,2.4rem);
    margin-bottom:8px;
}

#instructions{
    color:#333;
    font-size:clamp(0.9rem,2vw,1.1rem);
    font-weight:bold;
    line-height:1.4;
    margin-bottom:8px;
}

#score{
    font-size:1.1rem;
    font-weight:bold;
    color:#444;
}

/* =====================================
   WORD AREA
===================================== */

#wordArea{
    flex:1;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    gap:12px;
}

#wordImage{
    max-width:220px;
    max-height:140px;
    object-fit:contain;
    user-select:none;
    pointer-events:none;
}

#wordCard{
    min-width:140px;
    text-align:center;

    background:#FFF7D6;
    border:4px solid #D8B56A;

    border-radius:16px;

    padding:14px 30px;

    font-size:2rem;
    font-weight:bold;

    color:#333;

    cursor:grab;
    touch-action:none;

    box-shadow:
    0 4px 10px rgba(0,0,0,0.15);
}

#wordCard:active{
    cursor:grabbing;
}

/* =====================================
   BASKETS
===================================== */

#basketArea{
    display:flex;
    justify-content:space-evenly;
    align-items:center;
    gap:20px;
    margin-bottom:10px;
}

.basket{
    width:42%;
    max-width:280px;
    position:relative;
}

.basket img{
    width:100%;
    max-height:180px;
    object-fit:contain;
    pointer-events:none;
}

.basketText{
    position:absolute;
    top:48%;
    left:50%;
    transform:translate(-50%,-50%);

    color:white;
    font-weight:bold;
    font-size:2rem;

    text-shadow:
    2px 2px 4px rgba(0,0,0,0.7);
}

/* =====================================
   FEEDBACK
===================================== */

#feedback{
    position:fixed;
    inset:0;

    display:none;
    justify-content:center;
    align-items:center;

    font-size:6rem;

    z-index:5000;

    pointer-events:none;
}

.correct{
    color:#2E7D32;
}

.wrong{
    color:#D32F2F;
}

/* =====================================
   END SCREEN
===================================== */

#endScreen{
    position:fixed;
    inset:0;

    background:white;

    display:none;

    flex-direction:column;
    justify-content:center;
    align-items:center;

    z-index:6000;
}

#endScreen h2{
    color:#2E6F95;
    font-size:2rem;
    margin-bottom:15px;
}

#endScreen p{
    font-size:1.2rem;
    margin-bottom:20px;
}

#replayBtn{
    border:none;

    background:#2E6F95;
    color:white;

    padding:14px 28px;

    border-radius:12px;

    font-size:1.1rem;
    font-weight:bold;

    cursor:pointer;
}

#replayBtn:hover{
    transform:scale(1.05);
}

/* =====================================
   TABLETS
===================================== */

@media(max-width:900px){

    #wordImage{
        max-height:120px;
    }

    #wordCard{
        font-size:1.7rem;
    }

    .basketText{
        font-size:1.7rem;
    }

}

/* =====================================
   MOBILE
===================================== */

@media(max-width:600px){

    h1{
        font-size:1.3rem;
    }

    #instructions{
        font-size:0.9rem;
    }

    #score{
        font-size:1rem;
    }

    #wordImage{
        max-height:100px;
        max-width:170px;
    }

    #wordCard{
        font-size:1.4rem;
        padding:12px 24px;
    }

    .basket{
        width:45%;
    }

    .basketText{
        font-size:1.3rem;
    }

    #feedback{
        font-size:5rem;
    }

}

/* =====================================
   SMALL HEIGHT DEVICES
===================================== */

@media(max-height:700px){

    #wordImage{
        max-height:90px;
    }

    .basket img{
        max-height:140px;
    }

    #wordCard{
        font-size:1.3rem;
    }

    .basketText{
        font-size:1.2rem;
    }

}
