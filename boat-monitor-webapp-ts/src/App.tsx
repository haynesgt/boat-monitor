import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
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
import 'moment-timezone';

import {FakeLink} from "./FakeLink";
import downloadObjectAsJson from "./downloadObjectAsJson";
import {Download, Geo, Search} from "react-bootstrap-icons";

type LatLngLiteral = google.maps.LatLngLiteral;

const firebaseConfig = {
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

async function fetchPackets(limit: number = 10) {
  const firestore = firebase.firestore();
  const packets = firestore.collection("packets");
  const latestPackets = (await packets.orderBy("recieved", "desc").limit(limit || 10).get())
  return latestPackets.docs;
}

interface ProducesData {
  data: () => any;
}

interface Packet {
  data: {
    Flags1: number;
    Latitude: number;
    Longitude: number;
    'Date and Time': number;
    'Boat Status': number;
  },
  // The "request" is the HTTP request body that the server received when the packet was created
  request: {
    get: () => Promise<ProducesData>
  };
}

type ISetCoord = { setCoord: (coord: LatLngLiteral) => void };
type IMaybePacket = { packet?: Packet };
type ISetPacket = { setPacket: (packet: Packet) => void };

const t2020 = new Date("2000-01-01").getTime();

interface FieldDef {
  "index": number,
  "name": string,
  "unit"?: string,
  "ctype": "UINT8" | "INT8" | "INT16" | "UINT16" | "UINT32" | "INT32",
  "bytes": 1.0,
  "min"?: number,
  "max"?: number,
  "display_scale": null,
  "display_offset": number,
  "real_range"?: string,
  "resolution"?: string,
  "start": number;
  "bits"?: { name: string; setLabel: string; unsetLabel: string }[];
}

function Packet({packet, setCoord, setPacket}: IMaybePacket & ISetCoord & ISetPacket) {
  const packetData = packet?.data;
  if (packet === undefined || packetData === undefined) return <>"no data"</>;
  const received = new Date(packetData['Date and Time'] + t2020);
  const lat = packetData["Latitude"];
  const lng = packetData["Longitude"];
  const title = `${formatcoords(lat, lng).format('Ff')} at ${received.toString()}`;
  return <span title={title}><FakeLink onClick={() => {
    setCoord({lat, lng});
    setPacket(packet);
  }}><Geo/></FakeLink>
    {formatcoords(lat, lng).format('Ff')} at {<Moment format={"YYYY-MM-DD HH:mm:ss UTCZ"}>{received}</Moment>}
  </span>
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

function PacketCard({setCoord, packet, setPacket, fieldDefsPromise}: ISetCoord & IMaybePacket & ISetPacket & { fieldDefsPromise: Promise<FieldDef[]> }) {
  const [request, setRequest] = useState();
  const packetData = packet?.data;
  const packetRequest = packet?.request;
  useEffect(() => {
    packetRequest?.get().then(packetRequestDocument => {
      setRequest(packetRequestDocument?.data());
    })
  }, [packetRequest]);
  return <CollapsibleCard storageKey={"packetCardVisible"} header={"Selected Packet"}>
    <Async promise={fieldDefsPromise}>
      {
        ({data: fieldDefs}) => {
          return <span>
            <h4>Summary</h4>
            {packetData ? <ul>
              <li>
                <FakeLink onClick={() => setCoord({lat: packetData["Latitude"], lng: packetData["Longitude"]})}>
                  <Geo/> Show in Map</FakeLink>
              </li>
              {fieldDefs ? (
                  <span>
                <li>{fieldDefs.filter(def => def.name === 'Boat Status')[0].real_range?.split(',')[packetData['Boat Status']]}</li>
                <li>Flags:
                  <ul>
                  {fieldDefs[0]['bits']?.reduce(({bits, elements}: { bits: number, elements: JSX.Element[] }, bitDef) =>
                      ({
                        bits: bits >> 1,
                        elements: [...elements,
                          <li key={bitDef.name}>{bitDef.name}: {(bits % 2) ? bitDef.setLabel : bitDef.unsetLabel}</li>]
                      }),
                    {bits: packetData['Flags1'], elements: []}
                  ).elements}
                  </ul>
                </li>
                  </span>
                )
                : undefined}
              <li>{formatcoords(packetData["Latitude"], packetData["Longitude"]).format('Ff')}</li>
              <li><Moment format={"YYYY-MM-DD HH:mm:ss UTCZ"}>{packetData['Date and Time'] + t2020}</Moment></li>
              <li><Moment tz={'utc'} format={"YYYY-MM-DD HH:mm:ss UTCZ"}>{packetData['Date and Time'] + t2020}</Moment></li>
            </ul> : <></>
            }
            <h4>Details</h4>
            {fieldDefs && packetData ? <table className={'w-100'}>
              <tbody>
              {fieldDefs.map(def => <tr key={def.name}>
                  <td>{def.name}</td>
                  <td>{formatNicely((packetData as any)[def.name])}</td>
                  <td>{def.unit}</td>
                </tr>
              )}
              </tbody>
            </table> : <pre> {JSON.stringify(packetData, null, 4)} </pre>
            }
            <h4>Raw Data</h4>
            {
              request ? JSON.stringify(request) : "Loading..."
            }
          </span>;
        }
      }
    </Async>
  </CollapsibleCard>;
}

function PacketsForm({packetLimit, setPacketLimit}: { packetLimit: number, setPacketLimit: Dispatch<SetStateAction<number>> }) {
  const [packetInput, setPacketInput] = useState(packetLimit);
  return <bs.Form onSubmit={(e) => {
    e.preventDefault();
    setPacketLimit(packetInput);
  }} className={'form-inline'}>
    <bs.Form.Label className={'mr-3'} htmlFor={'packetCount'}>Packet Limit</bs.Form.Label>
    <bs.FormControl className={'mr-3'} name={'packetCount'} type={'number'}
                    onChange={e => setPacketInput(parseInt(e.target.value))} value={packetInput}/>
    <bs.Button onClick={() => setPacketLimit(packetInput)}><Search/></bs.Button>
  </bs.Form>;
}

const RecentPacketsCard = React.memo(({setCoord, setPacket}: ISetCoord & ISetPacket) => {
  const [packetLimit, setPacketLimit] = useLocalStorage('packetCount', 10);
  return <CollapsibleCard storageKey={"recentPacketsVisible"} header={"Recent Packets"}>
    <div style={{position: 'relative'}}>
      <PacketsForm packetLimit={packetLimit} setPacketLimit={setPacketLimit}/>
      <Async promise={fetchPackets(packetLimit)}>
        {
          ({data, error, isLoading}) => {
            if (isLoading) return "Loading...";
            if (error) return `Mistakes were made (${error.message})`;
            if (data) {
              setTimeout(() => {
                const packet = {
                  data: data[0].data().data,
                  request: data[0].data().request,
                };
                setPacket(packet);
                setCoord({lat: packet.data["Latitude"], lng: packet.data["Longitude"]});
              });
              const packets = data.map(d => ({data: {...d.data().data}, id: d.id, request: d.data().request}));
              return (
                <div>
                  <bs.Button style={{position: 'absolute', top: '0', right: '0'}}
                             onClick={() => downloadObjectAsJson(packets, "packets")}>
                    <Download/>
                  </bs.Button>
                  {
                    packets.map(d => <div key={d.id}><Packet packet={d} setCoord={setCoord}
                                                          setPacket={setPacket}/></div>)
                  }
                </div>)
            }
          }
        }
      </Async>
    </div>
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
            const keys = Object.keys(data[0]).filter(key => key !== 'bits');
            return <table className={'table-bordered'}>
              <thead>
              <tr>
                {keys.map(key => <th key={key}>{key}</th>)}
              </tr>
              </thead>
              <tbody>
              {
                data.map(def => <tr key={def.name}>
                  {keys.map(key => <td key={key}>{(key in def) ? JSON.stringify((def as any)[key]) : 'n/a'}</td>)}
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
      <PacketCard packet={packet} setCoord={setCoord} setPacket={setPacket} fieldDefsPromise={fieldDefs.promise}/>
      <RecentPacketsCard setCoord={setCoord} setPacket={setPacket}/>
    </bs.CardDeck>
    <bs.CardDeck>
      <FieldDefCard fieldDefs={fieldDefs.promise}/>
    </bs.CardDeck>
  </>;
}

function App() {
  const [dark, setDark] = useLocalStorage<boolean>("dark", false);
  let newStylesheetHref: string;
  if (dark) {
    newStylesheetHref = 'https://bootswatch.com/4/darkly/bootstrap.css';
  } else {
    newStylesheetHref = 'https://bootswatch.com/4/flatly/bootstrap.css';
  }
  (document.getElementById('bootstrap-stylesheet') as any).href = newStylesheetHref;
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
    <div style={{"width": "300px", "marginLeft": "auto", "marginRight": "auto"}}>
      <br/><br/>
      Made by Gavin Haynes - <a href={"https://github.com/haynesgt/boat-monitor"}>GitHub</a>
      <br/><br/><br/>
    </div>
  </div>;
}

export default App;
