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
let alarmPlaceholder = document.getElementById("alarm-placeholder");
btnalarmcancel.disabled = true;
// let impHour = document.getElementById("hour");
// let impMin = document.getElementById("min");

const songSelection = document.getElementById("song-selection");

const phoneScreenSize = window.matchMedia("(max-width: 600px)");

const songs = ['ICfzQVh3lvs', 'KVxTJ9Xb9Ec', 'YL_APKnLtJo']; // Example YouTube video IDs

let player;

// create Date object for current location
function livetime() {
  let h2time = document.getElementById("h2time").value;
  let usedtime = new Date().toLocaleTimeString("en-NZ");
  h2time = usedtime;
  realtime.innerHTML = h2time;
}
// This function gets called by the YouTube IFrame API
function createPlayer(videoId) {
  player = new YT.Player('player', {
    height: '315',
    width: '560',
    videoId: videoId,
    playerVars: {
      autoplay: 1,
      loop: 1,
      controls: 0,
      playlist: videoId
    }
  });
}


function playYoutubeAlarm() {
  // Hide placeholder
  alarmPlaceholder.style.display = "none";

  if (phoneScreenSize.matches) {
    body.style.backgroundImage = "url('./media/setBackground.png')";
  }
  else {
    body.style.backgroundImage = "url('./media/SabatonColor.jpg')";
  }
  body.style.transition = "background-image 0.75s ease-in-out";

  btnsetalarm.style.color = "green";
  btnsetalarm.style.borderColor = "green";
  btnalarmcancel.style.color = "red";
  btnalarmcancel.style.borderColor = "red";

  alarmPlaceholder.style.opacity = "1.0";

  realtime.style.opacity = "1.0";
  Array.from(document.getElementsByTagName("h3")).forEach(h3 => h3.style.opacity = "1.0");
  Array.from(document.getElementsByTagName("h4")).forEach(h4 => h4.style.opacity = "1.0");

  // Show YouTube video
  document.getElementById('player').style.display = 'block';
  let videoId;

  if (songSelection.value === "Ghost Division") {
    videoId = 'ICfzQVh3lvs';
  } else if (songSelection.value === "Primo Victoria") {
    videoId = 'KVxTJ9Xb9Ec';
  } else if (songSelection.value === "Templars") {
    videoId = 'YL_APKnLtJo';
  } else if (songSelection.value === "To Hell and Back") {
    videoId = 'FBz7MX2bLcM';
  } else if (songSelection.value === "Metal Machine") {
    videoId = 'RD0l-cJ-206iQ';
  } else if (songSelection.value === "The Royal Guard") {
    videoId = 'VXM3P8Rmy-U';
  } else if (songSelection.value === "Dreadnought") {
    videoId = 'RJK0jhymE5A';
  }

  if (player) {
    player.loadVideoById(videoId);
  } else {
    createPlayer(videoId);
  }

  player.playVideo();
}

function stopAlarm() {
  if (player) {
    player.stopVideo();
    player.setSize(0, 0); // hide it again
  }

  body.style.backgroundImage = "url('./media/SabatonGrey.jpg')";
  body.style.transition = "background-image 0.75s ease-in-out";
  alarmPlaceholder.style.opacity = "1.0";

  inputDateTime.disabled = false;

  // Hide YouTube video

  document.getElementById('player').style.display = 'none';
  alarmPlaceholder.style.display = 'block';
}

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
  btnsetalarm.style.color = "#9e9e9eff";
  btnsetalarm.style.borderColor = "#333333";

  btnalarmcancel.disabled = false;
  btnalarmcancel.style.color = "#9e9e9eff";
  btnalarmcancel.style.borderColor = "#333333";

  inputDateTime.disabled = true;

  if (phoneScreenSize.matches) {
    body.style.backgroundImage = "url('media/setBackground.png')";
  }
  else {
    body.style.backgroundImage = "url('media/SabatonDark.JPG')";
  }
  body.style.transition = "background-image 0.75s ease-in-out";
  realtime.style.opacity = "0.25";
  Array.from(document.getElementsByTagName("h3")).forEach(h3 => h3.style.opacity = "0.25");
  Array.from(document.getElementsByTagName("h4")).forEach(h4 => h4.style.opacity = "0.25");

  if (songSelection.value === "Ghost Division") {
    alarmPlaceholder.style.backgroundImage = "url('./media/GhostDivision.jpg')";
  } else if (songSelection.value === "Primo Victoria") {
    alarmPlaceholder.style.backgroundImage = "url('https://i.ytimg.com/vi/KVxTJ9Xb9Ec/maxresdefault.jpg')";
  } else if (songSelection.value === "Templars") {
    alarmPlaceholder.style.backgroundImage = "url('https://i.ytimg.com/vi/YL_APKnLtJo/hq720.jpg')";
  }

  alarmPlaceholder.style.opacity = "0.25";


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
  btnsetalarm.disabled = false;
  btnsetalarm.style.color = "green";
  btnsetalarm.style.borderColor = "green";

  btnalarmcancel.disabled = true;
  btnalarmcancel.style.color = "red";
  btnalarmcancel.style.borderColor = "red";
  inputDateTime.value = "";

  stopAlarm();

  if (phoneScreenSize.matches) {
    body.style.backgroundImage = "url('./media/alt-background.png')";
  } else {
    body.style.backgroundImage = "url('./media/SabatonGrey.jpg')";
  }
  body.style.transition = "background-image 0.75s ease-in-out";


  realtime.style.opacity = "1.0";
  Array.from(document.getElementsByTagName("h3")).forEach(h3 => h3.style.opacity = "1.0");
  Array.from(document.getElementsByTagName("h4")).forEach(h4 => h4.style.opacity = "1.0");

  if (timeout) {
    clearTimeout(timeout);
    alert("Alarm Cancelled!");
  }

  console.log("Cancelled!");

}

