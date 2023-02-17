import { fetchSearchResults, fetchSongDetails } from "../../modules/api-requests.js";
import { addLikedSongID } from "../../modules/like-songs.js";
import { addLastPlayedSongObject } from '../../modules/last-played.js'

// Show back button on page load
parent.showBackButton();

async function generateSearch(search_query) {
    let query_header = document.querySelector("#search_query");
    query_header.textContent = search_query;

    let search_data = await fetchSearchResults(search_query);
    appendSongContainer(search_data);
    appendAlbumContainer(search_data);
    appendPlaylistContainer(search_data);

    addListItemClickEvents();
    addCardEvents();
}
window.generateSearch = generateSearch;

function appendSongContainer(search_data) {
    if (search_data.songs.results.length == 0) { return; }

    let section = createSectionElement("Songs", "list");

    let list_items = [];
    search_data.songs.results.forEach((song) => {
        list_items.push(createListItem(song));
    });

    let content_container = section.querySelector(".content_container");
    content_container.replaceChildren(...list_items);

    let main_container = document.querySelector(".main_container");
    main_container.appendChild(section);
}

function appendPlaylistContainer(search_data) {
    if (search_data.playlists.results.length == 0) { return; }

    let section = createSectionElement("Playlists", "cards");

    let cards = [];
    search_data.playlists.results.forEach((playlist) => {
        let card = createContentCard(playlist.id, "playlist", playlist.title, "", playlist.image[2].link);
        cards.push(card);
    });

    let content_container = section.querySelector(".content_container");
    content_container.replaceChildren(...cards);

    let main_container = document.querySelector(".main_container");
    main_container.appendChild(section);
}

function appendAlbumContainer(search_data) {
    if (search_data.albums.results.length == 0) { return; }

    let section = createSectionElement("Albums", "cards");

    let cards = [];
    search_data.albums.results.forEach((album) => {
        let card = createContentCard(album.id, "album", album.title, album.description, album.image[2].link);
        cards.push(card);
    })

    let content_container = section.querySelector(".content_container");
    content_container.replaceChildren(...cards);

    let main_container = document.querySelector(".main_container");
    main_container.appendChild(section);
}

function createSectionElement(title, content_type) {
    let section = document.createElement("section");

    let heading = document.createElement("h2");
    heading.textContent = title;
    section.appendChild(heading);

    let content_container = document.createElement("div");
    content_container.classList.add('content_container');
    content_container.setAttribute('type', content_type);
    section.appendChild(content_container);

    return section;
}

//
// list item generation copied from listview page:
//

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
    let title = newElement("span", { id: "title" }, song_object.title);
    let artist = newElement("span", { id: "artist" }, song_object.primaryArtists);
    title_container.appendChild(title);
    title_container.appendChild(artist);
    info_container.appendChild(title_container);

    let album = newElement("span", { id: "album" }, song_object.album);
    let play_count = newElement("span", { id: "play_count" }, '');
    let duration = newElement("span", { id: "duration" }, '');
    info_container.appendChild(album);
    info_container.appendChild(play_count);
    info_container.appendChild(duration);

    return info_container;
}

// creates and returns a new list item element from given song object
function createListItem(song_object) {
    let list_item = newElement("div", {class: "list_item", "data-api-id": song_object.id});

    let img = document.createElement("img");
    img.src = song_object.image[0].link;
    list_item.appendChild(img);

    let info_container = createInfoContainer(song_object);
    list_item.appendChild(info_container);

    let like_button = newElement("div", {class: "round_button", id: "like_button"});
    let heart_icon = newElement("i", { class: "bi bi-heart-fill" });
    like_button.appendChild(heart_icon);
    list_item.appendChild(like_button);

    return list_item;
}

function addLikeButtonListener(list_item) {
    let like_button = list_item.querySelector("#like_button");
    let song_api_id = list_item.dataset.apiId;

    like_button.addEventListener("click", (event) => {
        event.stopPropagation(); // don't trigger parent click events
        addLikedSongID(song_api_id);
        like_button.style.color = "#d00";
    });
}

function addListItemClickEvents() {
    document.querySelectorAll(".list_item").forEach((list_item) => {
        list_item.addEventListener("click", (e) => {
            let item_id = list_item.dataset.apiId;
            playSongByID(item_id);
        });

        addLikeButtonListener(list_item);
    });
}

//
// content card generation copied from homepage
//

function createCardInfoElement(title_text, subtitle_text) {
    let info = newElement('div', { class: 'card_info' })
    let title = newElement('h5', { class: 'card_title' }, title_text)
    let subtitle = newElement('div', { class: 'card_subtitle' }, subtitle_text)

    info.appendChild(title)
    info.appendChild(subtitle)
    return info
}

function createContentCard(api_id, content_type, title, subtitle, img_src) {
    let card = newElement('li', { class: 'content_card', 'data-api-id': api_id, 'data-type': content_type })
    let img = newElement('img', { src: img_src })
    let card_info = createCardInfoElement(title, subtitle)

    card.appendChild(img)
    card.appendChild(card_info)
    return card
}


async function playSongByID(song_api_id) {
    let song_data = (await fetchSongDetails(song_api_id))[0];

    addLastPlayedSongObject(song_data);
    parent.playAudio(song_data.downloadUrl[2].link, song_data.name, song_data.primaryArtists, song_data.image[0].link);
}

function addCardEvents() {
    document.querySelectorAll('.content_card').forEach(card => {
        card.addEventListener('click', () => {
            parent.displayListView(card.dataset.type, card.dataset.apiId);
        })
    })
}

// Way too much DOM element generation in this script,
// some actual framework like react would probably help a lot in this case
