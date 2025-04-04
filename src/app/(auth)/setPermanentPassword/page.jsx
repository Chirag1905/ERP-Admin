'use client';
import React, { useEffect, useState } from 'react'
import { auth_forgot_password } from '@/assets/images'
import Link from 'next/link';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { setPermanentPassRequest } from '@/Redux/features/auth/authSlice';

export default function SetPermanentPassword() {
    const dispatch = useDispatch();
    const { isAuthenticated, loading, error, loginData, token, isTempPass } = useSelector((state) => state.auth);
    // console.log("🚀 ~ SetPermanentPassword ~ token:", token)
    // console.log("🚀 ~ SetPermanentPassword ~ loginData:", loginData)
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleInputClick = () => {
        if (!password || password.trim().length === 0) {
            const newPassword = generateRandomPassword();
            setPassword(newPassword);
        }
    };

    const generateRandomPassword = () => {
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const specialChars = "!@#$%&*";

        // Ensure at least one of each required character
        let password =
            uppercase[Math.floor(Math.random() * uppercase.length)] + // At least one uppercase
            specialChars[Math.floor(Math.random() * specialChars.length)] + // At least one special character
            numbers[Math.floor(Math.random() * numbers.length)] + // At least one number
            lowercase[Math.floor(Math.random() * lowercase.length)]; // At least one lowercase

        const allCharacters = uppercase + lowercase + numbers + specialChars;

        // Fill the rest of the password with random characters
        for (let i = 4; i < 6; i++) {
            password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
        }

        // Shuffle the password to mix the required characters
        return password
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");
    };

    const handleSubmit = async () => {
        const params = {
            newPassword: password,
            clientId: "test5-fe-client",
            realmName: "test5",
        };
        toast.loading('Logging in...', { id: 'login-toast' });
        dispatch(setPermanentPassRequest({ params, token }));
        { isAuthenticated === true ? router.push("/") : router.push("/signIn") }
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
        if (!loading && isAuthenticated) {
            toast.success('Login successful!');
            router.push(isTempPass ? '/setPermanentPassword' : '/');
        } else if (!loading && error) {
            toast.error('Login failed. Please check your credentials.');
        }
    }, [isAuthenticated, isTempPass, loading, error, router]);

    return (
        <>
            <div className='flex justify-center sm:mb-6 mb-4'>
                <img src={auth_forgot_password} width="240" height="178" alt='forgot password' />
            </div>
            <p className='sm:text-[40px]/[48px] text-[30px]/[36px] font-medium mb-2 text-center'>
                Permanent Password?
            </p>
            <p className='text-center sm:mb-12 mb-6 text-font-color-100'>
                Enter the email address you used when you joined and we'll send you instructions to reset your password.
            </p>
            <div className='form-control mb-20'>
                <label htmlFor='password' className='form-label'>
                    New Password:
                </label>
                <button
                    className="text-white px-2 rounded-full bg-[#6c757d] ml-2 
             shadow-transparent 
             hover:shadow-[0_6px_1rem_rgba(25,24,24,0.1),0_0.5rem_1rem_-0.75rem_rgba(25,24,24,0.1)] 
             hover:-translate-y-[3px] 
             transition-[box-shadow,transform] duration-200 ease-in-out"
                    onClick={handleInputClick}
                >
                    Generate Password
                </button>
                <div className='relative'>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        placeholder='Enter the password'
                        className='form-input !pr-12'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        onClick={togglePasswordVisibility}
                        className='absolute top-[50%] translate-y-[-50%] right-3 text-font-color-100'
                    >
                        {showPassword ? <IconEyeOff /> : <IconEye />}
                    </button>
                </div>
            </div>
            <button className='btn btn-secondary large w-full uppercase'
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? 'Submiting...' : 'Submit'}
            </button>
            <div className='text-center sm:mt-30 mt-6'>
                <Link href="/signIn" className='text-primary'>
                    Back to Sign in
                </Link>
            </div>
        </>
    )
}
