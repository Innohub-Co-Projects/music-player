// last played songs code:
// Uses session storage so that last played songs are saved while the current browser session is active

// returns an array of song objects
function getLastPlayedSongs() {
    let song_str = window.sessionStorage.last_songs;

    if (song_str == undefined) {
        return [{
            src: './assets/rickroll.mp3',
            title: 'Never Gonna Give You Up',
            subtitle: 'Rick Astley',
            img: './assets/rickroll.jpg'
        }]
    };
    return JSON.parse(song_str);
}

// adds a song object to session storage
function addLastPlayedSong(song_object) {
    let songs = getLastPlayedSongs();
    songs.push(song_object);

    window.localStorage.last_songs = JSON.stringify(songs);
}
