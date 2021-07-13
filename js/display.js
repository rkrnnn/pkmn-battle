console.log('display.js loaded');

var displayMoves = document.querySelector(".moves-display");
var displayControls = document.querySelector(".controls");


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
    displayMoves.innerHTML = '';
    var i = 0;
    while (i < pkmnOwnObj.moves.length) {
        var moveDIV = document.createElement("DIV");
        moveDIV.classList.add("move");
        moveDIV.id = i;
        moveDIV.addEventListener("click", function(event) {
            attack(pkmnOwnObj, event);
            displayControls.style.display = '';
            displayMoves.style.display = 'none';
            setTimeout(function(){
                retaliate(getOpponent(pkmnOwnObj));
                }, 2000);
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







