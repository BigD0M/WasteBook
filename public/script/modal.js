$(document).ready(function() {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("signIn");
    
    var btn2 = document.getElementById("signUpButton");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    if (btn != null) {
         btn.onclick = function() {
            modal.style.display = "block";
        }
    }


    if (btn2 != null) {
        btn2.onclick = function() {
            modal.style.display = "block";
        }
    }


    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});