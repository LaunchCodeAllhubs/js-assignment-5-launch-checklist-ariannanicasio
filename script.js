// Write your JavaScript code here!
require("isomorphic-fetch");

window.addEventListener("load", function () {
  console.log("this works");
  let listedPlanets;
  let form = document.querySelector("form");

  const list = document.getElementById("faultyItems");
  list.style.visibility = "hidden";

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("THIS BUTTON WAS CLICKED");
    console.log(document.getElementsByName("pilotName")[0].value);
    let pilotName = document.getElementById("pilotName").value;
    let copilotName = document.getElementsByName("copilotName")[0].value;
    let fuelLevel = document.getElementsByName("fuelLevel")[0].value;
    let cargoMass = document.getElementsByName("cargoMass")[0].value;

    // alert if input isn't valid
    formSubmission(
      document,
      listedPlanets,
      pilotName,
      copilotName,
      fuelLevel,
      cargoMass
    );
  });

  // Set listedPlanetsResponse equal to the value returned by calling myFetch()
  let listedPlanetsResponse = myFetch();
  listedPlanetsResponse
    .then(function (result) {
      listedPlanets = result;
      console.log(listedPlanets);
    })
    .then(function () {
      console.log(listedPlanets);
      // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
      var planet = pickPlanet(listedPlanets);
      console.log(planet);
      addDestinationInfo(
        document,
        planet.name,
        planet.diameter,
        planet.star,
        planet.distance,
        planet.moons,
        planet.image
      );
    });
});
