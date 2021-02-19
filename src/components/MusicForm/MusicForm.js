import React, { useEffect, useState } from 'react';
import { withRouter, useParams, Redirect } from 'react-router-dom';
import { getAlbumOptions, getArtistOptions, getSongOptions, addNewArtist, addNewAlbum, addNewSong, addNewCollab } from '../../api/MusicAPI'
import './MusicForm.css'

const MusicForm = () => {

    const [artistOptions, setArtistOptions] = useState([])
    const [albumOptions, setAlbumOptions] = useState([])
    const [songOptions, setSongOptions] = useState([])
    const [values, setValues] = useState({})
    const [redirect, setRedirect] = useState("")

    const { addType } = useParams();

    useEffect(() => {
        if (addType === "song") {
            console.log("in add song form")
            getAlbumOptions().then(result => setAlbumOptions(result))
            getArtistOptions().then(result => setArtistOptions(result))
        } else if (addType === "album") {
            console.log("in add album form")
            getArtistOptions().then(result => setArtistOptions(result))
        } else if (addType === "collab") {
            console.log("in add collab form")
            getSongOptions().then(result => setSongOptions(result))
        } else if (addType === "artist") {
            console.log("in add artist form")
        }
    }, [addType])


    const newArtist = {
        firstname: values.firstname,
        surname: values.surname,
        age: values.age,
        gender: values.gender,
        photoUrl: values.photoUrl
    }

    const newAlbum = {
        title: values.title,
        artistId: values.artistId,
        releaseDate: values.releaseDate,
        photoUrl: values.photoUrl,
        description: values.description
    }

    const newSong = {
        title: values.title,
        length: values.length,
        albumId: values.albumId,
        artistId: values.artistId,
        rating: values.rating,
        trackNo: values.trackNo
    }

    const newCollab = {
        name: values.name,
        songId: values.songId
    }


    const handleChangeValues = (newValue) => {
        setValues({ ...values, ...newValue });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let newItem = null
        if (addType === "artist") {
            newItem = newArtist
            console.log("newArtist=")
            console.dir(newItem)
            addArtist(newItem)
        }
        if (addType === "album") {
            newItem = newAlbum
            console.log("newAlbum=")
            console.dir(newItem)
            addAlbum(newItem)
        }
        if (addType === "song") {
            newItem = newSong
            console.log("newSong=")
            console.dir(newItem)
            addSong(newItem)
        }
        if (addType === "collab") {
            newItem = newCollab
            console.log("newCollab=")
            console.dir(newItem)
            addCollab(newItem)
        }

    }


    const addArtist = (artist) => {
        addNewArtist(artist).then(result => {
            if (result.status === 200) {
                alert("New Artist Added \n Please add an album for this artist");
                handleReset()
                setRedirect("/add/album");
            } else {
                return alert("Error adding new artist")
            }
        });
    }

    const addAlbum = (album) => {
        addNewAlbum(album).then(result => {
            if (result.status === 200) {
                alert("New Album Added \n Please add a song for this album");
                setRedirect("/add/song");
            } else {
                return alert("Error adding new album")
            }
        });
    }

    const addSong = (song) => {
        addNewSong(song).then(result => {
            if (result.status === 200) {
                console.log("made it to positive")
                console.dir(result)
                alert("New Song Added \n Please add a collaborator for this song");
                handleReset()
                setRedirect("/add/collab");
            } else {
                console.log("made it to negative")
                console.dir(result)
                return alert("Error adding new song")
            }
        });
    }

    const addCollab = (collab) => {
        addNewCollab(collab).then(result => {
            if (result.status === 200) {
                alert("New Collaborator Added");
                handleReset()
                setRedirect("/");
            } else {
                return alert("Error adding new collaborator")
            }
        });
    }




    const titleInput =
        <>
            <label>Title</label>
            <input required type="text" value={values.title || ""} onChange={(e) => handleChangeValues({ title: e.target.value })} />
        </>

    const artistSelect =
        <>
            <label>Artist</label>
            <select required value={values.artistId || ""} onChange={(e) => handleChangeValues({ artistId: parseInt(e.target.value) })}>
                <option value="" disabled selected>Select An Artist</option>
                {artistOptions.map((artist, index) => {
                    return <option key={index} value={artist.id}>{`${artist.firstname} ${artist.surname}`}</option>
                })}
            </select>
        </>

    const photoUrlInput =
        <input required type="text"  value={values.photoUrl || ""} onChange={(e) => handleChangeValues({ photoUrl: e.target.value })} pattern="http(s?)://.*" title="Must be valid url" />


    const artistForm = addType === "artist" ?
        <>
            <label>Firstname</label>
            <input required type="text" value={values.firstname || ""} onChange={(e) => handleChangeValues({ firstname: e.target.value })} />
            <br />
            <label>Surname</label>
            <input required type="text" value={values.surname || ""} onChange={(e) => handleChangeValues({ surname: e.target.value })} />
            <br />
            <label>Age</label>
            <input required type="number" value={values.age || ""} onChange={(e) => handleChangeValues({ age: parseInt(e.target.value) })} />
            <br />
            <label>Gender</label>
            <input required type="text" value={values.gender || ""} onChange={(e) => handleChangeValues({ gender: e.target.value })} />
            <br />
            <label>URL for Artists photograph</label>
            {photoUrlInput}
            <br />

        </>
        : null

    const albumForm = addType === "album" && artistOptions.length > 0 ?
        <>
            {titleInput}
            <br />
            {artistSelect}
            <br />
            <label>Release Date</label>
            <input required type="date" value={values.releaseDate || ""} onChange={(e) => handleChangeValues({ releaseDate: e.target.value })} />
            <br />
            <label>URL for Album cover</label>
            {photoUrlInput}
            <br />
            <label>Description</label>
            <textarea required type="text" value={values.description || ""} onChange={(e) => handleChangeValues({ description: e.target.value })} />
            <br />

        </>
        : null

    const songForm = addType === "song" && artistOptions.length > 0 && albumOptions.length > 0 ?
        <>
            {titleInput}
            <br />
            <label>Song length</label>
            <input required type="time" min="00:00:01" value={values.length || ""} step={1} onChange={(e) => handleChangeValues({ length: e.target.value })} />
            <br />
            <label>Album</label>
            <select required value={values.albumId || ""} onChange={(e) => handleChangeValues({ albumId: parseInt(e.target.value) })}>
                <option value="" disabled selected>Select An Album</option>
                {albumOptions.map((album, index) => {
                    return <option key={index} value={album.id}>{album.title}</option>
                })}
            </select>
            <br />
            {artistSelect}
            <br />
            <label>Rating</label>
            <input required type="number" value={values.rating || ""} onChange={(e) => handleChangeValues({ rating: parseInt(e.target.value) })} />
            <br />
            <label>Track Number</label>
            <input required type="number" value={values.trackNo || ""} onChange={(e) => handleChangeValues({ trackNo: parseInt(e.target.value) })} />
            <br />
        </>
        : null

    const collabForm = addType === "collab" && songOptions.length > 0 ?
        <>
            <label>Name</label>
            <input required type="text" value={values.name || ""} onChange={(e) => handleChangeValues({ name: e.target.value })} />
            <br />
            <label>Song</label>
            <select required value={values.songId || ""} onChange={(e) => handleChangeValues({ songId: parseInt(e.target.value) })}>
                <option value="" disabled selected>Select A Song</option>
                {songOptions.map((song, index) => {
                    return <option key={index} value={song.id}>{song.title}</option>
                })}
            </select>
            <br />
        </>
        : null

        const handleReset = () => {
            Array.from(document.querySelectorAll("input")).forEach(
              input => (input.value = "")
            );
            setValues({})
          };
          
    return (
        <>
            <h2>Add new {addType}</h2>
            <div className="form-container">
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                    {artistForm}
                    {albumForm}
                    {songForm}
                    {collabForm}
                    {redirect.length > 0 ?  <Redirect to={redirect}/> : null}
                    <button type="submit" className="submitBtn"> Add {addType}</button>
                </form>
            </div>
        </>
    );
};

export default withRouter(MusicForm);