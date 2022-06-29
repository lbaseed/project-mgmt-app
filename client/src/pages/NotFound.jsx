import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-5'>

        <FaExclamationTriangle className='text-danger' size='5em' />

        <p className='lead'>Sorry, This page does not Exist</p>

        <Link to='/' className='btn btn-outline-primary'>
            Go to Home
        </Link>
        
    </div>
  )
}
