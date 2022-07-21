import fetch from "node-fetch";

const ITERATION_COUNT = 1000;

const BASE_URL = "http://localhost:8000";
const POLLS_URL = BASE_URL + "/polls/";
const NOT_FOUND_URL = BASE_URL + "/notfound/";

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

async function sendNotFoundRequest() {
    const response = await fetch(NOT_FOUND_URL);
    if (response.status !== 404) {
        throw new Error("expected 404 status");
    }
    console.log("404 status");
}

async function sendPollsRequest() {
    const response = await fetch(POLLS_URL);
    console.log(await response.text());
}

async function send500Request() {
    const response = await fetch(POLLS_URL + "?force500");
    if (response.status !== 500) {
        throw new Error("expected 500 status");
    }
    console.log("500 status");
}


function isRandomEvent(range) {
    return randomIntFromInterval(1, range) === 1
}

for (let i = 0; i < ITERATION_COUNT; ++i) {
    if (isRandomEvent(10)) {
        await sendNotFoundRequest();
    } else if (isRandomEvent(15)) {
        await send500Request();
    } else {
        await sendPollsRequest();
        await sleep(randomIntFromInterval(100, 500));    
    }
}
