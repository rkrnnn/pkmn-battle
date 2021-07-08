console.log("main.js loaded");


function attack(pkmn){
    attackAnim(pkmn);
}


function run(pkmn) {
    runAnim(pkmn);
}


function changePkmn() {
    pkmnOwnObj.name = 'charizard';

    getSingleData(pkmnOwnObj);
};


