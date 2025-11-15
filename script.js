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

// Element for "Christmas Truce"
const xmasOption = document.getElementById("xmasTruceOption");
xmasOption.style.display = "none";

// Element for "The Attack of the Dead Men"
const deadMenOption = document.getElementById("deadMenOption");
deadMenOption.style.display = "none";

// Element for "Fields of Verdun"
const verdunOption = document.getElementById("verdunOption");
verdunOption.style.display = "none";

// Element for "Primo Victoria"
const primoVictoriaOption = document.getElementById("primoVictoriaOption");
primoVictoriaOption.style.display = "none";

// Element for "White Death"
const whiteDeathOption = document.getElementById("whiteDeathOption");
whiteDeathOption.style.display = "none";

// Element for "To Hell and Back"
const hellAndBackOption = document.getElementById("hellAndBackOption");
hellAndBackOption.style.display = "none";

// Element for "I, Emperor"
const iEmperorOption = document.getElementById("iEmperorOption");
iEmperorOption.style.display = "none";


const songs = {
  "Ghost Division": {
    title: "Ghost Division",
    soundcloudUrl: "https://soundcloud.com/sabatonofficial/ghost-division",
    thumbnailID: "ICfzQVh3lvs"
  },
  "Fields of Verdun": {
    title: "Fields of Verdun",
    soundcloudUrl: "https://soundcloud.com/sabatonofficial/fields-of-verdun",
    thumbnailID: "yJDBmP9Mexk"
  },
  "Templars": {
    title:"Templars",
    soundcloudUrl: "https://soundcloud.com/sabatonofficial/templars",
    thumbnailID: "YL_APKnLtJo"
  },
  "To Hell and Back": {
    title:"To Hell and Back",
    soundcloudUrl: "https://soundcloud.com/sabatonofficial/to-hell-and-back",
    thumbnailID: "FBz7MX2bLcM"
  },
  "Metal Machine": {
    title:"Metal Machine",
    soundcloudUrl: "https://soundcloud.com/sabatonofficial/metal-machine",
    thumbnailID: "0l-cJ-206iQ"
  },
  "White Death":{
    title:"White Death",
    soundcloudUrl: "https://soundcloud.com/sabatonofficial/white-death",
    thumbnailID: "JRIfWazqIQ8"
  },
  "The Royal Guard": {
    title:"The Royal Guard",
    soundcloudUrl: "https://soundcloud.com/sabatonofficial/the-royal-guard",
    thumbnailID: "VXM3P8Rmy-U"
  },
  "Dreadnought":{
    title:"Dreadnought",
    soundcloudUrl: "https://soundcloud.com/sabatonofficial/dreadnought",
    thumbnailID: "RJK0jhymE5A"
  },
  "Bismarck":{
    title:"Bismarck",
    soundcloudUrl: "https://soundcloud.com/sabatonofficial/bismarck",
    thumbnailID: "EWKX3wass9s"
  },
  "Soldiers of Heaven":{
    title:"Soldiers of Heaven",
    soundcloudUrl: "https://soundcloud.com/sabatonofficial/soldier-of-heaven",
    thumbnailID: "7c_JYtOVOpE"
  },
  "Steel Commanders":{
    title:"Steel Commanders",
    soundcloudUrl: "https://soundcloud.com/sabatonofficial/steel-commanders",
    thumbnailID: "3QRkn_lxpec"
  },
  "Christmas Truce":{
    title:"Christmas Truce",
    soundcloudUrl: "https://soundcloud.com/sabatonofficial/christmas-truce",
    thumbnailID: "goXDAFtkJLw"
  },
  "The Attack of the Dead Men":{
    title:"The Attack of the Dead Men",
    soundcloudUrl: "https://soundcloud.com/sabatonofficial/the-attack-of-the-dead-men",
    thumbnailID: "-AFdwoyNT24"
  },
  "Primo Victoria":{
    title:"Primo Victoria",
    soundcloudUrl: "https://soundcloud.com/sabatonofficial/primo-victoria",
    thumbnailID: "KVxTJ9Xb9Ec"
  },
  "I, Emperor":{
    title:"I, Emperor",
    soundcloudUrl: "https://soundcloud.com/sabatonofficial/i-emperor",
    thumbnailID: "ZAaAT6UmJAU"
  },
  "Shadows":{
    title:"Shadows",
    soundcloudUrl: "https://soundcloud.com/sabatonofficial/shadows",
    thumbnailID: "IxPn5FvOBtw"
  },
  "The Duelist":{
    title:"The Duelist",
    soundcloudUrl: "https://soundcloud.com/sabatonofficial/the-duelist",
    thumbnailID: "6KUOX_VFVn0"
  }
};

let player;

// 9th August - The Attack of the Dead Men - https://www.warhistoryonline.com/war-articles/dead.html
specialDaysAppear(7, 9, deadMenOption, "The Attack of the Dead Men");

// 25 December - Christmas Truce (On Christmas Day) - https://www.iwm.org.uk/history/the-real-story-of-the-christmas-truce
specialDaysAppear(11, 25, xmasOption, "Christmas Truce");

// 6 June - Primo Victoria (D-Day/Normandy Landings) - https://www.bbc.com/news/world-48513108
specialDaysAppear(5, 6, primoVictoriaOption, "Primo Victoria");

// 20 June - To Hell and Back (Audie Murphy's Birthday) - https://www.audiemurphy.com/biography.htm
specialDaysAppear(5, 20, hellAndBackOption, "To Hell and Back");

// 17 December - White Death (Simo Häyhä's Birthday) - https://warfarehistorynetwork.com/article/finnish-sniper-simo-hayha/
specialDaysAppear(11, 17, whiteDeathOption, "White Death");

// 15 August - I, Emperor (Napoleon Bonaparte's Birthday) - https://www.history.com/articles/napoleon
specialDaysAppear(7, 15, iEmperorOption, "I, Emperor");

// 3 January - Shadows (JJR Tolkien) - https://www.britannica.com/biography/J-R-R-Tolkien
specialDaysAppear(0, 3, shadowOption, "Shadows");

// Feb 21 to Dec 18 - Fields of Verdun (Battle of Verdun) - https://www.britannica.com/event/Battle-of-Verdun
verdunAppears();

// create Date object for current location
function livetime() {
  let h2time = document.getElementById("h2time").value;
  let usedtime = new Date().toLocaleTimeString("en-NZ");
  h2time = usedtime;
  realtime.innerHTML = h2time;
}

function playSoundcloudAlarm() {
  // --- your existing UI state changes ---

  const playerContainer = document.getElementById("player");
  const song = songSelection.value;
  let meta = songs[song];

  if (!meta || !meta.soundcloudUrl) {
    console.warn("No SoundCloud URL for song, falling back to Ghost Division");
    meta = songs["Ghost Division"];
  }

  const embedUrl =
    `https://w.soundcloud.com/player/?url=${encodeURIComponent(meta.soundcloudUrl)}&auto_play=true&loop=true&show_teaser=false`;

  // Make sure container is visible
  playerContainer.style.display = "block";
  playerContainer.style.opacity = "1";
  playerContainer.style.visibility = "visible";
  playerContainer.style.zIndex = "9999";

  // Hide placeholder image under the player
  alarmPlaceholder.style.display = "none";

  // Inject SoundCloud iframe
  playerContainer.innerHTML = `
    <iframe
      width="560"
      height="315"
      scrolling="no"
      frameborder="no"
      allow="autoplay"
      autoplay="true"
      src="${embedUrl}">
    </iframe>`;

  // Your background / opacity changes can live here as before:
  if (phoneScreenSize.matches) {
    body.style.backgroundImage = "url('./media/setBackground.png')";
  } else {
    body.style.backgroundImage = "url('./media/SabatonColor.jpg')";
  }
  body.style.transition = "background-image 0.75s ease-in-out";

  // Re-enable all the visible bits (same as you had)
  btnsetalarm.style.color = "green";
  btnsetalarm.style.borderColor = "green";
  btnalarmcancel.style.color = "red";
  btnalarmcancel.style.borderColor = "red";

  selectedDateTime.style.opacity = "1";
  songSelection.style.opacity = "1";
  realtime.style.opacity = "1";

  Array.from(document.getElementsByTagName("h3")).forEach(h => h.style.opacity = "1");
  Array.from(document.getElementsByTagName("h4")).forEach(h => h.style.opacity = "1");
}


function stopAlarm() {
  const playerContainer = document.getElementById("player");

  // Remove the SoundCloud iframe
  playerContainer.innerHTML = "";
  playerContainer.style.display = "none";

  // Restore background and placeholder
  body.style.backgroundImage = "url('./media/SabatonGrey.jpg')";
  body.style.transition = "background-image 0.75s ease-in-out";

  alarmPlaceholder.style.display = "block";
  alarmPlaceholder.style.opacity = "1";
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

      timeout = setTimeout(() => playSoundcloudAlarm(), timesup);

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
      console.log(`Selected song: ${songs[key].title}, Video ID: ${songs[key].thumbnailID}`);
      alarmPlaceholder.src = `https://i.ytimg.com/vi/${songs[key].thumbnailID}/hq720.jpg`;
      alarmPlaceholder.alt = `${songs[key].title} Thumbnail`;
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
