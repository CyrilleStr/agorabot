"use strict";

let logo = document.createElement("div")
logo.innerHTML = "Cheatcode activated"
logo.setAttribute("style", "color: black;background: green;margin: 0.3em;padding: 0.3em;border-radius: 2em; margin-left:2em;")
document.querySelector(".centered-button").appendChild(logo)

// Wait for the background-script to send responeses
browser.runtime.onMessage.addListener(request => {
    console.log("Réponses :")
    console.log(request.rep1 + request.rep2 + request.rep3)
    let newDiv = document.createElement("div")
    newDiv.innerHTML = "Question 1 = " + request.rep1 + "<br>" +
        "Question 2 = " + request.rep2 + "<br>" +
        "Question 3 = " + request.rep3 + "<br>";
    newDiv.setAttribute("style", "background-color: #e8fde1;padding: 0.5em;margin: 1em;border-radius: 1em;")
    document.getElementsByClassName("users-and-round")[0].appendChild(newDiv)
});
console.log("Agorabot activé")





