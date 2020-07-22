import React from 'react';

import logo from './logo.svg';
import './App.css';
import SimpleMap from "./Map.js";

import * as firebase from "firebase/app";
import "firebase/firestore"

import Async from 'react-async';

var firebaseConfig = {
    apiKey: "AIzaSyB9XIMSEeW-qZ4irCYyyMP1-muLTCh-mn4",
    authDomain: "haynes-boat-dev.firebaseapp.com",
    databaseURL: "https://haynes-boat-dev.firebaseio.com",
    projectId: "haynes-boat-dev",
    storageBucket: "haynes-boat-dev.appspot.com",
    messagingSenderId: "271020345277",
    appId: "1:271020345277:web:f3ac01ee909bbdc24934d4",
    measurementId: "G-1SDNYWHX7M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

async function fetchPacket() {
  const firestore = firebase.firestore();
  const packets = firestore.collection("packets");
  const latestPacket = (await packets.orderBy("recieved", "desc").limit(1).get()).docs[0];
  return latestPacket;
}

function App() {
  return (
    <div className="App">
      <div>
        Map
        <SimpleMap/>
      </div>
      <div>
        <h1>Details</h1>
        <Async promiseFn={fetchPacket}>
        {
          ({data, err, isLoading}) => {
            if (isLoading) return "loading...";
            if (err) return `Mistakes were made (${err.message})`;
            if (data) {
              return (<pre>
                { JSON.stringify(data.data(), null, 4) }
                </pre>)
            }
          }
        }
        </Async>
      </div>
    </div>
  );
}

export default App;
