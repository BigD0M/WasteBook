window.onload = function () {
    var imageText = document.getElementsByClassName("imageBlock");
    if (imageText[0].offsetHeight >= 600) {
        imageText[0].style.lineHeight = "600px";
    }

    if (imageText[1].offsetHeight >= 600) {
        imageText[1].style.lineHeight = "600px";
    }

    window.onresize = function () {
        if (imageText[0].clientHeight > imageText[0].offsetHeight) {
            imageText[0].style.lineHeight = imageText[0].clientHeight;
        }

        if (imageText[0].offsetHeight >= 600) {
            imageText[0].style.lineHeight = "600px";
        }

        if (imageText[0].offsetHeight < 600) {
            imageText[0].style.lineHeight = "75vw";
        }

        if (imageText[1].clientHeight > imageText[1].offsetHeight) {
            imageText[1].style.lineHeight = imageText[1].clientHeight;
        }

        if (imageText[1].offsetHeight > 600) {
            imageText[1].style.lineHeight = "600px";
        }

        if (imageText[1].offsetHeight < "600px") {
            imageText[1].style.lineHeight = "75vw";
        }
    }

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
