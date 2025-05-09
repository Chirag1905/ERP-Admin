import React from 'react'
import { Link } from 'react-router-dom'
import { auth_maintenance } from '../../assets/images'

export default function Maintenance() {
    return (
        <>
            <div className='flex justify-center sm:mb-6 mb-4'>
                <img src={auth_maintenance} width="240" height="148" alt='auth maintenance' />
            </div>
            <p className='sm:text-[40px]/[48px] text-[30px]/[36px] font-medium mb-2 text-center'>
                Under Construction!
            </p>
            <p className='text-center sm:mb-12 mb-6 text-font-color-100'>
                To make things right we need some time to rebuild
            </p>
            <div className='floating-form-control mb-20'>
                <input type='email' id='email' className='form-input' placeholder="Email" />
                <label htmlFor='email' className='form-label'>Email</label>
            </div>
            <Link to="/" className='btn btn-secondary large w-full uppercase mb-20'>
                Send
            </Link>
            <p className='text-font-color-100 text-center'>
                Get notified when we are done.
            </p>
        </>
    )
}
