import React, {useState} from 'react';
import * as bs from 'react-bootstrap';
import MyMap from "./MyMap";
// @ts-ignore
import * as formatcoords from 'formatcoords';

import * as firebase from "firebase/app";
import "firebase/firestore"
import {Async, useAsync} from "react-async";
import {useLocalStorage} from "./useLocalStorage";
import {ICoord, IDark} from "./I";
import {CollapsibleCard} from "./CollapsibleCard";
import Moment from "react-moment";
import {FakeLink} from "./FakeLink";

type LatLngLiteral = google.maps.LatLngLiteral;

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

interface Packet {
  Latitude: number;
  Longitude: number;
  'Date and Time': number;
}

type ISetCoord = { setCoord: (coord: LatLngLiteral) => void };
type IMaybePacket = { packet?: Packet };
type ISetPacket = { setPacket: (packet: Packet) => void };

interface FieldDef {
  "index": number,
  "name": string,
  "unit"?: string,
  "ctype": "UINT8" | "INT8" | "INT32",
  "bytes": 1.0,
  "min"?: number,
  "max"?: number,
  "display_scale": null,
  "display_offset": number,
  "real_range"?: string,
  "resolution"?: string,
  "start": number;
}

function Packet({packet, setCoord, setPacket, full = false}: IMaybePacket & ISetCoord & ISetPacket & { full?: boolean }) {
  if (packet === undefined) return <>"no data"</>;
  const received = new Date(packet['Date and Time']);
  const lat = packet["Latitude"];
  const lng = packet["Longitude"];
  const title = `${formatcoords(lat, lng).format()} at ${received.toString()}`;
  return <FakeLink title={title} onClick={() => {
    setCoord({lat, lng});
    setPacket(packet);
  }}>
    {formatcoords(lat, lng).format(full ? 'FFf' : 'f')} at {<Moment format={"YYYY-MM-DDTHH:mm:ssZ"}>{received}</Moment>}
  </FakeLink>
}

function formatNicely(x: any) {
  if (typeof x === 'number') {
    return parseFloat((x).toPrecision(10));
  } else if (x === undefined) {
    return 'n/a';
  } else {
    return x;
  }
}

function PacketCard({setCoord, packet, setPacket, fieldDefs}: ISetCoord & IMaybePacket & ISetPacket & { fieldDefs: Promise<FieldDef[]> }) {
  return <CollapsibleCard storageKey={"packetCardVisible"} header={"Selected Packet"}>
    <Packet packet={packet} setCoord={setCoord} setPacket={setPacket} full={true}/>
    <Async promise={fieldDefs}>
      {
        ({data, error, isLoading}) => {
          if (data && packet) {
            return <table className={'w-100'}>
              <tbody>{data.map(def => <tr key={def.name}>
                <td>{def.name}</td>
                <td>{formatNicely((packet as any)[def.name])}</td>
                <td>{def.unit}</td>
              </tr>)}</tbody>
            </table>
          } else {
            return <pre> {JSON.stringify(packet, null, 4)} </pre>
          }
        }
      }
    </Async>
  </CollapsibleCard>;
}

const RecentPacketsCard = React.memo(({setCoord, setPacket}: ISetCoord & ISetPacket) => {
  return <CollapsibleCard storageKey={"recentPacketsVisible"} header={"Recent Packets"}>
    <Async promiseFn={fetchPackets}>
      {
        ({data, error, isLoading}) => {
          if (isLoading) return "Loading...";
          if (error) return `Mistakes were made (${error.message})`;
          if (data) {
            setTimeout(() => {
              const packet = data[0].data().data;
              setPacket(packet);
              setCoord({lat: packet["Latitude"], lng: packet["Longitude"]});
            });
            console.log('loady');
            return (
              <span>
                {
                  data.map(d => <div key={d.id}><Packet packet={d.data().data} setCoord={setCoord}
                                                        setPacket={setPacket}/></div>)
                }
                </span>)
          }
        }
      }
    </Async>
  </CollapsibleCard>
});


function MapCard({dark, coord}: IDark & ICoord) {
  return <CollapsibleCard storageKey={"mapVisible"} header={<>Map</>}>
    <MyMap dark={dark} coord={coord}/>
  </CollapsibleCard>;
}

function fetchFieldDefs(): Promise<FieldDef[]> {
  return fetch('https://us-central1-haynes-boat-dev.cloudfunctions.net/getFieldDefs').then(r => r.json());
}

function FieldDefCard({fieldDefs}: { fieldDefs: Promise<FieldDef[]> }) {
  return <CollapsibleCard storageKey={"fieldDefsVisible"} header={"Field Definitions"}>
    <Async promise={fieldDefs}>
      {
        ({data, error, isLoading}) => {
          if (isLoading) return "Loading...";
          if (error) return `Mistakes were made (${error.message})`;
          if (data) {
            const keys = Object.keys(data[0]);
            return <table className={'table-bordered'}>
              <thead>
              <tr>
                {keys.map(key => <th key={key}>{key}</th>)}
              </tr>
              </thead>
              <tbody>
              {
                data.map(def => <tr key={def.name}>
                  {keys.map(key => <td key={key}>{(def as any)[key]}</td>)}
                </tr>)
              }
              </tbody>
            </table>
          }
        }
      }
    </Async>
  </CollapsibleCard>
}

function AppBody({dark}: IDark) {
  const [coord, setCoord] = useState({lat: 49.25, lng: -123});
  const [packet, setPacket] = useState(undefined as (Packet | undefined));
  const fieldDefs = useAsync(fetchFieldDefs);
  return <>
    <bs.CardDeck className={'mb-3'}>
      <MapCard dark={dark} coord={coord}/>
    </bs.CardDeck>
    <bs.CardDeck className={'mb-3'}>
      <PacketCard packet={packet} setCoord={setCoord} setPacket={setPacket} fieldDefs={fieldDefs.promise}/>
      <RecentPacketsCard setCoord={setCoord} setPacket={setPacket}/>
    </bs.CardDeck>
    <bs.CardDeck>
      <FieldDefCard fieldDefs={fieldDefs.promise}/>
    </bs.CardDeck>
  </>;
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
      <AppBody dark={dark}/>
    </bs.Container>
  </div>;
}

export default App;
