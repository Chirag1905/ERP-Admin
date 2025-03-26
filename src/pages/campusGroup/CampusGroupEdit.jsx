import { useEffect, useState } from 'react'
import {
    getCampusGroupRequest,
    putCampusGroupRequest,
    putCampusGroupSuccess
} from '../../Redux/features/campusGroup/campusGroupSlice';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { IconBooksOff } from '@tabler/icons-react';

const CampusGroupEdit = (props) => {
    const {
        openEditSchoolModal,
        closeEditSchoolModal,
        isLoading,
        setIsLoading,
        selectedItem,
        setSelectedItem
    } = props;
    const dispatch = useDispatch();
    const {
        campusPutGroupData,
        loading,
        error
    } = useSelector((state) => state.campusGroup);
    const [activeTab, setActiveTab] = useState(0);

    const [formData, setFormData] = useState({
        campusGroupName: "",
        licenseCount: "",
        gpsEnabled: false,
        zoomEnabled: false,
        isActive: false,
        inheritEmailSettings: false,
        inheritGoogleOAuth: false,
        enableGPS: false,
        enableGoogleMeet: false,
        enableSMSTemplateEdit: false,
        enableSMSTemplateID: false,
        assignedDomains: "",
    });

    // Function to update form data
    const updateFormData = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

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
                campusGroupName: selectedItem?.campusGroupName || "",
                licenseCount: selectedItem?.licenseCount || "",
                gpsEnabled: selectedItem?.gpsEnabled || false,
                zoomEnabled: selectedItem?.zoomEnabled || false,
                isActive: selectedItem?.isActive || false,
                inheritEmailSettings: selectedItem?.inheritEmailSettings || false,
                inheritGoogleOAuth: selectedItem?.inheritGoogleOAuth || false,
                enableGPS: selectedItem?.enableGPS || false,
                enableGoogleMeet: selectedItem?.enableGoogleMeet || false,
                enableSMSTemplateEdit: selectedItem?.enableSMSTemplateEdit || false,
                enableSMSTemplateID: selectedItem?.enableSMSTemplateID || false,
                assignedDomains: selectedItem?.assignedDomains || "",
            });
        }
    }, [selectedItem])

    // Handle API responses
    useEffect(() => {
        if (campusPutGroupData) {
            if (campusPutGroupData.message) {
                toast.success(campusPutGroupData.message, {
                    position: "top-right",
                    duration: 3000,
                });

                // Refresh campus data
                dispatch(getCampusGroupRequest({
                    data: {
                        page: 0,
                        size: 10,
                        sortBy: "id",
                        ascending: true,
                    },
                }));
                dispatch(putCampusGroupSuccess(null));
                closeEditSchoolModal();
            }
        }
    }, [campusPutGroupData, dispatch, closeEditSchoolModal]);

    // Handle errors
    useEffect(() => {
        if (error) {
            // Handle field-specific errors
            if (Array.isArray(error.error)) {
                error.error.forEach((err) => {
                    toast.error(`${err.field || 'Error'}: ${err.message}`, {
                        position: "top-right",
                        duration: 3000,
                    });
                });
            }
            // Handle general error message
            else if (error.message) {
                toast.error(error.message, {
                    position: "top-right",
                    duration: 3000,
                });
            }
            // Fallback for unexpected error format
            else {
                toast.error("An unexpected error occurred", {
                    position: "top-right",
                    duration: 3000,
                });
            }
        }
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading((prev) => ({ ...prev, add: true }));
        try {
            // Dispatch API request action
            dispatch(putCampusGroupRequest({ id: selectedItem?.id, data: formData }));
        } catch (error) {
            console.error("Error submitting data:", error);
            toast.error("An unexpected error occurred. Please try again.", {
                position: "top-right",
                duration: 3000,
            });
        } finally {
            setIsLoading((prev) => ({ ...prev, add: false }));
        }
    };

    return (
        <>
            <div className='py-10 md:px-10 mt-10 px-[7px] bg-card-color rounded-lg'>
                <div className='my-10 lg:px-20 md:px-10 px-[7px] md:max-h-[80svh] max-h-[60svh] overflow-auto cus-scrollbar'>
                    <div className="flex justify-between items-center">
                        <div className='text-[24px]/[30px] font-medium mb-2'>
                            Edit School
                        </div>
                        <button
                            onClick={openEditSchoolModal}
                            className="flex gap-1 btn btn-light-primary mt-2"
                        >
                            <IconBooksOff />
                            <span className="md:block hidden">Deactivate School</span>
                        </button>
                    </div>

                    {/* Flex container for tabs and content */}
                    <div className="flex">
                        {/* Left Side Tabs */}
                        <div className="w-1/4 bg-card-color border-r border-border-color">
                            <div className="flex flex-col space-y-10 p-4">
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

                        {/* Right Side Content */}
                        <div className="w-3/4 p-4">
                            {activeTab === 0 && (
                                <>
                                    <div className="flex flex-col space-y-4">
                                        <div className='flex justify-between px-10'>
                                            <label htmlFor='campaignsTitle' className='form-label'>
                                                Name <span className="text-red-500"> *</span>
                                            </label>
                                            <div className='form-control h-full w-3/5 mb-15'>
                                                <input
                                                    type='text'
                                                    placeholder='School Name'
                                                    className='form-input'
                                                    value={formData.campusGroupName || ""}
                                                    onChange={(e) => updateFormData("campusGroupName", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className='flex justify-between px-10'>
                                            <label htmlFor='campaignsTitle' className='form-label'>
                                                License Count <span className="text-red-500"> *</span>
                                            </label>
                                            <div className='form-control h-full w-3/5 mb-15'>
                                                <input
                                                    type='number'
                                                    placeholder='license count'
                                                    className='form-input'
                                                    value={formData.licenseCount || ""}
                                                    onChange={(e) => updateFormData("licenseCount", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className='flex justify-between px-10'>
                                            <label htmlFor='campaignsTitle' className='form-label'>
                                                GPS Enabled <span className="text-red-500"> *</span>
                                            </label>
                                            <div className='form-check form-switch h-full w-3/5 mb-15'>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    checked={formData.gpsEnabled || ""}
                                                    onChange={(e) => updateFormData("gpsEnabled", e.target.checked)}
                                                />
                                                <label className="form-check-label ml-2" htmlFor="lightIndoor1">{formData?.gpsEnabled === true ? "Enabled" : "Disable"}</label>
                                            </div>
                                        </div>
                                        <div className='flex justify-between px-10'>
                                            <label htmlFor='campaignsTitle' className='form-label'>
                                                Zoom Meeting Enabled <span className="text-red-500"> *</span>
                                            </label>
                                            <div className='form-check form-switch h-full w-3/5 mb-15'>
                                                <input
                                                    type='checkbox'
                                                    className='form-check-input'
                                                    checked={formData.zoomEnabled || ""}
                                                    onChange={(e) => updateFormData("zoomEnabled", e.target.checked)}
                                                />
                                                <label className="form-check-label ml-2" htmlFor="lightIndoor1">{formData?.zoomEnabled === true ? "Enabled" : "Disable"}</label>
                                            </div>
                                        </div>
                                        <div className='flex justify-between px-10'>
                                            <label htmlFor='campaignsTitle' className='form-label'>
                                                IsActive <span className="text-red-500"> *</span>
                                            </label>
                                            <div className='form-check form-switch h-full w-3/5 mb-15'>
                                                <input
                                                    type='checkbox'
                                                    className='form-check-input'
                                                    checked={formData.isActive || ""}
                                                    onChange={(e) => updateFormData("isActive", e.target.checked)}
                                                />
                                                <label className="form-check-label ml-2" htmlFor="lightIndoor1">{formData?.isActive === true ? "Enabled" : "Disable"}</label>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className='flex px-10'>
                                        <label htmlFor='campaignsTitle' className='form-label'>
                                            Inherit Email Settings
                                        </label>
                                        <div className='form-control h-full w-3/5 mb-15'>
                                            <input
                                                type='checkbox'
                                                placeholder='Inherit Email Settings'
                                                className='form-input'
                                                // value={formData.inheritEmailSettings || ""}
                                                // onChange={(e) => updateFormData("campusGroupName", e.target.value)}
                                            />
                                        </div>
                                    </div> */}
                                    {/* <div className='flex justify-between px-10'>
                                        <label htmlFor='campaignsTitle' className='form-label'>
                                            SMS Template ID Enabled
                                        </label>
                                        <div className='form-control h-full w-3/5 mb-15'>
                                            <input
                                                type='checkbox'
                                                placeholder='SMS Template ID Enabled'
                                                className='form-input'
                                                // value={formData.enableSMSTemplateID || ""}
                                                // onChange={(e) => updateFormData("enableSMSTemplateID", e.target.value)}
                                            />
                                        </div>
                                    </div> */}
                                    {/* <div className='flex justify-between px-10'>
                                        <label htmlFor='campaignsTitle' className='form-label'>
                                            Inherit Google OAuth
                                        </label>
                                        <div className='form-control h-full w-3/5 mb-15'>
                                            <input
                                                type='checkbox'
                                                placeholder='School Name'
                                                className='form-input'
                                                // value={formData.inheritGoogleOAuth || ""}
                                                // onChange={(e) => updateFormData("inheritGoogleOAuth", e.target.value)}
                                            />
                                        </div>
                                    </div> */}
                                    {/* <div className='flex justify-between px-10'>
                                        <label htmlFor='campaignsTitle' className='form-label'>
                                            Google Meet Enabled
                                        </label>
                                        <div className='form-check form-switch h-full w-3/5 mb-15'>
                                            <input
                                                type='checkbox'
                                                placeholder='School Name'
                                                className='form-check-input'
                                                value={formData.enableGoogleMeet || ""}
                                                onChange={(e) => updateFormData("enableGoogleMeet", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex justify-between px-10'>
                                        <label htmlFor='campaignsTitle' className='form-label'>
                                            Owned by
                                        </label>
                                        <div className='form-control h-full w-3/5 mb-15'>
                                            <input
                                                type='text'
                                                placeholder='Owned by'
                                                className='form-input'
                                            // value={formData.campusGroupName || ""}
                                            // onChange={(e) => updateFormData("campusGroupName", e.target.value)}
                                            />
                                        </div>
                                    </div> */}
                                </>
                            )}
                            {activeTab === 1 && (
                                <div>
                                    {/* Domain Content */}
                                    <div className='form-control mb-15'>
                                        <label className='form-label'>
                                            Assigned Domains
                                        </label>
                                        <div className='relative w-full flex'>
                                            <input
                                                type='text'
                                                className='form-input'
                                            // value={formData.campusGroupName || ""}
                                            // onChange={(e) => updateFormData("campusGroupName", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 2 && (
                                <div>
                                    {/* Plugins Content */}
                                    <div className='form-control mb-15'>
                                        <div className='justify-between flex mb-4'>
                                            <label className='form-label'>
                                                Assign Plugins
                                            </label>
                                            <label className='form-label'>
                                                All | Name
                                            </label>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            {/* {modules?.map((module, index) => (
                                                <div className="form-check border border-border-color rounded-md p-4 bg-body-color" key={index}>
                                                    <div className='ml-2'>
                                                        <input
                                                            type="checkbox"
                                                            id={`module-${index}`}
                                                            name="campaignsModule"
                                                            className="form-check-input"
                                                        // checked={selectedModules.includes(module)}
                                                        // onChange={() => handleModuleChange(module)}
                                                        />
                                                    </div>
                                                    <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor={`module-${index}`}>
                                                        {module}
                                                    </label>
                                                </div>
                                            ))} */}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 3 && (
                                <div>
                                    {/* Email Content */}
                                    <div className="flex flex-col space-y-4">
                                        <div className='flex justify-between px-10'>
                                            <label htmlFor='campaignsTitle' className='form-label'>
                                                Inherit Email Settings <span className="text-red-500"> *</span>
                                            </label>
                                            <div className='form-check form-switch h-full w-3/5 mb-15'>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    checked={formData.gpsEnabled || ""}
                                                    onChange={(e) => updateFormData("gpsEnabled", e.target.checked)}
                                                />
                                                <label className="form-check-label ml-2" htmlFor="lightIndoor1">{formData?.gpsEnabled === true ? "Enable" : "Disable"}</label>
                                            </div>
                                        </div>
                                        <div className='flex justify-between px-10'>
                                            <label htmlFor='campaignsTitle' className='form-label'>
                                                Inherit Google OAuth
                                                {/* <span className="text-red-500"> *</span> */}
                                            </label>
                                            <div className='form-check form-switch h-full w-3/5 mb-15'>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    checked={formData.gpsEnabled || ""}
                                                    onChange={(e) => updateFormData("gpsEnabled", e.target.checked)}
                                                />
                                                <label className="form-check-label ml-2" htmlFor="lightIndoor1">{formData?.gpsEnabled === true ? "Enable" : "Disable"}</label>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className='form-control mb-15'>
                                        <div className='relative w-full flex'>
                                            <div className="flex items-center justify-center gap-4 border border-border-color rounded-s-md mr-[-1px] py-[6px] px-[12px] bg-body-color">
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        name="campaignsEmail"
                                                        className="form-check-input"
                                                    // value={formData.campusGroupName || ""}
                                                    // onChange={(e) => updateFormData("campusGroupName", e.target.value)}
                                                    />
                                                    <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor="campaignsEmail">Inherit Email Settings</label>
                                                </div>
                                              
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        name="campaignsGoogle"
                                                        className="form-check-input"
                                                    // value={formData.campusGroupName || ""}
                                                    // onChange={(e) => updateFormData("campusGroupName", e.target.value)}
                                                    />
                                                    <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor="campaignsGoogle">Inherit Google OAuth</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            )}
                            {activeTab === 4 && (
                                <div>
                                    {/* SMS Setting Content */}
                                    <div className='form-control mb-15'>
                                        <label className='form-label'>
                                            SMS Settings
                                        </label>
                                        <div className='relative w-full flex'>
                                            <div className="flex items-center justify-center gap-4 border border-border-color rounded-s-md mr-[-1px] py-[6px] px-[12px] bg-body-color">
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        name="campaignsSMS"
                                                        className="form-check-input"
                                                    // value={formData.campusGroupName || ""}
                                                    // onChange={(e) => updateFormData("campusGroupName", e.target.value)}
                                                    />
                                                    <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor="campaignsSMS">Enable SMS Template Edit</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="radio"
                                                        name="campaignsSMSID"
                                                        className="form-check-input"
                                                    // value={formData.campusGroupName || ""}
                                                    // onChange={(e) => updateFormData("campusGroupName", e.target.value)}
                                                    />
                                                    <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor="campaignsSMSID">Enable SMS Template ID</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 5 && (
                                <div>
                                    {/* Plugin Settings Content */}
                                    <div className='form-control mb-15'>
                                        <div className='relative w-full flex'>
                                            <div className="flex items-center justify-center gap-4 border border-border-color rounded-s-md mr-[-1px] py-[6px] px-[12px] bg-body-color">
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        name="campaignsGps"
                                                        className="form-check-input"
                                                    // value={formData.campusGroupName || ""}
                                                    // onChange={(e) => updateFormData("campusGroupName", e.target.value)}
                                                    />
                                                    <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor="campaignsGps">Enable GPS</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        name="campaignsMeet"
                                                        className="form-check-input"
                                                    // value={formData.campusGroupName || ""}
                                                    // onChange={(e) => updateFormData("campusGroupName", e.target.value)}
                                                    />
                                                    <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor="campaignsMeet">Enable Google Meet</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 6 && (
                                <div>
                                    {/* Gateways Content */}
                                    <div className='form-control mb-15'>
                                        <label className='form-label'>
                                            Gateways
                                        </label>
                                        <div className='relative w-full flex'>
                                            <div className="flex items-center justify-center gap-4 border border-border-color rounded-s-md mr-[-1px] py-[6px] px-[12px] bg-body-color">
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        name="campaignsZoom"
                                                        className="form-check-input"
                                                    // value={formData.campusGroupName || ""}
                                                    // onChange={(e) => updateFormData("campusGroupName", e.target.value)}
                                                    />
                                                    <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor="campaignsZoom">Enable Zoom Meeting</label>
                                                </div>
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        name="campaignsGoogleMeet"
                                                        className="form-check-input"
                                                    // value={formData.campusGroupName || ""}
                                                    // onChange={(e) => updateFormData("campusGroupName", e.target.value)}
                                                    />
                                                    <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor="campaignsGoogleMeet">Enable Google Meet</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Buttons Section */}
                    <div className='flex items-stretch gap-5'>
                        <button onClick={closeEditSchoolModal} className='btn btn-secondary'>
                            Close
                        </button>
                        <button className='btn btn-primary' onClick={handleSubmit}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CampusGroupEdit;