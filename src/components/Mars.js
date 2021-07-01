import React,{useEffect} from 'react'
import mars from '../Images/mars3.jpg'
import './Mars.css'
// import { DataContext } from '../App';
// import axios from 'axios'
import MarsRover from './MarsRover'

function Mars() {
    // const value = useContext(DataContext)
    // const [marsData, setMarsData]  = useState()

    useEffect(()=>{
        var root = document.documentElement
        root.style.setProperty('--navbarColor','#2D5086') 
        root.style.setProperty('--footerColor','#2D5086')
    },[])

    return (
        <>
            <div className="d-flex align-items-center">
                <img src={mars} alt="Mars background" className="img-fluid" />
                <div className="content_mars">
                    <h1 className="mars_h1">Latest Weather<br /> at Elysium Planitia</h1>
                    <div className="row">
                        <div className="col col-md-6">
                            <p className="p_description">Insight is taking daily weather measurements (temperature, wind, pressure)
                                on the surface of Mars at Elysium Planitia,
                                a flat smooth plain near Mars equator</p>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-3 col-sm-12">
                            <div className="sol">
                                <h1 className="h1_sol sm_h1">Sol 265</h1><hr className="hr_sm" />
                                <p className="p_temp">25 April</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <div className="sol">
                                <h1 className="sm_h1">Temp</h1><hr className="hr_sm" />
                                <p className="p_temp d-none d-md-block">High: 50 F</p>
                                <p className="p_temp d-none d-md-block">Low: 40 F</p>
                                <p className="p_temp d-md-none">50 F</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <div className="sol">
                            <h1 className="sm_h1">Wind</h1><hr className="hr_sm" />
                                <p className="p_temp">5 kph</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-4 mb-4">
                <h1 className="display-6">Previous 7 Days</h1>
                <div className="row">
                    <div className="col-auto sol_col">
                        <h2 className="sol_h2">Sol 265</h2>
                        <p className="sol_p">September 24</p>
                        <p className="sol_p">High: 45 F</p>
                        <p className="sol_p">Low: 40 F</p>
                    </div>
                    <div className="col-auto sol_col">
                        <h2 className="sol_h2">Sol 265</h2>
                        <p className="sol_p">September 24</p>
                        <p className="sol_p">High: 45 F</p>
                        <p className="sol_p">Low: 40 F</p>
                    </div>
                    <div className="col-auto sol_col">
                        <h2 className="sol_h2">Sol 265</h2>
                        <p className="sol_p">September 24</p>
                        <p className="sol_p">High: 45 F</p>
                        <p className="sol_p">Low: 40 F</p>
                    </div>
                    <div className="col-auto sol_col">
                        <h2 className="sol_h2">Sol 265</h2>
                        <p className="sol_p">September 24</p>
                        <p className="sol_p">High: 45 F</p>
                        <p className="sol_p">Low: 40 F</p>
                    </div>
                    <div className="col-auto sol_col">
                        <h2 className="sol_h2">Sol 265</h2>
                        <p className="sol_p">September 24</p>
                        <p className="sol_p">High: 45 F</p>
                        <p className="sol_p">Low: 40 F</p>
                    </div>
                    <div className="col-auto sol_col">
                        <h2 className="sol_h2">Sol 265</h2>
                        <p className="sol_p">September 24</p>
                        <p className="sol_p">High: 45 F</p>
                        <p className="sol_p">Low: 40 F</p>
                    </div>
                    <div className="col-auto sol_col">
                        <h2 className="sol_h2">Sol 265</h2>
                        <p className="sol_p">September 24</p>
                        <p className="sol_p">High: 45 F</p>
                        <p className="sol_p">Low: 40 F</p>
                    </div>  
                </div>
            </div>
            <MarsRover />
        </>
    )
}

export default Mars
