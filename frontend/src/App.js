import React from 'react'
import logo from './logo.svg'
import './App.scss'
import AccPage from './components/Acc'
import TimelinePage from './components/Timeline'
import Amplify, {Auth, API} from 'aws-amplify'
import awsExports from './aws-exports'
import {withAuthenticator} from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

Amplify.configure(awsExports)


function App() {
    let testRootRoute = async() => {
        let params = {
            headers: {
                'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
            }
        }
        let otherTest = await API.get('uiAPI', '/uiapi', params)
        console.log(otherTest)
    }
    let testSubroute = async() => {
        let params = {
            headers: {
                'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
            }
        }
        let otherTest = await API.get('uiAPI', '/uiapi/', {})
        console.log(otherTest)
    }
    return (
        <div className="App">
            <TimelinePage/>
            <button onClick={testRootRoute}>Test Root Call</button>
            <button onClick={testSubroute}>Test Root Call</button>
            {/*<AccPage/> */}
        </div>
    
    )
}

export default withAuthenticator(App)
