const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById("play");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let progress = document.getElementById("progress");
let current_time = document.getElementById("current_time");
let music_duration = document.getElementById("duration");
const progress_div = document.getElementById("progress_div");

const songs = [{
    name: "music-1",
    title: "Highway"
},
{
    name: "music-2",
    title: "Love Charger"
},
{
    name: "music-3",
    title: "Saun Da Mahina"
}
];

let isPlaying = false;

// PLAY FUNCTIONALITY
const playMusic = () =>{
    isPlaying = true;
    music.play();
    play.classList.replace("fa-play", "fa-pause");
    play.title = 'Pause';
    img.classList.add('anime');
    setInterval(range_slider, 1000);
};

// PAUSE FUNCTIONALITY
const pauseMusic = () =>{
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause", "fa-play");
    play.title = 'Play';
    img.classList.remove('anime');
};

play.addEventListener('click', () => {
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
});

//  CHANGING THE MUSIC

const loadSong = (songs) => {
    title.textContent = songs.title;
    music.src = "music/" + songs.name + ".mp3";
};

let songIndex = 0;

const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

// progress js work

music.addEventListener('timeupdate', (event) => {
    
   
    const {currentTime, duration} = event.srcElement;
    // let progress_time = (currentTime / duration) * 100;
    // progress.style.width = `${progress_time}%`;

    // music duration update
    let minute_duration = Math.floor(duration / 60);
    let second_duration = Math.floor(duration % 60);
    let total_duration= `${minute_duration}:${second_duration}`;
    
    if(duration){
        music_duration.textContent = `${total_duration}`;
    }

    // current duration update
    let minute_currentTime = Math.floor(currentTime / 60);
    let second_currentTime = Math.floor(currentTime % 60);
    
    if(second_currentTime < 10){
        second_currentTime = "0" + second_currentTime;
    }
    
    let total_currentTime= `${minute_currentTime}:${second_currentTime}`;
    current_time.textContent = `${total_currentTime}`;
});

// progress onclick functionality
// progress_div.addEventListener('click', (event) => {
//     const {duration} = music;
//     // or const duration = music.duration;

//     let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;

//     music.currentTime = move_progress;
// });

progress.addEventListener('change', (event) => {
    let slider_position = music.duration * (progress.value / 100);
    music.currentTime = slider_position;
});

const range_slider = () =>{
    let position = 0;

    // update slider position
    if(!isNaN(music.duration)){
        position = music.currentTime * (100 / music.duration);
        progress.value = position;
    }
}

// after music ended
music.addEventListener("ended", nextSong);

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);
