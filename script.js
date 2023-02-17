import { addLanguage, removeLanguage, getLanguageArray } from "./modules/language.js";

// set correct height for mobile:
// otherwise navbar is initially hidden on mobile
function resetHeight() {
    document.body.style.height = window.innerHeight + "px";
}

window.addEventListener("resize", resetHeight);

// called to initially set the height.
resetHeight();

// Navigation functions:

let iframe = document.querySelector("iframe");

function frameNavigate(url) {
    iframe.src = url;
}

function navTo(destination) {
    frameNavigate("./pages/" + destination + "/" + destination + ".html");
}
window.navTo = navTo;

function setNavElementActive(nav_element) {
    document.querySelectorAll(".menu_item").forEach((menu_item) => {
        menu_item.classList.remove("active");
    });

    nav_element.classList.add("active");
}

function setSectionTitle(title) {
    let section_title = document.querySelector("#section_title");
    section_title.textContent = title;
}
window.setSectionTitle = setSectionTitle;

function showBackButton() {
    let back_button = document.createElement('div');
    back_button.className = 'back_button';
    back_button.addEventListener('click', () => { navTo('homepage'); });

    let icon = document.createElement('i');
    icon.className = 'bi bi-arrow-left-square';
    back_button.appendChild(icon);

    let section_title = document.querySelector("#section_title");
    section_title.replaceChildren(back_button);
}
window.showBackButton = showBackButton;

// set nav element as active and change title when click on a nav element
document.querySelectorAll(".menu_item").forEach((menu_item) => {
    menu_item.addEventListener("click", (e) => {
        setNavElementActive(e.target);
    });
});

// Player functions:
var music = new Audio();
let masterPlay = document.getElementById("masterPlay");
let wave = document.querySelector(".wave");

// set initial song
playAudio("./assets/rickroll.mp3", "Never Gonna Give You Up", "Rick Astley", "./assets/rickroll.jpg");

function playAudio(audio_src, audio_title, audio_subtitle, thumbnail_img) {
    music.src = audio_src;
    music.play();

    let title_element = document.getElementById("title");
    title_element.innerHTML = `${audio_title} <br> <div class="subtitle">${audio_subtitle}</div>`;

    let thumbnail = document.getElementById("poster_master_play");
    thumbnail.src = thumbnail_img;
}
window.playAudio = playAudio;

// change icon on play/pause
music.addEventListener("pause", () => {
    masterPlay.classList.add("bi-play-fill");
    masterPlay.classList.remove("bi-pause-fill");
    wave.classList.remove("active2");
});

music.addEventListener("play", () => {
    masterPlay.classList.remove("bi-play-fill");
    masterPlay.classList.add("bi-pause-fill");
    wave.classList.add("active2");
});

masterPlay.addEventListener("click", () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
    } else {
        music.pause();
    }
});

function formatDuration(duration) {
    let min = Math.floor(duration / 60);
    let sec = Math.floor(duration % 60);
    if (sec < 10) { sec = `0${sec}`; }
    return `${min}:${sec}`;
}

let currentStart = document.getElementById("currentStart");
let currentEnd = document.getElementById("currentEnd");
let seek = document.getElementById("seek");
let bar2 = document.getElementById("bar2");
let dot = document.getElementsByClassName("dot")[0];

music.addEventListener("timeupdate", () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    currentEnd.innerText = formatDuration(music_dur);

    currentStart.innerText = formatDuration(music_curr);

    let progressbar = parseInt((music.currentTime / music.duration) * 100);
    if (progressbar == NaN || music.duration == undefined) { progressbar = 0; }

    seek.value = progressbar;
    let seekbar = progressbar;
    bar2.style.width = `${progressbar}%`;
    dot.style.left = `${progressbar}%`;
});

music.addEventListener("loadstart", () => {
    let bar = document.querySelector(".bar");
    bar.classList.add("shimmer");

    seek.classList.add("hidden");
    bar2.classList.add("hidden");
    dot.classList.add("hidden");
    currentStart.classList.add("hidden");
    currentEnd.classList.add("hidden");
});

music.addEventListener("canplay", () => {
    let bar = document.querySelector(".bar");
    bar.classList.remove("shimmer");

    seek.classList.remove("hidden");
    bar2.classList.remove("hidden");
    dot.classList.remove("hidden");
    currentStart.classList.remove("hidden");
    currentEnd.classList.remove("hidden");
});

seek.addEventListener("change", () => {
    music.currentTime = (seek.value * music.duration) / 100;
});

vol.addEventListener("change", () => {
    let vol_icon = document.getElementById("vol_icon");
    let vol = document.getElementById("vol");
    if (vol.value == 0) {
        vol_icon.setAttribute('class', 'bi bi-volume-mute-fill');
    }
    if (vol.value > 0) {
        vol_icon.setAttribute('class', 'bi bi-volume-down-fill');
    }
    if (vol.value > 50) {
        vol_icon.setAttribute('class', 'bi bi-volume-up-fill');
    }

    let vol_dot = document.getElementById("vol_dot");
    let vol_bar = document.getElementsByClassName("vol_bar")[0];
    let vol_a = vol.value;
    vol_dot.style.left = `${vol_a}%`;
    vol_bar.style.width = `${vol_a}%`;
    music.volume = vol_a / 100;
});

let back = document.getElementById("back");
let next = document.getElementById("next");

back.addEventListener("click", () => {
    let iframe_functions = iframe.contentWindow;

    iframe_functions.previousSong().play();
});

next.addEventListener("click", () => {
    let iframe_functions = iframe.contentWindow;

    iframe_functions.nextSong().play();
});

// list view stuff:

function displayListView(type, api_id) {
    iframe.addEventListener("load", () => {
            let frame_functions = iframe.contentWindow;
            if (type == "playlist") {
                frame_functions.generateFromPlaylistID(api_id);
            } else if (type == "album") {
                frame_functions.generateFromAlbumID(api_id);
            } else {
                console.error("Invalid list view type: " + type);
            }
        },
        { once: true }
    );

    iframe.src = "./pages/listview/listview.html";
}
window.displayListView = displayListView;

function displayLikedSongs() {
    iframe.addEventListener("load", () => {
            iframe.contentWindow.generateFromLikedSongs();
        },
        { once: true }
    );

    iframe.src = "./pages/listview/listview.html";
}
window.displayLikedSongs = displayLikedSongs;

function searchFor(search_query) {
    iframe.addEventListener("load", () => {
            let iframe_functions = iframe.contentWindow;
            iframe_functions.generateSearch(search_query);
        },
        { once: true }
    );

    navTo("search");
}

function displayLastPlayed() {
    iframe.addEventListener("load", () => {
            iframe.contentWindow.generateFromLastPlayed();
        },
        { once: true }
    );

    iframe.src = "./pages/listview/listview.html";
}
window.displayLastPlayed = displayLastPlayed;

function searchSubmitEvent(event) {
    event.preventDefault();
    let text_input = event.target.querySelector('input[type="text"]');
    searchFor(text_input.value);
    text_input.value = "";
}
let form_element = document.querySelector("#search_form");
form_element.addEventListener("submit", searchSubmitEvent);

// language code:

function toggleLangDropup() {
    let dropups = document.querySelectorAll(".lang_dropup");

    dropups.forEach((dropup) => {
        if (dropup.dataset.state == "open") {
            dropup.dataset.state = "closed";
        } else {
            dropup.dataset.state = "open";
        }
    });
}

// toggle dropup when lang indicator is clicked
document.querySelector(".lang_indicator span").addEventListener("click", toggleLangDropup);

// set initially selected language
setSelectedLanguages(getLanguageArray());
updateLangIndicator();

// set active options in dropup menu
function setSelectedLanguages(lang_arr) {
    document.querySelectorAll(".lang_dropup span").forEach((lang_button) => {
        if (lang_arr.includes(lang_button.textContent)) {
            lang_button.dataset.state = "active";
        } else {
            lang_button.dataset.state = "inactive";
        }
    });
}

function updateLangIndicator() {
    let lang_indicator = document.querySelector(".lang_indicator span");
    let languages = getLanguageArray();
    if (languages.length == 0) {
        lang_indicator.textContent = "Lang: default";
    } else if (languages.length == 1) {
        lang_indicator.textContent = `Lang: ${languages[0]}`;
    } else {
        lang_indicator.textContent = "Lang: multi";
    }
}

// go to homepage to show changes
// and display select language in indicator element
function updateAfterLangChange() {
    navTo("homepage");

    updateLangIndicator();
}

// add or remove language after clicking on a language option
document.querySelectorAll(".lang_dropup span").forEach((lang_button) => {
    lang_button.addEventListener("click", () => {
        if (lang_button.dataset.state == "active") {
            lang_button.dataset.state = "inactive";
            removeLanguage(lang_button.textContent);
            updateAfterLangChange();
        } else {
            lang_button.dataset.state = "active";
            addLanguage(lang_button.textContent);
            updateAfterLangChange();
        }
    });
});

// nav bar dropup stuff:

let more_button = document.querySelector("#more_button");

more_button.addEventListener("click", () => {
    let dropup_container = document.querySelector(".nav_dropup_container");
    let nav_dropup = dropup_container.querySelector(".nav_dropup");

    if (nav_dropup.dataset.state == "active") {
        nav_dropup.dataset.state = "inactive";
    } else {
        nav_dropup.dataset.state = "active";
    }
});

// nav bar more options menu lang dropup stuff?

let lang_button = document.querySelector("#lang_select");

lang_button.addEventListener("click", toggleLangDropup);

// dropup close events:

// adds event listener for main document and iframe document
function addGlobalEventListener(event_type, callback, options) {
    document.addEventListener(event_type, callback, options);

    iframe.addEventListener("load", () => {
        iframe.contentWindow.addEventListener(event_type, callback, options);
    });
}

// closes dropups when user clicks outside the dropup | ignores clicks in parent container
function closeDropupOnOutsideClick(dropup_element, event) {
    let container = dropup_element.parentElement;

    if (container.contains(event.target)) { return; }

    dropup_element.dataset.state = "closed";
}

// add click and mobile touch events for dropups
document.querySelectorAll("#dropup").forEach((dropup) => {
    addGlobalEventListener("click", (event) => {
        closeDropupOnOutsideClick(dropup, event);
    });
    addGlobalEventListener("touchstart", (event) => {
        closeDropupOnOutsideClick(dropup, event);
    });
});

// Hotkey stuff

function toggleMusic() {
    if (music.paused || music.currentTime <= 0) {
        music.play();
    } else {
        music.pause();
    }
}

addGlobalEventListener("keydown", (e) => {
    // play / pause
    if (e.key == " " || e.key == "k") {
        toggleMusic();
    }
    // seek left
    else if (e.key == "j" || e.key == "ArrowLeft") {
        music.currentTime -= 5;
    }
    // seek right
    else if (e.key == "k" || e.key == "ArrowRight") {
        music.currentTime += 5;
    }
    // previous song
    else if (e.key == "," || e.key == "<") {
        back.click();
    }
    //next song
    else if (e.key == "." || e.key == ">") {
        next.click();
    }
});
