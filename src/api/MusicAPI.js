export const getMusic = () => {
    return fetch("http://localhost:8000/api/songs").then(response => response.json())
}

export const getArtistInfo = (artistId) => {
    return fetch(`http://localhost:8000/api/songs/artistinfo/${artistId}`).then(response => response.json())
}

export const getSongsByArtistId = (artistId) => {
    return fetch(`http://localhost:8000/api/songs/artist/${artistId}`).then(response => response.json())
}

export const getDiscography = (artistId) => {
    return fetch(`http://localhost:8000/api/songs/discog/${artistId}`).then(response => response.json())
}

export const getAlbumDetails = (albumId) => {
    return fetch(`http://localhost:8000/api/songs/albums/${albumId}`).then(response => response.json())
}

export const getAlbumSongs = (albumId) => {
    return fetch(`http://localhost:8000/api/songs/albumsongs/${albumId}`).then(response => response.json())
}

export const getAlbumOptions = () => {
    return fetch("http://localhost:8000/api/albums").then(response => response.json())
}

export const getArtistOptions = () => {
    return fetch("http://localhost:8000/api/artists").then(response => response.json())
}

export const getSongOptions = () => {
    return fetch("http://localhost:8000/api/songs/get/options").then(response => response.json())
}

export const getAlbumsByArtist = (artistId) => {
    return fetch(`http://localhost:8000/api/albums/artists/${artistId}`).then(response => response.json())
}

export const addNewArtist = (artistInfo) => {
    return fetch("http://localhost:8000/api/artists", {
        method: 'post',
        body: JSON.stringify(artistInfo),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response)
}

export const addNewAlbum = (albumInfo) => {
    return fetch("http://localhost:8000/api/albums", {
        method: 'post',
        body: JSON.stringify(albumInfo),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response)
}

export const addNewSong = (songInfo) => {
    return fetch("http://localhost:8000/api/songs", {
        method: 'post',
        body: JSON.stringify(songInfo),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response)
}

export const addNewCollab = (collabInfo) => {
    return fetch("http://localhost:8000/api/collaborators", {
        method: 'post',
        body: JSON.stringify(collabInfo),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response)
}

