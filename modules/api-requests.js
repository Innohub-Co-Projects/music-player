async function fetchJSON(url) {
    try {
        obj = await (await fetch(url)).json();
        if (obj.status === 'FAILED') { throw obj.message };
        return obj.data;
    }
    catch(e) {
        console.error("API request failed: " + e);
    }
}

// fetches homepage data
// contains the following attributes: albums, charts, playlist and trending
async function fetchHomepage(language = 'hindi, english') {
    url = 'https://saavn.me/modules?language=' + language;
    return await fetchJSON(url);
}

async function fetchSongDetails(song_id) {
    url = 'https://saavn.me/songs?id=' + song_id;
    return (await fetchJSON(url))[0];
}

async function fetchPlaylistDetails(playlist_id) {
    url = 'https://saavn.me/playlists?id=' + playlist_id;
    return await fetchJSON(url);
}

async function fetchAlbumDetails(album_id) {
    url = 'https://saavn.me/albums?id=' + album_id;
    return await fetchJSON(url);
}

export { fetchHomepage, fetchSongDetails, fetchPlaylistDetails, fetchAlbumDetails };
