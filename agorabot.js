"use strict";

let logo = document.createElement("div")
logo.innerHTML = "Cheatcode activated"
logo.setAttribute("style", "color: black;background: green;margin: 0.3em;padding: 0.3em;border-radius: 2em; margin-left:2em;")
document.querySelector(".centered-button").appendChild(logo)

// Wait for the background-script to send responeses
browser.runtime.onMessage.addListener(request => {
    console.log("Réponses :")
    console.log(request.data)
    let newDiv = document.createElement("div")
    newDiv.innerHTML = request.data;
    newDiv.setAttribute("style", "background-color: #e8fde1;padding: 0.5em;margin: 0.2em;border-radius: 1em;")
    document.query("users-and-round")[0].appendChild(newDiv)
});
console.log("Agorabot activé")





