//
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
const phoneScreenSize = window.matchMedia("(max-width: 600px)");

const songSelection = document.getElementById("song-selection");


// 25 December - Christmas Truce (On Christmas Day) - https://www.iwm.org.uk/history/the-real-story-of-the-christmas-truce
const xmasOption = document.getElementById("xmasTruceOption");
xmasOption.style.display = "none";
specialDaysAppear(11, 25, xmasOption, "Christmas Truce");

// 9th August - The Attack of the Dead Men - https://www.warhistoryonline.com/war-articles/dead.html
const deadMenOption = document.getElementById("deadMenOption");
deadMenOption.style.display = "none";
specialDaysAppear(7, 9, deadMenOption, "The Attack of the Dead Men");

// Feb 21 to Dec 18 - Fields of Verdun (Battle of Verdun) - https://www.britannica.com/event/Battle-of-Verdun
const verdunOption = document.getElementById("verdunOption");
verdunOption.style.display = "none";
verdunAppears();

// 6 June - Primo Victoria (D-Day/Normandy Landings) - https://www.bbc.com/news/world-48513108
const primoVictoriaOption = document.getElementById("primoVictoriaOption");
primoVictoriaOption.style.display = "none";
specialDaysAppear(5, 6, primoVictoriaOption, "Primo Victoria");

// 20 June - To Hell and Back (Audie Murphy's Birthday) - https://www.audiemurphy.com/
const hellAndBackOption = document.getElementById("hellAndBackOption");
hellAndBackOption.style.display = "none";
specialDaysAppear(5, 20, hellAndBackOption, "To Hell and Back");

// 17 December - White Death (Simo Häyhä's Birthday) - https://warfarehistorynetwork.com/article/finnish-sniper-simo-hayha/
const whiteDeathOption = document.getElementById("whiteDeathOption");
whiteDeathOption.style.display = "none";
specialDaysAppear(11, 17, whiteDeathOption, "White Death");

// 24 September - Shiroyama (Satsuma Rebellion) - https://www.britannica.com/event/Satsuma-Rebellion
const shiroyamaOption = document.getElementById("shiroyamaOption");
shiroyamaOption.style.display = "none";
specialDaysAppear(8, 24, shiroyamaOption, "Shiroyama");

// 5th May - The Unkillable Solder - (Sir Adrian Carton de Wiart's Birthday) - https://www.bbc.com/news/magazine-30685433
const unKillableOption = document.getElementById("unKillableOption");
unKillableOption.style.display = "none";
specialDaysAppear(4, 5, unKillableOption, "The Unkillable Soldier");



// { Songs name } : { Youtube ID }
const songs = {
  "Ghost Division": "ICfzQVh3lvs",
  "Primo Victoria": "KVxTJ9Xb9Ec",
  "Templars": "YL_APKnLtJo",
  "To Hell and Back": "FBz7MX2bLcM",
  "Metal Machine": "0l-cJ-206iQ",
  "White Death": "JRIfWazqIQ8",
  "The Royal Guard": "VXM3P8Rmy-U",
  "Dreadnought": "RJK0jhymE5A",
  "Bismarck": "EWKX3wass9s",
  "Soldiers of Heaven": "7c_JYtOVOpE",
  "Steel Commanders": "3QRkn_lxpec",
  "Christmas Truce": "goXDAFtkJLw",
  "The Attack of the Dead Men": "-AFdwoyNT24",
  "Fields of Verdun": "yJDBmP9Mexk",
  "Shiroyama": "Ylyqoxh-cXk",
  "The Unkillable Soldier": "usrFCZpRwGo"
};

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

  // For viewing app via mobile
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

  for (const [song, id] of Object.entries(songs)) {
    if (songSelection.value === song) {
      videoId = id;
      break;
    }
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
  Array.from(document.getElementsByTagName("label")).forEach(label => label.style.opacity = "0.25");


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
  for (let key in songs) {
    if (songSelection.value === key) {
      console.log(`Selected song: ${key}, Video ID: ${songs[key]}`);
      alarmPlaceholder.src = `https://i.ytimg.com/vi/${songs[key]}/hq720.jpg`;
      alarmPlaceholder.alt = `${key} Thumbnail`;
      alarmPlaceholder.style.transition = "src 0.75s ease-in-out";
    }
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
  Array.from(document.getElementsByTagName("label")).forEach(label => label.style.opacity = "1.0");
  alarmPlaceholder.style.opacity = "1.0";

  if (timeout) {
    clearTimeout(timeout);
    alert("Alarm Cancelled!");
  }

  console.log("Cancelled!");
}


// Function to handle special day appearances
function specialDaysAppear(certainMonth, certainDay, optionElement, songName) {
  let dateNow = new Date();
  let day = dateNow.getDate();
  let month = dateNow.getMonth();
  console.log(`month: ${month} / day: ${day}`);

  if ((month === certainMonth) && (day === certainDay)) {
    songSelection.value = songName;
    optionElement.style.display = "block";
    optionElement.disabled = false;
  } else {
    optionElement.style.display = "none";
    optionElement.disabled = true;
  }
}


// Function to handle Verdun appearance (Feb 21 - Dec 18), inclusive 
function verdunAppears() {
  let dateNow = new Date();
  let month = dateNow.getMonth(); // 0 = January
  let day = dateNow.getDate();

  console.log(`Day: ${day}`);
  console.log(`Month: ${month}`);

  // Verdun range: February 21 (month 1, day 21) to December 18 (month 11, day 18)
  // The days that the battle of Verdun took place
  const isAfterStart = (month > 1) || (month === 1 && day >= 21);
  const isBeforeEnd = (month < 11) || (month === 11 && day <= 18);

  if (isAfterStart && isBeforeEnd) {
    verdunOption.style.display = "block";
    verdunOption.disabled = false;
    thumbnailChange();
  } else {
    verdunOption.style.display = "none";
    verdunOption.disabled = true;
  }

}