import React from 'react';
import * as bs from 'react-bootstrap';
import MyMap from "./MyMap";
// @ts-ignore
import * as formatcoords from 'formatcoords';

import * as firebase from "firebase/app";
import "firebase/firestore"
import {Async} from "react-async";
import {useLocalStorage} from "./useLocalStorage";
import {IDark} from "./I";
import {CollapsibleCard} from "./CollapsibleCard";

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
  const received = new Date(data.recieved.seconds * 1000)
  const lat = data.data["Latitude"] * 1e-6;
  const lon = data.data["Longitude"] * 1e-6;
  return <div>{formatcoords(lat, lon).format()} at {received.toString()}</div>
}

function PacketCard() {
  return <CollapsibleCard storageKey={"packetCard"} header={"Latest Response"}>
      <Async promiseFn={fetchPackets}>
        {
          ({data, error, isLoading}) => {
            if (isLoading) return "loading...";
            if (error) return `Mistakes were made (${error.message})`;
            if (data) {
              return (<span>
                <h3>Latest Response</h3>
                <pre> {JSON.stringify(data[0].data(), null, 4)} </pre>
                </span>)
            }
          }
        }
      </Async>
  </CollapsibleCard>;
}

function RecentPacketsCard() {
  return <CollapsibleCard storageKey={"recentPackets"} header={"Recent Packets"}>
    <Async promiseFn={fetchPackets}>
      {
        ({data, error, isLoading}) => {
          if (isLoading) return "Loading...";
          if (error) return `Mistakes were made (${error.message})`;
          if (data) {
            return (
              <span>
                <h3>Most recent</h3>
                {
                  data.map(d => <div key={d.id}>{packetData(d.data())}</div>)
                }
                </span>)
          }
        }
      }
    </Async>
  </CollapsibleCard>

}

function MapCard({dark}: IDark) {
  return <CollapsibleCard storageKey={"mapVisible"} header={<>Map</>}>
    <MyMap dark={dark}/>
  </CollapsibleCard>;
}

function App() {
  const [dark, setDark] = useLocalStorage<boolean>("dark", true);
  let newHref: string;
  if (dark) {
    newHref = 'https://bootswatch.com/4/darkly/bootstrap.css';
  } else {
    newHref = 'https://bootswatch.com/4/flatly/bootstrap.css';
  }
  (document.getElementById('bootstrap-stylesheet') as any).href = newHref;
  return <div>
    <bs.Navbar variant={dark ? 'dark' : 'light'}>
      <bs.Navbar.Brand className={'mr-auto'}>Boat Monitor</bs.Navbar.Brand>
      {
        <bs.Nav.Item>
          <bs.Button onClick={() => {
            localStorage.setItem("dark", (!dark).toString());
            setDark(!dark);
          }}>Lights
          </bs.Button>
        </bs.Nav.Item>
      }
    </bs.Navbar>
    <bs.Container>
      <bs.CardDeck className={'mb-3'}>
        <MapCard dark={dark}/>
      </bs.CardDeck>
      <bs.CardDeck className={'mb-3'}>
        <PacketCard/>
        <RecentPacketsCard/>
      </bs.CardDeck>
    </bs.Container>
  </div>;
}

export default App;
