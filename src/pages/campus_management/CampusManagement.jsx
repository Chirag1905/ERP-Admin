import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/common/Breadcrumb';
import WelcomeHeader from '../../components/common/WelcomeHeader';
import {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
} from '../../assets/images';
import {
  IconEdit,
  IconPlus,
  IconLogin2,
  IconTrash,
} from '@tabler/icons-react';
import CampusCreate from './CampusCreate';

export default function CampusManagement() {
  const breadcrumbItem = [
    {
      name: "School Management",
    },
  ];

  const [createCampusModal, setCreateCampusModal] = useState(false);
  const [editSchoolModal, setEditSchoolModal] = useState(false);

  const [schoolName, setSchoolName] = useState('');
  const [inheritEmailSettings, setInheritEmailSettings] = useState(false);
  const [inheritGoogleOAuth, setInheritGoogleOAuth] = useState(false);
  const [enableGPS, setEnableGPS] = useState(false);
  const [enableGoogleMeet, setEnableGoogleMeet] = useState(false);
  const [enableSMSTemplateEdit, setEnableSMSTemplateEdit] = useState(false);
  const [enableSMSTemplateID, setEnableSMSTemplateID] = useState(false);
  const [assignedDomains, setAssignedDomains] = useState('');
  const [selectedModules, setSelectedModules] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const openCreateSchoolModal = () => {
    setCreateCampusModal(!createCampusModal);
    setEditSchoolModal(false);
  };

  const openEditSchoolModal = () => {
    setEditSchoolModal(!editSchoolModal);
    setCreateCampusModal(false);
  };

  useEffect(() => {
    document.body.classList[createCampusModal ? "add" : "remove"]("overflow-hidden");
  }, [createCampusModal]);

  useEffect(() => {
    document.body.classList[editSchoolModal ? "add" : "remove"]("overflow-hidden");
  }, [editSchoolModal]);

  const handleModuleChange = (module) => {
    if (selectedModules.includes(module)) {
      setSelectedModules(selectedModules.filter((m) => m !== module));
    } else {
      setSelectedModules([...selectedModules, module]);
    }
  };

  // const handleModuleChange = (module) => {
  //   if (selectedModules.includes(module)) {
  //     setSelectedModules(selectedModules.filter((m) => m !== module));
  //   } else {
  //     setSelectedModules([...selectedModules, module]);
  //   }
  // };

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [campusGroupName, setCampusGroupName] = useState("");
  const [licenseCount, setLicenseCount] = useState();
  const [gpsEnabled, setGPSEnabled] = useState(false);
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.testmazing.com/campus/api/campusgroups');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

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
    <div>
      <div className="flex justify-between items-center">
        <Breadcrumb breadcrumbItem={breadcrumbItem} />
        <button
          onClick={openCreateSchoolModal}
          className="flex gap-1 btn btn-light-primary"
        >
          <IconPlus />
          <span className="md:block hidden">New School</span>
        </button>
      </div>
      <WelcomeHeader />
      {createCampusModal ? (
        <CampusCreate openCreateSchoolModal={openCreateSchoolModal} fetchData={fetchData} />
      ) : editSchoolModal ? (
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
                  <IconTrash />
                  <span className="md:block hidden">Delete School</span>
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
                      <div className='flex justify-between px-10'>
                        {/* Profile Content */}
                        <label htmlFor='campaignsTitle' className='form-label'>
                          Name
                        </label>
                        <div className='form-control h-full w-3/5 mb-15'>
                          <input
                            type='text'
                            id='campaignsTitle'
                            placeholder='School Name'
                            className='form-input'
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className='flex justify-between px-10'>
                        {/* Profile Content */}
                        <label htmlFor='campaignsTitle' className='form-label'>
                          Inherit Email Settings
                        </label>
                        <div className='form-control h-full w-3/5 mb-15'>
                          <input
                            type='text'
                            id='campaignsTitle'
                            placeholder='School Name'
                            className='form-input'
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
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
                            type='text'
                            id='campaignsTitle'
                            placeholder='School Name'
                            className='form-input'
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
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
                            type='text'
                            id='campaignsTitle'
                            placeholder='School Name'
                            className='form-input'
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
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
                            type='text'
                            id='campaignsTitle'
                            placeholder='School Name'
                            className='form-input'
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
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
                            type='text'
                            id='campaignsTitle'
                            placeholder='School Name'
                            className='form-input'
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
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
                            type='text'
                            id='campaignsTitle'
                            placeholder='School Name'
                            className='form-input'
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
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
                            id='campaignsTitle'
                            placeholder='School Name'
                            className='form-input'
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
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
                            id='campaignsTitle'
                            placeholder='School Name'
                            className='form-input'
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
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
                            value={assignedDomains}
                            onChange={(e) => setAssignedDomains(e.target.value)}
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
                                id="campaignsEmail"
                                name="campaignsEmail"
                                className="form-check-input"
                                checked={inheritEmailSettings}
                                onChange={(e) => setInheritEmailSettings(e.target.checked)}
                              />
                              <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor="campaignsEmail">Inherit Email Settings</label>
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                id="campaignsGoogle"
                                name="campaignsGoogle"
                                className="form-check-input"
                                checked={inheritGoogleOAuth}
                                onChange={(e) => setInheritGoogleOAuth(e.target.checked)}
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
                                id="campaignsSMS"
                                name="campaignsSMS"
                                className="form-check-input"
                                checked={enableSMSTemplateEdit}
                                onChange={(e) => setEnableSMSTemplateEdit(e.target.checked)}
                              />
                              <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor="campaignsSMS">Enable SMS Template Edit</label>
                            </div>
                            <div className="form-check">
                              <input
                                type="radio"
                                id="campaignsSMSID"
                                name="campaignsSMSID"
                                className="form-check-input"
                                checked={enableSMSTemplateID}
                                onChange={(e) => setEnableSMSTemplateID(e.target.checked)}
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
                                id="campaignsGps"
                                name="campaignsGps"
                                className="form-check-input"
                                checked={enableGPS}
                                onChange={(e) => setEnableGPS(e.target.checked)}
                              />
                              <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor="campaignsGps">Enable GPS</label>
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                id="campaignsMeet"
                                name="campaignsMeet"
                                className="form-check-input"
                                checked={enableGoogleMeet}
                                onChange={(e) => setEnableGoogleMeet(e.target.checked)}
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
                                id="campaignsZoom"
                                name="campaignsZoom"
                                className="form-check-input"
                              // checked={enableZoomMeeting}
                              // onChange={(e) => setEnableZoomMeeting(e.target.checked)}
                              />
                              <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor="campaignsZoom">Enable Zoom Meeting</label>
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                id="campaignsGoogleMeet"
                                name="campaignsGoogleMeet"
                                className="form-check-input"
                                checked={enableGoogleMeet}
                                onChange={(e) => setEnableGoogleMeet(e.target.checked)}
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
                <button onClick={openEditSchoolModal} className='btn btn-secondary'>
                  Close
                </button>
                <button className='btn btn-primary'>
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='py-10 md:px-10 mt-10 px-[7px] bg-card-color rounded-lg'>
          <div className='my-10 lg:px-20 md:px-10 px-[7px] md:max-h-[80svh] max-h-[60svh] overflow-auto cus-scrollbar'>
            <div className='flex justify-between items-start gap-4'>
              <div>
                <h5 className='text-[20px]/[30px] font-medium'>
                  Schools Listing
                </h5>
              </div>
            </div>
            <ul className="flex flex-col md:gap-8 gap-6 mt-6">
              {data?.length > 0 && data?.map((item, index) => (
                <li className="flex sm:items-center sm:gap-4 gap-2 sm:flex-row flex-col" key={index}>
                  <img src={avatar1 || ""} alt="user profile" className='rounded-md w-[36px] h-[36px] min-w-[36px]' />
                  <div className='flex-grow'>
                    <h6 className="font-medium">{item?.campusGroupName || ""}</h6>
                  </div>
                  <div className="flex items-stretch gap-2">
                    <button className="btn btn-light-primary" onClick={openEditSchoolModal}>
                      <IconEdit className='w-[18px] h-[18px] min-w-[18px]' />
                      <span className='md:block hidden'>Edit</span>
                    </button>
                    <button className="btn btn-light-danger">
                      <IconLogin2 className='w-[18px] h-[18px] min-w-[18px]' />
                      <span className='md:block hidden'>Login</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}