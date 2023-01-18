// creates a new element with given parameters
function newElement(type_str, attributes_obj, textContent = '') {
    let element = document.createElement(type_str);
    element.textContent = textContent;

    for (const [attr, value] of Object.entries(attributes_obj)) {
        element.setAttribute(attr, value);
    }
    return element;
}

function createListItem(api_id, img_src, audio_title, audio_artist, audio_album, audio_play_count, audio_duration) {
    let list_item = newElement('div', { class: 'list_item', 'data-api-id': api_id });

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

    let album = newElement('span', { id: 'album' }, audio_album);
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

function addNewItemToList(api_id, img_src, audio_title, audio_artist, audio_album, audio_play_count, audio_duration) {
    let li = createListItem(api_id, img_src, audio_title, audio_artist, audio_album, audio_play_count, audio_duration);
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
    subtitle_element.textContent = subtitle;
}

import { fetchPlaylistDetails } from '../../modules/api-requests.js'

async function generateFromPlaylistID(playlist_api_id) {
    let playlist_data = await fetchPlaylistDetails(playlist_api_id);

    updateInfoPanel(playlist_data.image[2].link, playlist_data.name, `${playlist_data.songCount} Songs`)

    playlist_data.songs.forEach(song => {
        addNewItemToList(song.id, song.image[0].link, song.name, song.primaryArtists, song.album.name, song.playCount, song.duration)
    })
}
