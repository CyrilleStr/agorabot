"use strict";

function onError(error) {
    console.error(`Error: ${error}`);
}

function filterData(details) {
    let filter = browser.webRequest.filterResponseData(details.requestId);
    let decoder = new TextDecoder("utf-8");
    let encoder = new TextEncoder();

    filter.ondata = event => {
        // Get reqeuest data and release the request
        let str = decoder.decode(event.data, { stream: true });
        let body = JSON.parse(str)
        filter.write(encoder.encode(str))
        filter.disconnect()
        // Send message to the content-script
        let msg = "Question 1 = " + body.question_1.good_rep +
            "\nQuestion 2 = " + body.question_2.good_rep +
            "\nQuestion 3 = " + body.question_3.good_rep;
        console.log(msg)
        browser.tabs.query({
            currentWindow: true,
            active: true
        }).then(function sendMessageToTabs(tabs) {
            browser.tabs.sendMessage(
                tabs[0].id,
                { data: msg }
            ).then(response => {
                console.log("Message from the content script:");
                console.log(response.response);
            }).catch(onError);
        }
        ).catch(onError)
    }
}

browser.webRequest.onBeforeRequest.addListener(
    function logURL(details) {
        console.log("Request listened")
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