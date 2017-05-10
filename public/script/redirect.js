//Redirects the user if logged in
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        location.replace("profile.html");
    }
});

