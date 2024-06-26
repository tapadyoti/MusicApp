import song from "./api/songs.json";
console.log(song)

const prev= document.querySelector(".prev");
const playPause= document.querySelector(".play");
const next= document.querySelector(".next");
const singerImg = document.querySelector(".singerImg")
const songName = document.querySelector(".songName");
const singerName = document.querySelector(".singerName");
const progress = document.querySelector(".progress");
const currTime = document.querySelector(".currTime");
const SongDur = document.querySelector(".SongDur");


const audio = document.querySelector(".audio");


playPause.addEventListener("click", ()=>{
if(audio.paused){
    playPause.classList.remove("fa-play");
    playPause.classList.add("fa-pause");
    audio.play();
}
else{
    playPause.classList.add("fa-play");
    audio.pause();
}
})

const getsongs = (song)=> {
    singerImg.src = song.img;
    songName.innerText = song.songName;
    singerName.innerText = song.singerName;
    audio.src = song.audio;
}
function formatTime(seconds){
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds= Math.floor(seconds % 60);
    return minutes + ":" + (remainingSeconds <10 ? "0" :"") + remainingSeconds;

}
audio.onloadedmetadata =  function(){
    progress.max = audio.duration;
    SongDur.innerText = formatTime(audio.duration);
}

audio.ontimeupdate = function() {
    progress.value = audio.currentTime;
    currTime.innerText = formatTime(audio.currentTime);
};
progress.addEventListener('input', function() {
    audio.currentTime = progress.value;
});


getsongs(song[0]);
let a = 0;

audio.onended = function(){
    getsongs(song[a+=1]);
    audio.play();
}
next.addEventListener("click", ()=>{
    getsongs(song[a+=1]); 
    playPause.classList.add("fa-pause");
    playPause.classList.remove("fa-play");
    audio.play();
})

prev.addEventListener("click", ()=>{
    getsongs(song[a-=1]);
    playPause.classList.add("fa-pause");
    playPause.classList.remove("fa-play");  
    audio.play();
})

