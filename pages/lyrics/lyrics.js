// Set section header/title
parent.setSectionTitle("Lyric Search");

const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
gapi.load("client", loadClient);

const AdTz = "QUl6YVN5Q1hkOC1EemhqTFN3S3ZPVFBKekZKa1pIaUt2c1BOQUpz";
const OsAr = "YzNjZmRjMmUyNW1zaGQ3ODc3ZDBhYTNiNGE5N3AxZDFkMzNqc25iM2JhZGFjZjZmYjg";

function loadClient() {
    gapi.client.setApiKey(atob(AdTz));
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest").then(
        function () {
            console.log("GAPI client loaded for API");
        },
        function (err) {
            console.error("Error loading GAPI client for API", err);
        }
    );
}
// Make sure the client is loaded before calling this method.

//search song 
async function searchSong(searchValue){
    const apiURL = 'https://api.lyrics.ovh';
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await searchResult.json();

    showData(data);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchValue = search.value.trim();

    if (!searchValue) {
        alert("There is nothing to search");
    } else {
        searchSong(searchValue);
    }
});

//display final result in DO
function showData(data) {
    result.innerHTML = `
    <ul class="song-list">
      ${data.data
          .map(
              (song) => `<li>
                    <div>
                        <strong>${song.artist.name}</strong> -${song.title} 
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}"> get lyrics</span>
                </li>`
          )
          .join("")}
    </ul>
  `;
    document.getElementById("video").innerHTML = "";
}

//event listener in get lyrics button
result.addEventListener("click", async (e) => {
    const clickedElement = e.target;

    //checking clicked element is button or not
    if (clickedElement.tagName === "SPAN") {
        const artist = clickedElement.getAttribute("data-artist");
        const songTitle = clickedElement.getAttribute("data-songtitle");

        await displayLyrics(artist, songTitle);
    }
});

const lyricOptions = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": atob(OsAr),
        "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
    },
};

function parseHTML(htmlString) {
    temp = document.createElement("div");
    temp.innerHTML = htmlString;
    return temp;
}

async function topSearchResultID(searchTerm) {
    data = await (
        await fetch(
            "https://genius-song-lyrics1.p.rapidapi.com/search/?q=" + searchTerm + "&per_page=1&page=1",
            lyricOptions
        )
    ).json();
    return data.hits[0].result.id;
}

async function fetchLyrics(songTitle, artist) {
    id = await topSearchResultID(songTitle + " - " + artist);
    data = await (
        await fetch(
            "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=" + id + "&text_format=html",
            lyricOptions
        )
    ).json();

    html = parseHTML(data.lyrics.lyrics.body.html);
    text_with_breaks = html.innerText.replace(/\r?\n/g, "<br/>");
    return text_with_breaks;
}

// Get lyrics for song
async function displayLyrics(artist, songTitle) {
    const lyrics = await fetchLyrics(songTitle, artist);
    result.innerHTML = ` 
    <h4 style="margin-bottom:30px;"><strong>${artist}</strong> - ${songTitle}</h4><ul>
    <div data-artist="${artist}" data-songtitle="${songTitle}"> get lyrics</div>
    <p style="margin-top:20px;">${lyrics}</p>
`;
}

//event listener in get song button
result.addEventListener("click", (e) => {
    const clickedElement = e.target;

    //checking clicked element is button or not
    if (clickedElement.tagName === "DIV") {
        const artist = clickedElement.getAttribute("data-artist");
        const songTitle = clickedElement.getAttribute("data-songtitle");

        execute(artist, songTitle);
    }
});

/////////

const execute = (artist, songTitle) => {
    var pageToken = "";

    var arr_search = {
        part: "snippet",
        type: "video",
        order: "relevance",
        maxResults: 1,
        q: songTitle + artist,
    };

    if (pageToken != "") {
        arr_search.pageToken = pageToken;
    }

    return gapi.client.youtube.search.list(arr_search).then(
        function (response) {
            // Handle the results here (response.result has the parsed body).
            const listItems = response.result.items;
            if (listItems) {
                let output = `<h4 style="margin-bottom:30px;"><strong>${artist}</strong> - ${songTitle}</h4><ul>`;

                listItems.forEach((item) => {
                    const videoId = item.id.videoId;
                    const videoTitle = item.snippet.title;
                    output += `
                    <li><a data-fancybox href="https://www.youtube.com/watch?v=${videoId}"><img src="http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg" /></li>
                `;
                });
                output += "</ul>";

                // Output list
                document.getElementById("video").innerHTML = output;
            }
        },
        function (err) {
            console.error("Execute error", err);
        }

    );
};
