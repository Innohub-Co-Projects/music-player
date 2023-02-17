// Set section header/title
parent.setSectionTitle("My Library");

// ids are very important for a song object
// they determine the img and audio src path for the song
class Song {
    constructor(id, title, subtitle) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
    }

    getSrc() {
        return `./pages/my-library/audio/${this.id}.mp3`;
    }

    getPoster() {
        return `./img/${this.id}.jpg`;
    }

    play() {
        let song_thumbnail = "./pages/my-library/" + this.getPoster();
        parent.playAudio(this.getSrc(), this.title, this.subtitle, song_thumbnail);
        current_song_id = this.id;
    }
}

// create Array
var songs = [
    new Song(1, "On My Way", "Alan Walker"),
    new Song(2, "Fade", "Alan Walker"),
    new Song(3, "Cartoon - On & On", "Daniel Levi"),
    new Song(4, "Warriyo - Mortals", "Mortals"),
    new Song(5, "Ertugrul Gazi", "Ertugrul"),
    new Song(6, "Electronic Music", "Electro"),
    new Song(7, "Agar Tum Sath Ho", "Tamashaa"),
    new Song(8, "Suna Hai", "Neha Kakker"),
    new Song(9, "Dilber", "Satyameva Jayate"),
    new Song(10, "Duniya", "Luka Chuppi"),
    new Song(11, "Lagdi Lahore Di", "Street Dancer 3D"),
    new Song(12, "Putt Jatt Da", "Putt Jatt Da"),
    new Song(13, "Baarishein", "Atif Aslam"),
    new Song(14, "Vaaste", "Dhvani Bhanushali"),
    new Song(15, "Lut Gaye", "Jubin Nautiyal"),
];

let song_elements = Array.from(document.getElementsByClassName("songItem"));
let play_button_elements = Array.from(document.getElementsByClassName("playListPlay"));

song_elements.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].getPoster();
    let title_text = `${songs[i].title} <br> <div class="subtitle">${songs[i].subtitle}</div>`;
    element.getElementsByTagName("h5")[0].innerHTML = title_text;
});

const makeAllPlays = () => {
    play_button_elements.forEach((element) => {
        element.classList.add("bi-play-circle-fill");
        element.classList.remove("bi-pause-circle-fill");
    });
};
const makeAllBackgrounds = () => {
    song_elements.forEach((element) => {
        element.style.background = "rgb(105, 105, 170, 0)";
    });
};

// active here just means that it has a pause icon instead of a play icon
function setSongElementActive(song_element) {
    makeAllPlays();
    let icon = song_element.querySelector("i");
    icon.classList.remove("bi-play-circle-fill");
    icon.classList.add("bi-pause-circle-fill");
    makeAllBackgrounds();
    song_element.style.background = "rgb(105, 105, 170, .1)";
}

function setSongElementActiveByID(song_id) {
    let element = song_elements[song_id - 1];
    setSongElementActive(element);
}

var current_song_id = 0;

function nextSong() {
    let next_index = current_song_id >= songs.length ? 0 : current_song_id;
    let song = songs[next_index];
    return song;
}

function previousSong() {
    let prev_index = current_song_id - 2 < 0 ? songs.length - 1 : current_song_id - 2;
    let song = songs[prev_index];
    return song;
}

play_button_elements.forEach((element) => {
    element.addEventListener("click", (e) => {
        let song_id = e.target.id;

        setSongElementActiveByID(song_id);

        let song = songs[song_id - 1];
        song.play();
    });
});

// adds event listeners for all scroll buttons on the library page
// assumes that the scrollable list is the second element of the parent container
let button_containers = document.querySelectorAll(".btn_s");
button_containers.forEach((button_container) => {
    let section_container = button_container.parentElement.parentElement;
    let list = section_container.children[1];

    let left_button = button_container.querySelector("#left_scroll");
    let right_button = button_container.querySelector("#right_scroll");

    left_button.addEventListener("click", () => {
        list.scrollLeft -= 330;
    });
    right_button.addEventListener("click", () => {
        list.scrollLeft += 330;
    });
});
