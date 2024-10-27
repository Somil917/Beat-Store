import React from 'react'
import UserProfileAlter from './components/UserProfileAlter'

export const revalidate = 0;

const Profile = () => {
  return (
    <div className='bg-[#0e0e0d] w-full p-2 min-h-screen flex justify-center items-center'>
        <UserProfileAlter/>
    </div>
  )
}

export default Profile