import React from 'react'
import mars from '../Images/mars2.jpg'
import './Mars.css'

function Mars() {
    return (
        <>
            <div className="d-flex align-items-center">
                <img src={mars} alt="Mars background" className="img-fluid" />
                <div className="content">
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
                                <h1 className="h1_sol sm_h1">Sol 265</h1><hr />
                                <p className="p_temp">25 April</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <div className="sol">
                                <h1 className="sm_h1">Temp</h1><hr />
                                <p className="p_temp d-none d-md-block">High: 50 F</p>
                                <p className="p_temp d-none d-md-block">Low: 40 F</p>
                                <p className="p_temp d-md-none">50 F</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-12">
                            <div className="sol">
                                <h1 className="sm-h1">Wind</h1><hr />
                                <p className="p_temp">5 kph</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Mars
