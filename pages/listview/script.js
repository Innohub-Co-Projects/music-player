// creates a new element with given parameters
function newElement(type_str, attributes_obj, textContent = '') {
    let element = document.createElement(type_str);
    element.textContent = textContent;

    for (const [attr, value] of Object.entries(attributes_obj)) {
        element.setAttribute(attr, value);
    }
    return element;
}

// this function is pretty big since it has to generate all the individual elements using javascript
function createListItem(api_id, index, img_src, audio_title, audio_artist, audio_album_name, audio_album_id, audio_play_count, audio_duration) {
    let list_item = newElement('div', { class: 'list_item', 'data-api-id': api_id, 'data-index': index });

    let img = document.createElement('img');
    img.src = img_src;
    list_item.appendChild(img);

    let info_container = newElement('div', { class: 'info' });

    let title_container = newElement('div', { class: 'title_container' });
    let title = newElement('span', { id: 'title' }, audio_title);
    let artist = newElement('span', { id: 'artist' }, audio_artist);
    title_container.appendChild(title);
    title_container.appendChild(artist);
    info_container.appendChild(title_container);

    let album = newElement('span', { id: 'album', 'data-api-id': audio_album_id }, audio_album_name);
    let play_count = newElement('span', { id: 'play_count' }, audio_play_count);
    let duration = newElement('span', { id: 'duration' }, audio_duration)
    info_container.appendChild(album);
    info_container.appendChild(play_count);
    info_container.appendChild(duration);

    list_item.appendChild(info_container);

    let like_button = newElement('div', { class: 'round_button', id: 'like_button' });
    let heart_icon = newElement('i', { class: 'bi bi-heart-fill' });
    like_button.appendChild(heart_icon);
    list_item.appendChild(like_button)

    return list_item
}

function addNewItemToList(api_id, index, img_src, audio_title, audio_artist, audio_album_name, audio_album_id, audio_play_count, audio_duration) {
    let li = createListItem(api_id, index, img_src, audio_title, audio_artist, audio_album_name, audio_album_id, audio_play_count, audio_duration);
    let list = document.querySelector('.list');
    list.appendChild(li);
}

function updateInfoPanel(img_src, title, subtitle) {
    let info_panel = document.querySelector('.info_panel')

    let img = info_panel.querySelector('.header_img');
    img.src = img_src;

    let title_element = info_panel.querySelector('.title');
    title_element.textContent = title;

    let subtitle_element = info_panel.querySelector('.subtitle');
    subtitle_element.innerHTML = subtitle;
}

import { fetchPlaylistDetails, fetchAlbumDetails } from '../../modules/api-requests.js'
import { addLikedSongID, fetchLikedSongs } from '../../modules/like-songs.js'
import { addLastPlayedSongObject, getLastPlayedSongs } from '../../modules/last-played.js'

function compactFormat(num) {
    let formatter = Intl.NumberFormat('en', { notation: 'compact' });
    let count = formatter.format(num);
    return count;
}

function padNumber(num) {
    return String(num).padStart(2, '0');
}

function formatDuration(total_seconds) {
    let seconds = total_seconds % 60;
    let minutes = Math.floor((total_seconds % 3600) / 60);
    let hours = Math.floor(total_seconds / 3600);

    let result = [minutes, seconds];
    if (hours > 0) { result.unshift(hours) }

    result = result.map(padNumber);

    return result.join(':')
}

function addLikeButtonListener(list_item) {
    let like_button = list_item.querySelector('#like_button');
    let song_api_id = list_item.dataset.apiId;

    like_button.addEventListener('click', (event) => {
        event.stopPropagation(); // don't trigger parent click events
        addLikedSongID(song_api_id);
        like_button.style.color = '#d00';
    })
}

function addAlbumListener(list_item) {
    let album_element = list_item.querySelector('#album');

    album_element.addEventListener('click', (event) => {
        event.stopPropagation(); // don't trigger parent element click events
        let album_id = album_element.dataset.apiId
        parent.displayListView('album', album_id)
    })
}

function addListItemClickEvents() {
    document.querySelectorAll('.list_item').forEach(list_item => {
        list_item.addEventListener('click', e => {
            let item_index = list_item.dataset.index;
            playSongByIndex(item_index);
        })

        addLikeButtonListener(list_item);
        addAlbumListener(list_item)
    })
}

function generateListItems(api_data) {
    api_data.songs.forEach((song, index) => {
        addNewItemToList(song.id, index, song.image[0].link, song.name, song.primaryArtists,
                         song.album.name, song.album.id, compactFormat(song.playCount), formatDuration(song.duration))
    })
    addListItemClickEvents()
}

var api_data = {};

async function generateFromPlaylistID(playlist_api_id) {
    let playlist_data = await fetchPlaylistDetails(playlist_api_id);
    api_data = playlist_data;

    let subtitle = `${playlist_data.songCount} Songs | ${compactFormat(playlist_data.followerCount)} followers <br>
                    By: ${playlist_data.firstname + playlist_data.lastname}`

    updateInfoPanel(playlist_data.image[2].link, playlist_data.name, subtitle)

    generateListItems(api_data)
}

async function generateFromAlbumID(album_api_id) {
    let album_data = await fetchAlbumDetails(album_api_id);
    api_data = album_data;

    let subtitle = `${album_data.songCount} Songs <br>By: ${album_data.primaryArtists}`

    updateInfoPanel(album_data.image[2].link, album_data.name, subtitle);

    generateListItems(api_data)
}

async function generateFromLikedSongs() {
    api_data.songs = await fetchLikedSongs();

    let heart_img_link = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Leucanthemum_vulgare.jpeg/512px-Leucanthemum_vulgare.jpeg';
    let title = 'Liked Songs';
    let subtitle = `${api_data.songs.length} Songs <br>Saved by you <br>Click on the heart icons in a playlist to add more!`;

    updateInfoPanel(heart_img_link, title, subtitle)

    generateListItems(api_data)
}

async function generateFromLastPlayed() {
    api_data.songs = await getLastPlayedSongs();

    let img_link = 'https://upload.wikimedia.org/wikipedia/commons/6/64/Boettadresslapp_Jean_Fredman.jpg';
    let title = 'Last Played';
    let subtitle = `${api_data.songs.length} Songs <br>Played by you in this session`;

    updateInfoPanel(img_link, title, subtitle);

    generateListItems(api_data);
}

window.generateFromAlbumID = generateFromAlbumID;
window.generateFromPlaylistID = generateFromPlaylistID
window.generateFromLikedSongs = generateFromLikedSongs
window.generateFromLastPlayed = generateFromLastPlayed

function playSongByIndex(list_item_index) {
    let song = api_data.songs[list_item_index]

    addLastPlayedSongObject(song)
    parent.playAudio(song.downloadUrl[2].link, song.name, song.primaryArtists, song.image[0].link)
}
