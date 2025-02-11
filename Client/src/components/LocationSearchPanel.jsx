import React from 'react'

export default function LocationSearchPanel({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination }) {

    const handleSuggestionsClick = (suggestions) => {
        if (activeField === 'pickup') {
            setPickup(suggestions);
        } else if (activeField === 'destination') {
            setDestination(suggestions);
        }
    };

    return (
        <div>
            {suggestions.length === 0 ? (
                <p className="text-gray-500 text-center my-4">No suggestions available</p>
            ) : (
                suggestions?.map((location, index) => (
                    <div 
                        key={index} 
                        onClick={() => handleSuggestionsClick(location)} 
                        className='flex items-center justify-start border-2 active:border-black rounded-lg my-4 gap-4 p-2'
                    >
                        <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'>
                            <i className='ri-map-pin-fill'></i>
                        </h2>
                        <h4 className='font-medium'>{location}</h4>
                    </div>
                ))
            )}
        </div>
    );
}

