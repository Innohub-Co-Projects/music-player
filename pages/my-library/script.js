let music = parent.music;
let masterPlay = parent.document.getElementById('masterPlay');
let wave = parent.document.getElementsByClassName('wave')[0];

// create Array 

var songs = [
    {
        id:'1',
        songName:` On My Way <br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "./img/1.jpg"
    },
    {
        id:'2',
        songName:` Alan Walker-Fade <br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "./img/2.jpg"
    },
    // all object type 
    {
        id:"3",
        songName: `Cartoon - On & On <br><div class="subtitle"> Daniel Levi</div>`,
        poster: "./img/3.jpg",
    },
    {
        id:"4",
        songName: `Warriyo - Mortals <br><div class="subtitle">Mortals</div>`,
        poster: "./img/4.jpg",
    },
    {
        id:"5",
        songName: `Ertugrul Gazi <br><div class="subtitle">Ertugrul</div>`,
        poster: "./img/5.jpg",
    },
    {
        id:"6",
        songName: `Electronic Music <br><div class="subtitle">Electro</div>`,
        poster: "./img/6.jpg",
    },
    {
        id:"7",
        songName: `Agar Tum Sath Ho <br><div class="subtitle">Tamashaa</div>`,
        poster: "./img/7.jpg",
    },
    {
        id:"8",
        songName: `Suna Hai <br><div class="subtitle">Neha Kakker</div>`,
        poster: "./img/8.jpg",
    },
    {
        id:"9",
        songName: `Dilber <br><div class="subtitle">Satyameva Jayate</div>`,
        poster: "./img/9.jpg",
    },
    {
        id:"10",
        songName: `Duniya <br><div class="subtitle">Luka Chuppi</div>`,
        poster: "./img/10.jpg",
    },
    {
        id:"11",
        songName: `Lagdi Lahore Di <br><div class="subtitle">Street Dancer 3D</div>`,
        poster: "./img/11.jpg",
    },
    {
        id:"12",
        songName: `Putt Jatt Da <br><div class="subtitle">Putt Jatt Da</div>`,
        poster: "./img/12.jpg",
    },
    {
        id:"13",
        songName: `Baarishein <br><div class="subtitle">Atif Aslam</div>`,
        poster: "./img/13.jpg",
    },
    {
        id:"14",
        songName: `Vaaste <br><div class="subtitle">Dhvani Bhanushali</div>`,
        poster: "./img/14.jpg",
    },
    {
        id:"15",
        songName: `Lut Gaye <br><div class="subtitle">Jubin Nautiyal</div>`,
        poster: "./img/15.jpg",
    },
]

let all_songs = Array.from(parent.document.getElementsByClassName('songItem')).concat(Array.from(document.getElementsByClassName('songItem')))
let all_play_buttons = Array.from(parent.document.getElementsByClassName('playListPlay')).concat(Array.from(document.getElementsByClassName('playListPlay')))

Array.from(all_songs).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = i < 6 ? './pages/my-library/' + songs[i].poster : songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})

const makeAllPlays = () =>{
    all_play_buttons.forEach((element)=>{
            element.classList.add('bi-play-circle-fill');
            element.classList.remove('bi-pause-circle-fill');
    })
}
const makeAllBackgrounds = () =>{
    Array.from(all_songs).forEach((element)=>{
            element.style.background = "rgb(105, 105, 170, 0)";
    })
}

let index = 0;
let poster_master_play = parent.document.getElementById('poster_master_play');
let title = parent.document.getElementById('title');

all_play_buttons.forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        parent.index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `./pages/my-library/audio/${index}.mp3`;
        poster_master_play.src =`./pages/my-library/img/${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })

        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        music.addEventListener('ended',()=>{
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave.classList.remove('active2');
        })
        makeAllBackgrounds();
        Array.from(all_songs)[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
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