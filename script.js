/*
    functions: myFunction(), onYouTubeIframeAPIReady(), onPlayerReady(event), onPlayerStateChange(event), stopVideo() credited to link below
    - Link: https://stackoverflow.com/questions/42711959/play-youtube-video-on-click
*/
// location.reload();
setInterval(livetime, 1000);
let ghostdivison = new Audio("sabaton-ghost-division-made-with-Voicemod.mp3");
ghostdivison.loop = true;

let date = new Date().toLocaleString("en-NZ");
let livehour = new Date().getHours();
let livemin = new Date().getMinutes();
let livesec = new Date().getSeconds();

let selectedHour = null;
let selectedMin = null;
let timeout = null;

let realtime = document.getElementById("h2time");
let imptime = document.getElementById("date-time");
let btnsetalarm = document.getElementById("alarmset");
let btnalarmcancel = document.getElementById("alarmcancel");
btnalarmcancel.disabled = true;
// let impHour = document.getElementById("hour");
// let impMin = document.getElementById("min");

// create Date object for current location
function livetime() {
    let h2time = document.getElementById("h2time").value;
    let usedtime = new Date().toLocaleTimeString("en-NZ");
    h2time = usedtime;
    realtime.innerHTML = h2time;
    // console.log(h2time);
}

function playalarm() {
    console.log("Wake Up!");
    console.log(ghostdivison.src);
    ghostdivison.play();
}

function timeset(t) {
    /*
    impHour = h;
    impMin = m;
    console.log("The selected time is " + impHour + ":" + impMin);
    */

    imptime = t;
    console.log("The selected time is " + imptime);
}

function alarmset() {
    // Ref: https://www.youtube.com/watch?v=R-bSb7xrS5s

    btnsetalarm.disabled = true;
    btnalarmcancel.disabled = false;

    if (imptime) {
        const rightFrigginNow = new Date();
        const alarmCountdown = new Date(imptime);

        if (alarmCountdown > rightFrigginNow) {
            const timesup = alarmCountdown.getTime() - rightFrigginNow.getTime();
            timeout = setTimeout(() => ghostdivison.play(), timesup);
            alert("Alarm Set!");
        }
    }
}

function alarmcancel() {
    btnalarmcancel.disabled = true;
    btnsetalarm.disabled = false;
    alarmset.disabled = true;

    ghostdivison.pause();

    if (timeout) {
        clearTimeout(timeout);
        alert("Alarm Cancelled!");
    }

    console.log("Cancelled!");
}