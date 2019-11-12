alert('SLEEP...');

let alarmSound = new Audio();
alarmSound.src = './music/Aether.mp3';
let alarmTimer;

let setAlarm = function (button) {
    let setTime = document.getElementById("inpDateTime").valueAsNumber;

    if(isNaN(setTime)) {
        alert('INVALID!!!');
        return;
    }

    let alarm = new Date(setTime);
    let alarmTime = new Date(alarm.getUTCFullYear(), alarm.getUTCMonth(), alarm.getUTCDate(), alarm.getUTCHours(), alarm.getUTCMinutes(), alarm.getUTCSeconds());
    let differenceInSetAlarm = alarmTime.getTime() - (new Date()).getTime();

    if(differenceInSetAlarm < 0) {
        alarm('Specified time is already passed!');
        return;
    }

    alarmTimer =  setTimeout(initAlarm, differenceInSetAlarm);

    button.innerText = "Cancel Alarm";
    button.setAttribute('onclick', 'cancelAlarm(this);');
}

function cancelAlarm(button) {
    button.innerText = 'Set Alarm';
    button.setAttribute('onclick', 'setAlarm(this);');
    clearTimeout(alarmTimer);
}

let initAlarm = function () {
    alarmSound.play();
    document.getElementById("alarmOptions").style.display = '';
}

let stopAlarm = function () {
    alarmSound.pause();
    document.getElementById("alarmOptions").style.display = 'none';
    cancelAlarm(document.getElementById('btnAlarm'));
}

let snoozeAlarm = function () {
    stopAlarm();
    setTimeout(initAlarm, 36000);
}