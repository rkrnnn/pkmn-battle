console.log('display.js loaded');

var displayMoves = document.querySelector(".moves-display");


function pkmnVisualInitialDisplay(location, visual) {
    location.style.backgroundImage = 'url(' + visual + ')';
}


function displayVisuals() {
    var loaded = false;

    do {
        if (loadedData >= 2) {
            loaded = true;
            pkmnVisualInitialDisplay(pkmnOwnObj.display, pkmnOwnObj.sprites.back_default);
            pkmnVisualInitialDisplay(pkmnEnemyObj.display, pkmnEnemyObj.sprites.front_default);
        }
    }
    while (!loaded);
}


function displayPkmnMoves() {
    var moveDIV = document.querySelector("DIV");
    moveDIV.classList.add("move");
    var moveNameSPAN = document.querySelector("SPAN");
    moveNameSPAN.innerText = pkmnOwnObj.moves[0].name;
    moveDIV.appendChild(moveNameSPAN);

    displayMoves.appendChild(moveDIV);
}





