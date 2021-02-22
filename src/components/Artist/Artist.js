import React, { useEffect, useState } from 'react';
import { getArtistInfo, getSongsByArtistId, getDiscography } from '../../api/MusicAPI'
import { withRouter, useParams } from 'react-router-dom'
import { getAlbumDuration } from '../../helpers/getAlbumDuration'
import moment from 'moment'
import './Artist.css'
const Artist = () => {
    const [artistInfo, setArtistInfo] = useState([])
    const [artistSongs, setArtistSongs] = useState([])
    const [discography, setDiscography] = useState([])

    const { artistID } = useParams()

    useEffect(() => {
        getArtistInfo(artistID).then(result => setArtistInfo(result))
        getSongsByArtistId(artistID).then(result => setArtistSongs(result))
        getDiscography(artistID).then(result => setDiscography(result))
    }, [artistID])



    const header = artistInfo.length > 0 ?
        artistInfo.map((info, index) => {
            return <div key={index} className="artistHeader">
                <img alt="artist" src={info.photoUrl} />
                <div className="artistInfo">
                    <h2>{`${info.firstname} ${info.surname}`}</h2>
                    <h4>{`Age: ${moment().diff(info.birthDate, 'years', false)}`}</h4>
                    {info.albums.includes(',') ? <h4>{`Total Albums: ${info.albums.split(',').length}`}</h4>
                        : <h4>Total Albums: 1</h4>}
                    {info.songs.includes(',') ? <h4>{`Total Songs: ${info.songs.split(',').length}`}</h4>
                        : <h4>Total songs: 1</h4>}

                </div>
            </div>
        })

        : null


    let top5Songs = null
    if (artistSongs.length > 0) {
        top5Songs = artistSongs.sort((a, b) => {
            return b.rating - a.rating
        })
        top5Songs.length = 5;
    }


    const popularSongs = top5Songs ?
        <div className="popularSongs">
            <h2>Popular Songs</h2>
            <div className="popularSongsTable">
                <table >
                    <thead>
                        <tr>
                            <th>Postion</th>
                            <th></th>
                            <th>Title</th>
                            <th>Rating</th>
                            <th>Duration</th>
                        </tr>
                    </thead>

                    <tbody>
                        {top5Songs.map((song, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td><img alt="song album cover" src={song.photoUrl} /></td>
                                <td>{song.title}</td>
                                <td>{song.rating} </td>
                                <td>{song.length}</td>
                            </tr>
                        })}
                    </tbody>
                </table >
            </div>
        </div>
        : null



    const discog = discography.length > 0 ?
        <>
            <h2>Discography</h2>
            <div className="discog">
                {discography.map((album, index) => {
                    return <div className="albumInfo" key={index}>
                        <img alt="Album cover" src={album.photoUrl} />
                        <h4>{album.albumTitle}</h4>
                        {album.songs.includes(',') ? <p>{`Songs: ${album.songs.split(',').join(', ')}`}</p>
                            : <p>{`Songs: ${album.songs}`}</p>}
                        {album.songLengths.includes(',') ? <p>{`Duration: ${getAlbumDuration(album.songLengths.split(','))}`}</p>
                            : <p>{`Duration: ${album.songLengths}`}</p>}
                    </div>
                })}
            </div>
        </>
        : null

    return (
        <>
            {header}
            {popularSongs}
            {discog}
        </>
    );
};

export default withRouter(Artist);