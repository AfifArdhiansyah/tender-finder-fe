import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

interface GoogleMapsProps {
    latitude: number;
    longitude: number;
}

export default function GoogleMaps({
    latitude,
    longitude
}: GoogleMapsProps){
    return <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
        <Map
            style={{width: '100%', height: '70vh'}}
            defaultCenter={{lat: latitude, lng: longitude}}
            defaultZoom={15}
        >
            <Marker
                position={{
                    lat: latitude,
                    lng: longitude
                }}
            />
        </ Map>
  </APIProvider>
}