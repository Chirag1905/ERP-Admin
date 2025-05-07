'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconBrandGoogleFilled, IconEye, IconEyeOff } from '@tabler/icons-react';
import { clearAuthError, clearAuthState, signInRequest, signInSuccess } from '@/Redux/features/auth/authSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import PublicRoute from '@/app/PublicRoute';

const Signin = () => {
    const dispatch = useDispatch();
    const { loginData, isAuthenticated, loading, error, isTempPass } = useSelector((state) => state.auth);
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async () => {
        const params = {
            username: username,
            password: password,
            clientId: "admin-cli",
            realmName: "master"
            // clientId: "test4-fe-client",
            // realmName: "test4"
        };
        toast.loading('Logging in...', { id: 'login-toast' });
        dispatch(signInRequest(params));
        // { isAuthenticated && router.push("/") }
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
        if (loginData) {
            const redirectPath = isTempPass ? '/setPermanentPassword' : '/';
            toast.success('Login successful!', { id: 'login-status' });
            router.push(redirectPath);
            dispatch(clearAuthError(null));
        } else if (error) {
            toast.error('Login failed. Please check your credentials.', { id: 'login-status' });
            dispatch(clearAuthState(null));
        }
    }, [loginData, error, isTempPass, router, dispatch]);

    console.log("ffffffffffffffffffffffffffffffff")

    return (
        <>
            <PublicRoute>
                <div className='mb-6 sm:mb-8 text-center'>
                    <div className='text-[30px]/[36px] sm:text-[40px]/[48px] font-medium mb-2'>
                        Sign In
                    </div>
                    <span className='text-font-color-100 inline-block'>
                        Free access to our dashboard.
                    </span>
                </div>
                <div className='mb-4 sm:mb-6 text-center'>
                    <Link href="#" prefetch={true} className='btn btn-white !border-border-color w-full sm:w-auto justify-center'>
                        <IconBrandGoogleFilled className='fill-font-color-100' />
                        <span>Sign in with Google</span>
                    </Link>
                    <div className='mt-6 flex items-center'>
                        <span className='inline-block h-[1px] flex-1 bg-font-color-400'></span>
                        <span className='px-4 sm:px-[30px] text-font-color-400'>OR</span>
                        <span className='inline-block h-[1px] flex-1 bg-font-color-400'></span>
                    </div>
                </div>
                <div>
                    <div className='form-control mb-4 sm:mb-[15px]'>
                        <label htmlFor='email' className='form-label'>
                            Email
                        </label>
                        <input
                            type='text'
                            id='email'
                            placeholder='name@example.com'
                            className='form-input'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-control mb-4 sm:mb-[15px]'>
                        <label htmlFor='password' className='form-label'>
                            Password
                        </label>
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
                    <div className='flex flex-wrap items-center justify-between gap-2 my-4 sm:my-2'>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="forgotPassword"
                                className="form-check-input"
                            />
                            <label className="form-check-label" htmlFor="forgotPassword">
                                Remember me
                            </label>
                        </div>
                        <Link href="/forgotPassword" prefetch={false} className='text-primary text-[14px]/[20px] sm:text-[16px]/[24px]'>
                            Forgot Password?
                        </Link>
                    </div>
                    {error && <p className="error mb-4">{'The email or password you entered is incorrect. Please try again!'}</p>}
                    <button
                        className='btn btn-secondary large w-full uppercase'
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                    <div className='text-center mt-6 sm:mt-[10px] text-font-color-100'>
                        <p>Don&apos;t have an account yet?</p>
                        <Link href="/signUp" prefetch={false} className='text-primary'>
                            Sign up here
                        </Link>
                    </div>
                </div>
            </PublicRoute>
        </>
    );
};

export default Signin;