import React, { useEffect, useState } from 'react';
import { getMusic } from '../../api/MusicAPI';
import { Link } from 'react-router-dom'
import './MusicTable.css'

const pagination = (data, page = 1, pageLimit = 24) => {
    let result = data.slice((page - 1) * pageLimit, page * pageLimit);
    return result;
}

const MusicTable = () => {
    const [songData, setSongData] = useState([])
    const [filterCriteria, setFilterCriteria] = useState({ songTitle: "", artistName: "", albumName: "", minimumAge: "", maximumAge: "", minReleaseDate: "", maxReleaseDate: "" })
    const [page, setPage] = useState(1)

    useEffect(() => {
        getMusic().then(result => setSongData(result))
    }, [])


    const handleChangeFilterCriteria = (newCriteria) => {
        setFilterCriteria({ ...filterCriteria, ...newCriteria });
    }

    let filteredSongs = null

    if (songData.length > 1) {
        filteredSongs = songData
        .filter(value => {
            if(filterCriteria.songTitle !== "") {
                return value.title.toUpperCase().includes(filterCriteria.songTitle.toUpperCase())
            } else { return true }
        })
        .filter(value => {
            if(filterCriteria.artistName !== "") {
                return value.firstname.toUpperCase().includes(filterCriteria.artistName.toUpperCase()) || value.surname.toUpperCase().includes(filterCriteria.artistName.toUpperCase()) 
            } else { return true }
        })
        .filter(value => {
            if(filterCriteria.albumName !== "") {
                return value.albumTitle.toUpperCase().includes(filterCriteria.albumName.toUpperCase())
            } else { return true }
        })
        .filter(value => {
            if(filterCriteria.minimumAge !== "") {
                return value.birthDate >= filterCriteria.minimumAge
            } else { return true }
        })
        .filter(value => {
            if(filterCriteria.maximumAge !== "") {
                return value.birthDate <= filterCriteria.maximumAge
            } else { return true }
        })
        .filter(value => {
            if(filterCriteria.minReleaseDate !== "") {
                return value.releaseDate >= filterCriteria.minReleaseDate
            } else { return true }
        })
        .filter(value => {
            if(filterCriteria.maxReleaseDate !== "") {
                return value.releaseDate <= filterCriteria.maxReleaseDate
            } else { return true }
        })
        

    }

    const clearFilters = () => {
        setFilterCriteria({ songTitle: "", artistName: "", albumName: "", minimumAge: "", maximumAge: "", minReleaseDate: "", maxReleaseDate: "" })
    }

    return (
        <div className="">
            <div className="filters">
                <label>Title</label>
                <input type="text" name="songTitle" id="songTitle" value={filterCriteria.songTitle} onChange={(e) => handleChangeFilterCriteria({ songTitle: e.target.value })}></input>
                <label>Artist</label>
                <input type="text" name="artistName" id="artistName" value={filterCriteria.artistName} onChange={(e) => handleChangeFilterCriteria({ artistName: e.target.value })}></input>
                <label>Album</label>
                <input type="text" name="albumName" id="albumName" value={filterCriteria.albumName} onChange={(e) => handleChangeFilterCriteria({ albumName: e.target.value })}></input>
                <label> Start Artist Date Of Birth</label>
                <input type="date" name="minimumAge" id="minimumAge" value={filterCriteria.minimumAge} onChange={(e) => handleChangeFilterCriteria({ minimumAge: e.target.value })}></input>
                <label> End Artist Date Of Birth</label>
                <input type="date" name="maximumAge" id="maximumAge" value={filterCriteria.maximumAge} onChange={(e) => handleChangeFilterCriteria({ maximumAge: e.target.value })}></input>
                <label>Start Album Release Date</label>
                <input type="date" name="minReleaseDate" id="minReleaseDate" value={filterCriteria.minReleaseDate} onChange={(e) => handleChangeFilterCriteria({ minReleaseDate: e.target.value })}></input>
                <label>End Album Release Date</label>
                <input type="date" name="maxReleaseDate" id="maxReleaseDate" value={filterCriteria.maxReleaseDate} onChange={(e) => handleChangeFilterCriteria({ maxReleaseDate: e.target.value })}></input>
                <br></br>
                <button onClick={() => clearFilters()}>CLEAR</button>
            </div>

            <div className="pagination">
                <button onClick={() => setPage(page - 1)}>PREV</button>
                <h4>{page}</h4>
                <button onClick={() => setPage(page + 1)}>NEXT</button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Collaborators</th>
                        <th>Album</th>
                        <th>Duration</th>
                    </tr>
                </thead>

                <tbody>
                    {songData.length > 0 && pagination(filteredSongs, page).map((song, index) => {
                        return (
                            <tr key={index} >
                                <td>{song.title}</td>
                                <td>
                                    <Link to={`/artist/${song.artistId}`}>{`${song.firstname} ${song.surname}`}</Link>
                                </td>
                                <td>
                                    {song.collaborators}
                                </td>
                                <td>
                                    <Link to={`/album/${song.albumId}`}>{song.albumTitle}</Link>
                                </td>
                                <td>
                                    {song.length}
                                </td>
                            </tr>


                        )
                    })}
                </tbody>


            </table >

        </div >
    );
};

export default MusicTable;