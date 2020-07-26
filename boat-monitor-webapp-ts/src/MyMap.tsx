import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '50vh'
};

const center = {
  lat: 49.25,
  lng: -123.0
};

function MyMap() {
  const [map, setMap] = React.useState(null as (google.maps.Map | null))

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
    <LoadScript googleMapsApiKey="AIzaSyDEqIarZUPa9f26FvgSZnxWd6z-bgaYqY8">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={9}
        onLoad={onLoad}
        onUnmount={onUnmount}>
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyMap)
