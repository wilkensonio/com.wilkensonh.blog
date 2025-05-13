import React from 'react'
import { Link } from 'react-router-dom'


export const Subscribe: React.FC = (): JSX.Element => {
  return (
    <div className="outline outline-2 outline-white mt-5 w-full text-center rounded-full"> 
        <Link to='/'>Subscribe</Link>
    </div>
  )
}

export default Subscribe