import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ConfirmRidePopUp(props) {

    const [OTP, setOTP] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: OTP
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmRidePopUpPanel(false)
            props.setRidePopUpPanel(false)
            navigate('/captain-riding', { state: { ride: response.data } });
        }
    }
    return (
        <div>
            <h5 className='absolute top-7 right-5 text-xl' onClick={() => { props.setConfirmRidePopUpPanel(false) }}><i className='ri-arrow-down-wide-line text-2xl'></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm to start this ride </h3>

            <div className='flex items-center justify-between mt-3 bg-yellow-400 rounded-lg p-3'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover' src="data:image/jpeg;base64,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" alt="" />
                    <h4 className='text-lg font-medium'>{props.ride?.user.fullname.firstname + ' ' + props.ride?.user.fullname.lasstname}</h4>
                </div>
                <h5 className='text-lg font-medium'>2.2km</h5>
            </div>

            <div className='flex flex-col gap-2 items-center justify-between'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className='text-lg ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562.11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className='text-lg ri-map-pin-2-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562.11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className='text-lg ri-currency-line'></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <div className='mt-6 w-full'>
                    <form onSubmit={handleSubmit}>
                        <input className='bg-[#eee] px-6 py-4 text-lg font-mono border-1 rounded-lg w-full mt-3' value={OTP} onChange={(e) => { setOTP(e.target.value) }} type="text" placeholder='Enter OTP' />
                        {/* <Link to='/captain-riding' onClick={() => { props.setConfirmRidePopUpPanel(false), props.setRidePopUpPanel(false) }} className='bg-green-600 flex justify-center mt-5 w-full text-white font-semibold p-3 rounded-lg'>Confirm</Link> */}
                        <button onClick={() => { props.setConfirmRidePopUpPanel(false), props.setRidePopUpPanel(false) }} className='bg-green-600 flex justify-center mt-5 w-full text-white font-semibold p-3 rounded-lg'>Confirm</button>
                        <button onClick={() => { props.setConfirmRidePopUpPanel(false), props.setRidePopUpPanel(false) }} className='bg-red-600 mt-2 w-full text-lg text-white font-semibold p-3 rounded-lg'>Cancel</button>
                    </form>
                </div>
            </div>

        </div>
    )
}
