let music = parent.music;
let masterPlay = parent.document.getElementById('masterPlay');
let wave = parent.document.getElementsByClassName('wave')[0];

// create Array 

function getSrc() {
    return `./pages/my-library/audio/${this.id}.mp3`
}

function getPoster() {
    return `./img/${this.id}.jpg`
}

function play() {
    let song_thumbnail = "./pages/my-library/" + this.getPoster()
    parent.playAudio(this.getSrc(), this.songName, this.subtitle, song_thumbnail)
    index = this.id;
}

var songs = [
    {
        id:'1',
        songName:"On My Way",
        subtitle:"Alan Walker",
        getPoster,
        getSrc,
        play
    },
    {
        id:'2',
        songName:"Alan Walker-Fade",
        subtitle:"Alan Walker",
        getPoster,
        getSrc,
        play
    },
    // all object type 
    {
        id:"3",
        songName: "Cartoon - On & On",
        subtitle:"Daniel Levi",
        getPoster,
        getSrc,
        play
    },
    {
        id:"4",
        songName: "Warriyo - Mortals",
        subtitle:"Mortals",
        getPoster,
        getSrc,
        play
    },
    {
        id:"5",
        songName: "Ertugrul Gazi",
        subtitle:"Ertugrul",
        getPoster,
        getSrc,
        play
    },
    {
        id:"6",
        songName: "Electronic Music",
        subtitle:"Electro",
        getPoster,
        getSrc,
        play
    },
    {
        id:"7",
        songName: "Agar Tum Sath Ho",
        subtitle:"Tamashaa",
        getPoster,
        getSrc,
        play
    },
    {
        id:"8",
        songName: "Suna Hai",
        subtitle:"Neha Kakker",
        getPoster,
        getSrc,
        play
    },
    {
        id:"9",
        songName: "Dilber",
        subtitle:"Satyameva Jayate",
        getPoster,
        getSrc,
        play
    },
    {
        id:"10",
        songName: "Duniya",
        subtitle:"Luka Chuppi",
        getPoster,
        getSrc,
        play
    },
    {
        id:"11",
        songName: "Lagdi Lahore Di",
        subtitle:"Street Dancer 3D",
        getPoster,
        getSrc,
        play
    },
    {
        id:"12",
        songName: "Putt Jatt Da",
        subtitle:"Putt Jatt Da",
        getPoster,
        getSrc,
        play
    },
    {
        id:"13",
        songName: "Baarishein",
        subtitle:"Atif Aslam",
        getPoster,
        getSrc,
        play
    },
    {
        id:"14",
        songName: "Vaaste",
        subtitle:"Dhvani Bhanushali",
        getPoster,
        getSrc,
        play
    },
    {
        id:"15",
        songName: "Lut Gaye",
        subtitle:"Jubin Nautiyal",
        getPoster,
        getSrc,
        play
    },
]

let song_elements = Array.from(document.getElementsByClassName('songItem'))
let play_button_elements = Array.from(document.getElementsByClassName('playListPlay'))

song_elements.forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].getPoster();
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})

const makeAllPlays = () =>{
    play_button_elements.forEach((element)=>{
            element.classList.add('bi-play-circle-fill');
            element.classList.remove('bi-pause-circle-fill');
    })
}
const makeAllBackgrounds = () =>{
    song_elements.forEach((element)=>{
            element.style.background = "rgb(105, 105, 170, 0)";
    })
}

// active here just means that it has a pause icon instead of a play icon
function setSongElementActive(song_element) {
    makeAllPlays();
    let icon = song_element.querySelector('i')
    icon.classList.remove('bi-play-circle-fill');
    icon.classList.add('bi-pause-circle-fill');
    makeAllBackgrounds();
    song_element.style.background = "rgb(105, 105, 170, .1)";
}

function setSongElementActiveByID(song_id) {
    let element = song_elements[song_id - 1]
    setSongElementActive(element)
}

var index = 0;

function nextSong() {
    let next_index = index >= songs.length ? 0 : index;
    let song = songs[next_index]
    return song;
}

function previousSong() {
    let prev_index = index - 2 < 0 ? songs.length - 1 : index - 2
    let song = songs[prev_index]
    return song;
}

play_button_elements.forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        let song_id = e.target.id;

        setSongElementActiveByID(song_id)

        let song = songs[song_id - 1]
        song.play()
    })
})

let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft -= 330;
})
right_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft += 330;
})


let left_scrolls = document.getElementById('left_scrolls');
let right_scrolls = document.getElementById('right_scrolls');
let item = document.getElementsByClassName('item')[0];

left_scrolls.addEventListener('click', ()=>{
    item.scrollLeft -= 330;
})
right_scrolls.addEventListener('click', ()=>{
    item.scrollLeft += 330;
})