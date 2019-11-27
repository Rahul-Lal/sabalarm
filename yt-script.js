let player;
let time_update_interval = 0;

alert('Prepare to be rolled');

let onYouTubeIframeAPIReady = function () {
    player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: 'dQw4w9WgXcQ',
        playerVars: {
            color: 'white',
            playlist: 'PLcesGjqMd8dOVUQ5D5SBMEjdXIBjry4Tu'
        },
        events: {
            onReady: initialize
        }
    });
}

let initialize = function () {

    // Update the controls on load
    updateTimerDisplay();
    updateProgressBar();

    // Clear any old interval.
    clearInterval(time_update_interval);

    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    time_update_interval = setInterval(function () {
        updateTimerDisplay();
        updateProgressBar();
    }, 1000)
}

// This function is called by initialize()
function updateTimerDisplay() {
    // Update current time text display.
    $('#current-time').text(formatTime(player.getCurrentTime()));
    $('#duration').text(formatTime(player.getDuration()));
}

function formatTime(time) {
    time = Math.round(time);
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}

// This function is called by initialize()
function updateProgressBar() {
    // Update the value of our progress bar accordingly.
    $('#progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);
}

$('#progress-bar').on('mouseup touchend', function (e) {

    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    var newTime = player.getDuration() * (e.target.value / 100);

    // Skip video to new time.
    player.seekTo(newTime);

});

$('#play').on('click', function () {
    player.playVideo();
});

$('#pause').on('click', function () {
    player.pauseVideo();
});

$('#mute-toggle').on('click', function () {
    var mute_toggle = $(this);

    if (player.isMuted()) {
        player.unMute();
        mute_toggle.text('volume_up');
    }
    else {
        player.mute();
        mute_toggle.text('volume_off');
    }
});

$('#volume-input').on('change', function () {
    player.setVolume($(this).val());
});

$('#speed').on('change', function () {
    player.setPlaybackRate($(this).val());
});

$('#quality').on('change', function () {
    player.setPlaybackQuality($(this).val());
});

$('#next').on('click', function () {
    player.nextVideo()
});

$('#prev').on('click', function () {
    player.previousVideo()
});

$('.thumbnail').on('click', function () {

    var url = $(this).attr('data-video-id');

    player.cueVideoById(url);

});
