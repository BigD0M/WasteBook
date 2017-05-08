/* Shrinks rank + stats */ 
$(function () {
     $(".waste").click(function () {
     if ($(".waste").attr('id') == "normal") {
         
         $(".waste").animate({ width: '80%' }, 1500);
         $(".stats").animate({ width: '10%' }, 750);
         $(".rank").animate({ width: '10%' }, 750);
         
         $(".waste").attr('id', 'big');
     }
     else  {
         $(".waste").animate({ width: '33%' }, 750);
         $(".stats").animate({ width: '33%' }, 1500);
         $(".rank").animate({ width: '34%' }, 1500);
         $(".waste").attr('id', 'normal');
     }
     });
});


/* Shrinks waste + rank */ 
$(function () {
     $(".stats").click(function () {
     if ($(".stats").attr('id') == "normal") {
         
         $(".stats").animate({ width: '80%' }, 1500);
         $(".waste").animate({ width: '10%' }, 750);
         $(".rank").animate({ width: '10%' }, 750);
         
         $(".stats").attr('id', 'big');
     }
     else  {
         $(".waste").animate({ width: '33%' }, 1500);
         $(".stats").animate({ width: '33%' }, 750);
         $(".rank").animate({ width: '34%' }, 1500);
         $(".stats").attr('id', 'normal');
     }
     });
});


/* Shrinks waste + stats */ 
$(function () {
     $(".rank").click(function () {
     if ($(".rank").attr('id') == "normal") {
         
         $(".rank").animate({ width: '80%' }, 1500);
         $(".waste").animate({ width: '10%' }, 750);
         $(".stats").animate({ width: '10%' }, 750);
         
         $(".rank").attr('id', 'big');
     }
     else  {
         $(".waste").animate({ width: '33%' }, 1500);
         $(".rank").animate({ width: '33%' }, 750);
         $(".stats").animate({ width: '34%' }, 1500);
         
         $(".rank").attr('id', 'normal');
     }
     });
});