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

const phoneScreenSize = window.matchMedia("(max-width: 600px)");

const songSelection = document.getElementById("song-selection");

const xmasOption = document.getElementById("xmasTruceOption");
xmasOption.style.display = "none";
const deadMenOption = document.getElementById("deadMenOption");
deadMenOption.style.display = "none";
const verdunOption = document.getElementById("verdunOption");
verdunOption.style.display = "none";

let player;

deadMenAppears();
christmasTruceAppears();
verdunAppears();

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
  selectedDateTime.style.opacity = "1.0";
  songSelection.style.opacity = "1.0";
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
  } else if (songSelection.value === "White Death") {
    videoId = 'JRIfWazqIQ8';
  } else if (songSelection.value === "The Royal Guard") {
    videoId = 'VXM3P8Rmy-U';
  } else if (songSelection.value === "Dreadnought") {
    videoId = 'RJK0jhymE5A';
  } else if (songSelection.value === "Bismarck") {
    videoId = 'EWKX3wass9s';
  } else if (songSelection.value === "Soldiers of Heaven") {
    videoId = '7c_JYtOVOpE';
  } else if (songSelection.value === "Steel Commanders") {
    videoId = '3QRkn_lxpec';
  } else if (songSelection.value === "Christmas Truce") {
    videoId = 'goXDAFtkJLw';
  } else if (songSelection.value === "The Attack of the Dead Men") {
    videoId = '-AFdwoyNT24';
  } else if (songSelection.value === "Fields of Verdun") {
    videoId = 'yJDBmP9Mexk';
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

  selectedDateTime.disabled = true;
  selectedDateTime.style.opacity = "0.25";

  songSelection.disabled = true;
  songSelection.style.opacity = "0.25";


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


function thumbnailChange() {
  if (songSelection.value === "Ghost Division") {
    alarmPlaceholder.src = 'https://i.ytimg.com/vi/ICfzQVh3lvs/hq720.jpg';
    alarmPlaceholder.alt = 'Ghost Division Thumbnail';
    alarmPlaceholder.style.transition = "src 0.75s ease-in-out";
  } else if (songSelection.value === "Primo Victoria") {
    alarmPlaceholder.src = 'https://i.ytimg.com/vi/KVxTJ9Xb9Ec/hq720.jpg';
    alarmPlaceholder.alt = 'Primo Victoria Thumbnail';
  } else if (songSelection.value === "Templars") {
    alarmPlaceholder.src = 'https://i.ytimg.com/vi/YL_APKnLtJo/hq720.jpg';
    alarmPlaceholder.alt = 'Templars Thumbnail';
  } else if (songSelection.value === "To Hell and Back") {
    alarmPlaceholder.src = 'https://i.ytimg.com/vi/FBz7MX2bLcM/hq720.jpg';
    alarmPlaceholder.alt = 'To Hell and Back Thumbnail';
  } else if (songSelection.value === "White Death") {
    alarmPlaceholder.src = 'https://i.ytimg.com/vi/JRIfWazqIQ8/hq720.jpg';
    alarmPlaceholder.alt = 'White Death Thumbnail';
  } else if (songSelection.value === "The Royal Guard") {
    alarmPlaceholder.src = 'https://i.ytimg.com/vi/VXM3P8Rmy-U/hq720.jpg';
    alarmPlaceholder.alt = 'The Royal Guard Thumbnail';
  } else if (songSelection.value === "Bismarck") {
    alarmPlaceholder.src = 'https://i.ytimg.com/vi/EWKX3wass9s/hq720.jpg';
    alarmPlaceholder.alt = 'Bismarck Thumbnail';
  } else if (songSelection.value === "Dreadnought") {
    alarmPlaceholder.src = 'https://i.ytimg.com/vi/RJK0jhymE5A/hq720.jpg';
    alarmPlaceholder.alt = 'Dreadnought Thumbnail';
  } else if (songSelection.value === "Soldiers of Heaven") {
    alarmPlaceholder.src = 'https://i.ytimg.com/vi/7c_JYtOVOpE/hq720.jpg';
    alarmPlaceholder.alt = 'Soldiers of Heaven Thumbnail';
  } else if (songSelection.value === "Steel Commanders") {
    alarmPlaceholder.src = 'https://i.ytimg.com/vi/3QRkn_lxpec/hq720.jpg';
    alarmPlaceholder.alt = 'Steel Commanders Thumbnail';
  } else if (songSelection.value === "Christmas Truce") {
    alarmPlaceholder.src = 'https://i.ytimg.com/vi/goXDAFtkJLw/hq720.jpg';
    alarmPlaceholder.alt = 'Christmas Truce Thumbnail';
  } else if (songSelection.value === "The Attack of the Dead Men") {
    alarmPlaceholder.src = 'https://i.ytimg.com/vi/-AFdwoyNT24/maxresdefault.jpg';
    alarmPlaceholder.alt = 'The Attack of the Dead Men Thumbnail';
  } else if (songSelection.value === "Fields of Verdun") {
    alarmPlaceholder.src = 'https://i.ytimg.com/vi/yJDBmP9Mexk/hq720.jpg';
    alarmPlaceholder.alt = 'Fields of Verdun Thumbnail';
  }

}

function alarmcancel() {
  btnsetalarm.disabled = false;
  btnsetalarm.style.color = "green";
  btnsetalarm.style.borderColor = "green";

  btnalarmcancel.disabled = true;
  btnalarmcancel.style.color = "red";
  btnalarmcancel.style.borderColor = "red";

  selectedDateTime.disabled = false;
  selectedDateTime.style.opacity = "1.0";
  songSelection.disabled = false;
  songSelection.style.opacity = "1.0";

  selectedDateTime.value = "";
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

function christmasTruceAppears() {
  let dateNow = new Date();
  let day = dateNow.getDate();
  let month = dateNow.getMonth();
  console.log(month);


  if ((month === 11) && (day >= 23 || day <= 26)) {
    songSelection.value = "Christmas Truce";
    xmasOption.style.display = "block";
    xmasOption.disabled = false;
    thumbnailChange();
  }
  else {
    xmasOption.style.display = "none";
    xmasOption.disabled = true;
  }

}

function deadMenAppears() {
  let dateNow = new Date();
  let month = dateNow.getMonth();
  let day = dateNow.getDate();
  console.log(day);
  console.log(month);


  if (((month === 9) && (day === 31)) || ((month === 7) && (day === 9))) {
    songSelection.value = "The Attack of the Dead Men";
    deadMenOption.style.display = "block";
    deadMenOption.disabled = false;
    thumbnailChange();
  }
  else {
    deadMenOption.style.display = "none";
    deadMenOption.disabled = true;
  }

}

function verdunAppears() {
  let dateNow = new Date();
  let month = dateNow.getMonth();
  let day = dateNow.getDate();
  console.log(day);
  console.log(month);

  if(() || ()) {
    songSelection.value = "Fields of Verdun";
    verdunOption.style.display = "block";
    verdunOption.disabled = false;
    thumbnailChange();
  } else {
    verdunOption.style.display = "none";
    verdunOption.disabled = true;
  }
}
