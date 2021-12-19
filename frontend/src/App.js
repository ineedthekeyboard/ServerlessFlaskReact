import React from 'react'
import './App.scss'
// import TimelinePage from './components/Timeline'
import {Amplify, Auth, API} from 'aws-amplify'
import {withAuthenticator} from '@aws-amplify/ui-react'
import awsmobile from './aws-exports'
import './amplifyUIStyles.css'

Amplify.configure(awsmobile)

function App() {
    let testRootRoute = async() => {
        // let params = {
        //   headers: {
        //     'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`
        //   }
        // }
        let otherTest = await API.get('uiAPI', '/uiapi', {})
        console.log(otherTest)
    }
    let testSubroute = async() => {
        let otherTest = await API.get('uiAPI', '/uiapi/', {})
        console.log(otherTest)
    }
    return (
        <div className="App">
            <p>test</p>
            <button onClick={testRootRoute}>Test Root Call</button>
            <button onClick={testSubroute}>Test Root Call</button>
        </div>
    )
}

export default withAuthenticator(App)
// export default App
