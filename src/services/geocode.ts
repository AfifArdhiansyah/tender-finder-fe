export async function getGeocode(address: string): Promise<{ lat: number, lng: number } | null> {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`);
    const data = await response.json();

    if (data.status === 'OK') {
        const location = data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
    } else {
        console.error('Geocode was not successful for the following reason:', data.status);
        return null;
    }
}