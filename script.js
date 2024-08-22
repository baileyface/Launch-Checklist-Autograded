// Write your JavaScript code here!

const { myFetch, pickPlanet, addDestinationInfo, formSubmission } = require("./scriptHelper");

window.addEventListener("load", function() {
    console.log('the page has loaded');

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    
    
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log("Planets fetched:", listedPlanets);
    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let selectedPlanet = pickPlanet(listedPlanets);
        addDestinationInfo(document, selectedPlanet.name, selectedPlanet.diameter, selectedPlanet.star, selectedPlanet.distance, selectedPlanet.moons, selectedPlanet.image);
       
    });

    let form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let pilot = document.querySelector("input[name=pilotName]").value;
        let copilot = document.querySelector("input[name=copilotName]").value;
        let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
        let cargoLevel = document.querySelector("input[name=cargoMass]").value;

        formSubmission(document, document.getElementById("faultyItems"), pilot, copilot, fuelLevel, cargoLevel);
    });
    
 });