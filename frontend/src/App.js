import React from 'react'
import logo from './logo.svg'
import './App.scss'
import AccPage from './components/Acc'
import TimelinePage from './components/Timeline'
import Amplify, {Auth} from 'aws-amplify'
import awsExports from './aws-exports'
import {withAuthenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'

Amplify.configure(awsExports);


function App() {

    return (
        <div className="App">
            <TimelinePage/>
            {/*<AccPage/> */}
        </div>
    
    )
}

export default withAuthenticator(App)
