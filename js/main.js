console.log("main.js loaded");


function attack(pkmn, move){
    displayPkmnMoves();
    attackAnim(pkmn);

    var id = move.target.id;
    if (id == '') {
        id = move.target.parentElement.id;
    }

    console.log(pkmnOwnObj.moves[id]);
    var dmg = pkmnOwnObj.moves[id].power;
    console.log(dmg);
    pkmn.stats.hp = pkmn.stats.hp - dmg;
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


