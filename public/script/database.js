var database = firebase.database();

var currUser;

var path;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        currUser = user;
        
        writeUserData(user.uid, user.displayName, user.email);
    
        //Writes the user data to the firebase database
        function writeUserData(userId, name, email) {
          firebase.database().ref('users/' + userId).push({
            username: name,
            email: email
          });
        }
        
         path = 'users/' + currUser.uid + '/waste/';
    
        updateLog(path);
        
    } else {
         location.replace("index.html"); //re-directs user if not logged in
    }
});



function addWaste() {
    
   
    //data for DB
    var food =  $('input[name=food]').val();
    var qty =  $('input[name=qty]').val();
    var reason =  $('input[name=reason]').val();
    var brand =  $('input[name=brand]').val();
    var price =  $('input[name=price]').val();
    
    
    if (food != "" && qty != "") {
        
        //clears input fields
        $('input[name=food]').val("");
        $('input[name=qty]').val("");
        $('input[name=reason]').val("");
        $('input[name=brand]').val("");
        $('input[name=price]').val("");


        //Adds data to DB
        firebase.database().ref(path).push({
            food: food,
            qty: qty,
            reason: reason,
            brand: brand,
            price: price
        });
    }

    
    updateLog(path);
}



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
