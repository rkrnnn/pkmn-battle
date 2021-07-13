console.log("main.js loaded");


function attack(pkmn, move){
    displayPkmnMoves();
    attackAnim(pkmn);

    var id = move.target.id;
    if (id == '') {
        id = move.target.parentElement.id;
    }

    console.log(pkmnOwnObj.moves[id]);
    var dmg = getDmg(pkmnOwnObj.moves[id], pkmnOwnObj);
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


function getDmg(move, pkmn) {
    var power = move.power;
    var A = pkmn.stats.attack;
    var D = getOpponent(pkmn).stats.defense;
    var crit = generateRandomNr(1, 2);
    var random = generateRandomNr(85, 100) / 100;
    var stab = 1.5;
    var type = 1;
    var dmg = (((power * (A / D)) / 50) + 2) * crit * random * stab * type;

    console.log('(((' + power + ' * (' + A + ' / ' + D + ')) / 50) + 2) * ' + crit + ' * ' + random + ' * ' + stab + ' * ' + type + ' = ' + dmg);
    return dmg;
}


