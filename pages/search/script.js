import { fetchSearchResults } from "../../modules/api-requests.js";

async function generate(search_query) {
    let query_header = document.querySelector("#search_query");
    query_header.textContent = search_query;

    let search_data = await fetchSearchResults(search_query);
    appendSongContainer(search_data);
}

function appendSongContainer(search_data) {
    if (search_data.songs.results.length == 0) { return; }

    let section = createSectionElement("Songs", "list");

    let list_items = [];
    search_data.songs.results.forEach((song) => {
        list_items.push(createListItem(song));
    });

    let content_container = section.querySelector('.content_container')
    content_container.replaceChildren(...list_items)

    let main_container = document.querySelector('.main_container')
    main_container.appendChild(section)
}

function createSectionElement(title, content_type) {
    let section = document.createElement("section");

    let heading = document.createElement("h2");
    heading.textContent = title;
    section.appendChild(heading);

    let content_container = document.createElement("div");
    content_container.classList.add('content_container')
    content_container.type = content_type;
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
