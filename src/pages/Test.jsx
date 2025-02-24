// import React, { useEffect, useState } from 'react';
// import Breadcrumb from '../components/common/Breadcrumb';
// import ReactDataTable from 'react-data-table-component';
// import WelcomeHeader from '../components/common/WelcomeHeader';
// import {
//   avatar1,
//   avatar2,
//   avatar3,
//   avatar4,
// } from '../assets/images';
// import {
//   IconEdit,
//   IconPlus,
//   IconLogin2,
//   IconTrash,
//   IconSearch,
// } from '@tabler/icons-react';
// // import CampusCreate from './CampusCreate';

// export default function CampusManagement() {
//   const breadcrumbItem = [
//     {
//       name: "School Management",
//     },
//   ];

//   const [searchTerm, setSearchTerm] = useState("");
//   const [createCampusModal, setCreateCampusModal] = useState(false);
//   const [editSchoolModal, setEditSchoolModal] = useState(false);

//   const [schoolName, setSchoolName] = useState('');
//   const [inheritEmailSettings, setInheritEmailSettings] = useState(false);
//   const [inheritGoogleOAuth, setInheritGoogleOAuth] = useState(false);
//   const [enableGPS, setEnableGPS] = useState(false);
//   const [enableGoogleMeet, setEnableGoogleMeet] = useState(false);
//   const [enableSMSTemplateEdit, setEnableSMSTemplateEdit] = useState(false);
//   const [enableSMSTemplateID, setEnableSMSTemplateID] = useState(false);
//   const [assignedDomains, setAssignedDomains] = useState('');
//   const [selectedModules, setSelectedModules] = useState([]);
//   const [activeTab, setActiveTab] = useState(0);

//   const openCreateSchoolModal = () => {
//     setCreateCampusModal(!createCampusModal);
//     setEditSchoolModal(false);
//   };

//   const openEditSchoolModal = () => {
//     setEditSchoolModal(!editSchoolModal);
//     setCreateCampusModal(false);
//   };

//   useEffect(() => {
//     document.body.classList[createCampusModal ? "add" : "remove"]("overflow-hidden");
//   }, [createCampusModal]);

//   useEffect(() => {
//     document.body.classList[editSchoolModal ? "add" : "remove"]("overflow-hidden");
//   }, [editSchoolModal]);

//   const handleModuleChange = (module) => {
//     if (selectedModules.includes(module)) {
//       setSelectedModules(selectedModules.filter((m) => m !== module));
//     } else {
//       setSelectedModules([...selectedModules, module]);
//     }
//   };

//   // const handleModuleChange = (module) => {
//   //   if (selectedModules.includes(module)) {
//   //     setSelectedModules(selectedModules.filter((m) => m !== module));
//   //   } else {
//   //     setSelectedModules([...selectedModules, module]);
//   //   }
//   // };

//   const [data, setData] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [campusGroupName, setCampusGroupName] = useState("");
//   const [licenseCount, setLicenseCount] = useState();
//   const [gpsEnabled, setGPSEnabled] = useState(false);
//   const [zoomEnabled, setZoomEnabled] = useState(false);
//   const [isActive, setIsActive] = useState(false);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://api.testmazing.com/campus/api/campusgroups');
//       const json = await response.json();
//       setData(json);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, [])

//   const modules = [
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

//   const columnsSchool = [
//     {
//       name: 'School Name',
//       selector: row => row.campusGroupName, // This is for sorting and filtering
//       cell: row => ( // Use `cell` to render custom JSX
//         <div className="flex items-center gap-2">
//           <img
//             src={row.campusGroupLogo || ""}
//             alt="school logo"
//             className="rounded-md w-[36px] h-[36px] min-w-[36px]"
//           />
//           <span>{row.campusGroupName}</span>
//         </div>
//       ),
//       sortable: true,
//     },
//     {
//       name: 'Actions',
//       cell: row => ( // Use `cell` to render custom JSX
//         <div className="flex items-stretch gap-2">
//           <button className="btn btn-light-primary" onClick={() => openEditSchoolModal(row)}>
//             <IconEdit className="w-[18px] h-[18px] min-w-[18px]" />
//             <span className="md:block hidden">Edit</span>
//           </button>
//           <button className="btn btn-light-danger">
//             <IconLogin2 className="w-[18px] h-[18px] min-w-[18px]" />
//             <span className="md:block hidden">Login</span>
//           </button>
//         </div>
//       ),
//     },
//   ];

//   const dataSchool = data?.length > 0 ? data.map(item => ({
//     campusGroupLogo: avatar1 || '',
//     campusGroupName: item?.campusGroupName || '',
//   })) : [];

//   // Handle search
//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };


//   return (
//     <div>
//       <div className="flex justify-between items-center">
//         <Breadcrumb breadcrumbItem={breadcrumbItem} />
//         <button
//           onClick={openCreateSchoolModal}
//           className="flex gap-1 btn btn-light-primary"
//         >
//           <IconPlus />
//           <span className="md:block hidden">New School</span>
//         </button>
//       </div>
//       <WelcomeHeader />
//       {createCampusModal ? (
//         <CampusCreate openCreateSchoolModal={openCreateSchoolModal} fetchData={fetchData} />
//       ) : editSchoolModal ? (
//         <>
//           <div className='py-10 md:px-10 mt-10 px-[7px] bg-card-color rounded-lg'>
//             <div className='my-10 lg:px-20 md:px-10 px-[7px] md:max-h-[80svh] max-h-[60svh] overflow-auto cus-scrollbar'>
//               <div className="flex justify-between items-center">
//                 <div className='text-[24px]/[30px] font-medium mb-2'>
//                   Edit School
//                 </div>
//                 <button
//                   onClick={openEditSchoolModal}
//                   className="flex gap-1 btn btn-light-primary mt-2"
//                 >
//                   <IconTrash />
//                   <span className="md:block hidden">Delete School</span>
//                 </button>
//               </div>

//               {/* Flex container for tabs and content */}
//               <div className="flex">
//                 {/* Left Side Tabs */}
//                 <div className="w-1/4 bg-card-color border-r border-border-color">
//                   <div className="flex flex-col space-y-10 p-4">
//                     {['Profile', 'Domain', 'Plugins', 'Email', 'SMS Setting', 'Plugin Settings', 'Gateways'].map((tab, index) => (
//                       <button
//                         key={index}
//                         className={`py-2 px-4 text-left text-primary hover:text-secondary ${activeTab === index ? 'bg-primary-color text-secondary' : 'text-primary'}`}
//                         onClick={() => setActiveTab(index)}
//                       >
//                         {tab}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Right Side Content */}
//                 <div className="w-3/4 p-4">
//                   {activeTab === 0 && (
//                     <>
//                       <div className='flex justify-between px-10'>
//                         {/* Profile Content */}
//                         <label htmlFor='campaignsTitle' className='form-label'>
//                           Name
//                         </label>
//                         <div className='form-control h-full w-3/5 mb-15'>
//                           <input
//                             type='text'
//                             id='campaignsTitle'
//                             placeholder='School Name'
//                             className='form-input'
//                             value={schoolName}
//                             onChange={(e) => setSchoolName(e.target.value)}
//                           />
//                         </div>
//                       </div>
//                       <div className='flex justify-between px-10'>
//                         {/* Profile Content */}
//                         <label htmlFor='campaignsTitle' className='form-label'>
//                           Inherit Email Settings
//                         </label>
//                         <div className='form-control h-full w-3/5 mb-15'>
//                           <input
//                             type='text'
//                             id='campaignsTitle'
//                             placeholder='School Name'
//                             className='form-input'
//                             value={schoolName}
//                             onChange={(e) => setSchoolName(e.target.value)}
//                           />
//                         </div>
//                       </div>
//                       <div className='flex justify-between px-10'>
//                         {/* Profile Content */}
//                         <label htmlFor='campaignsTitle' className='form-label'>
//                           SMS Template ID Enabled
//                         </label>
//                         <div className='form-control h-full w-3/5 mb-15'>
//                           <input
//                             type='text'
//                             id='campaignsTitle'
//                             placeholder='School Name'
//                             className='form-input'
//                             value={schoolName}
//                             onChange={(e) => setSchoolName(e.target.value)}
//                           />
//                         </div>
//                       </div>
//                       <div className='flex justify-between px-10'>
//                         {/* Profile Content */}
//                         <label htmlFor='campaignsTitle' className='form-label'>
//                           Inherit Google OAuth
//                         </label>
//                         <div className='form-control h-full w-3/5 mb-15'>
//                           <input
//                             type='text'
//                             id='campaignsTitle'
//                             placeholder='School Name'
//                             className='form-input'
//                             value={schoolName}
//                             onChange={(e) => setSchoolName(e.target.value)}
//                           />
//                         </div>
//                       </div>
//                       <div className='flex justify-between px-10'>
//                         {/* Profile Content */}
//                         <label htmlFor='campaignsTitle' className='form-label'>
//                           GPS Enabled
//                         </label>
//                         <div className='form-control h-full w-3/5 mb-15'>
//                           <input
//                             type='text'
//                             id='campaignsTitle'
//                             placeholder='School Name'
//                             className='form-input'
//                             value={schoolName}
//                             onChange={(e) => setSchoolName(e.target.value)}
//                           />
//                         </div>
//                       </div>
//                       <div className='flex justify-between px-10'>
//                         {/* Profile Content */}
//                         <label htmlFor='campaignsTitle' className='form-label'>
//                           Zoom Meeting Enabled
//                         </label>
//                         <div className='form-control h-full w-3/5 mb-15'>
//                           <input
//                             type='text'
//                             id='campaignsTitle'
//                             placeholder='School Name'
//                             className='form-input'
//                             value={schoolName}
//                             onChange={(e) => setSchoolName(e.target.value)}
//                           />
//                         </div>
//                       </div>
//                       <div className='flex justify-between px-10'>
//                         {/* Profile Content */}
//                         <label htmlFor='campaignsTitle' className='form-label'>
//                           Google Meet Enabled
//                         </label>
//                         <div className='form-control h-full w-3/5 mb-15'>
//                           <input
//                             type='text'
//                             id='campaignsTitle'
//                             placeholder='School Name'
//                             className='form-input'
//                             value={schoolName}
//                             onChange={(e) => setSchoolName(e.target.value)}
//                           />
//                         </div>
//                       </div>
//                       <div className='flex justify-between px-10'>
//                         {/* Profile Content */}
//                         <label htmlFor='campaignsTitle' className='form-label'>
//                           Higher Storage Plan
//                         </label>
//                         <div className='form-control h-full w-3/5 mb-15'>
//                           <input
//                             type='text'
//                             id='campaignsTitle'
//                             placeholder='School Name'
//                             className='form-input'
//                             value={schoolName}
//                             onChange={(e) => setSchoolName(e.target.value)}
//                           />
//                         </div>
//                       </div>
//                       <div className='flex justify-between px-10'>
//                         {/* Profile Content */}
//                         <label htmlFor='campaignsTitle' className='form-label'>
//                           Owned by
//                         </label>
//                         <div className='form-control h-full w-3/5 mb-15'>
//                           <input
//                             type='text'
//                             id='campaignsTitle'
//                             placeholder='School Name'
//                             className='form-input'
//                             value={schoolName}
//                             onChange={(e) => setSchoolName(e.target.value)}
//                           />
//                         </div>
//                       </div>
//                     </>
//                   )}
//                   {activeTab === 1 && (
//                     <div>
//                       {/* Domain Content */}
//                       <div className='form-control mb-15'>
//                         <label className='form-label'>
//                           Assigned Domains
//                         </label>
//                         <div className='relative w-full flex'>
//                           <input
//                             type='text'
//                             className='form-input'
//                             value={assignedDomains}
//                             onChange={(e) => setAssignedDomains(e.target.value)}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   {activeTab === 2 && (
//                     <div>
//                       {/* Plugins Content */}
//                       <div className='form-control mb-15'>
//                         <div className='justify-between flex mb-4'>
//                           <label className='form-label'>
//                             Assign Plugins
//                           </label>
//                           <label className='form-label'>
//                             All | Name
//                           </label>
//                         </div>
//                         <div className="grid grid-cols-3 gap-4">
//                           {modules?.map((module, index) => (
//                             <div className="form-check border border-border-color rounded-md p-4 bg-body-color" key={index}>
//                               <div className='ml-2'>
//                                 <input
//                                   type="checkbox"
//                                   id={`module-${index}`}
//                                   name="campaignsModule"
//                                   className="form-check-input"
//                                   checked={selectedModules.includes(module)}
//                                   onChange={() => handleModuleChange(module)}
//                                 />
//                               </div>
//                               <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor={`module-${index}`}>
//                                 {module}
//                               </label>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   {activeTab === 3 && (
//                     <div>
//                       {/* Email Content */}
//                       <div className='form-control mb-15'>
//                         <div className='relative w-full flex'>
//                           <div className="flex items-center justify-center gap-4 border border-border-color rounded-s-md mr-[-1px] py-[6px] px-[12px] bg-body-color">
//                             <div className="form-check">
//                               <input
//                                 type="checkbox"
//                                 id="campaignsEmail"
//                                 name="campaignsEmail"
//                                 className="form-check-input"
//                                 checked={inheritEmailSettings}
//                                 onChange={(e) => setInheritEmailSettings(e.target.checked)}
//                               />
//                               <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor="campaignsEmail">Inherit Email Settings</label>
//                             </div>
//                             <div className="form-check">
//                               <input
//                                 type="checkbox"
//                                 id="campaignsGoogle"
//                                 name="campaignsGoogle"
//                                 className="form-check-input"
//                                 checked={inheritGoogleOAuth}
//                                 onChange={(e) => setInheritGoogleOAuth(e.target.checked)}
//                               />
//                               <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor="campaignsGoogle">Inherit Google OAuth</label>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   {activeTab === 4 && (
//                     <div>
//                       {/* SMS Setting Content */}
//                       <div className='form-control mb-15'>
//                         <label className='form-label'>
//                           SMS Settings
//                         </label>
//                         <div className='relative w-full flex'>
//                           <div className="flex items-center justify-center gap-4 border border-border-color rounded-s-md mr-[-1px] py-[6px] px-[12px] bg-body-color">
//                             <div className="form-check">
//                               <input
//                                 type="checkbox"
//                                 id="campaignsSMS"
//                                 name="campaignsSMS"
//                                 className="form-check-input"
//                                 checked={enableSMSTemplateEdit}
//                                 onChange={(e) => setEnableSMSTemplateEdit(e.target.checked)}
//                               />
//                               <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor="campaignsSMS">Enable SMS Template Edit</label>
//                             </div>
//                             <div className="form-check">
//                               <input
//                                 type="radio"
//                                 id="campaignsSMSID"
//                                 name="campaignsSMSID"
//                                 className="form-check-input"
//                                 checked={enableSMSTemplateID}
//                                 onChange={(e) => setEnableSMSTemplateID(e.target.checked)}
//                               />
//                               <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor="campaignsSMSID">Enable SMS Template ID</label>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   {activeTab === 5 && (
//                     <div>
//                       {/* Plugin Settings Content */}
//                       <div className='form-control mb-15'>
//                         <div className='relative w-full flex'>
//                           <div className="flex items-center justify-center gap-4 border border-border-color rounded-s-md mr-[-1px] py-[6px] px-[12px] bg-body-color">
//                             <div className="form-check">
//                               <input
//                                 type="checkbox"
//                                 id="campaignsGps"
//                                 name="campaignsGps"
//                                 className="form-check-input"
//                                 checked={enableGPS}
//                                 onChange={(e) => setEnableGPS(e.target.checked)}
//                               />
//                               <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor="campaignsGps">Enable GPS</label>
//                             </div>
//                             <div className="form-check">
//                               <input
//                                 type="checkbox"
//                                 id="campaignsMeet"
//                                 name="campaignsMeet"
//                                 className="form-check-input"
//                                 checked={enableGoogleMeet}
//                                 onChange={(e) => setEnableGoogleMeet(e.target.checked)}
//                               />
//                               <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor="campaignsMeet">Enable Google Meet</label>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   {activeTab === 6 && (
//                     <div>
//                       {/* Gateways Content */}
//                       <div className='form-control mb-15'>
//                         <label className='form-label'>
//                           Gateways
//                         </label>
//                         <div className='relative w-full flex'>
//                           <div className="flex items-center justify-center gap-4 border border-border-color rounded-s-md mr-[-1px] py-[6px] px-[12px] bg-body-color">
//                             <div className="form-check">
//                               <input
//                                 type="checkbox"
//                                 id="campaignsZoom"
//                                 name="campaignsZoom"
//                                 className="form-check-input"
//                               // checked={enableZoomMeeting}
//                               // onChange={(e) => setEnableZoomMeeting(e.target.checked)}
//                               />
//                               <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor="campaignsZoom">Enable Zoom Meeting</label>
//                             </div>
//                             <div className="form-check">
//                               <input
//                                 type="checkbox"
//                                 id="campaignsGoogleMeet"
//                                 name="campaignsGoogleMeet"
//                                 className="form-check-input"
//                                 checked={enableGoogleMeet}
//                                 onChange={(e) => setEnableGoogleMeet(e.target.checked)}
//                               />
//                               <label className="form-check-label !text-[16px]/[24px] ml-2" htmlFor="campaignsGoogleMeet">Enable Google Meet</label>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Buttons Section */}
//               <div className='flex items-stretch gap-5'>
//                 <button onClick={openEditSchoolModal} className='btn btn-secondary'>
//                   Close
//                 </button>
//                 <button className='btn btn-primary'>
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       ) : (
//         <div className='py-10 md:px-10 mt-10 px-[7px] bg-card-color rounded-lg'>
//           <div className='react-data-table striped overflow-auto'>
//             <ReactDataTable
//               columns={columnsSchool}
//               data={dataSchool.filter((item) =>
//                 item.campusGroupName.toLowerCase().includes(searchTerm.toLowerCase())
//               )}
//               subHeader
//               subHeaderComponent={
//                 <div className="flex items-center justify-between mb-4">
//                   <h5 className="text-[20px]/[24px] font-medium">School Listing</h5>
//                   <div className="form-control flex w-full max-w-[300px]">
//                     <input
//                       type="text"
//                       id="team_board_search"
//                       className="form-input !rounded-e-none !py-[6px] flex-grow"
//                       placeholder="Search..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                     <button
//                       className="btn border border-border-color !rounded-s-none"
//                       type="button"
//                     >
//                       <IconSearch className="w-[20px] h-[20px]" />
//                     </button>
//                   </div>
//                 </div>
//               }
//               pagination
//               paginationPerPage={10}
//               paginationRowsPerPageOptions={[10, 20, 30]}
//               customStyles={{
//                 headCells: {
//                   style: {
//                     fontWeight: "bold",
//                     fontSize: "14px",
//                     borderRight: "none",
//                   },
//                 },
//               }}
//             />
//           </div>
//           <div className='mt-8 text-right'>
//             <button className='py-[6px] px-3 border border-border-color rounded-s-full bg-card-color transition-all hover:bg-primary hover:text-white'>
//               Previous
//             </button>
//             <button className='py-[6px] px-3 border-y border-e border-border-color bg-card-color transition-all hover:bg-primary hover:text-white'>
//               1
//             </button>
//             <button className='py-[6px] px-3 border-y border-e border-border-color bg-primary text-white transition-all hover:bg-primary hover:text-white'>
//               2
//             </button>
//             <button className='py-[6px] px-3 border-y border-border-color bg-card-color transition-all hover:bg-primary hover:text-white'>
//               3
//             </button>
//             <button className='py-[6px] px-3 border border-border-color rounded-e-full bg-card-color transition-all hover:bg-primary hover:text-white'>
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { requestPostCampus, userLogout } from '../../Redux/actions';

// const CampusCreate = (props) => {
//     const {
//         openCreateSchoolModal,
//         isLoading,
//         setIsLoading,
//         requestPostCampus,
//     } = props;

//     const [formData, setFormData] = useState({
//         campusGroupName: '',
//         licenseCount: '',
//         gpsEnabled: false,
//         zoomEnabled: false,
//         isActive: false,
//         inheritEmailSettings: false,
//         inheritGoogleOAuth: false,
//         enableGPS: false,
//         enableGoogleMeet: false,
//         enableSMSTemplateEdit: false,
//         enableSMSTemplateID: false,
//         assignedDomains: '',
//     });

//     const [selectedModules, setSelectedModules] = useState([]);
//     const [activeTab, setActiveTab] = useState(0);

//     const updateFormData = (key, value) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             [key]: value,
//         }));
//     };

//     const handleModuleChange = (module) => {
//         if (selectedModules.includes(module)) {
//             setSelectedModules(selectedModules.filter((m) => m !== module));
//         } else {
//             setSelectedModules([...selectedModules, module]);
//         }
//     };

//     const modules = [
//         'Instant Fee',
//         'Discussion',
//         'Online Exam',
//         'Data Management',
//         'Gallery',
//         'Custom Report',
//         'Assignment',
//         'Task',
//         'Placement',
//         'Online Meeting',
//         'Moodle',
//         'Applicant Registration',
//         'Blog',
//         'Data Profile',
//         'App Frame',
//     ];

//     const handleSubmit = async () => {
//         setIsLoading({ ...isLoading, add: true });

//         const params = {
//             campusGroupName: formData.campusGroupName,
//             licenseCount: formData.licenseCount,
//             gpsEnabled: formData.gpsEnabled,
//             zoomEnabled: formData.zoomEnabled,
//             isActive: formData.isActive,
//         };

//         try {
//             await requestPostCampus({ data: params });
//             // Handle success (e.g., show a success message or redirect)
//         } catch (error) {
//             console.error('Error posting campus data:', error);
//             // Handle error (e.g., show an error message)
//         } finally {
//             setIsLoading({ ...isLoading, add: false });
//         }
//     };

//     return (
//         <>
//             <div className='py-10 md:px-10 mt-10 px-[7px] bg-card-color rounded-lg'>
//                 <div className='my-10 lg:px-20 md:px-10 px-[7px] md:max-h-[80svh] max-h-[60svh] overflow-auto cus-scrollbar'>
//                     <div className="flex justify-between items-center">
//                         <div className='text-[24px]/[30px] font-medium mb-2'>
//                             New School
//                         </div>
//                     </div>

//                     {/* Flex container for tabs and content */}
//                     <div className="flex">
//                         {/* Left Side Tabs */}
//                         <div className="w-1/4 bg-card-color border-r border-border-color">
//                             <div className="flex flex-col space-y-10 p-4">
//                                 {['Profile', 'Domain', 'Plugins', 'Email', 'SMS Setting', 'Plugin Settings', 'Gateways'].map((tab, index) => (
//                                     <button
//                                         key={index}
//                                         className={`py-2 px-4 text-left text-primary hover:text-secondary ${activeTab === index ? 'bg-primary-color text-secondary' : 'text-primary'}`}
//                                         onClick={() => setActiveTab(index)}
//                                     >
//                                         {tab}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Right Side Content */}
//                         <div className="w-3/4 p-4">
//                             {activeTab === 0 && (
//                                 <>
//                                     <div className="flex flex-col space-y-4">
//                                         <div className='flex justify-between px-10'>
//                                             <label htmlFor='campaignsTitle' className='form-label'>
//                                                 Name <span className="text-red-500"> *</span>
//                                             </label>
//                                             <div className='form-control h-full w-3/5 mb-15'>
//                                                 <input
//                                                     type='text'
//                                                     placeholder='School Name'
//                                                     className='form-input'
//                                                     value={formData.campusGroupName || ''}
//                                                     onChange={(e) => updateFormData('campusGroupName', e.target.value)}
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className='flex justify-between px-10'>
//                                             <label htmlFor='campaignsTitle' className='form-label'>
//                                                 License Count <span className="text-red-500"> *</span>
//                                             </label>
//                                             <div className='form-control h-full w-3/5 mb-15'>
//                                                 <input
//                                                     type='number'
//                                                     placeholder='license count'
//                                                     className='form-input'
//                                                     value={formData.licenseCount || ''}
//                                                     onChange={(e) => updateFormData('licenseCount', e.target.value)}
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className='flex justify-between px-10'>
//                                             <label htmlFor='campaignsTitle' className='form-label'>
//                                                 GPS Enabled <span className="text-red-500"> *</span>
//                                             </label>
//                                             <div className='form-check form-switch h-full w-3/5 mb-15'>
//                                                 <input
//                                                     type="checkbox"
//                                                     className="form-check-input"
//                                                     checked={formData.gpsEnabled || false}
//                                                     onChange={(e) => updateFormData('gpsEnabled', e.target.checked)}
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className='flex justify-between px-10'>
//                                             <label htmlFor='campaignsTitle' className='form-label'>
//                                                 Zoom Meeting Enabled <span className="text-red-500"> *</span>
//                                             </label>
//                                             <div className='form-check form-switch h-full w-3/5 mb-15'>
//                                                 <input
//                                                     type='checkbox'
//                                                     className='form-check-input'
//                                                     checked={formData.zoomEnabled || false}
//                                                     onChange={(e) => updateFormData('zoomEnabled', e.target.checked)}
//                                                 />
//                                             </div>
//                                         </div>
//                                         <div className='flex justify-between px-10'>
//                                             <label htmlFor='campaignsTitle' className='form-label'>
//                                                 IsActive <span className="text-red-500"> *</span>
//                                             </label>
//                                             <div className='form-check form-switch h-full w-3/5 mb-15'>
//                                                 <input
//                                                     type='checkbox'
//                                                     className='form-check-input'
//                                                     checked={formData.isActive || false}
//                                                     onChange={(e) => updateFormData('isActive', e.target.checked)}
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </>
//                             )}
//                             {/* Other tabs content remains the same */}
//                         </div>
//                     </div>

//                     {/* Buttons Section */}
//                     <div className='flex items-stretch gap-5'>
//                         <button onClick={openCreateSchoolModal} className='btn btn-secondary'>
//                             Close
//                         </button>
//                         <button className='btn btn-primary' onClick={handleSubmit} disabled={isLoading.add}>
//                             {isLoading.add ? 'Loading...' : 'Submit'}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// const mapStateToProps = (state) => {
//     return { admin: state.admin };
// };

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators({ requestPostCampus, userLogout }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(CampusCreate);

import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Test = () => {
  const saveSettings = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.5; // Simulating success/failure
        isSuccess ? resolve('Success') : reject('Error');
      }, 2000);
    });
  };

  const showToast = () => {
    toast.promise(
      saveSettings(),
      {
        position: 'top-right',
        loading: 'Saving...',
        success: <b>Settings saved!</b>,
        error: <b>Could not save.</b>,
      }
    );
  };

  return (
    <div>
      <button onClick={showToast}>Show Success Toast</button>
      <Toaster position="top-right" />
    </div>
  );
};

export default Test;
