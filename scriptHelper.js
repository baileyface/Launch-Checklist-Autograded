// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, image) {
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML =
        // Here is the HTML formatting for our mission target div.

        `<h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${image}">
                 `;
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }

}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields are required!");
        return;
    }

    if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        alert("Pilot and Co-Pilot names must be strings.");
        return;
    }

    if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Fuel level and Cargo mass must be numbers.");
        return;
    }


    list.style.visibility = "visible";
    document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch.`;
    document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch`;

    let launchStatus = document.getElementById("launchStatus");
    let readyForLaunch = true;


    if (fuelLevel < 10000) {
        document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
        readyForLaunch = false;
    } else {
        document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
    }

    if(cargoLevel > 10000) {
        document.getElementById("cargoStatus").innerHTML = "Cargo mass too heavy for launch";
        readyForLaunch = false;
    } else {
        document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
    }

    if(readyForLaunch) {
        launchStatus.innerHTML = "Shuttle is Ready for Launch";
        launchStatus.style.color = "green";
    } else {
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "red";
    }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;