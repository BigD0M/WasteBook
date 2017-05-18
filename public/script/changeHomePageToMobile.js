window.onload = function() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        document.getElementById("Hook").style['height'] = "100vh";
        document.getElementsByClassName("imageBlock")[0].style['background-size'] = "auto 100%";
        document.getElementsByClassName("imageBlock")[1].style['background-size'] = "auto 100%";
        document.getElementsByClassName("imageBlock")[0].style.maxHeight = "94vh";
        document.getElementsByClassName("imageBlockHeading")[0].innerHTML = "WAS THE LAST TIME YOU THREW AWAY FOOD AVOIDABLE?";
        document.getElementsByClassName("imageBlockHeading")[0].style['font-size'] = "2.2em";
        document.getElementsByClassName("imageBlockHeading")[1].style['font-size'] = "2.2em";
        document.getElementsByClassName("imageBlockSubHeading")[0].style['font-size'] = "1.4em";
        document.getElementsByClassName("imageBlockCaption")[0].style['font-size'] = "1.2em";
        document.getElementsByClassName("textBlock")[0].style.padding = "35px 0";
        document.getElementsByClassName("textBlock")[1].style.padding = "35px 0";
        document.getElementsByClassName("textBlockHeading")[0].innerHTML = "FOOD WASTE?";
        document.getElementsByClassName("textBlockText")[0].innerHTML = "Food waste is the act of throwing away food that can still be used. An innocent mistake. But what people don't consider is the consequences this act causes. Like the money they're spending, the space the food takes takes, the bugs and vermin it attracts, the amount of methane (a greenhouse gas) it releases into the atmosphere, and many others.";
        document.getElementsByClassName("textBlockText")[1].innerHTML = "This can be avoided if everyone decided to make some slight changes in our behaviour. Even something as small as not throwing away food just because it's past the \"Best Before\" date can make a huge difference. But for some reason, people still choose not to act. And others have tried to make it as easy as possible, with apps that give you recipes for old food, apps that tell you what stores are discounting food approaching the \"Sell By\" date, and apps that allow you to <b>record the amount of food you throw away for self-awareness</b>.";
        document.getElementsByClassName("graphicsBlock")[0].style.padding = "35px 0";
        document.getElementsByClassName("statGraphic")[0].style.width = "35%";
        document.getElementsByClassName("statGraphic")[1].style.width = "35%";
        document.getElementsByClassName("statGraphic")[2].style.width = "35%";
        document.getElementsByClassName("statGraphic")[3].style.width = "35%";
        document.getElementsByClassName("statGraphic")[0].style.marginBottom = "35px";
        document.getElementsByClassName("statGraphic")[1].style.marginBottom = "35px";
        document.getElementsByClassName("statGraphic")[2].style.marginBottom = "35px";
        document.getElementsByClassName("statGraphic")[3].style.marginBottom = "35px"; 
                
        document.getElementById("MockUp").style['min-width'] = "90%";
        document.getElementById("signUpButton").style['margin'] = "0 10%";
        document.getElementById("signUpButton").style['background-color'] = "white";
        document.getElementById("signUpButton").style['color'] = "#ff8800";
                
        document.getElementById("backToTopButton").innerHTML = "";
    }
        if (document.getElementById('Hook').offsetHeight >= 600) {
            document.getElementById('Hook').style.lineHeight = "600px";
                }
                
        if (document.getElementById('LeadUp').offsetHeight >= 600) {
            document.getElementById('LeadUp').style.lineHeight = "600px";
        }

    window.onresize = function() {
        if (document.getElementById('Hook').clientHeight > document.getElementById('Hook').offsetHeight) {
            document.getElementById('Hook').style.lineHeight = document.getElementById('Hook').clientHeight;
        }
                
        if (document.getElementById('Hook').offsetHeight > 600) {
            document.getElementById('Hook').style.lineHeight = "600px";
        } 
                
        if (document.getElementById('Hook').offsetHeight < "600px") {
            document.getElementById('Hook').style.lineHeight = "75vw";
        }
        
        if (document.getElementById('LeadUp').clientHeight > document.getElementById('LeadUp').offsetHeight) {
            document.getElementById('LeadUp').style.lineHeight = document.getElementById('LeadUp').clientHeight;
        }
                
        if (document.getElementById('LeadUp').offsetHeight > 600) {
            document.getElementById('LeadUp').style.lineHeight = "600px";
        } 
                
        if (document.getElementById('LeadUp').offsetHeight < "600px") {
            document.getElementById('LeadUp').style.lineHeight = "75vw";
        }
    }
            
    $(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});
}