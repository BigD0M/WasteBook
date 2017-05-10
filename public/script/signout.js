$(function() {
    $(".signOut").click(function () {
        firebase.auth().signOut().then(function() {
            location.replace("index.html");
        });
    });
});
