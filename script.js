/*
    functions: myFunction(), onYouTubeIframeAPIReady(), onPlayerReady(event), onPlayerStateChange(event), stopVideo() credited to link below
    - Link: https://stackoverflow.com/questions/42711959/play-youtube-video-on-click
*/

function alarmset() {
    let wakeuptime = document.getElementById("date-time").value;
    console.log("The set time is " + wakeuptime);

    const now = new Date();
    const currentDateTime = now.toLocaleString();
    console.log("The actual time is " + currentDateTime);

    if (wakeuptime == currentDateTime) {
        onPlayerReady()
    }
}