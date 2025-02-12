import React from 'react'

const BeatLicensing = () => {
  return (
    <div className='md:bg-[#141414] flex flex-col gap-y-6 md:px-6 md:py-7 rounded-md w-full'>
        <div className='w-full flex justify-between items-center'>
            <div className='hidden md:block text-xl font-medium'>Licensing</div>
            <div className='flex w-full md:w-auto items-center justify-around gap-x-4'>
                <div className='hidden md:block'>Total:</div>
                <button className='hidden md:block hover:bg-neutral-700/90 px-4 py-2 rounded-md bg-neutral-700/50 text-white'>Add to Cart</button>
                <button className='w-full md:w-auto hover:bg-blue-500 px-4 py-3 md:py-2 rounded-md bg-blue-600 text-white'>Buy now</button>
            </div>
        </div>
        <hr className="w-full hidden md:block border-0 h-[1.5px] bg-neutral-700/70" />
    </div>
  )
}

export default BeatLicensing