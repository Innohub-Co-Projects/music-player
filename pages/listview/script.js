import { fetchPlaylistDetails, fetchAlbumDetails } from "../../modules/api-requests.js";
import { addLikedSongID, fetchLikedSongs } from "../../modules/like-songs.js";
import { addLastPlayedSongObject, getLastPlayedSongs } from "../../modules/last-played.js";

// Show back button on page load
parent.showBackButton();

// creates a new element with given parameters
function newElement(type_str, attributes_obj, textContent = "") {
    let element = document.createElement(type_str);
    element.textContent = textContent;

    for (const [attr, value] of Object.entries(attributes_obj)) {
        element.setAttribute(attr, value);
    }
    return element;
}

// creates and returns an info container element for list items
function createInfoContainer(song_object) {
    let info_container = newElement("div", { class: "info" });

    let title_container = newElement("div", { class: "title_container" });
    let title = newElement("span", { id: "title" }, song_object.name);
    let artist = newElement("span", { id: "artist" }, song_object.primaryArtists);
    title_container.appendChild(title);
    title_container.appendChild(artist);
    info_container.appendChild(title_container);

    let album = newElement("span", { id: "album", "data-api-id": song_object.album.id }, song_object.album.name);
    let play_count = newElement("span", { id: "play_count" }, compactFormat(song_object.playCount));
    let duration = newElement("span", { id: "duration" }, formatDuration(song_object.duration));
    info_container.appendChild(album);
    info_container.appendChild(play_count);
    info_container.appendChild(duration);

    return info_container;
}

// creates and returns a new list item element from given song object
function createListItem(song_object, index) {
    let list_item = newElement("div", {class: "list_item", "data-api-id": song_object.id, "data-index": index,});

    let img = document.createElement("img");
    img.src = song_object.image[0].link;
    list_item.appendChild(img);

    let info_container = createInfoContainer(song_object);
    list_item.appendChild(info_container);

    let like_button = newElement("div", {class: "round_button", id: "like_button",});
    let heart_icon = newElement("i", { class: "bi bi-heart-fill" });
    like_button.appendChild(heart_icon);
    list_item.appendChild(like_button);

    return list_item;
}

// creates and appends a new list item
function addNewItemToList(song_object, index) {
    let li = createListItem(song_object, index);
    let list = document.querySelector(".list");
    list.appendChild(li);
}

function updateInfoPanel(img_src, title, subtitle) {
    let info_panel = document.querySelector(".info_panel");

    let img = info_panel.querySelector(".header_img");
    img.src = img_src;

    let title_element = info_panel.querySelector(".title");
    title_element.textContent = title;

    let subtitle_element = info_panel.querySelector(".subtitle");
    subtitle_element.innerHTML = subtitle;
}

function compactFormat(num) {
    let formatter = Intl.NumberFormat("en", { notation: "compact" });
    let count = formatter.format(num);
    return count;
}

function padNumber(num) {
    return String(num).padStart(2, "0");
}

function formatDuration(total_seconds) {
    let seconds = total_seconds % 60;
    let minutes = Math.floor((total_seconds % 3600) / 60);
    let hours = Math.floor(total_seconds / 3600);

    let result = [minutes, seconds];
    if (hours > 0) {
        result.unshift(hours);
    }

    result = result.map(padNumber);
    return result.join(":");
}

// the following functions generate/fetch content for the list via given arguments

// generate list from given api data
function generateListItems(api_data) {
    api_data.songs.forEach((song, index) => {
        addNewItemToList(song, index);
    });
}

var api_data = {};

async function generateFromPlaylistID(playlist_api_id) {
    let playlist_data = await fetchPlaylistDetails(playlist_api_id);
    api_data = playlist_data;

    let subtitle = `${playlist_data.songCount} Songs | ${compactFormat(playlist_data.followerCount)} followers <br>
                    By: ${playlist_data.firstname + playlist_data.lastname}`;

    updateInfoPanel(playlist_data.image[2].link, playlist_data.name, subtitle);

    generateListItems(api_data);
}

async function generateFromAlbumID(album_api_id) {
    let album_data = await fetchAlbumDetails(album_api_id);
    api_data = album_data;

    let subtitle = `${album_data.songCount} Songs <br>By: ${album_data.primaryArtists}`;

    updateInfoPanel(album_data.image[2].link, album_data.name, subtitle);

    generateListItems(api_data);
}

async function generateFromLikedSongs() {
    api_data.songs = await fetchLikedSongs();

    let heart_img_link = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Leucanthemum_vulgare.jpeg/512px-Leucanthemum_vulgare.jpeg";
    let title = "Liked Songs";
    let subtitle = `${api_data.songs.length} Songs <br>Saved by you <br>Click on the heart icons in a playlist to add more!`;

    updateInfoPanel(heart_img_link, title, subtitle);

    generateListItems(api_data);
}

async function generateFromLastPlayed() {
    api_data.songs = await getLastPlayedSongs();

    let img_link = "https://upload.wikimedia.org/wikipedia/commons/6/64/Boettadresslapp_Jean_Fredman.jpg";
    let title = "Last Played";
    let subtitle = `${api_data.songs.length} Songs <br>Played by you in this session`;

    updateInfoPanel(img_link, title, subtitle);

    generateListItems(api_data);
}

// functions that are allowed to be called from outside the iframe / globally
window.generateFromAlbumID = generateFromAlbumID;
window.generateFromPlaylistID = generateFromPlaylistID;
window.generateFromLikedSongs = generateFromLikedSongs;
window.generateFromLastPlayed = generateFromLastPlayed;

// setup list item event listeners:
// event delegation here allows you to add events to the list container instead of individual list items

let list = document.querySelector('.list')

// like button event listener using event delegation
list.addEventListener('click', (event) => {
    let like_button = event.target.closest('#like_button');
    if (!like_button) return;

    let list_item = like_button.closest('.list_item');
    let song_api_id = list_item.dataset.apiId;

    addLikedSongID(song_api_id);
    like_button.style.color = "#d00";
})

// album event listener using event delegation
list.addEventListener('click', (event) => {
    let album_element = event.target.closest('#album');
    if (!album_element) return;

    let album_id = album_element.dataset.apiId;
    parent.displayListView("album", album_id);
})

// list item play event listener using event delegation
list.addEventListener('click', (event) => {
    if (event.target.id == 'like_button' || event.target.id == '#album') return;

    let list_item = event.target.closest('.list_item');
    if (!list_item) return;

    let item_index = list_item.dataset.index;
        playSongByIndex(item_index);
})

var current_index = -1;

function playSongByIndex(list_item_index) {
    let song = api_data.songs[list_item_index];
    current_index = list_item_index;

    addLastPlayedSongObject(song);
    parent.playAudio(
        song.downloadUrl[2].link,
        song.name,
        song.primaryArtists,
        song.image[0].link
    );
}

function nextSong() {
    let next_index = (current_index + 1) % (api_data.songs.length);

    let song = api_data.songs[next_index];
    song.play = () => { playSongByIndex(next_index); }
    return song;
}

function previousSong() {
    let prev_index = current_index - 1;
    if (prev_index < 0) { prev_index = api_data.songs.length - 1; }

    let song = api_data.songs[prev_index];
    song.play = () => { playSongByIndex(prev_index); }
    return song;
}

window.nextSong = nextSong;
window.previousSong = previousSong;

//Round play button

let header_play_button = document.querySelector('.header_play_button');
header_play_button.addEventListener('click',function(){
    playSongByIndex(0)
},false);

// shuffle button stuff:

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function clearSongList() {
    let list = document.querySelector('.list');
    let list_header = list.firstElementChild;
    list.replaceChildren(list_header);
}

function shuffleSongList() {
    shuffleArray(api_data.songs);
    clearSongList();
    generateListItems(api_data)
}

let shuffle_button = document.querySelector('.header_shuffle_button');
shuffle_button.addEventListener('click', shuffleSongList);

