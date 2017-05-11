/* Shrinks rank + stats */ 
$(function () {
    $(".waste").click(function () {
        if ($(window).width() >= 768) {
            if ($(".waste").attr('id') == "normal" || $(".waste").attr('id') == "small") {
                
                $(".waste").animate({ width: '80%' }, 1500);
                $(".stats").animate({ width: '10%' }, 750);
                $(".rank").animate({ width: '10%' }, 750);


            }
        } else {
            if ($(".waste").attr('id') == "normal" || $(".waste").attr('id') == "small") {
                
                $(".waste").animate({ height: '80%' }, 1500);
                $(".stats").animate({ height: '10%' }, 750);
                $(".rank").animate({ height: '10%' }, 750);


            }
        }
        
        $(".waste").attr('id', 'big');
        $(".stats").attr('id', 'small');
        $(".rank").attr('id', 'small');
        
        $(".waste-container").css("display", "block");
        $(".stats-container").css("display", "none");
        $(".rank-container").css("display", "none");
    });
});
    
/* Shrinks waste + rank */ 
$(function () {
    $(".stats").click(function () {
        if ($(window).width() >= 768) {
            if ($(".stats").attr('id') == "normal" || $(".stats").attr('id') == "small") {

                $(".stats").animate({ width: '80%' }, 1500);
                $(".waste").animate({ width: '10%' }, 750);
                $(".rank").animate({ width: '10%' }, 750);
            }
        } else {
            if ($(".stats").attr('id') == "normal" || $(".stats").attr('id') == "small") {

                $(".stats").animate({ height: '80%' }, 1500);
                $(".waste").animate({ height: '10%' }, 750);
                $(".rank").animate({ height: '10%' }, 750);
            }
        }
        
        $(".waste").attr('id', 'small');
        $(".stats").attr('id', 'big');
        $(".rank").attr('id', 'small');

        $(".waste-container").css("display", "none");
        $(".stats-container").css("display", "block");
        $(".rank-container").css("display", "none");
    });
});

/* Shrinks waste + stats */ 
$(function () {
    $(".rank").click(function () {
        if ($(window).width() >= 768) {
            if ($(".rank").attr('id') == "normal" || $(".rank").attr('id') == "small") {

                $(".rank").animate({ width: '80%' }, 1500);
                $(".waste").animate({ width: '10%' }, 750);
                $(".stats").animate({ width: '10%' }, 750);

            }
        } else {
            if ($(".rank").attr('id') == "normal" || $(".rank").attr('id') == "small") {

                $(".rank").animate({ height: '80%' }, 1500);
                $(".waste").animate({ height: '10%' }, 750);
                $(".stats").animate({ height: '10%' }, 750);

            }
            
        }
        

        $(".waste").attr('id', 'small');
        $(".stats").attr('id', 'small');
        $(".rank").attr('id', 'big');

        $(".waste-container").css("display", "none");
        $(".stats-container").css("display", "none");
        $(".rank-container").css("display", "block");
    });
});

/* Changes background color and saves cookie */
$(function () {
    
    if ($.cookie('background-color')) {
        $('.waste').addClass($.cookie('background-color'));
        $('.stats').addClass($.cookie('background-color'));
        $('.rank').addClass($.cookie('background-color'));
    }
    
    $(".background-btn").on('click', function () /*change(function()*/{
        $('.waste').removeClass($.cookie('previous-color')).addClass($(this).val());
        $('.stats').removeClass($.cookie('previous-color')).addClass($(this).val());
        $('.rank').removeClass($.cookie('previous-color')).addClass($(this).val());
    
        $.removeCookie('background-color');
        $.cookie('background-color', $(this).val(), {expires: 1, path: '/'});

        $.removeCookie('previous-color');
        $.cookie('previous-color', $.cookie('background-color'), {expires: 1, path: '/'});
        
    });
});

var tmp = 768;

/* Re-sets page once resized to mobile scale */
$(window).on("load resize", function () {
    if ($(window).width() < 768 && tmp >= 768) {
        
        $(".waste").css({
            "width" : "100%",
            "height" : "33%"
        });
        
        $(".stats").css({
            "width" : "100%",
            "height" : "33%"
        });
        
        $(".rank").css({
            "width" : "100%",
            "height" : "34%"
        });
        
        
        $(".waste").attr('id', 'normal');
        $(".stats").attr('id', 'normal');
        $(".rank").attr('id', 'normal');

        $(".waste-container").css("display", "none");
        $(".stats-container").css("display", "none");
        $(".rank-container").css("display", "none");
    } else if ($(window).width() >= 768 && tmp < 768) {
        $(".waste").css({
            "width" : "33%",
            "height" : "100%"
        });
        
        $(".stats").css({
            "width" : "33%",
            "height" : "100%"
        });
        
        $(".rank").css({
            "width" : "34%",
            "height" : "100%"
        });
        
        
        $(".waste").attr('id', 'normal');
        $(".stats").attr('id', 'normal');
        $(".rank").attr('id', 'normal');

        $(".waste-container").css("display", "none");
        $(".stats-container").css("display", "none");
        $(".rank-container").css("display", "none");
    }
    
    tmp = $(window).width();
});


function openWasteForm() {
    $(".waste-form").slideToggle(500);
}