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
    var date = getDate();
    
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        startDate: date
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
    
    if ($("#delete-active").length) {
        clearDel();
    }
    
   
    //data for DB
    var food =  $('input[name=food]').val().toLowerCase();
    var qty =  $('input[name=qty]').val();
    var reason =  $('select[name=reason]').val();
    var brand =  $('input[name=brand]').val().toLowerCase();
    var price =  $('input[name=price]').val();
    var date = getDate();
    var points = 0;
    
    //clears input fields
    $('input[name=food]').val("");
    $('input[name=qty]').val("");
    $('input[name=brand]').val("");
    $('input[name=price]').val("");
    $('input[name=date]').val(date);

    if (food != "" && qty != "") {

        //Adds data to DB
        firebase.database().ref('users/' + currUser.uid + '/waste/').push({
                food: food,
                qty: qty,
                reason: reason,
                brand: brand,
                price: price,
                date: date
        });
        
        firebase.database().ref('users/' + currUser.uid + '/ranking/').once("value").then(function(snapshot) {
           
            var points = 0;
            
            var weeks = getWeeks();

            if (qty < 0) {
                points = 1;
            } else {
                points = 2 * qty;
            }
            
            if (snapshot.val() != null) {
                points = parseFloat(snapshot.val().points) + points;
            }
            
            weeks.then(function(weeks) {
                if (weeks > 0) {
                    points /= weeks;
                }
                
                firebase.database().ref('users/' + currUser.uid + '/ranking/').set({
                    points: points
                });
            });
        }); 

        //Updates food qty
        firebase.database().ref('users/' + currUser.uid + '/waste/foods').once("value").then(function(snapshot) {
            if (snapshot.hasChild(food)) {
                var foodQty = (parseFloat(qty) + parseFloat(snapshot.child(food).val().qty))
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
                    var brandQty = (parseFloat(qty) + parseFloat(snapshot.child(brand).val().qty))
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
    }
    
    updateLog('users/' + currUser.uid + '/waste/', getDate());
}

//updates the log veiwing date
function updateDate() {
    if ($("#delete-active").length) {
        clearDel();
    }
    
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
                  "<td style='display: none' id='delete-hidden' class='delete'><input id=" + childSnapshot.key + " type='checkbox' name='delete'></td>"  +
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

function brands() {
    
    /* The directory to brands */
    var ref = firebase.database().ref('users/' + currUser.uid + '/waste/brands');
    
    /* Our promise object */
    var brands = new Promise(function(resolve, reject) {
        
        ref.once("value").then(function(snapshot) {
            
            var topBrands = []; /* The array that stores the top brands */
            
            /* instantiate first so we have no nulls */
            /* first input is the brand name, which is also the child key, second input is the qty */
            topBrands[0] = ["None", 0];
            topBrands[1] = ["None", 0];
            topBrands[2] = ["None", 0];
            topBrands[3] = ["None", 0];
            topBrands[4] = ["None", 0];
            
            var count = 0; /* Used to increment the brand index  */
            
            snapshot.forEach(function(childSnapshot) {
                var bNo = 0; /* Used for the brand index */
                var checked = false;

                /* loop through the topBrands */
                topBrands.forEach(function(topBrand){
                    if (!checked) {

                        /* if this brand has qty more than the current we replace */
                        if (topBrand[1] < parseFloat(childSnapshot.val().qty)) {

                            /* first we have staggers each brand down one placement */
                            for (var i = 4; i > bNo; i--) {
                                topBrands[i] = topBrands[i - 1];
                            }


                            /* replace the brand */
                            topBrands[bNo] = [childSnapshot.key, parseFloat(childSnapshot.val().qty)];

                            checked = true; /* no need to replace the brand for this loop*/
                        }
                    }
                    bNo++; /* increments if no brand was replaced */
                });
                
            });
            
            /* Put each brand, highest -> lowest, in the resolve */
            resolve([topBrands[0], topBrands[1], topBrands[2], topBrands[3], topBrands[4]]);
        }); 
    });

    return brands;
}

function deleteLogs() {
    
    var counter = 1;
    
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
                
                setTimeout(function(){ 
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
                    
                    firebase.database().ref('users/' + currUser.uid + '/ranking/').once("value").then(function(snapshot) {
           
                        var points = 0;

                        var weeks = getWeeks();
                        
                        if (qty < 0) {
                            points = 1;
                        } else {
                            points = 2 * qty;
                        }

                        weeks.then(function(weeks) {
                        
                            if (weeks > 0) {
                                points /= weeks;
                            }
                            
                            if (snapshot.val() != null) {
                                points = parseFloat(snapshot.val().points) - points;
                            }
                        
                            firebase.database().ref('users/' + currUser.uid + '/ranking/').set({
                                points: points
                            });
                            
                        });
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
                
                }, counter * 100);
                
                counter++;
            });
        }
    });
}

function topFoods() {
    
    var ref = firebase.database().ref('users/' + currUser.uid + '/waste/foods');
    
    /* Our promise object */
    var foods = new Promise(function(resolve, reject) {
        
        ref.once("value").then(function(snapshot) {
            
            var topFoods = []; 
            
            topFoods[0] = ["None", 0];
            topFoods[1] = ["None", 0];
            topFoods[2] = ["None", 0];
            topFoods[3] = ["None", 0];
            topFoods[4] = ["None", 0];
            
            var count = 0; 
            
            snapshot.forEach(function(childSnapshot) {
                var fNo = 0; 
                var checked = false;

                topFoods.forEach(function(topFood){
                    if (!checked) {

                        if (topFood[1] < parseFloat(childSnapshot.val().qty)) {

                            for (var i = 4; i > fNo; i--) {
                                topFoods[i] = topFoods[i - 1];
                            }


                            topFoods[fNo] = [childSnapshot.key, parseFloat(childSnapshot.val().qty)];

                            checked = true; 
                        }
                    }
                    fNo++; 
                });
            });
            
            resolve([topFoods[0], topFoods[1], topFoods[2], topFoods[3], topFoods[4]]);
        }); 
    });

    return foods;
}
                               
function summoney(){
    
    var ref = firebase.database().ref('users/' + currUser.uid + '/waste');
    var total = new Promise(function(resolve, reject) {
        ref.once("value").then(function(snapshot) {
            var sum = 0;
            snapshot.forEach(function(childSnapshot) {
                if (!isNaN(parseFloat(childSnapshot.val().price))) {
                    
                    sum += (parseFloat(childSnapshot.val().price) * parseFloat(childSnapshot.val().qty));
                }
            });
            
            resolve(sum);
            
        }); 
    });
    
    return total;
    
}

function commRank() {
    
    var points = new Promise(function(resolve, reject) { 
     
        firebase.database().ref('users/' + currUser.uid + '/ranking').once("value").then(function(snapshot){
            if (snapshot.val() != null) {
                resolve(snapshot.val().points);
            } else { 
                resolve(null);
            }
        });
    });
        
        
    var totalUsers = new Promise(function(resolve, reject) { 
        var sum = 0;
        
        firebase.database().ref('users/').once("value").then(function(snapshot){
            snapshot.forEach(function(childSnapshot) {
                if (childSnapshot.val().ranking != null) {
                    sum++;
                }
            });
            
            resolve(sum);
        });
    });
    
   var position = new Promise(function(resolve, reject) { 
        points.then(function(points) {
            var pos = 1;
            firebase.database().ref('users/').once("value").then(function(snapshot){
                snapshot.forEach(function(childSnapshot) {
                    if (childSnapshot.val().ranking != null) {
                        if (childSnapshot.val().ranking.points < points) {
                            pos++;
                        }
                    }
                });
                
                if (points != null) {
                        resolve(pos);
                } else {
                    resolve(null);
                }
                
            });
        });
    });
    
    var weeks = getWeeks();
    
    var percentile = new Promise(function(resolve, reject) { 
        position.then(function(pos) {
            totalUsers.then(function(users) {
                weeks.then(function(weeks) {
                    if (pos > 0) {
                        if (weeks > 0) {
                            var percentile = pos * 100 / users;
                            resolve(Math.round(percentile));
                        } else {
                            resolve(0);
                        }
                    } else if (!isNaN(pos)) {
                        resolve(NaN);
                    } 
                })
            });
        });
    });
    
    return percentile;
    
}

function locationRank() {
    var location = new Promise(function(resolve, reject) { 
         firebase.database().ref('users/' + currUser.uid).once("value").then(function(snapshot){ 
             if (snapshot.val().location != null) {
                resolve(snapshot.val().location);
            }
         });
    });
    
    var points = new Promise(function(resolve, reject) { 
     
        firebase.database().ref('users/' + currUser.uid + '/ranking').once("value").then(function(snapshot){
            if (snapshot.val() != null) {
                resolve(snapshot.val().points);
            } else { 
                resolve(null);
            }
            
        });
    });
        
        
    var totalUsers = new Promise(function(resolve, reject) { 
        
        location.then(function(loc) {
            var sum = 0;
            
            firebase.database().ref('users/').once("value").then(function(snapshot){
                snapshot.forEach(function(childSnapshot) {
                        if (childSnapshot.val().location == loc) {
                            if (childSnapshot.val().ranking != null) {
                                sum++;
                            }
                        }
                    });
                resolve(sum);
            });
        });  
    });
    
    var position = new Promise(function(resolve, reject) { 
        
        var pos = 1;
        
        points.then(function(points) {
            location.then(function(loc) {
                firebase.database().ref('users/').once("value").then(function(snapshot){
                    snapshot.forEach(function(childSnapshot) {
                        if (childSnapshot.val().location == loc) {
                            if (childSnapshot.val().ranking != null) {
                                if (childSnapshot.val().ranking.points < points) {
                                    pos++;
                                }
                            }
                        }
                    });
                    
                    if (points != null) {
                        resolve(pos);
                    } else {
                        resolve(null);
                    }
                    
                });
            });
        });
    });
    
    var weeks = getWeeks();
    
    var percentile = new Promise(function(resolve, reject) { 
        position.then(function(pos) {
            totalUsers.then(function(users) {
                weeks.then(function(weeks) {
                    if (pos > 0) {
                        if (weeks > 0) {
                            var percentile = pos * 100 / users;
                            resolve(Math.round(percentile));
                        } else {
                            resolve(0);
                        }
                    } else if (!isNaN(pos)) {
                        resolve(NaN);
                    } 
                })
            });
        });
    });
    
    return percentile;
}

function genderRank() {
    var gender = checkGender();
    
    var points = new Promise(function(resolve, reject) { 
     
        firebase.database().ref('users/' + currUser.uid + '/ranking').once("value").then(function(snapshot){
            if (snapshot.val() != null) {
                resolve(snapshot.val().points);
            } else { 
                resolve(null);
            }
            
        });
    });
        
        
    var totalUsers = new Promise(function(resolve, reject) { 
        
        gender.then(function(gender) {
            var sum = 0;
            
            firebase.database().ref('users/').once("value").then(function(snapshot){
                snapshot.forEach(function(childSnapshot) {
                        if (childSnapshot.val().gender == gender) {
                            if (childSnapshot.val().ranking != null) {
                                sum++;
                            }
                        }
                    });
                resolve(sum);
            });
        });  
    });
    
    var position = new Promise(function(resolve, reject) { 
        
        var pos = 1;
        
        points.then(function(points) {
            gender.then(function(gender) {
                firebase.database().ref('users/').once("value").then(function(snapshot){
                    snapshot.forEach(function(childSnapshot) {
                        if (childSnapshot.val().gender == gender) {
                            if (childSnapshot.val().ranking != null) {
                                if (childSnapshot.val().ranking.points < points) {
                                    pos++;
                                }
                            }
                        }
                    });
                    
                    if (points != null) {
                        resolve(pos);
                    } else {
                        resolve(null);
                    }
                    
                });
            });
        });
    });
    
    var weeks = getWeeks();
    
    var percentile = new Promise(function(resolve, reject) { 
        position.then(function(pos) {
            totalUsers.then(function(users) {
                weeks.then(function(weeks) {
                    if (pos > 0) {
                        if (weeks > 0) {
                            var percentile = pos * 100 / users;
                            resolve(Math.round(percentile));
                        } else {
                            resolve(0);
                        }
                    } else if (!isNaN(pos)) {
                        resolve(NaN);
                    } 
                })
            });
        });
    });
    
    return percentile;
}

function getWeeks() {
    
    var weeks = new Promise(function(resolve, reject) { 
        var startDate = new Promise(function(resolve, reject) { 
            firebase.database().ref('users/' + currUser.uid).once("value").then(function(snapshot){ 
                resolve(snapshot.val().startDate);
            });
        });

        var date = getDate().split('-');

        var currDate = new Date(date[0], date[1]-1, date[2]);
        
        startDate.then(function(data) {
            data = data.split('-');

            var startDate = new Date(data[0], data[1]-1, data[2]);

            resolve(Math.floor((Date.parse(currDate)-Date.parse(startDate))/(604800000)));
        });
    });
    
    return weeks;
    
}

function setLocation(loc) {
    
    setTimeout(function() {
        firebase.database().ref('users/' + currUser.uid).update({
            location: loc
        });
        
    }, 500);
    
}

function getLocation() {
    var location = new Promise(function(resolve, reject) { 
         firebase.database().ref('users/' + currUser.uid).once("value").then(function(snapshot){ 
             if (snapshot.val().location != null) {
                resolve(snapshot.val().location);
            }
         });
    });
    
    return location;
}

function checkGender() {
    var gender = new Promise(function(resolve, reject) { 
         firebase.database().ref('users/' + currUser.uid).once("value").then(function(snapshot){ 
             if (snapshot.val().gender != null) {
                resolve(snapshot.val().gender);
            } else {
                resolve(null);
            }
         });
    });
    
    return gender;
}

function setGender() {
    if ($('#radFemale').is(':checked')) {
        firebase.database().ref('users/' + currUser.uid).update({
            gender: "Female"
        });
        location.reload(true);
    } else if ($('#radMale').is(':checked')) {
        firebase.database().ref('users/' + currUser.uid).update({
            gender: "Male"
        });
        location.reload(true);
    }
}