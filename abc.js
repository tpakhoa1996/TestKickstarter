var Tether = require('tether');

$(document).ready(function() {
    // cards will always has 5 cards
    var cards = $(".card");

    var middleCard = cards.eq(2);
    var leftCards = [
        cards.eq(0),
        cards.eq(1)
    ];
    var rightCards = [
        cards.eq(3),
        cards.eq(4)
    ];

    new Tether({
        element: middleCard,
        target: $(".view"),
        attachment: 'middle center',
        targetAttachment: 'middle center'
    });
});
