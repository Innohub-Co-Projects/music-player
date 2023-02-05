// liked songs code:
// Uses local storage so that liked songs are saved even when window is closed

// returns an array of all song api ids
function getLikedSongIDs() {
    let id_str = window.localStorage.liked_song_ids;

    if (id_str == undefined) { return ['e0kCEwoC'] };

    return JSON.parse(window.localStorage.liked_song_ids);
}

function addLikedSongID(song_api_id) {
    let id_arr = getLikedSongIDs();
    id_arr.push(song_api_id);

    window.localStorage.liked_song_ids = JSON.stringify(id_arr);
}

import { fetchSongDetails } from './api-requests.js';

// fetches an array of all liked song data
async function fetchLikedSongs() {
    let song_id_string = getLikedSongIDs().join(',');

    return await fetchSongDetails(song_id_string);
}

export { getLikedSongIDs, addLikedSongID, fetchLikedSongs };
