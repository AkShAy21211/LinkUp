import React from 'react'
import { useAuth } from '../context/AuthContext';

const Home = () => {
      const { signOutUser } = useAuth();
    
  return (
    <button className='bg-blue-500' onClick={signOutUser}>signout</button>
  )
}

export default Home