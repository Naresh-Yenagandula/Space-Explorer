import axios from 'axios'
import React, { useState, useCallback, useContext } from 'react'
import './MarsRover.css'
import { DataContext } from '../App'

function MarsRover() {
    const value = useContext(DataContext)
    const [show, setShow] = useState({ rover: false, camera: false, photos: false })
    const [parameters, setParameters] = useState({ rover: '', camera: '' })
    const [camera, setCamera] = useState([])
    const cameras = { curiosity: ["FHAZ", "RHAZ", "MAST", "CHEMCAM", "MAHLI", "MARDI", "NAVCAM"], opportunity: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"], spirit: ["FHAZ", "RHAZ", "NAVCAM", "PANCAM", "MINITES"] }
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    const getPhotos = useCallback((e) => {
        setParameters({ ...parameters, camera: e })
        axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${parameters.rover}/photos?camera=${e}&earth_date=2021-7-4&api_key=${value.apikey}`)
            .then((result) => {
                setLoading(false)
                setData(result.data)
            })
            .catch((error) => {
                console.log(error);
            })

    }, [parameters, value])

    const explore = () => {
        setShow({ ...show, rover: true })
    }

    const setRover = (e) => {
        setParameters({ rover: e, camera: '' })
        setShow({ ...show, camera: true })
        if (e === "curiosity") {
            setCamera(cameras.curiosity)
        } else if (e === "opportunity") {
            setCamera(cameras.opportunity)
        } else {
            setCamera(cameras.spirit)
        }
    }
    return (
        <>
            <div className="container-fluid text-center mars_rover_section">
                <h2>Discover Mars Footage</h2>
                <button className="btn" onClick={explore}>Explore</button>
            </div>
            {show.rover ?
                <div className="text-center rover_section">
                    <h3 className="mb-4">Select Rover</h3>
                    <div className="row justify-content-center">
                        <div className="col mt-4">
                            <button
                                className="btn" style={parameters.rover === "curiosity" ? { backgroundColor: "#081B39" } : { backgroundColor: "#2D5086" }} onClick={e => setRover("curiosity")}>Curiosity</button>
                        </div>
                        <div className="col mt-4">
                            <button className="btn" style={parameters.rover === "opportunity" ? { backgroundColor: "#081B39" } : { backgroundColor: "#2D5086" }} onClick={e => setRover("opportunity")}>Opportunity</button>
                        </div>
                        <div className="col mt-4">
                            <button className="btn" style={parameters.rover === "spirit" ? { backgroundColor: "#081B39" } : { backgroundColor: "#2D5086" }} onClick={e => setRover("spirit")}>Spirit</button>
                        </div>
                    </div>
                </div>
                : null}
            {show.camera ?
                <div className="text-center rover_section">
                    <h3 className="mb-4">Select Camera</h3>
                    <div className="row justify-content-center">
                        {camera.map((c) => {
                            return (<div className="col mt-4" key={c}>
                                <button className="btn" style={parameters.camera === c ? { backgroundColor: "#081B39" } : { backgroundColor: "#2D5086" }} onClick={e => getPhotos(c)}>{c}</button>
                            </div>)
                        })}
                    </div>
                </div>
                : null}
            {data && !loading ?
                <div className="container text-center rover_section">
                     <h3 className="mb-4">Photos</h3>
                    {data.photos.length>0?
                    <div id="carouselMars" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {data.photos.map((photo,index) => {
                            return (
                                <div className={index===0?"carousel-item active":"carousel-item"} key={index}>
                                    <img src={photo.img_src} className="d-block w-100" alt="mars" />
                                </div>
                            )
                        })}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselMars" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselMars" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>:<p>No photos present on this day. Please select different rover or camera</p>}
                </div>
                : null}
        </>
    )
}

export default MarsRover
