import React, { useEffect, useState } from 'react';
import { getAlbumDetails, getAlbumSongs, getAlbumsByArtist } from '../../api/MusicAPI'
import { withRouter, useParams } from 'react-router-dom'
import { getAlbumDuration } from '../../helpers/getAlbumDuration'
import "./Album.css"

const Album = ({ history }) => {

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


    const changeAlbum = ((artist, direction) => {
        getAlbumsByArtist(artist).then(result => {
            result.map((nextAlbum) => {
                const currentAlbum = albumID
                if (direction === "left") {
                    if (nextAlbum.id < currentAlbum) {
                        getAlbumDetails(nextAlbum.id).then(result => {
                            history.push(`/album/${nextAlbum.id}`)
                            setAlbumSongs(result)
                        })
                    }
                }

                if (direction === "right") {
                    if(nextAlbum.id > currentAlbum) {
                        getAlbumDetails(nextAlbum.id).then(result => {
                            history.push(`/album/${nextAlbum.id}`)
                            setAlbumSongs(result)
                        }) 
                    }
                }
            })
        })
    })
    // if (artist.length > 0) {
    //     artist.map((nextAlbum, index) => {
    //         const currentAlbum = albumID
    //         if (direction === "left") {
    //             nextAlbum.id < currentAlbum ? getAlbumDetails(nextAlbum.id).then(result => {
    //                 history.push(`/album/${nextAlbum.id}`)
    //                 setAlbumSongs(result)
    //             }) : null
    //         }
    //         if (direction === "right") {
    //             nextAlbum.id > currentAlbum ? getAlbumDetails(nextAlbum.id).then(result => {
    //                 history.push(`/album/${nextAlbum.id}`)
    //                 setAlbumSongs(result)
    //             }) : null
    //         }

    //     }
    //     )
    // }
    // })

    const header = albumHeaderInfo.length > 0 ?
        <>
            {albumHeaderInfo.map((album, index) => {
                return <>
                    <div className="albumButtons">
                        <div>
                            <button className="albumSelector" onClick={() => changeAlbum(album.artistId, "left")}>{"<"}</button>
                            <button className="albumSelector" onClick={() => changeAlbum(album.artistId, "right")}>{">"}</button>
                        </div>
                    </div>
                    <div className="albumHeader">
                        <div key={index} className="columnFlex">
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
                    </div>
                </>
            })}

        </>
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