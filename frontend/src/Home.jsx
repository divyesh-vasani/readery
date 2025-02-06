import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const Home = () => {
  const { user, loading, error } = useSelector((state) => state.auth);
  console.log(user, "from home page")
  return (
    <div>Home

        <Link to={'/login'}>Login</Link>
        <Link to={'/profile'}>Profile</Link>
    </div>
  )
}

export default Home