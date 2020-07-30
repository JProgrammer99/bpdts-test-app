// require fetch so we can use it
const fetch = require("node-fetch");

var londonLat = 51.5074;
var londonLong = 0.1277;
// london coordinates 51.5074° N, 0.1277° W

// distance calculator
function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

// url for all users based in "London" as determined by the API.
var url = "https://bpdts-test-app.herokuapp.com/city/London/users";

// url to fetch all users
var allUsersURL = "https://bpdts-test-app.herokuapp.com/users";

async function run(){
  let response = await fetch(allUsersURL);

  if (response.ok) { // if HTTP-status is 200-299

    // get the response body
    let json = await response.json();

    console.log("Users within 50 miles of London: ");
    for(var i = 0; i < json.length; i++){
        var distanceMiles = distance(londonLat, londonLong, json[i].latitude, json[i].longitude);
        if(distanceMiles <= 81){
          console.log("ID: " + json[i].id + ", First Name: " + json[i].first_name + ", Last Name: " + json[i].last_name + ", Email: " + json[i].email + ", IP: "
          + json[i].ip_address + ", Latitude: " + json[i].latitude + ", Longitude: " + json[i].longitude);
        }
    }

  } else {
    alert("HTTP-Error: " + response.status);
  }

  console.log("-----------------------------");
  console.log("Users within London: ");

  let londonResponse = await fetch(url);

  if (londonResponse.ok) { // if HTTP-status is 200-299

    // get the response body
    let londonJson = await londonResponse.json();
    for(var i = 0; i < londonJson.length; i++){
        console.log("ID: " + londonJson[i].id + ", First Name: " + londonJson[i].first_name + ", Last Name: " + londonJson[i].last_name + ", Email: " + londonJson[i].email + ", IP: "
        + londonJson[i].ip_address + ", Latitude: " + londonJson[i].latitude + ", Longitude: " + londonJson[i].longitude);
    }

  } else {
    alert("HTTP-Error: " + londonResponse.status);
  }

}


run();
