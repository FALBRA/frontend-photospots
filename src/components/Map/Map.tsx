import { useEffect } from 'react'
import { MapContainer, useMap } from 'react-leaflet'
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk'
import 'leaflet/dist/leaflet.css'
import './Map.css'

function MapTilerLayer() {
    const map = useMap()

    useEffect(() => {
        const apikey = import.meta.env.VITE_MAPTILER_API_KEY

        if (!apikey) {
            console.error('MapTiler API key no encontrada')
            return
        }

        const maptilerLayer = new MaptilerLayer({
            apiKey: apikey,
            style: 'https://api.maptiler.com/maps/01a063ee-b735-72e6-8ff4-af3f7683d763/style.json',
        })

        maptilerLayer.addTo(map)

        return () => {
            map.removeLayer(maptilerLayer)
        }
    }, [map])

    return null
}

function Map() {
    return (
        
        <MapContainer
            center={[-9.93, -76.24]}
            zoom={15}
            style={{ width: '100%', height: '100vh' }}
        >
            <MapTilerLayer />
        </MapContainer>
    )
}
export default Map