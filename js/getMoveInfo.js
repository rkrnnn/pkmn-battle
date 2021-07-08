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
        var move = await getMoveInfo(moveList[i].name);

        var completedInfo = {};
        completedInfo.name = moveList[i].name;
        completedInfo.accuracy = move.accuracy;
        completedInfo.damage_class = move.damage_class.name;
        completedInfo.type = move.type.name;
        completedInfo.power = move.power;
        completedInfo.pp = move.pp;
        completedInfo.flavor_text = move.flavor_text_entries[0].flavor_text;

        completeMoveList[i] = completedInfo;
        i++;
    }

    return completeMoveList;
}