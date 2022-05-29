import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import {storeSettings} from "./store/store";

if (process.env.NODE_ENV === 'production') {
    console.log = () => {}
    console.error = () => {}
    console.debug = () => {}
}

const firebaseConfig = {
    apiKey: "AIzaSyCt-g3N6tV7TIp_rbc9DKbDogcpwjR4Mp8",
    authDomain: "casual-work-986eb.firebaseapp.com",
    projectId: "casual-work-986eb",
    storageBucket: "casual-work-986eb.appspot.com",
    messagingSenderId: "735726396189",
    appId: "1:735726396189:web:e56962df3c9fbeabe637f4",
    measurementId: "G-D43HL1F5GF"
};

export const fire = firebase.initializeApp(firebaseConfig);

const store  = storeSettings();

function Root() {

    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);
