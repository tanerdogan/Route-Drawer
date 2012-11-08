/*
 * Most of code founded online and I just made little changes. ~tanerdogan
 */
var start_point;
var end_point;

var latlng;
var geocoder;
var map;

var line;

var distance;

function getNavGeoLocationFrom(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            function (position) {
                initialize(position.coords.latitude,position.coords.longitude);
            },

            function (error){
                switch(error.code){
                    case error.TIMEOUT:
                        alert ('Timeout');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert ('Position unavailable');
                        break;
                    case error.PERMISSION_DENIED:
                        alert ('Permission denied');
                        break;
                    case error.UNKNOWN_ERROR:
                        alert ('Unknown error');
                        break;
                }
            });
    }
}

// finds the coordinates for the two locations and calls the showMap() function
function initialize(l1a, l1b){
    start_point = new google.maps.LatLng(l1a, l1b);

    l2 = document.getElementById("final_point").value;
    l2a = l2.split(",");
    end_point = new google.maps.LatLng(l2a[0], l2a[1]);

    showMap();
}

// creates and shows the map
function showMap() {
    latlng = new google.maps.LatLng((start_point.lat()+end_point.lat())/2,(start_point.lng()+end_point.lng())/2);

    typeId = google.maps.MapTypeId.ROADMAP;

    // set map options
    var mapOptions =
    {
        zoom: 11,
        center: latlng,
        panControl: false,
        zoomControl: true,
        mapTypeId: typeId,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        scaleControl: false,
        mapTypeControl: false
    };

    // create a new map object
    // set the div id where it will be shown
    // set the map options
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    // custom marker
    var here = new google.maps.MarkerImage('start.png');
    var there = new google.maps.MarkerImage('end.png');

    // create the markers for the two locations
    var marker1 = new google.maps.Marker({
        map: map,
        position: start_point,
        title: "",
        icon: here,
        draggable: false
    });

    var marker2 = new google.maps.Marker({
        map: map,
        position: end_point,
        title: "",
        icon: there,
        draggable: false
    });



    // initialize directions service
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        suppressInfoWindows: true
    });

    directionsDisplay.setMap(map);
    drawRoutes(start_point, end_point);
}


function drawRoutes(start_point, end_point) {
    // hide last line
    if (line) {
        line.setMap(null);
    }

    // compute distance between the two points
    var R = 6371;
    var dLat = toRad(end_point.lat()-start_point.lat());
    var dLon = toRad(end_point.lng()-start_point.lng());

    var dLat1 = toRad(start_point.lat());
    var dLat2 = toRad(end_point.lat());

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(dLat1) * Math.cos(dLat1) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;


    // find and show route between the points
    var request = {
        origin:start_point,
        destination:end_point,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            console.log('error (ugh!): ' + status);
        }
    });
}

function toRad(deg) {
    return deg * Math.PI/180;
}

