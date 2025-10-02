/*
    functions: myFunction(), onYouTubeIframeAPIReady(), onPlayerReady(event), onPlayerStateChange(event), stopVideo() credited to link below
    - Link: https://stackoverflow.com/questions/42711959/play-youtube-video-on-click
*/
// location.reload();
setInterval(livetime, 1000);

let date = new Date().toLocaleString("en-NZ");
let livehour = new Date().getHours();
let livemin = new Date().getMinutes();
let livesec = new Date().getSeconds();

let selectedHour = null;
let selectedMin = null;
let timeout = null;

let realtime = document.getElementById("h2time");
let selectedDateTime = document.getElementById("date-time");
const inputDateTime = document.getElementById("date-time");
let btnsetalarm = document.getElementById("alarmset");
let btnalarmcancel = document.getElementById("alarmcancel");
let body = document.getElementById("body");
btnalarmcancel.disabled = true;
// let impHour = document.getElementById("hour");
// let impMin = document.getElementById("min");

let player;

// create Date object for current location
function livetime() {
  let h2time = document.getElementById("h2time").value;
  let usedtime = new Date().toLocaleTimeString("en-NZ");
  h2time = usedtime;
  realtime.innerHTML = h2time;
}

// This function gets called by the YouTube IFrame API
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '315', // hidden initially
    width: '560',
    videoId: 'ICfzQVh3lvs', // Replace with the YouTube video ID
    playerVars: {
      autoplay: 0,
      loop: 1,
      controls: 0,
      playlist: 'ICfzQVh3lvs' // Loop the same video
    }
  });
}

function playYoutubeAlarm() {
  // Hide placeholder
  document.getElementById('alarm-placeholder').style.display = 'none';
  body.style.backgroundImage = "url('./SabatonColor.jpg')";

  // Show YouTube video
  document.getElementById('player').style.display = 'block';

  if (player) {
    player.playVideo();
    player.setSize(560, 315); // make it visible when alarm triggers
  }

}

function stopAlarm() {
  if (player) {
    player.stopVideo();
    player.setSize(0, 0); // hide it again
  }
  body.style.backgroundImage = "url('./SabatonGrey.jpg')";

  document.getElementById('player').style.display = 'none';
  document.getElementById('alarm-placeholder').style.display = 'block';
}

// function playalarm() {
//     console.log("Wake Up!");
//     console.log(ghostdivison.src);
//     ghostdivison.play();
// }

function timeset(t) {
  /*
  impHour = h;
  impMin = m;
  console.log("The selected time is " + impHour + ":" + impMin);
  */

  selectedDateTime.value = t;
  console.log("The selected time is " + selectedDateTime.value);
}

function alarmset() {
  btnsetalarm.disabled = true;
  btnalarmcancel.disabled = false;

  if (selectedDateTime.value !== "") {
    const rightFrigginNow = new Date();
    const alarmCountdown = new Date(selectedDateTime.value);

    if (alarmCountdown > rightFrigginNow) {
      const timesup = alarmCountdown.getTime() - rightFrigginNow.getTime();

      timeout = setTimeout(() => playYoutubeAlarm(), timesup);

      console.log(`Alarm Set on ${alarmCountdown.toDateString()}, at ${alarmCountdown.toLocaleTimeString()}`);
      alert(`Alarm Set on ${alarmCountdown.toDateString()}, at ${alarmCountdown.toLocaleTimeString()}`);
    } else {
      alert("Please select a future time for the alarm.");
    }
  } else {
    alert("Please select a date and time.");
  }
}


function alarmcancel() {
  btnalarmcancel.disabled = true;
  btnsetalarm.disabled = false;
  body.style.backgroundImage = "url('./SabatonGrey.jpg')";
  btnsetalarm.disabled = false;
  inputDateTime.value = "";

  stopAlarm();

  if (timeout) {
    clearTimeout(timeout);
    alert("Alarm Cancelled!");
  }

  console.log("Cancelled!");
}