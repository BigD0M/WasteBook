window.onload = function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        setInterval(function () {
            var imageBlocks = document.getElementsByClassName("imageBlock");
            var statGraphics = document.getElementsByClassName("statGraphic");
            var imageBlockHeadings = document.getElementsByClassName("imageBlockHeading");
            var imageBlockSubHeadings = document.getElementsByClassName("imageBlockSubHeading");
            var imageBlockCaptions = document.getElementsByClassName("imageBlockCaption");
            var textBlocks = document.getElementsByClassName("textBlock");
            var textBlockHeadings = document.getElementsByClassName("textBlockHeading");
            var textBlockText = document.getElementsByClassName("textBlockText");
            var signUpButton = document.getElementById("signUpButton");
            var i = 0;

            imageBlocks[0].style.maxHeight = "calc(100vh - 60px)";

            if (/iPad|PlayBook|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
                for (i = 0; i < imageBlocks.length; i++) {
                    imageBlocks[i].style['height'] = "600px";
                    imageBlocks[i].style.lineHeight = "600px";
                }

                imageBlockHeadings[0].innerHTML = "WAS THE LAST TIME YOU THREW AWAY FOOD AVOIDABLE?";

                for (i = 0; i < imageBlockHeadings.length; i++) {
                    imageBlockHeadings[i].style['font-size'] = "3.5em";
                }

                for (i = 0; i < textBlocks.length; i++) {
                    textBlocks[i].style.padding = "35px 0";
                }

                for (i = 0; i < imageBlockSubHeadings.length; i++) {
                    imageBlockSubHeadings[i].style['font-size'] = "2.8em";
                }

                for (i = 0; i < imageBlockCaptions.length; i++) {
                    imageBlockCaptions[i].style['font-size'] = "2.8em";
                }

                document.getElementsByClassName("graphicsBlock")[0].style.padding = "35px 0";

                for (i = 0; i < statGraphics.length; i++) {
                    statGraphics[i].style.width = "18%";
                    statGraphics[i].style.marginBottom = "20px";
                }

                signUpButton.style['margin'] = "0 30%";


                if (window.innerWidth > window.innerHeight) {
                    imageBlocks[0].style["background-size"] = "auto 200%";
                    imageBlocks[1].style["background-size"] = "auto 200%";
                    window.addEventListener("orientationchange", portraitMode);
                } else {
                    imageBlocks[0].style['background-size'] = "auto 150%";
                    imageBlocks[1].style['background-size'] = "auto 150%";
                    window.addEventListener("orientationchange", landscapeMode);
                }

                function landscapeMode() {
                    imageBlocks[0].style["background-size"] = "auto 200%";
                    imageBlocks[1].style["background-size"] = "auto 200%";
                    window.addEventListener("orientationchange", portraitMode);
                    window.removeEventListener("orientationchange", landscapeMode);
                }

                function portraitMode() {
                    imageBlocks[0].style["background-size"] = "auto 150%";
                    imageBlocks[1].style["background-size"] = "auto 150%";
                    window.addEventListener("orientationchange", landscapeMode);
                    window.removeEventListener("orientationchange", portraitMode);
                }

                // End of tablet section...
            } else {
                for (i = 0; i < imageBlocks.length; i++) {
                    imageBlocks[i].style['height'] = "100vh";
                    imageBlocks[i].style.lineHeight = "90vh";
                }

                imageBlockHeadings[0].innerHTML = "WAS THE LAST TIME YOU THREW AWAY FOOD AVOIDABLE?";

                for (i = 0; i < imageBlockHeadings.length; i++) {
                    imageBlockHeadings[i].style['font-size'] = "2.2em";
                }

                for (i = 0; i < textBlocks.length; i++) {
                    textBlocks[i].style.padding = "35px 0";
                }

                for (i = 0; i < imageBlockSubHeadings.length; i++) {
                    imageBlockSubHeadings[i].style['font-size'] = "1.4em";
                }

                for (i = 0; i < imageBlockCaptions.length; i++) {
                    imageBlockCaptions[i].style['font-size'] = "1.2em";
                }

                document.getElementsByClassName("graphicsBlock")[0].style.padding = "20px 0";

                if (window.innerWidth < 350) {
                    for (i = 0; i < statGraphics.length; i++) {
                        statGraphics[i].style.width = "40%";
                        statGraphics[i].style.margin = "2%";
                    }
                } else {
                    for (i = 0; i < statGraphics.length; i++) {
                        statGraphics[i].style.width = "35%";
                        statGraphics[i].style.margin = "3%";
                    }
                }

                signUpButton.style['margin'] = "0 10%";

                // If we're in Portrait mode
                if (window.innerHeight > window.innerWidth) {
                    for (i = 0; i < imageBlocks.length; i++) {
                        imageBlocks[i].style['background-size'] = "auto 100%";
                        imageBlocks[i].style['background-size'] = "auto 100%";
                    }
                    document.getElementById("MockUp").style['min-width'] = "90%";
                    window.addEventListener("orientationchange", landscapeMode);
                } else {
                    for (i = 0; i < imageBlocks.length; i++) {
                        imageBlocks[0].style["background-size"] = "auto 170%";
                        imageBlocks[1].style["background-size"] = "auto 170%";
                    }
                    for (i = 0; i < statGraphics.length; i++) {
                        statGraphics[i].style.width = "19%";
                        statGraphics[i].style.margin = "2%";
                    }
                    document.getElementById("MockUp").style['min-width'] = "50%";
                    window.addEventListener("orientationchange", portraitMode);
                }

                function landscapeMode() {
                    imageBlocks[0].style["background-size"] = "auto 150%";
                    imageBlocks[1].style["background-size"] = "auto 150%";
                    for (i = 0; i < statGraphics.length; i++) {
                        statGraphics[i].style.width = "19%";
                        statGraphics[i].style.margin = "2%";
                    }
                    window.addEventListener("orientationchange", portraitMode);
                    window.removeEventListener("orientationchange", landscapeMode);
                }

                function portraitMode() {
                    imageBlocks[0].style["background-size"] = "auto 100%";
                    imageBlocks[1].style["background-size"] = "auto 100%";
                    for (i = 0; i < statGraphics.length; i++) {
                        statGraphics[i].style.width = "40%";
                        statGraphics[i].style.margin = "2%";
                    }
                    window.addEventListener("orientationchange", landscapeMode);
                    window.removeEventListener("orientationchange", portraitMode);
                }

                textBlockHeadings[0].innerHTML = "FOOD WASTE?";
                textBlockText[0].innerHTML = "Food waste is the act of throwing away food that can still be used. An innocent mistake. But what people don't consider is the consequences this act causes. Like the money they're spending, the bugs and vermin it attracts, or even the amount of methane it releases into the atmosphere.";
                textBlockText[1].innerHTML = "This can be avoided if everyone decided to make some slight changes in our behaviour, and yet people still choose not to act. And others have tried to make it as easy as possible, with apps that give you recipes for old food, apps that tell you what stores are discounting food approaching the \"Sell By\" date, and apps that allow you to <b>record the amount of food you throw away for self-awareness</b>.";
                textBlockText[2].innerHTML = "The common reasons for this appear to be that people don't feel as though they're making a difference, they find it to be a hassle, or they simply don't think they're contributing much to the problem.";
            }

            signUpButton.style['background-color'] = "white";
            signUpButton.style['color'] = "#ff8800";
            document.getElementById("backToTopButton").innerHTML = "";
        }, 100);
    } else {
        // First we get a hold of all the image blocks
        var imageBlocks = document.getElementsByClassName("imageBlock");

        for (i = 0; i < imageBlocks.length; i++) {
            if (imageBlocks[i].offsetHeight >= 600) {
                imageBlocks[i].style.lineHeight = "600px";
            }
        }

        // In case the user resizes the window, we need to adjust the line height of the text in the image blocks so that they stay vertically in the middle
        window.onresize = function () {
            for (i = 0; i < imageBlocks.length; i++) {
                if (imageBlocks[i].clientHeight > imageBlocks[0].offsetHeight) {
                    imageBlocks[i].style.lineHeight = imageBlocks[0].clientHeight;
                }
                if (imageBlocks[i].offsetHeight >= 600) {
                    imageBlocks[i].style.lineHeight = "600px";
                }
            }

            // If the window is resized smaller to the point that the height is smaller than the maximum height then the lineheight is set to 75 view-width
            if (imageBlocks[0].offsetHeight < 600) {
                imageBlocks[0].style.lineHeight = "75vw";
            }

            if (imageBlocks[1].offsetHeight < 600) {
                imageBlocks[1].style.lineHeight = "75vw";
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
