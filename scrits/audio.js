var audio = document.getElementById("myaudio");
var playButton = document.getElementById("playButton");
let countAudio = 0;

playButton.addEventListener("click", function() {
    if (countAudio === 0) {
        audio.play();
        console.log("Audio played");
        countAudio++;
        console.log(countAudio);
        document.getElementById("muter").src = "./assets/Sound1.png";
    } else {
        audio.pause();
        audio.currentTime = 0; // Reset the audio to the beginning
        console.log("Audio stopped");
        countAudio = 0;
        document.getElementById("muter").src = "./assets/Sound_Muter.png";
    }
});