import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import {
    getCampusRequest,
    postCampusRequest,
    postCampusSuccess,
    postRealmRequest
} from '@/Redux/features/campus/campusSlice';
import { IconCopy, IconKeyFilled } from '@tabler/icons-react';

const CampusCreate = (props) => {
    const {
        openModal,
        closeModal,
    } = props;

    // Redux state
    const dispatch = useDispatch();
    const { campusPostData, loading, error } = useSelector((state) => state.campus);
    const { token } = useSelector((state) => state.auth);

    // Component state
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState({
        campusName: "",
        campusCode: "",
        primaryDomainName: "",
        campusEmailId: "",
        smsEnabled: false,
        emailEnabled: false,
        gpsEnabled: false,
        onlineMeetingEnabled: false,
        paymentGatewayEnabled: false,
        isActive: false
    });

    // Function to update form data
    const updateFormData = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const params = {
                campusName: formData.campusName,
                campusCode: formData.campusCode,
                primaryDomainName: formData.primaryDomainName,
                campusEmailId: formData.campusEmailId,
                smsEnabled: formData.smsEnabled,
                emailEnabled: formData.emailEnabled,
                gpsEnabled: formData.gpsEnabled,
                onlineMeetingEnabled: formData.onlineMeetingEnabled,
                paymentGatewayEnabled: formData.paymentGatewayEnabled,
                isActive: formData.isActive
            };
            dispatch(postCampusRequest({ data: params, token }));
        } catch (err) {
            console.error("Error submitting data:", err);
            toast.error(err || "Failed to submit data. Please try again.", {
                position: "top-right",
                duration: 2000,
            });
        }
    };

    //Added
    // Handle API responses
    useEffect(() => {
        if (!campusPostData?.message) return;

        // Show credentials in a separate toast
        if (campusPostData?.data?.campusKeyCloakRealm) {
            const credentials = campusPostData?.data?.campusKeyCloakRealm;
            toast(
                (t) => (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        fontSize: '14px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigator.clipboard.writeText(credentials.username);
                                    toast.success('Username copied!', { position: 'top-right' });
                                }}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                title="Copy username"
                            >
                                <IconCopy size={16} color="#4b5563" />
                            </button>
                            <span>Username: {credentials.username}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigator.clipboard.writeText(credentials.temporaryPassword);
                                    toast.success('Password copied!', { position: 'top-right' });
                                }}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                title="Copy password"
                            >
                                <IconCopy size={16} color="#4b5563" />
                            </button>
                            <span>Password: {credentials.temporaryPassword}</span>
                        </div>
                    </div>
                ),
                {
                    position: 'top-right',
                    duration: 30000,
                    style: {
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        color: '#334155',
                        padding: '16px',
                        borderRadius: '8px'
                    },
                    icon: <span><IconKeyFilled fill="#f59e0b" color="#f59e0b" /></span>,
                }
            );
        }

        toast.success(campusPostData.message, {
            position: "top-right",
            duration: 5000,
        });
        // Refresh campus data
        dispatch(getCampusRequest({
            data: {
                page: 0,
                size: 10,
                sortBy: "id",
                ascending: true,
            },
        }));

        dispatch(postCampusSuccess(null));
        closeModal();
    }, [campusPostData, closeModal]);

    // Handle API errors
    useEffect(() => {
        if (!error) return;

        if (Array.isArray(error.error)) {
            error.error.forEach((err) => {
                toast.error(`${err.field || 'Error'}: ${err.message}`, {
                    position: "top-right",
                    duration: 2000,
                });
            });
        } else if (error.message) {
            toast.error(error.message, { position: "top-right", duration: 2000 });
        } else {
            toast.error("An unexpected error occurred", { position: "top-right", duration: 2000 });
        }
    }, [error]);

    return (
        <>
            <div className='py-6 md:py-[10px] px-4 md:px-[10px] mt-6 md:mt-[10px] bg-card-color rounded-lg'>
                <div className='my-6 md:my-[10px] px-2 md:px-4 lg:px-[20px] max-h-[60svh] md:max-h-[80svh] overflow-auto cus-scrollbar'>
                    <div className="flex justify-between items-center mb-4 md:mb-6">
                        <div className='text-lg md:text-2xl font-medium'>
                            New campus
                        </div>
                    </div>

                    {/* Flex container for tabs and content - changes to column on mobile */}
                    <div className="flex flex-col md:flex-row">
                        {/* Left Side Tabs - full width on mobile, 1/4 on desktop */}
                        <div className="w-full md:w-1/4 bg-card-color md:border-r border-border-color mb-4 md:mb-0">
                            <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-4 p-2 md:p-4 overflow-x-auto md:overflow-x-visible">
                                {['Profile', 'Domain', 'Plugins', 'Email', 'SMS Setting', 'Plugin Settings', 'Gateways'].map((tab, index) => (
                                    <button
                                        key={index}
                                        className={`py-2 px-3 md:px-4 text-sm md:text-base text-left rounded-md whitespace-nowrap ${activeTab === index
                                            ? 'bg-primary-color text-secondary'
                                            : 'text-primary hover:text-secondary hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                        onClick={() => setActiveTab(index)}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right Side Content - full width on mobile, 3/4 on desktop */}
                        <div className="w-full md:w-3/4 p-2 md:p-4">
                            {activeTab === 0 && (
                                <>
                                    <div className="flex flex-col space-y-4">
                                        <label className='form-label mb-4'>
                                            Profile Settings
                                        </label>
                                        <div className='flex-col space-y-9'>
                                            <div className='flex flex-col md:flex-row justify-between gap-2 md:gap-0 md:px-4'>
                                                <label htmlFor='campaignsTitle' className='form-label md:w-1/3'>
                                                    Campus Name <span className="text-red-500">*</span>
                                                </label>
                                                <div className='form-control w-full md:w-2/3'>
                                                    <input
                                                        type='text'
                                                        placeholder='Campus Name'
                                                        className='form-input'
                                                        value={formData?.campusName || ""}
                                                        onChange={(e) => updateFormData("campusName", e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex flex-col md:flex-row justify-between gap-2 md:gap-0 md:px-4'>
                                                <label htmlFor='campaignsTitle' className='form-label md:w-1/3'>
                                                    Campus Code <span className="text-red-500">*</span>
                                                </label>
                                                <div className='form-control w-full md:w-2/3'>
                                                    <input
                                                        type='number'
                                                        placeholder='license count'
                                                        className='form-input'
                                                        value={formData?.campusCode || ""}
                                                        onChange={(e) => updateFormData("campusCode", e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex flex-col md:flex-row justify-between gap-2 md:gap-0 md:px-4'>
                                                <label htmlFor='campaignsTitle' className='form-label md:w-1/3'>
                                                    Admin Email <span className="text-red-500">*</span>
                                                </label>
                                                <div className='form-control w-full md:w-2/3'>
                                                    <input
                                                        type='email'
                                                        placeholder='email address'
                                                        className='form-input'
                                                        value={formData?.campusEmailId || ""}
                                                        onChange={(e) => updateFormData("campusEmailId", e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex flex-col md:flex-row justify-between gap-2 md:gap-0 md:px-4'>
                                                <label htmlFor='campaignsTitle' className='form-label md:w-1/3'>
                                                    GPS Enabled <span className="text-red-500">*</span>
                                                </label>
                                                <div className='form-check form-switch w-full md:w-2/3 flex items-center'>
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        checked={formData?.gpsEnabled || false}
                                                        onChange={(e) => updateFormData("gpsEnabled", e.target.checked)}
                                                    />
                                                    <label className="form-check-label ml-2" htmlFor="lightIndoor1">
                                                        {formData?.gpsEnabled ? "Enabled" : "Disabled"}
                                                    </label>
                                                </div>
                                            </div>
                                            {/* <div className='flex flex-col md:flex-row justify-between gap-2 md:gap-0 md:px-4'>
                                        <label htmlFor='campaignsTitle' className='form-label md:w-1/3'>
                                            Zoom Meeting Enabled <span className="text-red-500">*</span>
                                        </label>
                                        <div className='form-check form-switch w-full md:w-2/3 flex items-center'>
                                            <input
                                                type='checkbox'
                                                className='form-check-input'
                                                checked={formData?.zoomEnabled || false}
                                                onChange={(e) => updateFormData("zoomEnabled", e.target.checked)}
                                            />
                                            <label className="form-check-label ml-2" htmlFor="lightIndoor1">
                                                {formData?.zoomEnabled ? "Enabled" : "Disabled"}
                                            </label>
                                        </div>
                                    </div> */}
                                            <div className='flex flex-col md:flex-row justify-between gap-2 md:gap-0 md:px-4'>
                                                <label htmlFor='campaignsTitle' className='form-label md:w-1/3'>
                                                    IsActive <span className="text-red-500">*</span>
                                                </label>
                                                <div className='form-check form-switch w-full md:w-2/3 flex items-center'>
                                                    <input
                                                        type='checkbox'
                                                        className='form-check-input'
                                                        checked={formData?.isActive || false}
                                                        onChange={(e) => updateFormData("isActive", e.target.checked)}
                                                    />
                                                    <label className="form-check-label ml-2" htmlFor="lightIndoor1">
                                                        {formData?.isActive ? "Enabled" : "Disabled"}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {activeTab === 1 && (
                                <>
                                    <div className='form-control'>
                                        <label className='form-label'>
                                            Assigned Domains
                                        </label>
                                        <div className='flex flex-col md:flex-row justify-between mt-4 gap-2 md:gap-0 md:px-4'>
                                            <div className='relative w-full'>
                                                <input
                                                    type='text'
                                                    className='form-input'
                                                    checked={formData?.primaryDomainName || ""}
                                                    placeholder='dev.testmazing.com'
                                                    onChange={(e) => updateFormData("primaryDomainName", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {activeTab === 2 && (
                                <>
                                    <div className='form-control'>
                                        <div className='flex flex-col md:flex-row justify-between mb-4 gap-2 md:gap-0'>
                                            <label className='form-label'>
                                                Assign Plugins
                                            </label>
                                            <label className='form-label'>
                                                All | Name
                                            </label>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {/* Plugins would go here */}
                                        </div>
                                    </div>
                                </>
                            )}
                            {activeTab === 3 && (
                                <>
                                    <div className='form-control'>
                                        <label className='form-label'>
                                            Email Settings
                                        </label>
                                        <div className='flex flex-col md:flex-row justify-between mt-4 gap-2 md:gap-0 md:px-4'>
                                            <label htmlFor='campaignsTitle' className='form-label md:w-1/3'>
                                                Email Enabled <span className="text-red-500">*</span>
                                            </label>
                                            <div className='form-check form-switch w-full md:w-2/3 flex items-center'>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    checked={formData?.emailEnabled || false}
                                                    onChange={(e) => updateFormData("emailEnabled", e.target.checked)}
                                                />
                                                <label className="form-check-label ml-2" htmlFor="lightIndoor1">
                                                    {formData?.emailEnabled ? "Enabled" : "Disabled"}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {activeTab === 4 && (
                                <>
                                    <div className='form-control'>
                                        <label className='form-label'>
                                            SMS Settings
                                        </label>
                                        <div className='flex flex-col md:flex-row justify-between mt-4 gap-2 md:gap-0 md:px-4'>
                                            <label htmlFor='campaignsTitle' className='form-label md:w-1/3'>
                                                SMS Enabled <span className="text-red-500">*</span>
                                            </label>
                                            <div className='form-check form-switch w-full md:w-2/3 flex items-center'>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    checked={formData?.smsEnabled || false}
                                                    onChange={(e) => updateFormData("smsEnabled", e.target.checked)}
                                                />
                                                <label className="form-check-label ml-2" htmlFor="lightIndoor1">
                                                    {formData?.smsEnabled ? "Enabled" : "Disabled"}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {activeTab === 5 && (
                                <>
                                    <div className='form-control'>
                                        <label className='form-label'>
                                            Plugin Settings
                                        </label>
                                        <div className='flex flex-col md:flex-row justify-between mt-4 gap-2 md:gap-0 md:px-4'>
                                            <label htmlFor='campaignsTitle' className='form-label md:w-1/3'>
                                                Online Meeting Enabled <span className="text-red-500">*</span>
                                            </label>
                                            <div className='form-check form-switch w-full md:w-2/3 flex items-center'>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    checked={formData?.onlineMeetingEnabled || false}
                                                    onChange={(e) => updateFormData("onlineMeetingEnabled", e.target.checked)}
                                                />
                                                <label className="form-check-label ml-2" htmlFor="lightIndoor1">
                                                    {formData?.onlineMeetingEnabled ? "Enabled" : "Disabled"}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {activeTab === 6 && (
                                <>
                                    <div className='form-control'>
                                        <label className='form-label'>
                                            Gateways
                                        </label>
                                        <div className='flex flex-col md:flex-row justify-between mt-4 gap-2 md:gap-0 md:px-4'>
                                            <label htmlFor='campaignsTitle' className='form-label md:w-1/3'>
                                                Payment Gateway Enabled <span className="text-red-500">*</span>
                                            </label>
                                            <div className='form-check form-switch w-full md:w-2/3 flex items-center'>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    checked={formData?.paymentGatewayEnabled || false}
                                                    onChange={(e) => updateFormData("paymentGatewayEnabled", e.target.checked)}
                                                />
                                                <label className="form-check-label ml-2" htmlFor="lightIndoor1">
                                                    {formData?.paymentGatewayEnabled ? "Enabled" : "Disabled"}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Buttons Section */}
                    <div className='flex flex-col sm:flex-row items-stretch gap-3 mt-6'>
                        <button
                            onClick={closeModal}
                            className='btn btn-secondary flex-1 sm:flex-none'
                        >
                            Close
                        </button>
                        <button
                            className='btn btn-primary flex-1 sm:flex-none'
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : 'Submit'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CampusCreate;