/* Shrinks rank + stats */ 
$(function () {
    $(".waste").click(function () {
        if ($(window).width() >= 768) {
            if ($(".waste").attr('id') == "normal" || $(".waste").attr('id') == "small") {
                
                $(".waste").animate({ width: '80%' }, 1500);
                $(".stats").animate({ width: '10%' }, 1500);
                $(".rank").animate({ width: '10%' }, 1500);


            }
        } else {
            if ($(".waste").attr('id') == "normal" || $(".waste").attr('id') == "small") {
                
                $(".waste").animate({ height: '80%' }, 1500);
                $(".stats").animate({ height: '10%' }, 1500);
                $(".rank").animate({ height: '10%' }, 1500);


            }
        }
        
        $(".waste").attr('id', 'big');
        $(".stats").attr('id', 'small');
        $(".rank").attr('id', 'small');
        
        $(".waste-container").css("display", "block");
        $(".stats-container").css("display", "none");
        $(".rank-container").css("display", "none");
        
        $(".waste-cover").css("display", "none");
        $(".stats-cover").css("display", "block");
        $(".rank-cover").css("display", "block");
        
        $(".waste").css("background-color", "#FF8800");
        $(".stats").css("background-color", "#ff941a");
        $(".rank").css("background-color", "#ff941a");
    });
});
    
/* Shrinks waste + rank */ 
$(function () {
    $(".stats").click(function () {
        if ($(window).width() >= 768) {
            if ($(".stats").attr('id') == "normal" || $(".stats").attr('id') == "small") {

                $(".stats").animate({ width: '80%' }, 1500);
                $(".waste").animate({ width: '10%' }, 1500);
                $(".rank").animate({ width: '10%' }, 1500);
            }
        } else {
            if ($(".stats").attr('id') == "normal" || $(".stats").attr('id') == "small") {

                $(".stats").animate({ height: '80%' }, 1500);
                $(".waste").animate({ height: '10%' }, 1500);
                $(".rank").animate({ height: '10%' }, 1500);
            }
        }
        
        $(".waste").attr('id', 'small');
        $(".stats").attr('id', 'big');
        $(".rank").attr('id', 'small');

        $(".waste-container").css("display", "none");
        $(".stats-container").css("display", "block");
        $(".rank-container").css("display", "none");
        
        $(".waste-cover").css("display", "block");
        $(".stats-cover").css("display", "none");
        $(".rank-cover").css("display", "block");
        
        $(".waste").css("background-color", "#ff941a");
        $(".stats").css("background-color", "#FF8800");
        $(".rank").css("background-color", "#ff941a");
        
    });
});

/* Shrinks waste + stats */ 
$(function () {
    $(".rank").click(function () {
        if ($(window).width() >= 768) {
            if ($(".rank").attr('id') == "normal" || $(".rank").attr('id') == "small") {

                $(".rank").animate({ width: '80%' }, 1500);
                $(".waste").animate({ width: '10%' }, 1500);
                $(".stats").animate({ width: '10%' }, 1500);

            }
        } else {
            if ($(".rank").attr('id') == "normal" || $(".rank").attr('id') == "small") {

                $(".rank").animate({ height: '80%' }, 1500);
                $(".waste").animate({ height: '10%' }, 1500);
                $(".stats").animate({ height: '10%' }, 1500);

            }
            
        }
        

        $(".waste").attr('id', 'small');
        $(".stats").attr('id', 'small');
        $(".rank").attr('id', 'big');

        $(".waste-container").css("display", "none");
        $(".stats-container").css("display", "none");
        $(".rank-container").css("display", "block");
        
        $(".waste-cover").css("display", "block");
        $(".stats-cover").css("display", "block");
        $(".rank-cover").css("display", "none");
        
        $(".waste").css("background-color", "#ff941a");
        $(".stats").css("background-color", "#ff941a");
        $(".rank").css("background-color", "#FF8800");
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
        
        $(".waste-cover").css("display", "block");
        $(".stats-cover").css("display", "block");
        $(".rank-cover").css("display", "block");
        
        $(".waste").css("background-color", "#ff941a");
        $(".stats").css("background-color", "#ff941a");
        $(".rank").css("background-color", "#ff941a");
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

        $(".waste-cover").css("display", "block");
        $(".stats-cover").css("display", "block");
        $(".rank-cover").css("display", "block");
        
        $(".waste").css("background-color", "#ff941a");
        $(".stats").css("background-color", "#ff941a");
        $(".rank").css("background-color", "#ff941a");
    }
    
    tmp = $(window).width();
});


function openWasteForm() {
    $(".waste-form").slideToggle(500);
}