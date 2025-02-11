import React from 'react'

export default function WaitingForDriver(props) {

    return (
        <div>
            <h5 className='absolute top-1 left-[47%]  text-xl' onClick={() => { props.setWaitingPanel(false) }}><i className='ri-arrow-down-wide-line text-2xl'></i></h5>
            
            <div className='flex items-center justify-between'>
                <img className='h-20 object-contain' src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIREBUQEhAVEBUQDxAPDxAQEBAQFQ8PFREWFhUWFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NGg0NDy0ZFRkrKysrKystKysrLSsrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKgBKwMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAQIDBQYHBAj/xAA8EAACAQMBBQYEAwcCBwAAAAAAAQIDBBEFBhIhMUEHE1FhcZEiMoGhQlLRFCNicpKxwUNTFTNUgqLC4f/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A7iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ2BILbrLxLVS5f4YOT82ooD0jJgr2reP5FCPpLj7s1PWKl7HLqQm14pua+wHQql5TjzqRXrJHnlrFBf6sfuzj1bV34nkqau/EDtX/ABy3/wB1fcl61Q6VE/JHDnq8vEmOry8QO1S2horm5eu62vsem11ajU+WrF+WeJxSlrcl+L7nqhq+efHz5P3A7amScm0/aivR+Sp3kf8AbqPPtLobpoG2NC5fdt91U6058M+j6gbKCEyQAAAAAAAAAAAAAAAAAAAAAAAAAAAFE6iXmU16mF68Dy74FdW6S4OSj5ZweK41GkuG/wD0vLZVe2cKsd2ayYWpozpcabePyviB4toNvKNnJQ7uU5OO9hYXDpls1mr2tTz8NssfxT/RFzb7RnXpd/CP72invRX+pT6481zOYZyB0+27W3n95a8Ou5P9UbVovaBZXLUe87mT4btVbuX5PkzgrIA+h9c2VtruO9uqE2vhq08L3XKSOR7UaBXsZ4qLehJ/BVjndl+j8hsntzcWUlGTdaj1pyeXFeMH09Dsdrc2upWvDFWnUWJRfOL8H4NAfPrrhXBsO2GyLsauMuVKbbpT/wDV+aNedvHxYRVG5L9O6PHK28H7luSlHmgrN0r3zPS66nz5rjGSeHF+KfQ12FY9NO4A6Psvt9Ut2qV23UpcFG46w8O88vM6ra3EakVOElKMllNPKaPm6ncZ4P2Nh2S2rqWE0uNS3b+OnzdL+KHl5Ad1B5dN1CncU41aUlOM0mmjDa/tzp9lPu7i7hCfDNNZnKKfio5x9QNjB5dM1Clc0oV6M1Up1FvQnHOJLOD1AAAAAAAAAAAAAAAAAAAAAAHj1F8F6niUz16r8q/m/wAGobS7YWmn7v7RV3ZT4xpwi5za8cLkvUDZJ191OT6Jt48lk8um67b3D3YVFvf7cvhkvozGbObUWt/Fytqynu/NBpxnH1i+Jk1a0+8VXu476zie6srPPiBeurBS4rgzSdf2CpVW5Rj3U3l71Pk34uPJm+Rqle+nzA4Nqmxt1Ry1HvYrrDn9Yv8Awa9VpuLxKLi/CSaf3PpWpawl0MRqezFGssTpxn/NFMD5+M1sptJVsKyqQeYNpVafScf1Nz1js3p8ZU5ul5P4o/fl7ml6jsxXpN4cKyXWnOLf9Ocgdxqxt9Ts+D3qdaOYvrTn0fk0zh+s6dO1rzoVFiUHjPSUejXk0Zvs42llZ3H7PWzGlWkk1LK7up0lx6Pkzcu1PQe+t1dQWZ0F8ePx0evtzA5LvEqRZySmEVTop8uDLEk48y+pFTkuuPqBap1T10qxaoadUqSxRpzqZ6QhKX3Rs+k9nl9Vw5QVBPrUks/0rIE7KbSzs5NKT7qomqkVzg2sb8PBrmadtbsNWhdQjZxrXtO5gqtOqoupKU2/i3pJYTz4+J2fRezWhTxKvUlWf5V8EP1ZuNGwhTio013aisRUPhx7BWO7OdFq2WmULatjvIQbmk8qLlJy3c9cZNlPPGbXXPqXI1V14AXAAAAAAAAAAAAAAAAAAABGSMgeHWfkT8JcfZnztpmz89e1O5rVKrp0adRxc1hvdTapwhnguCyfSVzSU4uEuUlh+RyXsntlRhe0lzp6jWg/FqPCOfoBp20Wx1xoVWGoWdWVWnTklU3liUU3xU8cHB8vLgdj0LVYXdvTuKfy1YKaX5X1T808om+to3FCpRqRTjVpyhJc+Elg5/2L3co0rmxm8u1uZKPlFtp/+UX7gdPUipSLCkVKQFddOUJRUnFyi0pLnFtczGaZC9pVFGpVhWpccya3Zrw9TIqRVvAc+7cLC7r21J20ZzjTnN14UnLLTjwbivmXM4DUpTpy+KMqcl4pxa9z6/3jz17WnP5qcZesYsDmPZXoqurCX7VF1HKrLue8y3GGEuDfHGcnVtOtJRo9zU+NKLp5bzvQxjj9C1a20YfKlH0WDJUqgHMKnZRUdSTVxCEHKTgt2Umo54J8j2W/ZNT/AB3U3/JCMf75OlReScBGk23ZlYx+ZVKn81Rr7IzNnsjY0uMbWnldZR3n9zOklFqlQjFYjFRXhFJf2LmCQAAAAAATGTXL2LsKmfJlkhgeoFmnV6P3LxFAAAAAAAAACADIBDYByPBd6hGHmz2SRjL7Td7imBibzWJvOHg0DZm/VtrF1bTeI32Lmi3+Krh7yXnz9jc7+xnHmvY55tzolWqo1qOVWt5b9KUeEvHAHVFM4vsNtDSoazeb8lCFzVrKEm8RclVbXHzyzHXvanfOhK3lThTqbrpzrYkprhh/DyUvM0FJvzA+saN3GSypJ+jPQpnzJoW0F3a/8utJL8knvR9ny+h0HRO1LlG5puPTfp/Evqua+4HXFIqUjX9J2koXCzTqxn5JrK9UZiFZPqB6d4nJZUipSAuplyMywpFSkB64VT0U6xjlI8q1q3U+7dxSU+W53kM59MgbEnknB4qVY9UJ5KKsDBORkIjBBVkZApAc0UuYFRGShyKXMgqlIv288rHgWY0usvhXmXLeqpNtclhIK9AAAAAAAABSVEAQRIkAUFLRW0RgDz1KSfNGKvtEhPlwM20UuIHNNe2GpVeM6Man8W7xX1NQvNg6Mfli4+TO7yhk8N1pkJ84gcAudk93kjE3GhtdDuuobN9Y+xrV9ozXzRA5D+yzpvehKUGvxRbi/dGw6Rt1d2+FP9/Ffm4Sx6rmZ+80NPkjA3miY6Ab1onaDbVsRlLupP8ADU4cfJ8mbdQvIyWVJPPgz59udMa6FzT9WurV/uqskl+CXxR9nyA+h1MrUjlWi9pi4Ruabh034fFH6rmje9L1+jXjvU6kZrya4eqA0/tj2vnbQjZ0JuFStHfqzi8OFLOEk+jbT+iOb6fsBqVel+0QtpOLW9HelGM5rnlJvJs+t2avdpo0p8YKVLKfWnCG9j0b/udvjJJY5JcEBw7s/wBvbiwrqyvnPut7c/ep79tLkufHdO+W9fKTTynxT8Ucz7YNlI3VrK7pxxWto7zaXGpRXzJ+OOaL3Y9tC7mwVOcs1LWSpNvm6eMwftw+gHT+9I7wx/fMu0L5xWMJ+vQD1d4Tx8H7MsPVZflX3LctUn5L0QHtUJP8L+vAqVCXVpGLlqFR9X9kWZV5vm/dtgZmShH5p58kWamowj8kePizEvPVhAemrcSm8t/QyOlv4H/N/hGGTMzp8cQXn8X0fID2klCZUBJJGQBIAAEEgCCCohgQRgkAUDBW0Q0BbaKXEutEYAsuJ5riyjLmj3NFLiBq99s5F8Y8DXL/AEOUecc+h0eaPBdRm+CjkDlF5pCfQwV7onkdbuNEnPokYu72dmlyyBxy60lroY+NKpSlvQlKnJdYNxf2OqXukeMcGBvtE8EBrezGsTWsW1atLLk1RlNpJvKcU34vikd+ms464eT542h0mUY95DKlTkpprmseB1/YTaqF/bRllKrBKNennipL8SXg+YG1VYKUJQksqUXFrxTWDifY5WdHU7i2z8MqdSP1pVML7NnXdX1OFtQqV6kt2NODk2+rxwS828HBuzbV6dLVFXrTVNVFWTk3hKc+PF9APojfG8eWlcRksqSafJp5TLm+vEC7vDeLXeLxKZXEVzYF7eGTHXOuW9NZnVpwx1lOKMLe9oNlT5VlN+FNOf3XADbN1lNSrGKy3y55ZzS/7TXLhQoN+Eqjwv6UYKtqt1dP97UbT/BH4Yr6Ln9QOvabrdvVqOHeL4Wsflk+vE2mlPPFPJxrZ7TZzkkl/wDDrGk27pwUc8kBlIsqTLUC4gKwQiQKgQiQAAAAAARgkAUgqIwBBGCogCnBGCsAW8EOJcwRgC04luVPJ6MEYAxlzpsJ80jBX2zS5x9jb3EpcAOV6ps68NSj9cHL9Y2au7Gq7i1c0ll5pNqUPFY6o+n6lsnwaMXd6BTn0wB8raztDeXWIXFepUUX8j4JPzilz9THQtpPofSuq7DQnxdKM/PdWfc1u52CguUGvLAHJdPu7misU69SHgozaS9FyPetoL//AKur/Uv0N+nsO+kX7MR2Hl+R+zA0B6xey53VV/8Ae1/YsudeXzVqsvWrUf2ydNo7Bzf4H7GQt+z+X5fcDkVPTZN8smRtdFk+h2K12BS54RmbTY6jHmsgcg0/ZyTfyt/Q3bQ9i5PDkt1fc6Ja6XTp/LBL6HsjTAxWmaRCjHEV9TKRgXFEqSApiitIJFSAAEgSAAAAAAAAAAAAAAAARgABgYAAgYAAjA3QAI3RukABulLprwAAd0vBexHdLwJADu0NwACdwndAAndG6ABOCQABOAACJAAAAD//2Q==" alt="" />
                <div className='text-right'>
                    <h2 className='text-lg font-medium capitalize'>{props.ride?.captain.fullname.firstname +" "+ props.ride?.captain.fullname.lastname}</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ props.ride?.captain.vehicle.plate}</h4>
                    <p className='text-sm text-gray-600'>Car Name</p>
                    <h1 className='text-lg font-semibold'>{props.ride?.otp}</h1>
                </div>
            </div>

            <div className='flex flex-col gap-2 items-center justify-between'>

                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className='text-lg ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562.11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className='text-lg ri-map-pin-2-fill'></i>
                        <div>
                            <h3 className='text-lg font-medium'>562.11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className='text-lg ri-currency-line'></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{ props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
