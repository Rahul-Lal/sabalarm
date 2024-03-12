/*
    functions: myFunction(), onYouTubeIframeAPIReady(), onPlayerReady(event), onPlayerStateChange(event), stopVideo() credited to link below
    - Link: https://stackoverflow.com/questions/42711959/play-youtube-video-on-click
*/
// location.reload();
let ghostdivison = new Audio("sabaton-ghost-division-made-with-Voicemod.mp3");
let time = new Date().toLocaleTimeString("en-NZ");
let date = new Date().toLocaleString("en-NZ");
let realtime = document.getElementById("h2time");
setInterval(livetime, 1000);

// create Date object for current location
function livetime() {
    let h2time = document.getElementById("h2time").value;
    let usedtime = new Date().toLocaleTimeString("en-NZ");
    h2time = usedtime;
    realtime.innerHTML = h2time;
    // console.log(h2time);
}

function alarmset() {
    let wakeuptime = document.getElementById("date-time").value;
    console.log("The set time is " + wakeuptime);
    const now = new Date().toLocaleString("en-NZ");
    let polisheddate = date.replace(", ", " : ");
    const currentDateTime = now.toLocaleString();
    console.log("The actual time is " + currentDateTime);

    if (wakeuptime == currentDateTime) {
        alert("Wake Up!");
        ghostdivison.play();
    }
}