import React from 'react';

import logo from './logo.svg';
import './App.css';
import SimpleMap from "./Map.js";

import * as firebase from "firebase/app";
import "firebase/firestore"

import Async from 'react-async';

import * as formatcoords from 'formatcoords';


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

async function fetchPackets() {
  const firestore = firebase.firestore();
  const packets = firestore.collection("packets");
  const latestPackets = (await packets.orderBy("recieved", "desc").limit(10).get())
  return latestPackets.docs;
}

function packetData(data) {
  if (data == null) return "null";
  const received = new Date(data.recieved.seconds)
  const lat = data.data["Latitude"] * 1e-6;
  const lon = data.data["Longitude"] * 1e-6;
  return <div>{ formatcoords(lat, lon).format() } at { received.toString() }</div>
}

function App() {
  return (
    <div className="App">
      <div>
        Map
        <SimpleMap/>
      </div>
      <div>
        <Async promiseFn={fetchPackets}>
        {
          ({data, err, isLoading}) => {
            if (isLoading) return "loading...";
            if (err) return `Mistakes were made (${err.message})`;
            if (data) {
              return (
                <span>
                <h3>Latest Response</h3>
                <pre> { JSON.stringify(data[0].data(), null, 4) } </pre>
                <h3>Most recent</h3>
                {
                  data.map(d => packetData(d.data()))
                }
                </span>)
            }
          }
        }
        </Async>
      </div>
    </div>
  );
}

export default App;
