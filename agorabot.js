console.log("zebi activé")
document.addEventListener("DOMContentLoaded", function () {


    let logo = document.createElement("div")
    logo.innerHTML = "Cheatcode activated"
    logo.setAttribute("style", "color: black;background: green;margin: 0.3em;padding: 0.3em;border-radius: 2em;")
    // document.querySelector(".centered-button").appendChild(logo)

    function filterData(details) {
        let filter = browser.webRequest.filterResponseData(details.requestId);
        let decoder = new TextDecoder("utf-8");
        let encoder = new TextEncoder();

        filter.ondata = event => {
            let str = decoder.decode(event.data, { stream: true });
            let body = JSON.parse(str)
            filter.write(encoder.encode(str))
            filter.disconnect()
            let newDiv = document.createElement("div")
            newDiv.innerHTML = "Question 1 = " + body.question_1.good_rep +
                "\nQuestion 2 = " + body.question_2.good_rep +
                "\nQuestion 3 = " + body.question_3.good_rep;
            newDiv.setAttribute("style", "background-color: #e8fde1;padding: 0.5em;margin: 0.2em;border-radius: 1em;")
            console.log("Question 1 = " + body.question_1.good_rep +
                "\nQuestion 2 = " + body.question_2.good_rep +
                "\nQuestion 3 = " + body.question_3.good_rep)
            // document.query("users-and-round")[0].appendChild(newDiv)
        }
    }

    browser.webRequest.onBeforeRequest.addListener(
        function logURL(details) {
            if ((details.method == "POST" && details.url.includes("new_round"))) {
                console.log("new_round")
                filterData(details)
            }
            if (details.method == "GET" && details.url.includes("get_last_round")) {
                console.log("get_last_round")
                filterData(details)
            }
            return {}
        },
        { urls: ["https://*.agora-quiz.education/*"] },
        ["blocking"]
    );
})

/*
"content_scripts": [
        {
            "matches": [
                "https://*.agora-quiz.education/*"
            ],
            "js": [
                "agorabot.js"
            ]
        }
    ]
}
*/