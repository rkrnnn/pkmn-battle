console.log("getPKMN.js loaded");

var pkmnOwnObj = {
    display: document.querySelector(".pkmn-own"),
    name: 'pikachu',
    stats: {
        hp: 0,
        attack: 0,
        defense: 0,
        special_attack: 0,
        special_defense: 0,
        speed: 0
    },
    moves: ['thunderbolt', 'draining-kiss', 'nuzzle', 'slam'],
    type: [],
    sprites: {}
};;

var pkmnEnemyObj = {
    display: document.querySelector(".pkmn-enemy"),
    name: generateRandomNr(1, 898),
    stats: {
        hp: 0,
        attack: 0,
        defense: 0,
        special_attack: 0,
        special_defense: 0,
        speed: 0
    },
    moves: [],
    type: [],
    sprites: {}
};;

var loadedData = 0;


getData(pkmnOwnObj , pkmnEnemyObj);


async function getData(pkmn, pkmnEnemy) {
    var pkmnJson = await getPKMNinfo(pkmn.name);
    console.log(pkmnJson);
    saveToLocal(pkmnJson, pkmnOwnObj);
    addMoves(pkmnOwnObj);
    console.log(pkmnOwnObj);
    
    var pkmnEnemyJson = await getPKMNinfo(pkmnEnemy.name);
    console.log(pkmnEnemyJson);
    saveToLocal(pkmnEnemyJson, pkmnEnemyObj);
    pkmnEnemyObj.moves = generateRandomMoveList(3, pkmnEnemyJson.moves);
    addMoves(pkmnEnemyObj);
    console.log(pkmnEnemyObj);
    
    displayVisuals();
};


async function getSingleData(pkmn) {
    var pkmnJson = await getPKMNinfo(pkmn.name);
    saveToLocal(pkmnJson, pkmnOwnObj);
    addMoves(pkmnOwnObj);
    
    console.log(pkmnOwnObj);

    displayVisuals();
}


async function getPKMNinfo(name) {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon/' + name)
    let pkmn = await response.json();
    loadedData++;
    return pkmn;
}


function saveToLocal(json, pkmn) {
    pkmn.name = json.species.name;
    pkmn.stats.hp = json.stats[0].base_stat;
    pkmn.stats.attack = json.stats[1].base_stat;
    pkmn.stats.defense = json.stats[2].base_stat;
    pkmn.stats.special_attack = json.stats[3].base_stat;
    pkmn.stats.special_defense = json.stats[4].base_stat;
    pkmn.stats.speed = json.stats[5].base_stat;
    pkmn.sprites = json.sprites;

    var i = 0;
    while (i < json.types.length) {
        pkmn.type.push(json.types[i].type.name);
        i++;
    }

    var i = 0;
    while (i < json.sprites.length) {
        pkmn.type[i] = json.types[i];
        i++;
    }
}


function generateRandomNr(min, max) {
    var random = Math.floor((Math.random() * (max - min + 1)) + min);

    return random;
}


function getOpponent(pkmn) {
    if (pkmn === pkmnOwnObj) {
        return pkmnEnemyObj;
    }
    else {
        return pkmnOwnObj;
    }
}