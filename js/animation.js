console.log('animation.js loaded');

function attackAnim(pkmn) {
    pkmn.display.classList.add('animate__bounce');
    setTimeout(function(){
        pkmn.display.classList.remove('animate__bounce');
        }, 1000);
    setTimeout(function(){
        hurtAnim(getOpponent(pkmn));
        }, 1000);
}


function hurtAnim(pkmn) {
    pkmn.display.classList.add('animate__flash');
    setTimeout(function(){
        pkmn.display.classList.remove('animate__flash');
        }, 1000);
}


function healAnim(pkmn) {
    pkmn.display.classList.add('animate__bounce');
    setTimeout(function(){
        pkmn.display.classList.remove('animate__bounce');
        }, 1000);
    setTimeout(function(){
        hurtAnim(pkmn);
        }, 1000);
}

function runAnim(pkmn) {
    pkmn.display.classList.add('animate__fadeOutLeft');
    // setTimeout(function(){
    //     pkmn.display.classList.remove('animate__fadeOutLeft');
    //     }, 1000);
}


function looseAnim(pkmn) {
    pkmn.display.classList.add("animate__fadeOutDown");
}