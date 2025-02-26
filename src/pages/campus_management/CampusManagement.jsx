import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  requestGetCampus,
  userLogout,
} from "../../Redux/actions";
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
  IconSearch,
  IconCaretDownFilled,
  IconCaretUpFilled,
} from '@tabler/icons-react';
import { Box, MenuItem, Pagination, Select, Typography } from "@mui/material";
import CampusCreate from './CampusCreate';
import CustomPagination from '../CustomPagination';

const CampusManagement = (props) => {
  const breadcrumbItem = [
    {
      name: "School Management",
    },
  ];

  const [searchText, setSearchText] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [createCampusModal, setCreateCampusModal] = useState(false);
  const [editSchoolModal, setEditSchoolModal] = useState(false);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState({ main: false, edit: false, add: false });

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const [campusGroupName, setCampusGroupName] = useState("");
  const [licenseCount, setLicenseCount] = useState();
  const [gpsEnabled, setGPSEnabled] = useState(false);
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  // Handle search
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleModuleChange = (module) => {
    if (selectedModules.includes(module)) {
      setSelectedModules(selectedModules.filter((m) => m !== module));
    } else {
      setSelectedModules([...selectedModules, module]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading({ ...isLoading, main: true });

      const params = {
        page: page || 0,
        size: rowsPerPage || 10,
        sortBy: "id",
        ascending: isAscending,
        searchFilter: searchText
      };

      // Create a minimum delay of 1 second
      const minDelay = new Promise(resolve => setTimeout(resolve, 1000));

      try {
        // Wait for both the API call and the minimum delay to complete
        await Promise.all([props.requestGetCampus({ data: params }), minDelay]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading({ ...isLoading, main: false });
      }
    };

    fetchData();
  }, [page, rowsPerPage, isAscending, searchText, props?.requestGetCampus]);

  useEffect(() => {
    if (props?.admin?.campusData?.data) {
      setData(props?.admin?.campusData?.data);
      setTotalPages(props?.admin?.campusData?.data?.totalPages);
    }
  }, [props?.admin?.campusData?.data, page, rowsPerPage]);

  return (
    <>
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
        <CampusCreate
          openCreateSchoolModal={openCreateSchoolModal}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
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
        <>
          <div className='py-9 md:px-10 px-[7px] bg-card-color rounded-lg'>
            <div className='flex justify-between items-start gap-4 mr-6'>
              <div className='flex'>
                <h5 className='text-[20px]/[30px] font-medium ml-6'>
                  Schools Listing
                </h5>
                {isAscending ?
                  <IconCaretDownFilled onClick={() => setIsAscending(false)} /> :
                  <IconCaretUpFilled onClick={() => setIsAscending(true)} />
                }
              </div>
              <div className='card bg-card-color rounded-xl form-control flex'>
                <input
                  type="text"
                  id="team_board_search"
                  className="form-input !rounded-e-none !py-[6px]"
                  placeholder="Search Schools..."
                  value={searchText}
                  onChange={handleSearch}
                />
                <button className="btn border border-border-color !rounded-s-none">
                  <IconSearch className='w-[20px] h-[20px]' />
                </button>
              </div>
            </div>
            <div className={`my-10 lg:px-20 md:px-10 px-[7px] md:max-h-[70svh] max-h-[60svh] ${isLoading?.main ? '' : 'overflow-auto cus-scrollbar'}`}>
              {isLoading?.main ? (
                <div className="flex flex-col items-center justify-center h-[250px]">
                  <svg
                    aria-hidden="true"
                    className="w-9 h-12 text-gray-200 animate-spin bg-card-color fill-[#8B2433]"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              ) : (
                <ul className="flex flex-col md:gap-8 gap-6 mt-6">
                  {data?.content?.length > 0 ? (
                    data.content.map((item, index) => (
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
                    ))
                  ) : (
                    <li className="text-center text-gray-500">No schools available</li>
                  )}
                </ul>
              )}
            </div>

          </div>
          <CustomPagination
            page={page}
            totalPages={totalPages}
            handleChange={handleChange}
            data={data}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return { admin: state.admin };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestGetCampus, userLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CampusManagement);