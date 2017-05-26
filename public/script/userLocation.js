window.onload = function() {
      var startPos;
      var geoSuccess = function(position) {
        startPos = position;
        var x = startPos.coords.latitude;
        var y = startPos.coords.longitude;

        sendLocation(x,y);
      };

      navigator.geolocation.getCurrentPosition(geoSuccess);
}; 


function sendLocation(latitude,longitude){
    var request = new XMLHttpRequest();

    var method = 'GET';
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
    var async = true;

    request.open(method, url, async);
    request.onreadystatechange = function(){
      if(request.readyState == 4 && request.status == 200){
        var data = JSON.parse(request.responseText);
        var address = data.results[0];
        setLocation(address.address_components[4].long_name);
      }
    };
    request.send();
};