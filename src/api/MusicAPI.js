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
    return  fetch(`http://localhost:8000/api/songs/albumsongs/${albumId}`).then(response => response.json())
}

