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

var songs = [
    {
        id:'1',
        songName:"On My Way",
        subtitle:"Alan Walker",
        getPoster,
        getSrc
    },
    {
        id:'2',
        songName:"Alan Walker-Fade",
        subtitle:"Alan Walker",
        getPoster,
        getSrc
    },
    // all object type 
    {
        id:"3",
        songName: "Cartoon - On & On",
        subtitle:"Daniel Levi",
        getPoster,
        getSrc
    },
    {
        id:"4",
        songName: "Warriyo - Mortals",
        subtitle:"Mortals",
        getPoster,
        getSrc
    },
    {
        id:"5",
        songName: "Ertugrul Gazi",
        subtitle:"Ertugrul",
        getPoster,
        getSrc
    },
    {
        id:"6",
        songName: "Electronic Music",
        subtitle:"Electro",
        getPoster,
        getSrc
    },
    {
        id:"7",
        songName: "Agar Tum Sath Ho",
        subtitle:"Tamashaa",
        getPoster,
        getSrc
    },
    {
        id:"8",
        songName: "Suna Hai",
        subtitle:"Neha Kakker",
        getPoster,
        getSrc
    },
    {
        id:"9",
        songName: "Dilber",
        subtitle:"Satyameva Jayate",
        getPoster,
        getSrc
    },
    {
        id:"10",
        songName: "Duniya",
        subtitle:"Luka Chuppi",
        getPoster,
        getSrc
    },
    {
        id:"11",
        songName: "Lagdi Lahore Di",
        subtitle:"Street Dancer 3D",
        getPoster,
        getSrc
    },
    {
        id:"12",
        songName: "Putt Jatt Da",
        subtitle:"Putt Jatt Da",
        getPoster,
        getSrc
    },
    {
        id:"13",
        songName: "Baarishein",
        subtitle:"Atif Aslam",
        getPoster,
        getSrc
    },
    {
        id:"14",
        songName: "Vaaste",
        subtitle:"Dhvani Bhanushali",
        getPoster,
        getSrc
    },
    {
        id:"15",
        songName: "Lut Gaye",
        subtitle:"Jubin Nautiyal",
        getPoster,
        getSrc
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

let index = 0;
parent.index = 0;

play_button_elements.forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        parent.index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        makeAllBackgrounds();
        song_elements[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";

        let song = songs[index - 1]
        let song_thumbnail = "./pages/my-library/" + song.getPoster()
        parent.playAudio(song.getSrc(), song.songName, song.subtitle, song_thumbnail)
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