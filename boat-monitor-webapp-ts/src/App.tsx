import React from 'react';
import * as bs from 'react-bootstrap';
import MyMap from "./MyMap";

// @ts-ignore
import * as formatcoords from 'formatcoords';

import * as firebase from "firebase/app";
import "firebase/firestore"
import {Async} from "react-async";

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
firebase.initializeApp(firebaseConfig);

async function fetchPackets() {
  const firestore = firebase.firestore();
  const packets = firestore.collection("packets");
  const latestPackets = (await packets.orderBy("recieved", "desc").limit(10).get())
  return latestPackets.docs;
}

function packetData(data: firebase.firestore.DocumentData) {
  if (data == null) return "null";
  const received = new Date(data.recieved.seconds)
  const lat = data.data["Latitude"] * 1e-6;
  const lon = data.data["Longitude"] * 1e-6;
  return <div>{formatcoords(lat, lon).format()} at {received.toString()}</div>
}

function PacketCard() {
  return <bs.Card>
    <bs.Card.Header>
      Latest Packet
    </bs.Card.Header>
    <bs.Card.Body>

      <Async promiseFn={fetchPackets}>
        {
          ({data, error, isLoading}) => {
            if (isLoading) return "loading...";
            if (error) return `Mistakes were made (${error.message})`;
            if (data) {
              return (
                <span>
                <h3>Latest Response</h3>
                <pre> {JSON.stringify(data[0].data(), null, 4)} </pre>
                <h3>Most recent</h3>
                  {
                    data.map(d => <div key={d.id}>{packetData(d.data())}</div>)
                  }
                </span>)
            }
          }
        }
      </Async>
    </bs.Card.Body>
  </bs.Card>
}

function MapCard() {
  const [visible, setVisible] = React.useState(true);
  return <bs.Card>
    <bs.Card.Header>
      <span>
      Map
      </span>
      <bs.Button className={'float-right'} onClick={() => setVisible(!visible)} size={'sm'} variant={'link'}>
        {visible ? 'Hide' : 'Show'}
      </bs.Button>
    </bs.Card.Header>
    {
      visible ?
        <bs.Card.Body><MyMap/></bs.Card.Body> : undefined
    }
  </bs.Card>;
}

function App() {
  return <div>
    <bs.Navbar>
      <bs.Navbar.Brand>Boat Monitor</bs.Navbar.Brand>
      {
        // <bs.Nav.Item>Hi</bs.Nav.Item>
      }
    </bs.Navbar>
    <bs.Container>
      <bs.CardDeck className={'mb-3'}>
        <MapCard/>
      </bs.CardDeck>
      <bs.CardDeck className={'mb-3'}>
        <PacketCard/>
      </bs.CardDeck>
    </bs.Container>
  </div>;
}

export default App;
