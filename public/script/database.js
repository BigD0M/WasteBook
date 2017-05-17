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
    var food =  $('input[name=food]').val().toLowerCase();
    var qty =  $('input[name=qty]').val();
    var reason =  $('select[name=reason]').val();
    var brand =  $('input[name=brand]').val().toLowerCase();
    var price =  $('input[name=price]').val();
    var date = getDate();
    if (food != "" && qty != "") {
        
    //clears input fields
    $('input[name=food]').val("");
    $('input[name=qty]').val("");
    $('input[name=brand]').val("");
    $('input[name=price]').val("");
    $('input[name=date]').val(date);


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
    
    //Updates food qty
    firebase.database().ref('users/' + currUser.uid + '/waste/foods').once("value").then(function(snapshot) {
        if (snapshot.hasChild(food)) {
            var foodQty = (parseInt(qty) + parseInt(snapshot.child(food).val().qty))
            firebase.database().ref('users/' + currUser.uid + '/waste/foods/' + food).set({
                qty: foodQty
            });
        } else {
            firebase.database().ref('users/' + currUser.uid + '/waste/foods/' + food).set({
                qty: qty
            });
        }
    }); 
    
    if (brand != "") {
        firebase.database().ref('users/' + currUser.uid + '/waste/brands').once("value").then(function(snapshot) {
            if (snapshot.hasChild(brand)) {
                var brandQty = (parseInt(qty) + parseInt(snapshot.child(brand).val().qty))
                firebase.database().ref('users/' + currUser.uid + '/waste/brands/' + brand).set({
                    qty: brandQty
                });
            } else {
                firebase.database().ref('users/' + currUser.uid + '/waste/brands/' + brand).set({
                    qty: qty
                });
            }
        }); 
    }
    
    updateLog('users/' + currUser.uid + '/waste/', getDate());
}

//updates the log veiwing date
function updateDate() {
    date = $('input[name=date]').val();
    
    updateLog('users/' + currUser.uid + '/waste', date);
}

//updates the user's log
function updateLog(path, date) {
    
    var ref = firebase.database().ref(path);
    
    ref.once("value")
        .then(function(snapshot) {
        $(".log").empty();
        snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.val().date == date) {
                $("<tr>" + 
                  "<td style='display: none' class='delete'><input id=" + childSnapshot.key + " type='checkbox' name='delete'></td>"  +
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

function reasons() {
    var ref = firebase.database().ref('users/' + currUser.uid + '/waste');
    
    var reasons = new Promise(function(resolve, reject) {
        
        ref.once("value").then(function(snapshot) {
            
                var r1 = 0;
                var r2 = 0;
                var r3 = 0;
                var r4 = 0;
                var r5 = 0;
                var r6 = 0;
            
            snapshot.forEach(function(childSnapshot) {
                
                //console.log("checking child" + childSnapshot.key)
                
                if (childSnapshot.val().reason == "Expired") {
                    r1++;
                } else if (childSnapshot.val().reason == "Tasted Bad") {
                    r2++;
                } else if (childSnapshot.val().reason == "Got Stale") {
                    r3++;
                } else if (childSnapshot.val().reason == "Over Bought") {
                    r4++;
                } else if (childSnapshot.val().reason == "Over Cooked") {
                    r5++;
                } else if (childSnapshot.val().reason == "Other") {
                    r6++;
                }
            });
            
            resolve([r1, r2, r3, r4, r5, r6]);
        }); 
    });

    return reasons;
}

function deleteLogs() {
    
    $('input[name=delete]').each(function() {
        if ($(this).is(":checked")) {
            var id = $(this).attr("id"); 
            
            var data = new Promise(function(resolve, reject) {
                firebase.database().ref('users/' + currUser.uid + '/waste/' + id).once('value').then(function(snapshot) {
                    resolve(snapshot);
                });
            });
            
            data.then(function(snapshot) {
                var qty = snapshot.val().qty;
                var food = snapshot.val().food;
                var brand = snapshot.val().brand;
                
                firebase.database().ref('users/' + currUser.uid + '/waste/foods').once("value").then(function(snapshot) {
                    var foodQty = parseFloat(snapshot.child(food).val().qty) - parseFloat(qty);

                    if (foodQty == 0) {
                        firebase.database().ref('users/' + currUser.uid + '/waste/foods/' + food).remove();
                    } else {
                        firebase.database().ref('users/' + currUser.uid + '/waste/foods/' + food).set({
                            qty: foodQty
                        });
                    }
                }); 
                
                firebase.database().ref('users/' + currUser.uid + '/waste/brands').once("value").then(function(snapshot) {
                    if (brand != "") {
                        var brandQty = parseFloat(snapshot.child(brand).val().qty) - parseFloat(qty);

                        if (brandQty == 0) {
                            firebase.database().ref('users/' + currUser.uid + '/waste/brands/' + brand).remove();
                        } else {
                            firebase.database().ref('users/' + currUser.uid + '/waste/brands/' + brand).set({
                                qty: brandQty
                            });
                        }
                    }
                });

                
                firebase.database().ref('users/' + currUser.uid + '/waste/' + id).remove();
                
                updateLog('users/' + currUser.uid + '/waste', getDate());
            });
        }
    });
}

