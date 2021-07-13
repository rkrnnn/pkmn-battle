console.log("main.js loaded");


function attack(pkmn){
    displayPkmnMoves();

    pkmn.stats.hp = pkmn.stats.hp - 1;
}

function retaliate(pkmn) {
    attackAnim(pkmn);

    pkmn.stats.hp = pkmn.stats.hp - 1;
}


function run(pkmn) {
    runAnim(pkmn);
}


function changePkmn() {
    pkmnOwnObj.name = 'charizard';

    getSingleData(pkmnOwnObj);
};


