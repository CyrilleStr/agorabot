"use strict";
// let browser = chrome;

let logo = document.createElement("div")
logo.innerHTML = "On"
logo.setAttribute("style", "color: black;margin: 0.3em;padding: 0.3em;border-radius: 2em; margin-left:2em;")
document.querySelector(".centered-button").appendChild(logo)

let responses = [];
let autoclicker = true;
let stopInput = false;
let i = 0;
let run = false;
let k = 0;
var responseChoice, nextRoundQuitGame, chooseTheme, launchGame;
let found = false;

// Wait for the background-script to send responeses
browser.runtime.onMessage.addListener(request => {
    responses = [];
    responses = [request.rep1, request.rep2, request.rep3];
    console.log("Réponses :\n")
    console.log(request.rep1 + "\n" + request.rep2 + "\n" + request.rep3)
    let oldDiv = document.getElementById("agorabot-responses")
    if (oldDiv) oldDiv.remove();
    let newDiv = document.createElement("div")
    newDiv.innerHTML = "Question 1 = " + request.rep1 + "<br>" +
        "Question 2 = " + request.rep2 + "<br>" +
        "Question 3 = " + request.rep3 + "<br>";
    newDiv.setAttribute("style", "padding: 0.5em;margin: 1em;border-radius: 1em; max-width:400px;")
    newDiv.setAttribute("id", "agorabot-responses")
    document.getElementsByClassName("users-and-round")[0].appendChild(newDiv)
});

console.log("Agorabot activé")

/* Auto Clicker */

function sleep(ms) {
    return new Promise(() => setTimeout(null, ms));
}

var audio = new Audio('https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');

function playgame() {
    if (!run) {
        run = true;
        chooseTheme = setInterval(() => {
            console.log("debug")
            if (document.getElementsByClassName("themes-step").length > 0) { // Click on theme
                if (document.getElementsByClassName("themes-step")) {
                    document.getElementsByClassName("themes-step")[0].querySelector("button").click();
                    console.log("theme choisi");
                    i = 0;
                }
            }
        }, 1000);

        responseChoice = setInterval(() => {
                console.log("question");

                if (document.getElementsByClassName("responses-uncheck").length > 0) { // See 4 responses
                    console.log("4 réponses")
                    let elements = document.getElementsByClassName("responses-uncheck");
                    found = false;
                    for (k = 0; k < 4; k++) {
                        console.log("check réponse");
                        console.log(i)
                        if (elements[k].querySelector("span").querySelector("span").innerHTML == responses[i]) {
                            console.log("réponse trouvée");
                            elements[k].removeAttribute("disabled");
                            console.log(elements[k]);
                            sleep(Math.random() * 5000 + 3000);
                            elements[k].click(); // Click on good answer
                            i++;
                            found = true;
                            sleep(4000);
                        }
                    }
                    if (!found) {
                        console.log("Fail");
                        audio.play();
                    }
                }
            },
            2000);
        nextRoundQuitGame = setInterval(() => {
            if (document.getElementsByClassName("button-end-div").length > 0) {
                console.log("Next round or end Game")
                document.getElementsByClassName("button-end-div")[0].querySelector("button").click()
            }
        }, 1000);
    }
}

if (autoclicker) {
    console.log("Autoclicker on");

    launchGame = setInterval(() => {
        if (document.getElementsByClassName("success-div").length > 0) { // Continue game
            console.log("continuer une partie");
            document.getElementsByClassName("success-div")[0].click();
            playgame()
        } else if (document.getElementsByClassName("mat-focus-indicator primary-button mat-raised-button mat-button-base").length > 0) { // Launche new game
            if (document.getElementsByClassName("mat-focus-indicator primary-button mat-raised-button mat-button-base")[1].querySelector("span").innerHTML.includes("Partie Rapide")) {
                console.log("commencer une nouvelle partie");
                document.getElementsByClassName("mat-focus-indicator primary-button mat-raised-button mat-button-base")[1].click();
                playgame()
            }
        }
        if (!autoclicker) { // cannot reach autoclicker in webbrowser console
            clearInterval(launchGame);
            clearInterval(chooseTheme);
            clearInterval(responseChoice);
            clearInterval(nextRoundQuitGame)
        }
    }, 1000);
}