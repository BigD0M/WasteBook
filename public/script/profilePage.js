/* Shrinks rank + stats */ 
$(function () {
    $(".waste").click(function () {
        if ($(window).width() >= 768) {
            if ($(".waste").attr('id') == "normal" || $(".waste").attr('id') == "small") {
                
                $(".waste").animate({ width: '80%' }, 1500);
                $(".stats").animate({ width: '10%' }, 750);
                $(".rank").animate({ width: '10%' }, 750);

                $(".waste").attr('id', 'big');
                $(".stats").attr('id', 'small');
                $(".rank").attr('id', 'small');
                
                $(".waste-container").css("display", "block");
                $(".stats-container").css("display", "none");
                $(".rank-container").css("display", "none");
            }
        }
    });
});
    

$(function () {
    /* Shrinks waste + rank */ 
    $(".stats").click(function () {
        if ($(window).width() >= 768) {
            if ($(".stats").attr('id') == "normal" || $(".stats").attr('id') == "small") {

                $(".stats").animate({ width: '80%' }, 1500);
                $(".waste").animate({ width: '10%' }, 750);
                $(".rank").animate({ width: '10%' }, 750);

                $(".waste").attr('id', 'small');
                $(".stats").attr('id', 'big');
                $(".rank").attr('id', 'small');
                
                $(".waste-container").css("display", "none");
                $(".stats-container").css("display", "block");
                $(".rank-container").css("display", "none");
            }
        }
    });
});

$(function () {
    /* Shrinks waste + stats */ 
    $(".rank").click(function () {
        if ($(window).width() >= 768) {
            if ($(".rank").attr('id') == "normal" || $(".rank").attr('id') == "small") {

                $(".rank").animate({ width: '80%' }, 1500);
                $(".waste").animate({ width: '10%' }, 750);
                $(".stats").animate({ width: '10%' }, 750);

                $(".waste").attr('id', 'small');
                $(".stats").attr('id', 'small');
                $(".rank").attr('id', 'big');
                
                $(".waste-container").css("display", "none");
                $(".stats-container").css("display", "none");
                $(".rank-container").css("display", "block");
            }
        }
    });
});

/* Re-sets page once resized to mobile scale */
var tmp = $(window).width();
$(window).resize(function() {

    if ($(window).width() < 768 && tmp >= 768) {
        $(".waste").css({
            "width" : "100%",
        });
        
        $(".stats").css({
            "width" : "100%",
        });
        
        $(".rank").css({
            "width" : "100%"
        });
    } else {
        $(".waste").css({
            "width" : "33%",
        });
        
        $(".stats").css({
            "width" : "33%",
        });
        
        $(".rank").css({
            "width" : "34%"
        });
    }
});


function openWasteForm() {
    if ($(window).width() >= 768) {
        $(".waste-form").slideToggle(500);
        
    }
}
   


