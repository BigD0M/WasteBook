var database = firebase.database();

var currUser;

$(document).ready(function() {
    $('input[name=date]').val(getDate());
});

//assigns current user and updates it's database
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        currUser = user;
        
        checkForUser();
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
    var exists = new Promise(function(resolve, reject) {
        ref.once("value").then(function(snapshot) {
            if (snapshot.hasChild(currUser.uid)) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
    
    exists.then(function(status) {
        if (!status) {
           writeUserData(currUser.uid, currUser.displayName, currUser.email);
        } else {
            updateLog('users/' + currUser.uid + '/waste/', getDate());
        }
    });
}

//gets the current date
function getDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    
    if (month < 10) {
        month = "0" + month;
    }
    
    var year = date.getFullYear();
    var today = year + "-" + month + "-" + day;
    
    return today;
}

//adds user waste from add waste form 
function addWaste() {
    
   
    //data for DB
    var food =  $('input[name=food]').val();
    var qty =  $('input[name=qty]').val();
    var reason =  $('select[name=reason]').val();
    var brand =  $('input[name=brand]').val();
    var price =  $('input[name=price]').val();
    var date = getDate();
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
            price: price,
            date: date
        });
    }

    $('input[name=date]').val(date);
    updateLog('users/' + currUser.uid + '/waste/', getDate());
}

//updates the log veiwing date
function updateDate() {
    date = $('input[name=date]').val();
    
    updateLog('users/' + currUser.uid + '/waste/', date);
}

//updates the user's log
function updateLog(path, date) {
    
    var ref = firebase.database().ref(path);
    
    var path = 'users/' + currUser.uid + '/waste';
    
    ref.once("value")
        .then(function(snapshot) {
        $(".log").empty();
        snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.val().date == date) {
                $("<tr>" + 
                  "<td>" + childSnapshot.val().food + "</td>" +
                  "<td>" + childSnapshot.val().qty + "</td>" +
                  "<td>" + childSnapshot.val().price + "</td>" +
                  "<td>" + childSnapshot.val().reason + "</td>" +
                  "<td>" + childSnapshot.val().brand + "</td>" +
                  "</tr>").appendTo(".log");
            }
            
        });
            
    }); 
}
