import React, { useEffect, useState } from 'react'

const CampusCreate = (props) => {
    const { openCreateSchoolModal, fetchData } = props;
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


    const [selectedModules, setSelectedModules] = useState([]);
    const [activeTab, setActiveTab] = useState(0);

    const handleModuleChange = (module) => {
        if (selectedModules.includes(module)) {
            setSelectedModules(selectedModules.filter((m) => m !== module));
        } else {
            setSelectedModules([...selectedModules, module]);
        }
    };

    const createCampusGroup = async () => {
        const url = "https://api.testmazing.com/campus/api/createcampusgroup";

        const requestBody = {
            campusGroupName: formData.campusGroupName,
            licenseCount: "10",
            gpsEnabled: formData.gpsEnabled,
            zoomEnabled: formData.zoomEnabled,
            isActive: formData.isActive,
            // inheritEmailSettings: formData.inheritEmailSettings,
            // inheritGoogleOAuth: formData.inheritGoogleOAuth,
            // enableGPS: formData.enableGPS,
            // enableGoogleMeet: formData.enableGoogleMeet,
            // enableSMSTemplateEdit: formData.enableSMSTemplateEdit,
            // enableSMSTemplateID: formData.enableSMSTemplateID,
            // assignedDomains: formData.assignedDomains,
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            openCreateSchoolModal();
            fetchData();
            console.log("Campus group created successfully:", result);
            return result;
        } catch (error) {
            console.error("Error creating campus group:", error);
            return null;
        }
    };

    const modules = [
        "Instant Fee",
        "Discussion",
        "Online Exam",
        "Data Management",
        "Gallery",
        "Custom Report",
        "Assignment",
        "Task",
        "Placement",
        "Online Meeting",
        "Moodle",
        "Applicant Registration",
        "Blog",
        "Data Profile",
        "App Frame",
    ];
    return (
        <>
            <div className='py-10 md:px-10 mt-10 px-[7px] bg-card-color rounded-lg'>
                <div className='my-10 lg:px-20 md:px-10 px-[7px] md:max-h-[80svh] max-h-[60svh] overflow-auto cus-scrollbar'>
                    <div className="flex justify-between items-center">
                        <div className='text-[24px]/[30px] font-medium mb-2'>
                            New School
                        </div>
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
                                    <div className='flex justify-between px-10'>
                                        {/* Profile Content */}
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
                                    <div className='flex px-10'>
                                        {/* Profile Content */}
                                        <label htmlFor='campaignsTitle' className='form-label'>
                                            Inherit Email Settings
                                        </label>
                                        <div className='form-control h-full w-3/5 mb-15'>
                                            <input
                                                type='checkbox'
                                                placeholder='Inherit Email Settings'
                                                className='form-input'
                                                value={formData.inheritEmailSettings || ""}
                                                onChange={(e) => updateFormData("campusGroupName", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex justify-between px-10'>
                                        {/* Profile Content */}
                                        <label htmlFor='campaignsTitle' className='form-label'>
                                            SMS Template ID Enabled
                                        </label>
                                        <div className='form-control h-full w-3/5 mb-15'>
                                            <input
                                                type='checkbox'
                                                placeholder='SMS Template ID Enabled'
                                                className='form-input'
                                                value={formData.enableSMSTemplateID || ""}
                                                onChange={(e) => updateFormData("enableSMSTemplateID", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex justify-between px-10'>
                                        {/* Profile Content */}
                                        <label htmlFor='campaignsTitle' className='form-label'>
                                            Inherit Google OAuth
                                        </label>
                                        <div className='form-control h-full w-3/5 mb-15'>
                                            <input
                                                type='checkbox'
                                                placeholder='School Name'
                                                className='form-input'
                                                value={formData.inheritGoogleOAuth || ""}
                                                onChange={(e) => updateFormData("inheritGoogleOAuth", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex justify-between px-10'>
                                        {/* Profile Content */}
                                        <label htmlFor='campaignsTitle' className='form-label'>
                                            GPS Enabled
                                        </label>
                                        <div className='form-control h-full w-3/5 mb-15'>
                                            <input
                                                type='checkbox'
                                                placeholder='School Name'
                                                className='form-input'
                                                value={formData.enableGPS || ""}
                                                onChange={(e) => updateFormData("enableGPS", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex justify-between px-10'>
                                        {/* Profile Content */}
                                        <label htmlFor='campaignsTitle' className='form-label'>
                                            Zoom Meeting Enabled
                                        </label>
                                        <div className='form-control h-full w-3/5 mb-15'>
                                            <input
                                                type='checkbox'
                                                placeholder='School Name'
                                                className='form-input'
                                                value={formData.zoomEnabled || ""}
                                                onChange={(e) => updateFormData("zoomEnabled", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex justify-between px-10'>
                                        {/* Profile Content */}
                                        <label htmlFor='campaignsTitle' className='form-label'>
                                            Google Meet Enabled
                                        </label>
                                        <div className='form-control h-full w-3/5 mb-15'>
                                            <input
                                                type='checkbox'
                                                placeholder='School Name'
                                                className='form-input'
                                                value={formData.enableGoogleMeet || ""}
                                                onChange={(e) => updateFormData("enableGoogleMeet", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex justify-between px-10'>
                                        {/* Profile Content */}
                                        <label htmlFor='campaignsTitle' className='form-label'>
                                            Higher Storage Plan
                                        </label>
                                        <div className='form-control h-full w-3/5 mb-15'>
                                            <input
                                                type='text'
                                                placeholder='School Name'
                                                className='form-input'
                                            // value={formData.campusGroupName || ""}
                                            // onChange={(e) => updateFormData("campusGroupName", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex justify-between px-10'>
                                        {/* Profile Content */}
                                        <label htmlFor='campaignsTitle' className='form-label'>
                                            Owned by
                                        </label>
                                        <div className='form-control h-full w-3/5 mb-15'>
                                            <input
                                                type='text'
                                                placeholder='School Name'
                                                className='form-input'
                                            // value={formData.campusGroupName || ""}
                                            // onChange={(e) => updateFormData("campusGroupName", e.target.value)}
                                            />
                                        </div>
                                    </div>
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
                                            {modules?.map((module, index) => (
                                                <div className="form-check border border-border-color rounded-md p-4 bg-body-color" key={index}>
                                                    <div className='ml-2'>
                                                        <input
                                                            type="checkbox"
                                                            id={`module-${index}`}
                                                            name="campaignsModule"
                                                            className="form-check-input"
                                                            checked={selectedModules.includes(module)}
                                                            onChange={() => handleModuleChange(module)}
                                                        />
                                                    </div>
                                                    <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor={`module-${index}`}>
                                                        {module}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {activeTab === 3 && (
                                <div>
                                    {/* Email Content */}
                                    <div className='form-control mb-15'>
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
                                    </div>
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
                        <button onClick={openCreateSchoolModal} className='btn btn-secondary'>
                            Close
                        </button>
                        <button className='btn btn-primary' onClick={createCampusGroup}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CampusCreate

