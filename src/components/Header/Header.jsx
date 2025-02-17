import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
    const user = useSelector((state)=>state?.authreducer?.user)
  return (
    <div className='flex justify-around items-center gap-3 border border-gray-400'>
        <div>
            <h1 className='text-4xl text-blue-400 font-bold'>CHITSHAT</h1>
        </div>
        <div>
            <h1 className='text-2xl text-blue-400 font-light'>{user?.username}</h1>
        </div>
    </div>
  )
}

export default Header