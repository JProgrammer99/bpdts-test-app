// require fetch so we can use it
const fetch = require("node-fetch");
const GeoPoint = require("geopoint");

var londonLat = 51.5074;
var londonLong = 0.1277;
// london coordinates 51.5074° N, 0.1277° W

// distance calculator using the GeoPoint package.
function distance(lat, lon) {
  try {
    var london = new GeoPoint(londonLat, londonLong);
    var userLoc = new GeoPoint(lat, lon);

    // returns the distance to the user from London in miles.
    return london.distanceTo(userLoc, false);
  } catch (e) {
    return;
  }

}

// get all users without filters for use later
module.exports.getAllUsers = async () => {
  // url to fetch all users
  var allUsersURL = "https://bpdts-test-app.herokuapp.com/users";

  let response = await fetch(allUsersURL);

  if (response.ok) { // if HTTP-status is 200-299

    // get the response body
    let json = await response.json();
    return json;

  } else {
    console.log("HTTP-Error: " + response.status);
  }

}

// fetch users within 50 miles of London.
module.exports.getUsersNearLondon = async () => {
  // url to fetch all users
  var users = await this.getAllUsers();

  var usersInLondon = [];
  users.forEach(async (user) => {
    if (distance(user.latitude, user.longitude) <= 50){
      usersInLondon.push(user);
    }
  });
  return usersInLondon;

}

// get users that addresses locate them in London
module.exports.getUsersInLondon = async () => {
  var url = "https://bpdts-test-app.herokuapp.com/city/London/users";

  let londonResponse = await fetch(url);

  if (londonResponse.ok) { // if HTTP-status is 200-299

    // get the response body
    let londonJson = await londonResponse.json();

    return londonJson;
  } else {
    console.log("HTTP-Error: " + londonResponse.status);
  }
}

// merge results to show users that either reside in London or were last located within 50 miles of London
module.exports.getUsersInOrNearLondon = async () => {
  // setup variables to merge
  var usersNearLondon = await this.getUsersNearLondon();
  var usersInLondon = await this.getUsersInLondon();

  // set variable for the end result
  var result = [];

  // push all the users that were within 50 miles of London into the result.
  usersNearLondon.forEach(async (user) => {
      result.push(user);
  });

  // Ensure no duplicates were found by comparing user ID to the users already in result[] then pushing users that are unique into the result.
  for (var i = 0; i < usersInLondon.length; i++) {
    var found = false;
    for (var j = 0; j < result.length; j++) {
      if (result[j].id == usersInLondon[i].id) {
        found = true;
        result[j].nodes = result[j].nodes.concat(usersInLondon[i].nodes);
        break;
      }
    }
    if (!found) {
      result.push(usersInLondon[i]);
    }
  }

  return result;
}
