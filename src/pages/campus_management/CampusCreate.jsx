import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import {
    fetchCampusRequest,
    createCampusRequest,
    createCampusFailure,
    createCampusSuccess,
} from '../../Redux/campusSlice';

const CampusCreate = (props) => {
    const {
        openCreateSchoolModal,
        isLoading,
        setIsLoading
    } = props;

    const dispatch = useDispatch();
    const { campusData, campusPostData, loading, error } = useSelector((state) => state.admin);
    console.log("🚀 ~ CampusCreate ~ campusPostData:", campusPostData);
    console.log("🚀 ~ CampusCreate ~ campusData:", campusData);
    // console.log("🚀 ~ CampusCreate ~ error:", error)
    // console.log("🚀 ~ CampusCreate ~ loading:", loading)
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

    const handleSubmit = async () => {
        setIsLoading((prev) => ({ ...prev, add: true }));
      
        const params = {
          campusGroupName: formData.campusGroupName,
          licenseCount: formData.licenseCount,
          gpsEnabled: formData.gpsEnabled,
          zoomEnabled: formData.zoomEnabled,
          isActive: formData.isActive,
        };
      
        // Create a minimum delay of 1 second
        const minDelay = new Promise((resolve) => setTimeout(resolve, 1000));
      
        try {
          // Use toast.promise to show a loading state and handle success/error messages
          await toast.promise(
            // Wrap the dispatch in a custom promise to wait for state updates
            new Promise((resolve, reject) => {
              dispatch(createCampusRequest(params))
                .then((resultAction) => {
                  if (createCampusSuccess.match(resultAction)) {
                    resolve(resultAction.payload); // Resolve with the payload
                  } else if (createCampusFailure.match(resultAction)) {
                    reject(resultAction.payload); // Reject with the payload
                  }
                })
                .catch((error) => {
                  reject(error); // Reject with the error
                });
            }),
            {
              loading: "Saving data...",
              success: (payload) => {
                // Check if the payload has a successful status code
                if (payload?.statusCode === 200 || payload?.statusCode === 201) {
                  // Close the modal
                  openCreateSchoolModal();
      
                  // Refresh the campus list
                  dispatch(
                    fetchCampusRequest({
                      data: {
                        page: 0,
                        size: 10,
                        sortBy: "id",
                        ascending: true,
                      },
                    })
                  );
      
                  return payload?.message || "Data saved successfully!";
                } else {
                  // Throw an error if the status code is not successful
                  throw payload?.errors || "Failed to save data. Please try again.";
                }
              },
              error: (error) => {
                // Handle validation errors or API errors
                if (Array.isArray(error)) {
                  return error.map((err) => `${err?.field}: ${err?.message}`).join("\n");
                }
                return "Something went wrong. Please try again.";
              },
            },
            {
              position: "top-right",
              duration: 3000,
            }
          );
        } catch (error) {
          // Handle unexpected errors
          console.error("Error submitting data:", error);
        } finally {
          // Reset loading state
          setIsLoading((prev) => ({ ...prev, add: false }));
        }
      };

    return (
        <>
            <Toaster />
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
                                                {/* <label className="form-check-label" htmlFor="lightIndoor1">Kitchen</label> */}
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
                        <button className='btn btn-primary' onClick={handleSubmit}
                        // disabled={isLoading.add}
                        >
                            {/* {isLoading.add ? 'Loading...' : 'Submit'} */}
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CampusCreate;