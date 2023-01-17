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