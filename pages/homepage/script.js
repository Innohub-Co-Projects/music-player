import { fetchHomepage, fetchSongDetails } from "../../modules/api-requests.js";
import { addLastPlayedSongObject } from "../../modules/last-played.js";

// Set section header/title
parent.setSectionTitle("Homepage");

// creates a new element with given parameters
function newElement(type_str, attributes_obj, textContent = "") {
    let element = document.createElement(type_str);
    element.textContent = textContent;

    for (const [attr, value] of Object.entries(attributes_obj)) {
        element.setAttribute(attr, value);
    }
    return element;
}

function createCardInfoElement(title_text, subtitle_text) {
    let info = newElement("div", { class: "card_info" });
    let title = newElement("h5", { class: "card_title" }, title_text);
    let subtitle = newElement("div", { class: "card_subtitle" }, subtitle_text);

    info.appendChild(title);
    info.appendChild(subtitle);
    return info;
}

function createContentCard(api_id, content_type, title, subtitle, img_src) {
    let card = newElement("li", { class: "content_card", "data-api-id": api_id, "data-type": content_type });
    let img = newElement("img", { src: img_src });
    let card_info = createCardInfoElement(title, subtitle);

    card.appendChild(img);
    card.appendChild(card_info);
    return card;
}

function listFromSection(section_type) {
    let content_sections = document.querySelectorAll(".section_container");

    let section = Array.from(content_sections).find((section) => section.dataset.type == section_type);
    let list = section.querySelector(".list_container");

    return list;
}

function addAlbum(api_id, content_type, title, subtitle, img_src) {
    let albumList = listFromSection("albums");
    let card = createContentCard(api_id, content_type, title, subtitle, img_src);

    albumList.appendChild(card);
}

function addPlaylist(api_id, content_type, title, subtitle, img_src) {
    let playlistList = listFromSection("playlists");
    let card = createContentCard(api_id, content_type, title, subtitle, img_src);

    playlistList.appendChild(card);
}

function addChart(api_id, content_type, title, subtitle, img_src) {
    let chartList = listFromSection("charts");
    let card = createContentCard(api_id, content_type, title, subtitle, img_src);

    chartList.appendChild(card);
}

function addTrendingSongs(api_id, content_type, title, subtitle, img_src) {
    let trendingList = listFromSection("trending_songs");
    let card = createContentCard(api_id, content_type, title, subtitle, img_src);

    trendingList.appendChild(card);
}

function addTrendingAlbums(api_id, content_type, title, subtitle, img_src) {
    let trendingList = listFromSection("trending_albums");
    let card = createContentCard(api_id, content_type, title, subtitle, img_src);

    trendingList.appendChild(card);
}

async function generateHomepageContent() {
    let homepageInfo = await fetchHomepage();

    homepageInfo.albums.forEach((album) => {
        addAlbum(album.id, album.type, album.name, "", album.image[1].link);
    });

    homepageInfo.playlists.forEach((playlist) => {
        addPlaylist(playlist.id, playlist.type, playlist.title, playlist.subtitle, playlist.image[1].link);
    });

    homepageInfo.charts.forEach((chart) => {
        addChart(chart.id, chart.type, chart.title, "", chart.image[1].link);
    });

    homepageInfo.trending.songs.forEach((song) => {
        addTrendingSongs(song.id, song.type, song.name, "", song.image[1].link);
    });

    homepageInfo.trending.albums.forEach((albums) => {
        addTrendingAlbums(albums.id, albums.type, albums.name, "", albums.image[1].link);
    });
}

// generate content on page load
await generateHomepageContent()

// attach content event listeners:
async function playSongByID(song_api_id) {
    let song_data = (await fetchSongDetails(song_api_id))[0];

    addLastPlayedSongObject(song_data);
    parent.playAudio(song_data.downloadUrl[2].link, song_data.name, song_data.primaryArtists, song_data.image[0].link);
}

function executeCardInteraction(card) {
    if (card.dataset.type == "song") {
        playSongByID(card.dataset.apiId);
        return;
    }

    parent.displayListView(card.dataset.type, card.dataset.apiId);
}

// use event delegation to handle card events
let body = document.querySelector('body');
body.addEventListener("click", (event) => {
    let card = event.target.closest(".content_card");
    if (!card) return;

    executeCardInteraction(card)
});

// scroll button events
let content_sections = document.querySelectorAll(".section_container");

content_sections.forEach((section) => {
    let left_button = section.querySelector("#left_scroll");
    let right_button = section.querySelector("#right_scroll");
    let list = section.querySelector(".list_container");

    left_button.addEventListener("click", () => {
        list.scrollLeft -= 330;
    });
    right_button.addEventListener("click", () => {
        list.scrollLeft += 330;
    });
});
