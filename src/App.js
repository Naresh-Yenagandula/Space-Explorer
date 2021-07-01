import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import AstriodTracker from './components/AstriodTracker'
import ApiKey from './components/ApiKey'
import './App.css'
import IssTracker from './components/IssTracker'
import Mars from './components/Mars'
import Footer from './components/Footer'

export const DataContext = React.createContext()

function App() {
  const [key, setKey] = useState()

  const getAPIKey = useCallback(() => {
    const localKey = localStorage.getItem('key')
    if (localKey)
     { setKey(localKey) }
     else{
       setKey(null)
     }
  }, [])

  useEffect(() => {
    getAPIKey()
  }, [getAPIKey])

  if (!key) {
    return (
      <DataContext.Provider value={{ getAPIKey: getAPIKey }}>
        <ApiKey />
      </DataContext.Provider>
    )
  }

  return (
    <DataContext.Provider value={{ apikey: key, getAPIKey: getAPIKey }}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={AstriodTracker} />
          <Route exact path="/astriod-tracker" component={AstriodTracker} />
          <Route exact path="/iss-tracker" component={IssTracker} />
          <Route exact path="/mars" component={Mars} />
        </Switch>
        <Footer />
      </Router>
    </DataContext.Provider>
  );
}

export default App;
