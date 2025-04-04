'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconBrandGoogleFilled, IconEye, IconEyeOff } from '@tabler/icons-react';
import { clearAuthError, clearAuthState, signInRequest, signInSuccess } from '@/Redux/features/auth/authSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Signin = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const { loginData, isAuthenticated, loading, error, isTempPass } = useSelector((state) => state.auth);
    console.log("🚀 ~ Signin ~ isAuthenticated:", isAuthenticated)
    console.log("🚀 ~ Signin ~ error:", error)
    console.log("🚀 ~ Signin ~ loading:", loading)
    console.log("🚀 ~ Signin ~ isTempPass:", isTempPass)
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
            clientId: "test5-fe-client",
            realmName: "test5"
        };
        toast.loading('Logging in...', { id: 'login-toast' });
        dispatch(signInRequest(params));
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
        if (loginData) {
            const redirectPath = isTempPass ? '/setPermanentPassword' : '/';
            toast.success('Login successful!', { id: 'login-status' });
            router.push(redirectPath);
            dispatch(clearAuthState());
        } else if (error) {
            toast.error('Login failed. Please check your credentials.', { id: 'login-status' });
            dispatch(clearAuthError());
        }
    }, [loginData, error, isTempPass, router, dispatch]);

    return (
        <>
            <div className='sm:mb-8 mb-6 text-center'>
                <div className='sm:text-[40px]/[48px] text-[30px]/[36px] font-medium mb-2'>
                    Sign In
                </div>
                <span className='text-font-color-100 inline-block'>
                    Free access to our dashboard.
                </span>
            </div>
            <div className='sm:mb-6 mb-4 text-center'>
                <Link href="#" className='btn btn-white !border-border-color'>
                    <IconBrandGoogleFilled className='fill-font-color-100' />
                    Sign in with Google
                </Link>
                <div className='mt-6 flex items-center'>
                    <span className='inline-block h-[1px] w-full bg-font-color-400'></span>
                    <span className='px-30 text-font-color-400'>OR</span>
                    <span className='inline-block h-[1px] w-full bg-font-color-400'></span>
                </div>
            </div>
            <div>
                <div className='form-control mb-15'>
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
                <div className='form-control mb-15'>
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
                <div className='flex flex-wrap items-center justify-between gap-10 sm:mb-30 mb-6'>
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
                    <Link href="/forgotPassword" className='text-primary sm:text-[16px]/[24px] text-[14px]/[20px]'>
                        Forgot Password?
                    </Link>
                </div>
                {error && <p className="error">{'  The email or password you entered is incorrect. Please try again!'}</p>}
                <button
                    className='btn btn-secondary large w-full uppercase'
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
                <div className='text-center sm:mt-30 mt-6 text-font-color-100'>
                    <p>Don&apos;t have an account yet?</p>
                    <Link href="/signUp" className='text-primary'>
                        Sign up here
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Signin;