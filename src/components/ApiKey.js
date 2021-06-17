import React, { useState,useContext } from 'react'
import axios from 'axios'
import {DataContext} from '../App'

function ApiKey() {
    const [key, setKey] = useState()
    const value = useContext(DataContext)

    const demo =async (e)=>{
        e.preventDefault()
        localStorage.setItem('key',"DEMO_KEY")
        value.getAPIKey()
    }

    const checkAPI = (e) => {
        e.preventDefault()
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${key}`)
        .then((result)=>{
            localStorage.setItem('key',key)
            value.getAPIKey()
        })  
        .catch((error)=>{
            setKey()
        })
    }
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <style>{'body {background-color:#000000}'}</style>
            <form onSubmit={checkAPI}>
                <div className="mb-3">
                    <h1 className="text-light">SPACE EXPLORE</h1>
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        name="key"
                        id="key"
                        className="form-control"
                        placeholder="Enter your API Key"
                        onChange={e => setKey(e.target.value)}
                    />
                    <button className="btn btn-sm btn-outline-light">Submit</button>
                </div>
                <div className="text-center">
                <button className="btn btn-outline-light mt-4 btn-sm" onClick={demo}>Try Demo</button>
                </div>
            </form>
        </div>
    )
}

export default ApiKey
