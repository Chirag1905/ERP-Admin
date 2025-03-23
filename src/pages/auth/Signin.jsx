import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IconBrandGoogleFilled, IconEye, IconEyeOff } from '@tabler/icons-react';
import { signInRequest } from '../../Redux/features/auth/authSlice'; // Import the login action

const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async () => {

        const params = {
            grant_type: "password",
            client_id: "saas-ui-app",
            client_secret: "JPwfUjOQkfq1oy9RKOUIqToLQF9Egc2I",
            username: username,
            password: password,
            scope: "openid profile email"
        };

        dispatch(signInRequest(params));
        navigate("/")
        
        // Show a loading, success, or error toast
        //  toast.promise(loginPromise, {
        //     pending: 'Authenticating... Please wait.',
        //     success: 'Welcome back! Login successful.',
        //     error: 'Login failed. Please check your credentials and try again.',
        // });

        // const loginPromise = login(username, password)
        //     .then((tokens) => {
        //         // Store tokens in localStorage
        //         localStorage.setItem('access_token', tokens.accessToken);
        //         localStorage.setItem('refresh_token', tokens.refreshToken);
        //         localStorage.setItem('id_token', tokens.idToken);
        //         navigate('/');

        //         return "Data saved successfully!"; // Message for success toast
        //     })
        //     .catch((err) => {
        //         console.log("🚀 ~ handleSubmit ~ err:", err);
        //         setError('Invalid credentials');
        //         throw new Error("Failed to save data. Please try again."); // Message for error toast
        //     })
        //     .finally(() => {
        //         setLoading(false);
        //     });
    };

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
                <Link to="#" className='btn btn-white !border-border-color'>
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
                    <Link to="/auth-forgot-password" className='text-primary sm:text-[16px]/[24px] text-[14px]/[20px]'>
                        Forgot Password?
                    </Link>
                </div>
                {error && <p className="error">{error}</p>}
                <button
                    className='btn btn-secondary large w-full uppercase'
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
                <div className='text-center sm:mt-30 mt-6 text-font-color-100'>
                    <p>Don&apos;t have an account yet?</p>
                    <Link to="/auth-signup" className='text-primary'>
                        Sign up here
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Signin;