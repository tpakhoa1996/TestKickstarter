$(document).ready(function() {
    console.log(data);

    var cards = $(".card");
    var classArray = ["far-left","left","center","right","far-right"];

    $(".card").each(function(index, el) {
        $(el).addClass(findClass(index));
        $(el).attr('position',findClass(index));
    });

    function findClass(index) {
        var result;
        if (index > classArray.length - 1) {
            result = classArray[0];
        } else if (index < 0) {
            result = classArray[classArray.length - 1];
        } else {
            result = classArray[index];
        }
        return result;
    }

    $(document).keydown(function(event) {
        // left 37
        // right 39
        switch (event.which) {
            case 37:
                $(".view>div").each(function(index, el) {
                    var current = $(el).attr('position');
                    var i = classArray.indexOf(current);

                    var next = findClass(i-1);
                    $(el).removeClass(current).addClass(next);
                    $(el).attr('position', next);
                });
                loadNewElement($(".far-left"));
                break;
            case 39:
                $(".view>div").each(function(index, el) {
                    var current = $(el).attr('position');
                    var i = classArray.indexOf(current);

                    var next = findClass(i+1);
                    $(el).removeClass(current).addClass(next);
                    $(el).attr('position', next);
                });
                loadNewElement($(".far-right"));
                break;
        }
    });

    function loadNewElement(element) {
        element.fadeOut('400', function() {
            element.fadeIn('400');
        });
    }
});
