let image=document.querySelector("#image");
let range=document.querySelector("#range");
let title=document.querySelector("#tit");
let prev=document.querySelector("#prev");
let play=document.querySelector("#play");
let next=document.querySelector("#next");
const timeDisplay = document.getElementById('time-display');

let timer=0;
let auto_play=1;
let track=document.createElement('audio');
let index=0;
let play_song=false;
let all_song=[
    {
      name:"Hey Minnale.mp3",
      path:"Minnale.mp3",
      img:"Sivakarthikeyan.jpg",
    },
    {
      name:"Naa Gaali",
      path:"Naan-Gaali-Sean-Roldan.mp3",
      img:"goodnight.jpg",

    },
    {
      name:"Manasilaayo",
      path:"Manasilaayo.mp3",
      img:"vettaiyan.jpg",

    }];
    function load_song(index){
        clearInterval(timer);
        reset_silder();
        image.src=all_song[index].img;
        title.innerHTML=all_song[index].name;
        track.src=all_song[index].path;
        timer=setInterval(checkEndOfSong,1000);
        track.addEventListener('ended',next_song);
        playsong();
    }

    function just_play(){
        if(play_song==false){
            playsong();
        }
        else{
            pausesong();
        }
       }
    load_song(index);
    function reset_silder(){
        range.value=0;
    }
    function playsong(){
        track.play();
        play_song=true;
        play.innerHTML='<i class="fa fa-pause"></i>';
    }
    function pausesong(){
        track.pause();
        play_song=false;
        play.innerHTML='<i class="fa fa-play"></i>';
    }
    function checkEndOfSong() {
        if (track.currentTime >= track.duration && track.duration > 0) {
            next_song();
        }
    }
    function next_song(){
        if(index<all_song.length-1){
            index+=1;
            pausesong();
            load_song(index);
            playsong();
        }
        else{
            index=0;
            pausesong();
            load_song(index);
            playsong();
 
        }
       }
    function previous_song(){
        if(index>0){
            index-=1;
            pausesong();
            load_song(index);
            playsong();
        }
        else{
            index=all_song.length-1;
            pausesong();
            load_song(index);
            playsong();
 
        }
       }
       function change_duration(){
        slider_position=track.duration*(range.value/100);
        track.currentTime=slider_position;
       }

       track.addEventListener('timeupdate', () => {
        range.value = (track.currentTime / track.duration) * 100 || 0;
        const currentTime = formatTime(track.currentTime);
        const duration = formatTime(track.duration);
        timeDisplay.textContent = `${currentTime} / ${duration}`;
      });
      range.addEventListener('input', () => {
        track.currentTime = (range.value / 100) * track.duration;
      });
      function formatTime(time) {
        if (isNaN(time)) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
      }