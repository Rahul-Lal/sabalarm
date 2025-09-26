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
let imptime = document.getElementById("date-time");
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
  // console.log(h2time);
}

// This function gets called by the YouTube IFrame API
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '315', // hidden initially
    width: '560',
    videoId: 'ICfzQVh3lvs', // Replace with the YouTube video ID
    playerVars: {
      autoplay: 1,
      loop: 1,
      controls: 0
    }
  });
}

function playYoutubeAlarm() {
  // Hide placeholder
  document.getElementById('alarm-placeholder').style.display = 'none';
  body.style.backgroundImage = "url('./Hellfest2017Sabaton_01.jpg')";

  // Show YouTube video
  document.getElementById('player').style.display = 'block';

  if (player) {
    player.playVideo();
    player.setSize(560, 315); // make it visible when alarm triggers
    player.loop(true);
  }

}

function stopAlarm() {
  if (player) {
    player.stopVideo();
    player.setSize(0, 0); // hide it again
  }
  body.style.backgroundImage = "url('./Hellfest2017Sabaton_01.jpg - Grey.jpg')";

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
      timeout = setTimeout(() => playYoutubeAlarm(), timesup);
      console.log(`Alarm Set on ${imptime.date()}, at ${imptime.toLocaleTimeString()}`);
      alert(`Alarm Set on ${imptime.date()}, at ${imptime.toLocaleTimeString()}`);
    }
  }
}

function alarmcancel() {
  btnalarmcancel.disabled = true;
  btnsetalarm.disabled = false;
  body.style.backgroundImage = "url('./Hellfest2017Sabaton_01 - Grey.jpg')";
  btnsetalarm.disabled = false;

  stopAlarm();

  if (timeout) {
    clearTimeout(timeout);
    alert("Alarm Cancelled!");
  }

  console.log("Cancelled!");
}