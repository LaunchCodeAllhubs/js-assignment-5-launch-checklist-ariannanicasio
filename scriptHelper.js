// Write your helper functions here!
require("isomorphic-fetch");

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  console.log("addDestination works");
  // Here is the HTML formatting for our mission target div.
  document.getElementById(
    "missionTarget"
  ).innerHTML = `<h2>Mission Destination</h2>
<ol>
    <li>Name:${name} </li>
    <li>Diameter: ${diameter}</li>
    <li>Star: ${star}</li>
    <li>Distance from Earth: ${distance} </li>
    <li>Number of Moons: ${moons}</li>
</ol>
<img src="${imageUrl}">`;
}
function validateInput(testInput) {
  if (typeof testInput === "string" && testInput !== "" && !Number(testInput)) {
    console.log(testInput);
    return "Not a Number";
  } else if (Number(testInput)) {
    return "Is a Number";
  } else if (testInput === "" || isNaN(testInput) || testInput === undefined) {
    return "Empty";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  console.log(validateInput(pilot));
  if (
    validateInput(pilot) !== "Not a Number" &&
    validateInput(copilot) !== "Not a Number" &&
    validateInput(fuelLevel) !== "Is a Number" &&
    validateInput(cargoLevel) !== "Is a Number"
  ) {
    return "invalid input";
  } else if (
    validateInput(pilot) === "Empty" &&
    validateInput(copilot) === "Empty" &&
    validateInput(fuelLevel) === "Empty" &&
    validateInput(cargoLevel) === "Empty"
  ) {
    return "field is empty";
  }

  //   'Fuel level high enough for launch' to equal 'Fuel level too low for launch'

  //   Expected 'Fuel level too low for launch' to equal 'Fuel level high enough for launch'.

  document.getElementById(
    "pilotStatus"
  ).innerHTML = `Pilot ${pilot} is ready for launch`;
  document.getElementById(
    "copilotStatus"
  ).innerHTML = `Co-pilot ${copilot} is ready for launch`;
  console.log(fuelLevel);
  if (fuelLevel < 10000) {
    list.style.visibility = "visible";
    document.getElementById("fuelStatus").innerHTML =
      "Fuel level too low for launch";
    document.getElementById("launchStatus").innerHTML =
      "Shuttle Not Ready for Launch";
    document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)";
  }

  if (cargoLevel > 10000) {
    list.style.visibility = "visible";
    document.getElementById("cargoStatus").innerHTML =
      "Cargo mass too heavy for launch";
    document.getElementById("launchStatus").innerHTML =
      "Shuttle Not Ready for Launch";
    document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)";
  }

  if (fuelLevel >= 10000) {
    document.getElementById("fuelStatus").innerHTML =
      "Fuel level high enough for launch";
  }

  if (cargoLevel < 10000) {
    document.getElementById("cargoStatus").innerHTML =
      "Cargo mass low enough for launch";
  }

  if (cargoLevel < 10000 && fuelLevel >= 10000) {
    document.getElementById("launchStatus").innerHTML =
      "Shuttle is Ready for Launch";
    document.getElementById("launchStatus").style.color = "#419F6A";
  }

  return;
}

async function myFetch() {
  let planetsReturned;

  planetsReturned = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  ).then(function (response) {
    return response.json();
  });

  return planetsReturned;
}

function pickPlanet(planets) {
  console.log("planets", planets);
  return planets[0];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
