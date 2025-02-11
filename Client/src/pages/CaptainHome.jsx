import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import axios from 'axios'
import { useCaptainContext } from '../context/CaptainContext'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'
import { LoadScript } from '@react-google-maps/api'

export default function CaptainHome() {

  const [ride, setRide] = useState(null)
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)

  const ridePopUpRef = useRef(null);
  const confirmRidePopUpRef = useRef(null);

  const { socket } = useContext(SocketContext)
  const { captain } = useCaptainContext();

  useEffect(() => {
    socket.emit('join', { userType: 'captain', userId: captain._id })

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation()
    return () => clearInterval(locationInterval)
  }, [])

  socket.on('new-ride', (data) => {
    console.log(data);

    setRide(data)
    setRidePopUpPanel(true)
  })

  async function confirmRide() {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id,
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  useGSAP(function () {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpRef.current, {
        translateY: '0%'
      })
    } else {
      gsap.to(ridePopUpRef.current, {
        translateY: '100%'
      })
    }
  }, [ridePopUpPanel]);

  useGSAP(function () {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpRef.current, {
        translateY: '30%'
      })
    } else {
      gsap.to(confirmRidePopUpRef.current, {
        translateY: '100%'
      })
    }
  }, [confirmRidePopUpPanel]);


  return (
    <div className='h-screen w-screen'>
      <div className='fixed p-6 top-16 z-20  flex items-center justify-between w-screen'>
        <svg className='w-17' xmlns="http://www.w3.org/2000/svg" height="50" width="90" viewBox="-139.03575 -80.44425 1204.9765 482.6655"><path d="M53.328 229.809c3.917 10.395 9.34 19.283 16.27 26.664 6.93 7.382 15.14 13.031 24.63 16.948 9.491 3.917 19.81 5.875 30.958 5.875 10.847 0 21.015-2.034 30.506-6.102 9.491-4.068 17.776-9.792 24.856-17.173 7.08-7.382 12.579-16.194 16.496-26.438 3.917-10.244 5.875-21.692 5.875-34.347V0h47.453v316.354h-47.001v-29.376c-10.545 11.147-22.974 19.734-37.285 25.761-14.312 6.025-29.752 9.038-46.323 9.038-16.873 0-32.615-2.938-47.228-8.813-14.612-5.875-27.267-14.235-37.962-25.082-10.695-10.847-19.132-23.876-25.308-39.092C3.088 233.575 0 216.628 0 197.947V0h47.453v195.236c0 12.655 1.958 24.178 5.875 34.573zM332.168 0v115.243c10.545-10.545 22.748-18.905 36.607-25.082 13.859-6.177 28.924-9.265 45.193-9.265 16.873 0 32.689 3.163 47.453 9.49 14.763 6.327 27.567 14.914 38.414 25.761 10.847 10.847 19.434 23.651 25.761 38.414 6.327 14.764 9.49 30.431 9.49 47.002 0 16.57-3.163 32.162-9.49 46.774-6.327 14.613-14.914 27.343-25.761 38.188-10.847 10.847-23.651 19.434-38.414 25.761-14.764 6.327-30.581 9.49-47.453 9.49-16.27 0-31.409-3.088-45.419-9.265-14.01-6.176-26.288-14.537-36.833-25.082v28.924h-45.193V0zm5.197 232.746c4.067 9.642 9.717 18.078 16.948 25.309 7.231 7.231 15.667 12.956 25.308 17.174 9.642 4.218 20.036 6.327 31.184 6.327 10.847 0 21.09-2.109 30.731-6.327 9.641-4.218 18.001-9.942 25.083-17.174 7.08-7.23 12.729-15.667 16.947-25.309 4.218-9.641 6.327-20.035 6.327-31.183s-2.109-21.618-6.327-31.41c-4.218-9.792-9.867-18.303-16.947-25.534-7.081-7.23-15.441-12.88-25.083-16.947-9.642-4.067-19.885-6.102-30.731-6.102s-21.09 2.034-30.731 6.102c-9.641 4.068-18.077 9.717-25.309 16.947-7.23 7.231-12.955 15.742-17.173 25.534-4.218 9.792-6.327 20.262-6.327 31.41-.001 11.148 2.033 21.542 6.1 31.183zm223.477-77.732c6.025-14.462 14.312-27.191 24.856-38.188 10.544-10.997 23.049-19.659 37.511-25.986 14.462-6.327 30.129-9.49 47.001-9.49 16.571 0 31.937 3.013 46.098 9.038 14.16 6.026 26.362 14.387 36.606 25.083 10.244 10.695 18.229 23.35 23.952 37.962 5.725 14.613 8.587 30.506 8.587 47.68v14.914H597.901c1.507 9.34 4.52 18.002 9.039 25.985 4.52 7.984 10.168 14.914 16.947 20.789 6.779 5.876 14.462 10.471 23.049 13.784 8.587 3.314 17.7 4.972 27.342 4.972 27.418 0 49.563-11.299 66.435-33.896l32.991 24.404c-11.449 15.366-25.609 27.418-42.481 36.155-16.873 8.737-35.854 13.106-56.944 13.106-17.174 0-33.217-3.014-48.131-9.039-14.914-6.025-27.869-14.462-38.866-25.309-10.997-10.847-19.659-23.576-25.986-38.188-6.327-14.612-9.491-30.506-9.491-47.679-.002-16.269 3.012-31.635 9.037-46.097zm63.497-17.852c-12.805 10.696-21.316 24.932-25.534 42.708h140.552c-3.917-17.776-12.278-32.012-25.083-42.708-12.805-10.695-27.794-16.043-44.967-16.043-17.174 0-32.163 5.348-44.968 16.043zm246.527 5.197c-9.641 10.545-14.462 24.856-14.462 42.934v131.062h-45.646V85.868h45.193v28.472c5.725-9.34 13.182-16.722 22.371-22.145 9.189-5.424 20.111-8.136 32.766-8.136h15.817v42.482h-18.981c-15.064.001-27.417 5.273-37.058 15.818z" fill="#000000" /></svg>

        <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className='text-lg font-medium ri-logout-box-r-line'></i>
        </Link>
      </div>

      <div className='h-2/3'>
        {/* <img className='h-full w-full object-cover' src="https://user-images.githubusercontent.com/6416095/52931260-c6bb5e80-3371-11e9-9d46-83f7d1389d18.gif" alt="" /> */}
            
            <LiveTracking />
        
      </div>


      <div className='h-1/3 p-6'>
        <CaptainDetails />
      </div>

      {/* ride pop up */}
      <div ref={ridePopUpRef} className='bg-white w-full fixed z-10 bottom-0 translate-y-full px-3 py-6'>
        <RidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          confirmRide={confirmRide} />
      </div>

      {/* confirm ride pop up */}
      <div ref={confirmRidePopUpRef} className='bg-white w-full h-screen fixed z-10 bottom-0 translate-y-full px-3 py-6'>
        <ConfirmRidePopUp
         ride={ride}
         setRidePopUpPanel={setRidePopUpPanel}
         setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
      </div>

    </div>
  )
}
