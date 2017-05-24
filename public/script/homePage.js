window.onload = function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        var imageText = document.getElementsByClassName("imageBlock");
        imageText[0].style['height'] = "100vh";
        imageText[1].style['height'] = "100vh";
        imageText[0].style.lineHeight = "90vh";
        imageText[1].style.lineHeight = "90vh";
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



        if (window.innerWidth > window.innerHeight) {
            imageText[0].style["background-size"] = "auto 150%";
            imageText[1].style["background-size"] = "auto 150%";
            window.addEventListener("orientationchange", portraitMode);
        } else {
            imageText[0].style['background-size'] = "auto 100%";
            imageText[1].style['background-size'] = "auto 100%";
            window.addEventListener("orientationchange", landscapeMode);
        }

        function landscapeMode() {
            imageText[0].style["background-size"] = "auto 150%";
            imageText[1].style["background-size"] = "auto 150%";
            window.addEventListener("orientationchange", portraitMode);
            window.removeEventListener("orientationchange", landscapeMode);
        }

        function portraitMode() {
            imageText[0].style["background-size"] = "auto 100%";
            imageText[1].style["background-size"] = "auto 100%";
            window.addEventListener("orientationchange", landscapeMode);
            window.removeEventListener("orientationchange", portraitMode);
        }
    } else {
        // First we get a hold of all the image blocks
        var imageText = document.getElementsByClassName("imageBlock");

        // Now we check to see if any of the image blocks are have an offset height passing the maximum height of the image div
        if (imageText[0].offsetHeight >= 600) {
            imageText[0].style.lineHeight = "600px";
        }

        if (imageText[1].offsetHeight >= 600) {
            imageText[1].style.lineHeight = "600px";
        }

        // In case the user resizes the window, we need to adjust the line height of the text in the image blocks so that they stay vertically in the middle
        window.onresize = function () {
            if (imageText[0].clientHeight > imageText[0].offsetHeight) {
                imageText[0].style.lineHeight = imageText[0].clientHeight;
            }

            if (imageText[1].clientHeight > imageText[1].offsetHeight) {
                imageText[1].style.lineHeight = imageText[1].clientHeight;
            }

            // If the total height of the div goes past the max height, then we reset the lineheight to said maximum height
            if (imageText[0].offsetHeight >= 600) {
                imageText[0].style.lineHeight = "600px";
            }

            if (imageText[1].offsetHeight >= 600) {
                imageText[1].style.lineHeight = "600px";
            }

            // If the window is resized smaller to the point that the height is smaller than the maximum height then the lineheight is set to 75 view-width
            if (imageText[0].offsetHeight < 600) {
                imageText[0].style.lineHeight = "75vw";
            }

            if (imageText[1].offsetHeight < "600px") {
                imageText[1].style.lineHeight = "75vw";
            }
        }

        // Animation for when the user clicks on one of the tabs that causes the page to scroll down to said segment
        $(document).ready(function () {
            // Add smooth scrolling to all links
            $("a").on('click', function (event) {

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
                    }, 800, function () {

                        // Add hash (#) to URL when done scrolling (default click behavior)
                        window.location.hash = hash;
                    });
                } // End if
            });
        });
    }
}
