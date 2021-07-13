console.log("main.js loaded");


function attack(pkmn, move){
    displayPkmnMoves();
    attackAnim(pkmn);

    var id = move.target.id;
    if (id == '') {
        id = move.target.parentElement.id;
    }

    console.log(pkmnOwnObj.moves[id]);
    var dmg = getDmg(id, pkmnOwnObj);
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


function getDmg(moveID, pkmn) {
    var move = pkmn.moves[moveID];
    var power = move.power;
    var A = resolveMoveDmgClass(move, pkmn);
    var D = resolveDefenceClass(move, getOpponent(pkmn));
    var crit = generateRandomNr(1, 2);
    var random = generateRandomNr(85, 100) / 100;
    var stab = 1.5;
    var type = 1;
    var dmg = (((power * (A / D)) / 50) + 2) * crit * random * stab * type;

    console.log('(((' + power + ' * (' + A + ' / ' + D + ')) / 50) + 2) * ' + crit + ' * ' + random + ' * ' + stab + ' * ' + type + ' = ' + dmg);
    return dmg;
}

function resolveMoveDmgClass(move, pkmn) {
    console.log('Move is a ' + move.damage_class + ' move.');
    if (move.damage_class == 'special') {
        var damage = pkmn.stats.special_attack;
    }
    else {
        var damage = pkmn.stats.attack;
    }

    return damage;
}

function resolveDefenceClass(move, pkmn) {
    console.log('Defence is thus ' + move.damage_class + ' .');
    if (move.damage_class == 'special') {
        var def = pkmn.stats.special_defense;
    }
    else {
        var def = pkmn.stats.defense;
    }

    return def;
}


