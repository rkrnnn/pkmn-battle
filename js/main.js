console.log("main.js loaded");

var winCondition = false;

function applyMove(pkmn, id){
    console.log(pkmnOwnObj.moves[id]);
    var dmg = getDmg(id, pkmnOwnObj);
    console.log(dmg);
    
    if (pkmn.moves[id].damage_class == 'healing') {
        dmg = 5;
        heal(pkmn, dmg);
    }
    else {
        attack(pkmn, dmg);
    }
    
    setTimeout(function(){
        updateDisplayStats();
    }, 2000);
    
    createDialogue(pkmn.moves[id].damage_class, pkmn, pkmn.moves[id], Math.round(dmg));

    setTimeout(function(){
        if (checkWinCondition()) {
            
            displayWinner(checkWinCondition());
        }
        }, 5000);
    
}


function retaliate(pkmn) {
    var moveID = generateRandomNr(0,3);
    applyMove(pkmn, moveID);
}


function heal(pkmn, dmg) {
    if (!checkHealCondition(pkmn, dmg)) {
        pkmn.stats.hp_current = pkmn.stats.hp;
    }
    else {
        pkmn.stats.hp_current = pkmn.stats.hp_current + dmg;
    }

    healAnim(pkmn);
}


function attack(pkmn, dmg) {
    // dmg = dmg + 10;
    if (!checkDamageCondition(getOpponent(pkmn), dmg)) {
        getOpponent(pkmn).stats.hp_current = 0;
        winCondition = true;
    }
    else {
        getOpponent(pkmn).stats.hp_current = getOpponent(pkmn).stats.hp_current - Math.round(dmg);
    }

    attackAnim(pkmn);
}


function run(pkmn) {
    runAnim(pkmn);
    createDialogue('run', pkmn);
    displayRestartScreen();
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
    var stab = resolveSTAB(move, pkmn);
    var type = resolveTypeEffectiveness(move, getOpponent(pkmn));
    var dmg = (((power * (A / D)) / 50) + 2) * crit * random * stab * type;

    console.log('(((' + power + ' * (' + A + ' / ' + D + ')) / 50) + 2) * ' + crit + ' * ' + random + ' * ' + stab + ' * ' + type + ' = ' + dmg);
    return dmg;
}

function resolveMoveDmgClass(move, pkmn) {
    // console.log('Move ' + move.name + ' is a ' + move.damage_class + ' move.');
    if (move.damage_class == 'special') {
        var damage = pkmn.stats.special_attack;
    }
    else {
        var damage = pkmn.stats.attack;
    }

    return damage;
}


function resolveSTAB(move, pkmn) {
    var stab = 1;
    if( move.type == pkmn.type) {
        stab = 1.5;
    }
    
    return stab;
}

function resolveTypeEffectiveness(move, pkmn) {
    var typeDmg = 1;
    var totalTypes = pkmn.type.length;
    var i = 0;
    while (i < totalTypes) {
        var pkmnType = pkmn.type[i];
        var moveType = move.type;
        console.log(typeEffectivenessChart[pkmnType]);
        typeDmg = typeEffectivenessChart[pkmnType][moveType];
        i++;
    }
    console.log("Efficiency: " + typeDmg);
    displayEffectivenessDialogue(typeDmg);
    return typeDmg;
}


function resolveDefenceClass(move, pkmn) {
    // console.log('Defence is thus ' + move.damage_class + ' .');
    if (move.damage_class == 'special') {
        var def = pkmn.stats.special_defense;
    }
    else {
        var def = pkmn.stats.defense;
    }

    return def;
}

function checkHealCondition(pkmn, dmg) {
    var result = true;
    if ((pkmn.stats.hp_current + dmg) > pkmn.stats.hp) {
        result = false;
    }
    return result;
}

function checkDamageCondition(pkmn, dmg) {
    var result = true;
    if ((pkmn.stats.hp_current - dmg) < 0) {
        result = false;
    }
    return result;
}


function checkWinCondition() {
    if (pkmnOwnObj.stats.hp_current == 0) {
        winCondition = true;
        return getOpponent(pkmnOwnObj);
    }
    else {
        if (getOpponent(pkmnOwnObj).stats.hp_current == 0) {
            winCondition = true;
            return pkmnOwnObj;
        }
        else {
            return false;
        }
    }
}


function retry() {
    location.reload();
}


