import React from 'react'
import UploadBeat from '../components/UploadBeat'
import BeatInfo from '../components/BeatInfo'
import NavigateRoutes from '../components/NavigateRoutes'

const uploadFiles = () => {

  return (
    <div className='w-full bg-[#090909] min-h-screen flex flex-col items-center py-32'>
        <UploadBeat />
    </div>
  )
}

export default uploadFiles