import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({text}) => <div>{text}</div>;

const SimpleMap = () => {
    const props = {
        center: {
            lat: 49.255,
            lng: -122.918
        },
        zoom: 11
    };
    return (
        // Important! Always set the container height explicitly
        <div style={{height: '50vh', width: '50%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{key: "AIzaSyDEqIarZUPa9f26FvgSZnxWd6z-bgaYqY8"}}
                defaultCenter={props.center}
                defaultZoom={props.zoom}>
                <AnyReactComponent
                    lat={49.255430}
                    lng={-122.917700}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
}

export default SimpleMap;
