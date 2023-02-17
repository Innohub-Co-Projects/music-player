# Music Player
*\~ Cus we couldn't think of an actual name \~*

A javascript based music player (and more) website created as a group mini project.

## Screenshots
<img alt="homepage" src="https://i.imgur.com/65kcGeL.png" width="30%"> <img alt="library" src="https://i.imgur.com/KjbIJc6.png" width="30%"> <img alt="liked songs" src="https://i.imgur.com/SPV404L.png" width="30%">

<img alt="search" src="https://i.imgur.com/iiGqqir.png" width="30%"> <img alt="mobile homepage" src="https://i.imgur.com/LubKe0N.png" width="30%"> <img alt="mobile list" src="https://i.imgur.com/MMyP9qM.png" width="30%">


## Try it yourself
**[Click here](https://innohub-co-projects.github.io/music-player/)** to try the live version hosted on github pages.

To run it locally:
1. Clone this repo:
```bash 
git clone https://github.com/Innohub-Co-Projects/music-player.git
```
2. Run index.html using any browser of your choice:
```bash
google-chrome ./index.html &
```

## Features
- Limitless library and content via external API calls.
- Live updated homepage showing you the latest songs.
- Dedicated list view for playlists and albums.
- Like songs to save them for later. (Uses local storage so your songs are safe even after you close the app)
- View previously played songs. (Using session storage)
- Lyric search for any song you wish.
- 'My Library' page to view some editor picked, locally saved songs as well as some cool song videos.
- Full mobile responsiveness with navbar navigation.
- Dedicated language selector to view the homepage in your prefered way.
- A pretty cool miniplayer with some cute animations.
- In-built search function.
- Intuitive Hotkeys!

## Hotkeys
- `Spacebar` or `K` - play / pause
- `Left arrow key` or `J` - rewind 5 seconds
- `Right arrow key` or `L` - rewind 5 seconds
- `,` or `<` - play previous song
- `.` or `>` - play next song

*Note: previous and next song options only work in the 'My Library' and playlist pages*

## Technical details
Although its still vanilla javascript we've used it to its fullest potential!
- Fully client side javascript and content generation.
- Heavily uses iframes to maintain song playback through page navigation.
- Uses ES6 classes, modules and other concepts to improve code management.
- Relies on saavn api for music content and discovery. Google api and a genius site wrapper for fetching lyrics.
- Uses local storage and session storage so data can be stored and recovered even without an actual database.
- Uses event delegation for content to greatly reduce event listener count and improve program flow.

## Possible improvements
- Since this website requires a TON of content to be generated on demand- there is a lot of code dedicated purely to generate DOM elements, this can get fairly messy and thus using a dedicated framework like react would have helped a lot in this case.
- Since pages like list-view are iframes generated from external messages they don't survive a reload instead showing a blank page, this could be fixed by using a proper routing engine and/or using url queries to store the current iframe location.
- Since the entire codebase runs client side It's kinda impossible to store api keys secretly, the api keys for the lyric page are thus slightly exposed although they have been encoded. This could be fixed via hosting an actual web server backend with a separate secret key endpoint instead of a static site.

*Disclaimer: This is student project and made for educational purposes only. The creators of this project do not claim to own the music content displayed on this app, most content is fetched via public apis. Don't sue us please.*
