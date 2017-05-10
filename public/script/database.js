var database = firebase.database();

var currUser;

//assigns current user and updates it's database
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        currUser = user;
        
        checkForUser();
        
        updateLog('users/' + currUser.uid + '/waste/');
        
    } else {
         location.replace("index.html"); //re-directs user if not logged in
    }
});

//Writes the user data to the firebase database
function writeUserData(userId, name, email) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email
    });
}

//checks if the current user exists, if not one is created
function checkForUser() {
    var ref = firebase.database().ref('users/');
    
    ref.equalTo(currUser.uid).once("value", function(snapshot) {
        var userData = snapshot.val();
        if (userData != null){
            writeUserData(currUser.uid, currUser.displayName, currUser.email);
        }
    });
}

//adds user waste from add waste form 
function addWaste() {
    
   
    //data for DB
    var food =  $('input[name=food]').val();
    var qty =  $('input[name=qty]').val();
    var reason =  $('select[name=reason]').val();
    var brand =  $('input[name=brand]').val();
    var price =  $('input[name=price]').val();
    
    
    if (food != "" && qty != "") {
        
        //clears input fields
        $('input[name=food]').val("");
        $('input[name=qty]').val("");
        $('input[name=brand]').val("");
        $('input[name=price]').val("");


        //Adds data to DB
        firebase.database().ref('users/' + currUser.uid + '/waste/').push({
            food: food,
            qty: qty,
            reason: reason,
            brand: brand,
            price: price
        });
    }

    
    updateLog('users/' + currUser.uid + '/waste/');
}


//updates the user's log
function updateLog(path) {
    
    var ref = firebase.database().ref(path);
    
    ref.once("value")
        .then(function(snapshot) {
        $(".log").empty();
        snapshot.forEach(function(childSnapshot) {
            $("<tr>" + 
              "<td>" + childSnapshot.val().food + "</td>" +
              "<td>" + childSnapshot.val().qty + "</td>" +
              "<td>" + childSnapshot.val().price + "</td>" +
              "<td>" + childSnapshot.val().reason + "</td>" +
              "<td>" + childSnapshot.val().brand + "</td>" +
              "</tr>").appendTo(".log");
        });
            
    }); 
}
