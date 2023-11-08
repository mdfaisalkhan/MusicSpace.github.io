console.log("Welcome to music space");
let songIndex = 0;
let audioElement = new Audio('song/2.mp3');
let masterPlay = document.getElementById('masterPlay');
let masterSongName1 = document.getElementById('masterSongName1');
let masterSongName2 = document.getElementById('masterSongName2');
let masterSongimg = document.getElementById('masterSongimg');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Eastside - Benny Blanco", filePath: "song/1.mp3", coverPath: "https://upload.wikimedia.org/wikipedia/en/2/21/Benny_Blanco%2C_Halsey_and_Khalid_Eastside.png" },

    {songName: "Mary on a cross - Ghost", filePath: "song/2.mp3", coverPath: "https://i1.sndcdn.com/artworks-yzAHJvu7dVtYkYyk-87uAdw-t500x500.jpg" },

    {songName: "Mockingbird - Eminem", filePath: "song/3.mp3", coverPath: "https://t2.genius.com/unsafe/425x425/https%3A%2F%2Fimages.genius.com%2F567e18e0b0c746a3d2da18680b7f37d8.1000x1000x1.jpg" },

    {songName: "Hurts So Good - Astrid S", filePath: "song/4.mp3", coverPath: "https://cdns-images.dzcdn.net/images/cover/a13c28f69f84a7140afa5fc6ccf4edc1/500x500.jpg" },

    {songName: "Infinity - Jaymes Young", filePath: "song/5.mp3", coverPath: "https://a10.gaanacdn.com/gn_img/albums/R7vKXr6Wmr/vKX6JZ40Wm/size_l.jpg" },

    {songName: "Let her go (sped + reverb)", filePath: "song/6.mp3", coverPath: "https://i1.sndcdn.com/artworks-000591951221-hro1uo-t500x500.jpg" },

    {songName: "Steal My Girl - One Direction", filePath: "song/7.mp3", coverPath: "https://images.genius.com/76b843a3ee3b58637e1fe23dcbc4cbd9.1000x1000x1.jpg" },

    {songName: "Dynasty - MIIA", filePath: "song/8.mp3", coverPath: "https://i.scdn.co/image/ab67616d0000b2730a7abca23518ad805027f82c" },

    {songName: "Treat you better", filePath: "song/10.mp3", coverPath: "https://m.media-amazon.com/images/M/MV5BOWU0MzBlYTUtNTQ0Yi00YWI3LWIxYTUtM2Q1ZjQwMjBmOGI5XkEyXkFqcGdeQXVyNDQ5MDYzMTk@._V1_.jpg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


// audioElement.play();

//Handle play/paus click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        makeAllPlays();
        gif.style.opacity = 0;
    }
})

// listen to events
audioElement.addEventListener('timeupdate', () => {
    //update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})
 
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})



const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {


        makeAllPlays();
        songIndex = parseInt(e.target.id)

        if (audioElement.paused || audioElement.currentTime <= 0) {
            
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `song/${songIndex + 1}.mp3`;
            audioElement.play();
            masterSongName1.innerText = songs[songIndex].songName;
            masterSongName2.innerText = songs[songIndex].songName;
            masterSongimg.src = songs[songIndex].coverPath;
            audioElement.currentTime = 0;
            gif.style.opacity = 1; 
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
    
        }
        else{
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }

      
        

    })
})


document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    updateAudioSourceAndPlay();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    updateAudioSourceAndPlay();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

function updateAudioSourceAndPlay() {
    audioElement.src = songs[songIndex].filePath;
    masterSongimg.src = songs[songIndex].coverPath;
    masterSongName1.innerText = songs[songIndex].songName;
    masterSongName2.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.add('fa-play-circle');
    masterPlay.classList.remove('fa-pause-circle');
}





// document.getElementById('next').addEventListener('click',()=>{
//     if(songIndex >= 9){
//         songIndex = 0;
//     }
//     else{
//         songIndex+=1;
//     }
//     // audioElement.src = `song/${songIndex + 1}.mp3`;
//     audioElement.src = songs[songIndex].filePath;
//      masterSongName.innerText = songs[songIndex].songName;
//     audioElement.currentTime = 0;
//     audioElement.play();
//     gif.style.opacity = 1;
//     masterPlay.classList.add(' fa-play-circle');
//     masterPlay.classList.remove(' fa-pause-circle');
    
    
// })
// document.getElementById('previous').addEventListener('click',()=>{
//     if(songIndex<=0){
//         songIndex = 0;

//     }
//     else{
//         songIndex-=1;

//     }
//     // audioElement.src = `song/${songIndex + 1}.mp3`;
//     audioElement.src = songs[songIndex].filePath;
//     masterSongName.innerText = songs[songIndex].songName;
//     audioElement.currentTime = 0;
//     audioElement.play();
//     gif.style.opacity = 1;
//     masterPlay.classList.add(' fa-play-circle');
//     masterPlay.classList.remove(' fa-pause-circle');
    
    
// })


