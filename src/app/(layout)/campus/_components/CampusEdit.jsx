import { useEffect, useState } from 'react'
import {
    getCampusRequest,
    putCampusRequest,
    putCampusSuccess
} from '@/Redux/features/campus/campusSlice';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { IconBooksOff } from '@tabler/icons-react';

const CampusEdit = (props) => {
    const {
        openModal,
        closeModal,
        selectedItem,
        setSelectedItem
    } = props;

    // Redux state
    const dispatch = useDispatch();
    const { campusPutData, loading, error } = useSelector((state) => state.campus);
    const { token } = useSelector((state) => state.auth);

    // Component state
    const [activeTab, setActiveTab] = useState(0);
    const [formData, setFormData] = useState({
        campusName: "",
        campusCode: "",
        primaryDomainName: "",
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

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(putCampusRequest({
                data: formData,
                token,
                id: selectedItem?.id,
            }));
        } catch (err) {
            console.error("Error submitting data:", err);
            toast.error(err || "An unexpected error occurred. Please try again.", {
                position: "top-right",
                duration: 2000,
            });
        };
    }

    //  const modules = [
    //     "Instant Fee",
    //     "Discussion",
    //     "Online Exam",
    //     "Data Management",
    //     "Gallery",
    //     "Custom Report",
    //     "Assignment",
    //     "Task",
    //     "Placement",
    //     "Online Meeting",
    //     "Moodle",
    //     "Applicant Registration",
    //     "Blog",
    //     "Data Profile",
    //     "App Frame",
    //   ];

    //  const handleModuleChange = (module) => {
    //     if (selectedModules.includes(module)) {
    //       setSelectedModules(selectedModules.filter((m) => m !== module));
    //     } else {
    //       setSelectedModules([...selectedModules, module]);
    //     }
    //   };

    useEffect(() => {
        if (selectedItem) {
            setFormData({
                campusName: selectedItem?.campusName || "",
                campusCode: selectedItem?.campusCode || "",
                primaryDomainName: selectedItem?.primaryDomainName || "",
                smsEnabled: selectedItem?.smsEnabled || false,
                emailEnabled: selectedItem?.emailEnabled || false,
                gpsEnabled: selectedItem?.gpsEnabled || false,
                onlineMeetingEnabled: selectedItem?.onlineMeetingEnabled || false,
                paymentGatewayEnabled: selectedItem?.paymentGatewayEnabled || false,
                isActive: selectedItem?.isActive || false,
            });
        }
    }, [selectedItem])

    // Handle successful API response
    useEffect(() => {
        if (!campusPutData?.message) return;

        toast.success(campusPutData.message, {
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

        dispatch(putCampusSuccess(null));
        closeModal();
    }, [campusPutData, closeModal]);

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
            <div className='py-[10px] md:px-[10px] mt-[10px] px-[7px] bg-card-color rounded-lg'>
                <div className='my-[10px] lg:px-[20px] md:px-[10px] px-[7px] md:max-h-[80svh] max-h-[60svh] overflow-auto cus-scrollbar'>
                    <div className="flex justify-between items-center">
                        <div className='text-[24px]/[30px] font-medium mb-2'>
                            Edit Campus
                        </div>
                        <button
                            onClick={openModal}
                            className="flex gap-1 btn btn-light-primary mt-2"
                        >
                            <IconBooksOff />
                            <span className="md:block hidden">Deactivate Campus</span>
                        </button>
                    </div>

                    {/* Flex container for tabs and content */}
                    <div className="flex">
                        {/* Left Side Tabs */}
                        <div className="w-1/4 bg-card-color border-r border-border-color">
                            <div className="flex flex-col space-y-[10px] p-4">
                                {['Profile', 'Domain', 'Plugins', 'Email', 'SMS Setting', 'Plugin Settings', 'Gateways'].map((tab, index) => (
                                    <button
                                        key={index}
                                        className={`py-2 px-4 text-left text-primary hover:text-secondary ${activeTab === index ? 'bg-primary-color text-secondary' : 'text-primary'}`}
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
                                            <div className='form-control w-full md:w-2/3'>
                                                <input
                                                    type='text'
                                                    placeholder='dev.testmazing.com'
                                                    className='form-input'
                                                    value={formData?.primaryDomainName || ""}
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
                    <div className='flex items-stretch gap-5'>
                        <button onClick={closeModal} className='btn btn-secondary'>
                            Close
                        </button>
                        <button className='btn btn-primary' onClick={handleSubmit}>
                            {loading ? 'Loading...' : 'Update'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CampusEdit;