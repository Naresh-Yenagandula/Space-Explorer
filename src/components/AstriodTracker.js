import React, { useState, useEffect, useCallback, useContext } from 'react'
import axios from 'axios'
import { DataContext } from '../App';
import LinearProgress from '@material-ui/core/LinearProgress'
import background from '../Images/asteriod1.jpg'
import './Asteriod.css'

function AstriodTracker() {
    const [startDate, setStartDate] = useState(null)
    const [data, setData] = useState()
    const value = useContext(DataContext)
    const [displayData, setDisplayData] = useState(null)
    const [todayInfo, setTodayInfo] = useState({ no: 0, hazardous: 0, set: false })

    const getData = useCallback(() => {
        setData(null)
        if (startDate !== null) {
            axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${startDate}&api_key=${value.apikey}`)
                .then((result) => {
                    setData(result.data)
                    if(todayInfo.set===false){
                        var count=0
                        Object.entries(result.data.near_earth_objects).map((info) => {
                            return info[1].map((astriod) => {
                                    if(astriod.is_potentially_hazardous_asteroid===true){
                                       count++ 
                                       console.log(count);
                                    }
                                return true
                            })
                        })
                        setTodayInfo({no:result.data.element_count,hazardous:count,set:true})
                    }
                })
                .catch((error) => {
                    console.log(error.response.data.error.code);
                })
        } else if (startDate === null) {
            const day = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
            const month = new Date().getMonth() < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1
            const today = `${new Date().getFullYear()}-${month}-${day}`
            setStartDate(today)
        }
    }, [startDate, value,todayInfo])


    const showData = (id) => {
        Object.entries(data.near_earth_objects).map((info) => {
            return info[1].map((astriod) => {
                if (astriod.id === id) {
                    setDisplayData({
                        name: astriod.name,
                        estimated_diameter: (astriod.estimated_diameter.meters.estimated_diameter_min + astriod.estimated_diameter.meters.estimated_diameter_max) / 2,
                        close_approach_date: astriod.close_approach_data[0].close_approach_date_full,
                        relative_velocity_km: astriod.close_approach_data[0].relative_velocity.kilometers_per_hour,
                        relative_velocity_mile: astriod.close_approach_data[0].relative_velocity.miles_per_hour,
                        miss_distance_km: astriod.close_approach_data[0].miss_distance.kilometers,
                        miss_distance_mile: astriod.close_approach_data[0].miss_distance.miles,
                        orbit: astriod.close_approach_data[0].orbiting_body,
                        is_hazardous: astriod.is_potentially_hazardous_asteroid
                    })
                }
                return true
            })
        })
    }

    useEffect(() => {
        var root = document.documentElement
        root.style.setProperty('--navbarColor','#000000')
        root.style.setProperty('--footerColor','#000000')
        getData()
    }, [getData])

    return (
        <>
        <style>{'body {background-color:#000000; color:white}'}</style>
            <div className="parent mb-4">
                <img src={background} alt="Asteriod background" className="img-fluid" />
                <div className="content">
                    <h1 className="heading">ASTERIOD</h1>
                    <h2 className="heading2">TRACKER</h2>
                </div>
                <div className="content1">
                    <p className="today_para">Today's Info</p>
                    <div className="row ">
                        <div className="col-md-2">
                            <p className="para_heading">No of Asteriods</p>
                            <h1 className="heading2">{todayInfo.no}</h1>
                        </div>
                        <div className="col-md-2">
                            <p className="para_heading">Hazardous</p>
                            <h1 className="heading2">{todayInfo.hazardous}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-4 mb-4">
                <form className="row text-center justify-content-center">
                    <div className="col-auto">
                        <label htmlFor="start" className="form-label">Select Date: </label>
                        <input
                            className="form-control"
                            type="date"
                            name="startDate"
                            id="start"
                            defaultValue={startDate}
                            onChange={e => setStartDate(e.target.value)}
                        />
                    </div>
                </form>
                <div className="mt-4">
                    <h4>Total no of Asteroids: {data ? data.element_count : 0}</h4>
                </div>
                <div className="row">
                    <div className="col-md-3 mt-3">
                        {data ?
                            <>
                                <span></span>
                                <div className="list-group" id="list-tab" role="tablist">
                                    <li className="list-group-item bg-dark text-light"><b>ASTERIOD NAME</b></li>
                                    {Object.entries(data.near_earth_objects).map((info) => {
                                        return info[1].map((astriod, i) => {
                                            return (
                                                <button key={i} style={astriod.is_potentially_hazardous_asteroid ? { borderRight: "5px solid red" } : { borderRight: "5px solid green" }} className="list-group-item list-group-item-action" onClick={e => showData(astriod.id)}>{astriod.name}</button>
                                            )
                                        })
                                    })}
                                </div></>
                            : <LinearProgress />}
                    </div>
                    <div className="col-md-7 offset-md-2 mt-3">
                        {displayData ?
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="text-center">
                                        Asteriod Details
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td>Name: </td>
                                                <td>{displayData.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Estimated Diameter: </td>
                                                <td>{displayData.estimated_diameter} meters</td>
                                            </tr>
                                            <tr>
                                                <td>Close Approach Date: </td>
                                                <td>{displayData.close_approach_date}</td>
                                            </tr>
                                            <tr>
                                                <td>Relative Velocity: </td>
                                                <td>{displayData.relative_velocity_km} km/hr <br />{displayData.relative_velocity_mile} miles/hr</td>
                                            </tr>
                                            <tr>
                                                <td>Miss Distance: </td>
                                                <td>{displayData.miss_distance_km} kms <br />{displayData.miss_distance_mile} miles</td>
                                            </tr>
                                            <tr>
                                                <td>Orbiting Body: </td>
                                                <td>{displayData.orbit}</td>
                                            </tr>
                                            <tr>
                                                <td>Is Hazardous: </td>
                                                <td>{displayData.is_hazardous ? "Yes" : "No"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AstriodTracker
