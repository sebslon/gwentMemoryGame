let cardsList = ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png", "triss.png", "geralt.png", "yen.png", "ciri.png", "triss.png", "yen.png", "iorweth.png"];
let cards = new Array();

//Put cards in random position
for (i = 12; i > 0; i--) {
    let randomId = Math.floor(Math.random() * i);
    cards.push(cardsList[randomId]);
    cardsList.splice(randomId, 1);
}

//Add event listeners on every card
for (let i=0; i<cards.length; i++){
        $('#c'+ i).click(function(){ revealCard(i) });
    }

let oneVisible = false;
let turnCounter = 0;
let visibleCardNumber;
let lock = false;
let pairsLeft = 6;

function revealCard(nr) {
    let opacityValue = $('#c' + nr).css('opacity');
    let cardImage = "url(img/" + cards[nr] + ")";

    if (opacityValue != 0 && lock == false && nr != visibleCardNumber) {
        lock = true;

        $('#c' + nr).css('background-image', cardImage);
        $('#c' + nr).addClass('cardActive');
        $('#c' + nr).removeClass('card');

        if (oneVisible == false) {
            oneVisible = true;
            visibleCardNumber = nr;
            lock = false;
        } else {
            if (cards[visibleCardNumber] == cards[nr]) {
                //two same cards
                setTimeout(function () { hideCards(nr, visibleCardNumber) }, 750)
            } else {
                //two different cards
                setTimeout(function () { restoreCards(nr, visibleCardNumber) }, 1000)
            }

            turnCounter++;
            $('.score').html("Turn counter: " + turnCounter);
            oneVisible = false;
        }
    }
}

function hideCards(nr1, nr2) {
    $('#c' + nr1).css('opacity', '0');
    $('#c' + nr2).css('opacity', '0');

    pairsLeft--;
    if (pairsLeft == 0) {
        $('.board').html('<h1>You win!<br>Done in ' + turnCounter + ' turns</h1><br><span class="reload" onclick="location.reload()">Try again<span>');
    }

    lock = false;
}

function restoreCards(nr1, nr2) {
    $('#c' + nr1).css('background-image', 'url(img/karta.png)');
    $('#c' + nr1).addClass('card');
    $('#c' + nr1).removeClass('cardActive');

    $('#c' + nr2).css('background-image', 'url(img/karta.png)');
    $('#c' + nr2).addClass('card');
    $('#c' + nr2).removeClass('cardActive');

    lock = false;
}