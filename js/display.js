console.log('display.js loaded');

var mainDisplay = document.querySelector(".scene");
var statsDisplay = document.querySelector(".display > .stats");
var dialogueDisplay = document.querySelector(".dialogue");

var displayMoves = document.querySelector(".moves-display");
var displayControls = document.querySelector(".controls");
var displayRestart = document.querySelector(".secondary-display > .end");

var ownPkmnNameDisplay = document.querySelector(".own-stats > .row1 > .name");
var enemyPkmnNameDisplay = document.querySelector(".enemy-stats > .row1 > .name");

var ownPkmnTotalHpDisplay = document.querySelector(".own-stats > .row1 > .hp-numbers > .total-hp");
var enemyPkmnTotalHpDisplay = document.querySelector(".enemy-stats > .row1 > .hp-numbers > .total-hp");
var ownPkmnCurrentHpDisplay = document.querySelector(".own-stats > .row1 > .hp-numbers > .current-hp");
var enemyPkmnCurrentHpDisplay = document.querySelector(".enemy-stats > .row1 > .hp-numbers > .current-hp");

var ownPkmnCurrentHpGraphic = document.querySelector(".current-hp-graphic.own");
var enemyPkmnCurrentHpGraphic = document.querySelector(".current-hp-graphic.enemy");


function pkmnVisualInitialDisplay(location, visual) {
    location.style.backgroundImage = 'url(' + visual + ')';
}


function displayVisuals() {
    var loaded = false;
    displayRestartScreen();
    do {
        if (loadedData >= 2) {
            loaded = true;
            displayRestart.style.display = 'none';
            displayControls.style.display = '';
            
            pkmnVisualInitialDisplay(pkmnOwnObj.display, pkmnOwnObj.sprites.back_default);
            pkmnVisualInitialDisplay(pkmnEnemyObj.display, pkmnEnemyObj.sprites.front_default);
            updateDisplayNames();

            displayStats();
            resetDialogue();
            displayDialogue();
            updateDisplayStats();

            mainDisplay.style.display = '';
            mainDisplay.classList.add("animate__lightSpeedInLeft");
        }
    }
    while (!loaded);

}


function displayPkmnMoves() {
    displayMoves.innerHTML = '';
    var i = 0;
    while (i < pkmnOwnObj.moves.length) {
        var moveDIV = document.createElement("DIV");
        moveDIV.classList.add("move");
        moveDIV.id = i;
        moveDIV.addEventListener("click", function(event) {
            var id = getIDofMove(event);
            applyMove(pkmnOwnObj, id);
            displayControls.style.display = '';
            displayMoves.style.display = 'none';
            if (!checkWinCondition()) {
                setTimeout(function(){
                    retaliate(getOpponent(pkmnOwnObj));
                    }, 3000);
            }
        });
        var moveNameSPAN = document.createElement("SPAN");
        moveNameSPAN.innerText = pkmnOwnObj.moves[i].name;
        moveDIV.appendChild(moveNameSPAN);
    
        displayMoves.appendChild(moveDIV);

        i++;
    }

    displayMoves.style.display = '';
    displayControls.style.display = 'none';
}


function getIDofMove(event) {
    var id = event.target.id;
    if (id == '') {
        id = event.target.parentElement.id;
    }

    return id;
}


function updateDisplayNames() {
    ownPkmnNameDisplay.innerText = pkmnOwnObj.name;
    enemyPkmnNameDisplay.innerText = getOpponent(pkmnOwnObj).name;
}


function displayStats() {
    statsDisplay.style.display = '';
    statsDisplay.classList.add("animate__fadeInDown");
}


function displayDialogue() {
    dialogueDisplay.style.display = '';
    dialogueDisplay.classList.add("animate__fadeInUp"); 
}


function resetDialogue() {
    var nameOwnInstances = dialogueDisplay.querySelectorAll(".pkmn-name.own");
    var nameEnemyInstances = dialogueDisplay.querySelectorAll(".pkmn-name.enemy");
    var i = 0;
    while (i < nameOwnInstances.length) {
        nameOwnInstances[i].innerText = pkmnOwnObj.name;
        i++;
    }

    var i = 0;
    while (i < nameEnemyInstances.length) {
        nameEnemyInstances[i].innerText = pkmnEnemyObj.name;
        i++;
    }
}

function createDialogue(inputType, pkmn, move, dmg) {
    var nameInstances = dialogueDisplay.querySelectorAll(".pkmn-name");
    
    var moveInstances = dialogueDisplay.querySelectorAll(".move");
    var dmgInstance = dialogueDisplay.querySelector(".dmg");
    var healInstance = dialogueDisplay.querySelector(".heal-pts");

    switch (inputType) {
        case 'special': case 'physical': case 'status': 
            dialogueDisplay.querySelector(".default").style.display = 'none';
            dialogueDisplay.querySelector(".attack").style.display = '';
            dialogueDisplay.querySelector(".heal").style.display = 'none';
            
            var i = 0;
            while (i <nameInstances.length) {
                nameInstances[i].innerText = pkmn.name;
                i++;
            }
            var i = 0;
            while (i < moveInstances.length) {
                moveInstances[i].innerText = move.name;
                i++;
            }
            dmgInstance.innerText = dmg;
            break;
        
        case 'healing':
            dialogueDisplay.querySelector(".default").style.display = 'none';
            dialogueDisplay.querySelector(".attack").style.display = 'none';
            dialogueDisplay.querySelector(".heal").style.display = '';
            
            var i = 0;
            while (i <nameInstances.length) {
                nameInstances[i].innerText = pkmn.name;
                i++;
            }
            var i = 0;
            while (i < moveInstances.length) {
                moveInstances[i].innerText = move.name;
                i++;
            }
            healInstance.innerText = dmg;
            break;
    
        default:
            dialogueDisplay.querySelector(".default").style.display = '';
            dialogueDisplay.querySelector(".attack").style.display = 'none';
            dialogueDisplay.querySelector(".heal").style.display = 'none';

            

            break;
    }
}

function updateDisplayStats() {
    ownPkmnTotalHpDisplay.innerText = pkmnOwnObj.stats.hp;
    enemyPkmnTotalHpDisplay.innerText = getOpponent(pkmnOwnObj).stats.hp;

    ownPkmnCurrentHpDisplay.innerText = pkmnOwnObj.stats.hp_current;
    ownPkmnCurrentHpGraphic.style.width = (pkmnOwnObj.stats.hp_current / pkmnOwnObj.stats.hp) * 100 + '%';
    enemyPkmnCurrentHpDisplay.innerText = getOpponent(pkmnOwnObj).stats.hp_current;
    enemyPkmnCurrentHpGraphic.style.width = (getOpponent(pkmnOwnObj).stats.hp_current / getOpponent(pkmnOwnObj).stats.hp) * 100 + '%';
}


function displayWinner(pkmn) {
    dialogueDisplay.querySelector(".default").style.display = 'none';
    dialogueDisplay.querySelector(".attack").style.display = 'none';
    dialogueDisplay.querySelector(".heal").style.display = 'none';
    dialogueDisplay.querySelector(".end").style.display = '';

    dialogueDisplay.querySelector(".pkmn-name.won").innerText = pkmn.name;
    dialogueDisplay.querySelector(".pkmn-name.lost").innerText = getOpponent(pkmn).name;
    setTimeout(function(){
        looseAnim(getOpponent(pkmn));
        displayRestartScreen();
        }, 1500);
}


function displayRestartScreen() {
    displayMoves.style.display = 'none';
    displayRestart.style.display = '';
}







