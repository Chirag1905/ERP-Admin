'use client';
import React, { useEffect, useState } from 'react'
import { auth_forgot_password } from '@/assets/images/'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { clearAuthError, clearAuthState, forgotPassRequest, forgotPassSuccess } from '@/Redux/features/auth/authSlice';
import Image from 'next/image';

export default function ForgotPassword() {
    const dispatch = useDispatch();
    const {
        isAuthenticated,
        loading,
        error,
        forgotPassData,
        isTempPass
    } = useSelector((state) => state.auth);
    const router = useRouter();
    const [email, setEmail] = useState('');

    const handleSubmit = async () => {
        const params = {
            email: email,
            clientId: "admin-cli",
            realmName: "master"
            // clientId: "test4-fe-client",
            // realmName: "test4"
        };
        toast.loading('Logging in...', { id: 'login-toast' });
        dispatch(forgotPassRequest(params));
    };

    // Show toast based on loading state
    useEffect(() => {
        if (loading) {
            toast.loading('Logging in...', { id: 'login-toast' });
        } else {
            toast.dismiss('login-toast');
        }
    }, [loading]);


    // Show success or error toast and redirect
    useEffect(() => {
        if (!loading && forgotPassData) {
            toast.success('Email sent successfully! Please check your email for the temporary password.', { id: 'login-status' });
            router.push('/signIn');
        } else if (error) {
            toast.error('Failed to send temporary password email. Please try again.', { id: 'login-status' });
        }
        dispatch(forgotPassSuccess(null));
    }, [forgotPassData, error, router]);

    return (
        <>
            <div className='flex justify-center sm:mb-6 mb-4'>
                <Image
                    src={auth_forgot_password}
                    alt='forgot password'
                    width={240}
                    height={178}
                />
            </div>
            <p className='sm:text-[40px]/[48px] text-[30px]/[36px] font-medium mb-2 text-center'>
                Forgot password?
            </p>
            <p className='text-center sm:mb-12 mb-6 text-font-color-100'>
                Enter the email address you used when you joined and we'll send you instructions to reset your password.
            </p>
            <div className='form-control mb-20'>
                <label htmlFor='email' className='form-label'>
                    Email
                </label>
                <input
                    type='email'
                    id='email'
                    placeholder='name@example.com'
                    className='form-input'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button className='btn btn-secondary large w-full uppercase'
                onClick={handleSubmit}
                disabled={loading}>
                {loading ? 'Submiting...' : 'Submit'}
            </button>
            <div className='text-center sm:mt-30 mt-6'>
                <Link href="/signIn" prefetch={false} className='text-primary'>
                    Back to Sign in
                </Link>
            </div>
        </>
    )
}
