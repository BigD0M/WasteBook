$(document).ready(function() {
   
    $('.rank').on('click', function() {
        
        var height = $(window).height() * .70;
        
        if ($('.rank').height() < height) {
            
            $("#communityRank").empty();
            $("#locationRank").empty();
            $("#genderRank").empty();

            var commRanking = commRank();
            
            commRanking.then(function(rank) {
                
                if (rank > 0) {
                    $("<img src='images/community.png' alt='community'>").appendTo("#communityRank");
                    $("<p class='header'>App Rank</p>").appendTo("#communityRank");
                    $("<p class='body'>You are in the Top " +
                      "<span class='ranking'>" + rank + "%</span>!</p>").appendTo("#communityRank");
                    $('<a href="https://twitter.com/share" class="twitter-share-button" id="twitter-comm" data-text="" data-url="https://wastebook-2e70b.firebaseapp.com/" >Tweet</a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>').appendTo("#communityRank");
                    
                    $("#twitter-comm").attr("data-text", "I'm in the top " + rank + "% in WasteBook!");
                } else if (rank == 0) {
                    $("<img src='images/community.png' alt='community'>").appendTo("#communityRank");
                    $("<p class='header'>App Rank</p>").appendTo("#communityRank");
                    $("<p class='body'>You must have been active for at least a week before you can receive a rank</p>").appendTo("#communityRank");
                } else if (isNaN(rank)) {
                    $("<img src='images/community.png' alt='community'>").appendTo("#communityRank");
                    $("<p class='header'>App Rank</p>").appendTo("#communityRank");
                    $("<p class='body'>You haven't wasted any food so there is no need to rank you.</p>").appendTo("#communityRank");
                }
            });

            var locationRanking = locationRank();
            
            var location = getLocation();

            locationRanking.then(function(rank) {
                if (rank > 0) {
                    location.then(function(loc) {
                        $("<img src='images/location.png' alt='location'>").appendTo("#locationRank");
                        $("<p class='header'>Location Rank</p>").appendTo("#locationRank");
                        $("<p class='body'>In " + loc + " you are in the top " +
                          "<span class='ranking'>" + rank + "%</span>!</p>").appendTo("#locationRank");
                        
                        $('<a href="https://twitter.com/share" class="twitter-share-button" id="twitter-loc" data-text="" data-url="https://wastebook-2e70b.firebaseapp.com/" >Tweet</a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>').appendTo("#locationRank");
                    
                        $("#twitter-loc").attr("data-text", "Among people in " + loc + ", I'm in the top " + rank + "% in WasteBook!");
                    });
                } else if (rank == 0) {
                    $("<img src='images/location.png' alt='location'>").appendTo("#locationRank");
                    $("<p class='header'>Location Rank</p>").appendTo("#locationRank");
                    $("<p class='body'>You must have been active for at least a week and must enable location to receive a rank on your location</p>").appendTo("#locationRank");
                } else if (isNaN(rank)) {
                    $("<img src='images/location.png' alt='location'>").appendTo("#locationRank");
                    $("<p class='header'>Location Rank</p>").appendTo("#locationRank");
                    $("<p class='body'>You haven't wasted any food so there is no need to rank you.</p>").appendTo("#locationRank");
                }
            });

            var gender = checkGender();

            gender.then(function(gender) {

                if (gender == null) {
                    $("<img src='images/gender.png' alt='gender'>").appendTo("#genderRank");
                    $("<p class='header'>Gender Rank</p>").appendTo("#genderRank");
                    $("<p class='body'>Please select your sex to receive this type of ranking:</p>").appendTo("#genderRank");
                    $('<label class="radio-inline"><input type="radio" id="radMale" name="gender" value="male">Male</label>'
                        + '<label class="radio-inline"><input type="radio" id="radFemale" name="gender" value="female">Female</label> <br>'
                        + '<input type="submit" id="genderSubmit" class="btn btn-success">'
                    ).appendTo("#genderRank");

                    $("#genderSubmit").click(function(){
                        setGender();
                    });
                    
                    

                } else {

                    var genderRanking = genderRank();
                    
                    var gender = checkGender();

                    genderRanking.then(function(rank) {
                        
                        if (rank > 0) {
                            gender.then(function(gender) {
                                $("<img src='images/gender.png' alt='gender'>").appendTo("#genderRank");
                                $("<p class='header'>Gender Rank</p>").appendTo("#genderRank");
                                $("<p class='body'>Among " + gender + "s, you are in the top " +
                                  "<span class='ranking'>" + rank + "%</span>!</p>").appendTo("#genderRank");
                                $('<a href="https://twitter.com/share" class="twitter-share-button" id="twitter-gen" data-text="" data-url="https://wastebook-2e70b.firebaseapp.com/" >Tweet</a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>').appendTo("#genderRank");
                    
                                $("#twitter-gen").attr("data-text", "I'm in the top " + rank + "% among " + gender + "s in WasteBook!");
                            });
                        } else if (rank == 0) {
                            $("<img src='images/gender.png' alt='gender'>").appendTo("#genderRank");
                            $("<p class='header'>Gender Rank</p>").appendTo("#genderRank");
                            $("<p class='body'>You must have been active for at least a week to receive a rank</hp>").appendTo("#genderRank");
                        } else if (isNaN(rank)) {
                            $("<img src='images/gender.png' alt='gender'>").appendTo("#genderRank");
                            $("<p class='header'>Gender Rank</p>").appendTo("#genderRank");
                            $("<p class='body'>You haven't wasted any food so there is no need to rank you.</hp>").appendTo("#genderRank");
                        }
                    });

                }

            });
            
        }
        
    });
    
});
