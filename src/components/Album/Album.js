import React, { useEffect, useState } from 'react';
import { getAlbumDetails, getAlbumSongs } from '../../api/MusicAPI'
import { withRouter, useParams } from 'react-router-dom'
import { getAlbumDuration } from '../../helpers/getAlbumDuration'
import "./Album.css"

const Album = () => {

    const [albumHeaderInfo, setAlbumHeaderInfo] = useState([])
    const [albumSongs, setAlbumSongs] = useState([])

    const [artist, setArtist] = useState(null)

    const { albumID } = useParams()

    // if(albumHeaderInfo.length > 0) {
    //     setArtist(albumHeaderInfo[0].artistId)
    // }

    useEffect(() => {
        getAlbumDetails(albumID).then(result => setAlbumHeaderInfo(result))
        getAlbumSongs(albumID).then(result => setAlbumSongs(result))
    }, [albumID])

    const header = albumHeaderInfo.length > 0 ?
        <div className="albumHeader">
            {albumHeaderInfo.map((album, index) => {
                return <>
                    <div className="columnFlex">
                        <img alt="Album Cover Header" src={album.photoUrl} />
                    </div>
                    <div className="albumDetails">
                        <h2>{album.albumTitle}</h2>
                        <h3>{`By: ${album.firstname} ${album.surname}`}</h3>
                        <h4>{`Description: ${album.description}`}</h4>
                        <h5>{`Collaborators: ${album.collaborators}`}</h5>
                        {album.songLengths.includes(',') ? <h5>{`Total Songs: ${(album.songLengths.split(',').length)}`}</h5>
                            : <h5>Total Songs: 1 </h5>}
                        {album.songLengths.includes(',') ? <h5>{`Duration: ${getAlbumDuration(album.songLengths.split(','))}`}</h5>
                            : <h5>{`Duration: ${album.songLengths}`}</h5>}
                    </div>
                </>
            })}

        </div>
        : null


    let orderedSongList = null

    if (albumSongs.length > 0) {
        orderedSongList = albumSongs.sort((a, b) => {
            return a.trackNo - b.trackNo
        })
        console.log(orderedSongList)
    }

    const albumSongList = orderedSongList ?
        <div className="songList">
            <h2>Album songs</h2>
            <div className="albumSongTable">
                <table>
                    <thead>
                        <tr>
                            <th>Track No</th>
                            <th>Title</th>
                            <th>Collaborators</th>
                            <th>Duration</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orderedSongList.map((song, index) => {
                            return <tr key={index}>
                                <td>{song.trackNo}</td>
                                <td>{song.title}</td>
                                <td>{song.name} </td>
                                <td>{song.length}</td>
                            </tr>
                        })}
                    </tbody>
                </table >
            </div>
        </div>
        : null


    return (
        <>
            {header}
            {albumSongList}
        </>
    );
};

export default withRouter(Album);