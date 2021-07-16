console.log('getMoveInfo.js loaded');


async function getMoveInfo(name) {
    let response = await fetch('https://pokeapi.co/api/v2/move/' + name);
    let move = await response.json();
    return move;
}


async function completeMoveInfo(moveList) {
    var completeMoveList = [];
    
    var i = 0;
    while (i < moveList.length) {
        var move = await getMoveInfo(moveList[i]);

        var completedInfo = {};
        completedInfo.name = moveList[i];
        completedInfo.accuracy = move.accuracy;
        completedInfo.damage_class = move.damage_class.name;
        completedInfo.type = move.type.name;
        completedInfo.power = move.power;
        completedInfo.pp = move.pp;
        completedInfo.flavor_text = move.flavor_text_entries[0].flavor_text;

        completeMoveList[i] = completedInfo;

        // Set draining-kiss.damage_class and rest.damage_class to healing
        if ((moveList[i] == 'draining-kiss') || (moveList[i] == 'rest')) {
            completeMoveList[i].damage_class = 'healing';
        }

        i++;
    }


    return completeMoveList;
}


function addMoves(pkmn) {
    pkmn.moves = completeMoveInfo(pkmn.moves);
    pkmn.moves.then(data => pkmn.moves = data);
}


function generateRandomMoveList(nrOfMoves, totalMovesPossible) {
    var moveList = [];

    var i = 0;
    while (i < nrOfMoves) {
        moveList[i] = generateRandomNr(1, totalMovesPossible.length - 1);
        moveList[i] = totalMovesPossible[moveList[i]].move.name;
        i++;
    }

    moveList[i] = 'rest';
    return moveList;
}