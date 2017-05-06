$(document).ready(function() {

    var cards = $(".card");
    var classArray = ["far-left","left","center","right","far-right"];
    // data in test-ui.pug

    $(".card").each(function(index, el) {
        $(el).addClass(findClass(index));
        $(el).attr('position',findClass(index));
        var dataObject = selectData(index);
        $(this).attr('data', dataObject["newIndex"]);
        loadCard($(this),dataObject["data"]);

    });

    function selectData(index) {
        var newIndex;
        if (index > data.length - 1) {
            newIndex = 0;
        } else if (index < 0) {
            newIndex = data.length - 1;
        } else {
            newIndex = index;
        }
        return {
            newIndex: newIndex,
            data: data[newIndex]
        };
    }

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
                var index = parseInt($(".far-right").attr('data'));
                $(".view>div").each(function(index, el) {
                    var current = $(el).attr('position');
                    var i = classArray.indexOf(current);

                    var next = findClass(i-1);
                    $(el).removeClass(current).addClass(next);
                    $(el).attr('position', next);
                });
                var dataObject = selectData(index+1);
                $(".far-right").attr('data', dataObject["newIndex"]);
                loadCard($(".far-right"), dataObject["data"]);
                break;
            case 39:
                var index = parseInt($(".far-left").attr('data'));
                $(".view>div").each(function(index, el) {
                    var current = $(el).attr('position');
                    var i = classArray.indexOf(current);

                    var next = findClass(i+1);
                    $(el).removeClass(current).addClass(next);
                    $(el).attr('position', next);
                });
                var dataObject = selectData(index-1);
                $(".far-left").attr('data', dataObject["newIndex"]);
                loadCard($(".far-left"), dataObject["data"]);
                break;
        }
    });



    function loadCard(element, toDisplayData) {
        element.fadeOut('400', function() {
            element.find(".title").text(toDisplayData["projectTitle"]);
            if (toDisplayData["projectPoster"] != undefined) {
                element.find('.main-image img').attr('src', toDisplayData["projectPoster"]);
            } else {
                element.find('.main-image img').attr('src', 'http://placehold.it/500x200');
            }

            // SubImages
            var subImages = toDisplayData["projectImages"];
            var container = element.find(".sub-images");
            container.empty();
            for (var i = 0; i < subImages.length; i++) {
                var link = subImages[i];
                container.append($("<div>", {
                    class: 'col-sm-3 image-container grid-item'
                }).append($("<img>", {
                    src: link
                })));
            }

            var grid = element.find('.grid').isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    width: '25%'
                }
            });

            grid.imagesLoaded().progress(function() {
                grid.isotope('layout');
            });

            // Tags
            var tags = toDisplayData["projectCategory"];
            var container = element.find(".category");
            container.empty();
            for (var i = 0; i < tags.length; i++) {
                var tag = tags[i];
                container.append($("<div>", {
                    class: 'tag',
                    text: tag.replace(/%20/g, " ")
                }));
            };

            // Description
            var desc = toDisplayData["projectDescription"];
            var maxLength = 450 // maximum number of characters to extract

            //trim the string to the maximum length
            var trimmedString = desc.substr(0, maxLength);

            //re-trim if we are in the middle of a word
            trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
            element.find(".description").html(trimmedString);

            // Goal and progress
            var goal = toDisplayData["projectGoal"];
            var pledged = toDisplayData["projectPledged"];
            var percent = Math.round((parseInt(pledged) / parseInt(goal)) * 100)/100 * 100 + "%";
            var symbol = toDisplayData["projectCurrency"];

            element.find(".progress-bar").css('width', percent);
            element.find(".progress-bar").text(percent);
            element.find(".pledged").text(symbol + pledged);
            element.find(".goal").text(symbol + goal);

            element.fadeIn('400');
        });
    }
});
