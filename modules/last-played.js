// last played songs code:
// Uses session storage so that last played songs are saved while the current browser session is active

// returns an array of song objects
function getLastPlayedSongs() {
    let song_str = window.sessionStorage.last_songs;

    if (song_str == undefined) {
        return [{
            id: 'local',
            image: [{link: '../../assets/rickroll.jpg'}, {link: '../../assets/rickroll.jpg'}, {link: '../../assets/rickroll.jpg'}],
            name: 'Never Gonna Give You Up',
            primaryArtists: 'Rick Astley',
            album: { name: 'Whenever You Need Somebody', id: 26553699 },
            playCount: 211000,
            duration: 213,
            downloadUrl: [{link: '../../assets/rickroll.mp3'}, {link: '../../assets/rickroll.mp3'},
                          {link: '../../assets/rickroll.mp3'}, {link: '../../assets/rickroll.mp3'}]
        }]
    };

    return JSON.parse(song_str);
}

// adds a song object to session storage
function addLastPlayedSongObject(song_object) {
    let songs = getLastPlayedSongs();
    songs.push(song_object);

    window.sessionStorage.last_songs = JSON.stringify(songs);
}

export { getLastPlayedSongs, addLastPlayedSongObject }
