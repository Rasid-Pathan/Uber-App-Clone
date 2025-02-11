import React, { useState, useEffect, useCallback } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100%',
}

// ✅ Ensure 'marker' library is included
const libraries = ['places', 'marker']

function LiveTracking() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_BASE_API,
    libraries,
  })

  const [map, setMap] = useState(null)
  const [location, setLocation] = useState(null)
  const [marker, setMarker] = useState(null)

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          console.log('User location:', newLocation)
          setLocation(newLocation)
        },
        (error) => console.error('Error getting location:', error)
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }

  useEffect(() => {
    getUserLocation()
    const interval = setInterval(getUserLocation, 2000)
    return () => clearInterval(interval)
  }, [])

  const onLoad = useCallback((map) => {
    console.log('Map Loaded:', map)
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  useEffect(() => {
    if (isLoaded && map && location) {
      console.log('Map Ready:', map)
      console.log('Creating marker at:', location)

      // ✅ Remove previous marker before adding a new one
      if (marker) {
        marker.map = null
      }

    //   const newMarker = new google.maps.marker.AdvancedMarkerElement({
    //     map,
    //     position: new google.maps.LatLng(location.lat, location.lng), // ✅ Ensure correct LatLng format
    //   })
    const newMarker = new google.maps.Marker({
        map,
        position: new google.maps.LatLng(location.lat, location.lng),
      })
      

      setMarker(newMarker)
      console.log('Marker added:', newMarker)
    }
  }, [isLoaded, map, location])

  if (loadError) return <p>Error loading map</p>
  if (!isLoaded) return <p>Loading map...</p>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location || { lat: 0, lng: 0 }}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
    />
  )
}

export default React.memo(LiveTracking)
