import { Beat } from '@/types'
import React from 'react'
import BeatCards from './BeatCards';

interface UserBeatsProps {
    beats: Beat[];
}

const UserBeats: React.FC<UserBeatsProps> = ({
    beats
}) => {
  return (
    <>
        <div className=' min-h-[440px] w-[900px] p-2 bg-[#141414] rounded-md'>
        <div className='p-4 text-lg font-bold'>
            Your Tracks
        </div>
            <BeatCards className='mt-0 2xl:grid-cols-4' beats={beats}/>
        </div>
    </>
  )
}

export default UserBeats