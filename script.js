// set correct height for mobile:
// otherwise navbar is initially hidden on mobile
function resetHeight(){
    document.body.style.height = window.innerHeight + "px";
}

window.addEventListener("resize", resetHeight);

// called to initially set the height.
resetHeight();

// Navigation functions:

let iframe = document.querySelector('iframe');

function frameNavigate(url) {
    iframe.src = url;
}

function navTo(destination) {
    frameNavigate('./pages/' + destination + '/' + destination + '.html')
}

function setNavElementActive(nav_element) {
    document.querySelectorAll('.menu_item').forEach(menu_item => {
        menu_item.classList.remove('active')
    })

    nav_element.classList.add('active')
}

function setSectionTitle(title) {
    let section_title = document.querySelector('#section_title');
    section_title.textContent = title;
}

// set nav element as active and change title when click on a nav element
document.querySelectorAll('.menu_item').forEach(menu_item => {
    menu_item.addEventListener('click', (e) => {
        setNavElementActive(e.target)
        setSectionTitle(e.target.textContent)
    })
})

// Player functions:

var music = new Audio('./vande.mp3');
let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

function playAudio(audio_src, audio_title, audio_subtitle, thumbnail_img) {
    music.src = audio_src;
    music.play();

    let title_element = document.getElementById('title');
    title_element.innerHTML = `${audio_title} <br> <div class="subtitle">${audio_subtitle}</div>`;

    let thumbnail = document.getElementById('poster_master_play');
    thumbnail.src = thumbnail_img;
}

// change icon on play/pause
music.addEventListener('pause', () => {
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');
})
music.addEventListener('play', () => {
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.add('active2');
})

masterPlay.addEventListener('click',()=>{
    if (music.paused || music.currentTime <=0) {
        music.play();
    } else {
        music.pause();
    }
} )

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if (sec<10) {
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if (sec1<10) {
        sec1 = `0${sec1}`
    }
    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration/100;
})

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;
})

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', ()=>{
    let iframe_functions = iframe.contentWindow

    iframe_functions.previousSong().play()
})

next.addEventListener('click', ()=>{
    let iframe_functions = iframe.contentWindow

    iframe_functions.nextSong().play()
})

// list view stuff:

function generateListOnLoad(e) {
    let frame_functions = iframe.contentWindow
    if (e.target.type == 'playlist') {
        frame_functions.generateFromPlaylistID(e.target.api_id);
    }
    else if (e.target.type == 'album') {
        frame_functions.generateFromAlbumID(e.target.api_id);
    }
    else {
        console.error('Invalid list view type: ' + e.target.type);
        return;
    }

    iframe.removeEventListener('load', generateListOnLoad)
    delete iframe.type
    delete iframe.api_id
}

function displayListView(type, api_id) {
    iframe.type = type;
    iframe.api_id = api_id;
    iframe.addEventListener('load', generateListOnLoad)

    iframe.src = './pages/listview/listview.html';
}

function generateLikedSongsOnLoad() {
    let iframe_functions = iframe.contentWindow
    iframe_functions.generateFromLikedSongs()

    iframe.removeEventListener('load', generateLikedSongsOnLoad)
}

function displayLikedSongs() {
    iframe.addEventListener('load', generateLikedSongsOnLoad)
    iframe.src = './pages/listview/listview.html'
}

// language code:

function toggleLangDropup() {
    let dropup = document.querySelector('.lang_dropup')

    if (dropup.dataset.state == 'open') {
        dropup.dataset.state = 'closed';
    }
    else {
        dropup.dataset.state = 'open';
    }
}

function closeDropupOnClick(event) {
    let lang_elements = document.querySelector('.lang_indicator')
    let dropup = document.querySelector('.lang_dropup')

    if (lang_elements.contains(event.target)) { return }

    dropup.dataset.state = 'closed'
}

// toggle dropup when lang indicator is clicked
document.querySelector('.lang_indicator span').addEventListener('click', toggleLangDropup)

// close dropup when clicked outside of dropup
document.addEventListener('click', closeDropupOnClick)
iframe.contentWindow.addEventListener('click', closeDropupOnClick)
