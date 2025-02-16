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
import { Box, MenuItem, Pagination, Select, Typography } from "@mui/material";
import CampusCreate from './CampusCreate';

export default function CampusManagement() {
  const breadcrumbItem = [
    {
      name: "School Management",
    },
  ];

  const [createCampusModal, setCreateCampusModal] = useState(false);
  const [editSchoolModal, setEditSchoolModal] = useState(false);
  const [page, setPage] = useState(0);
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

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


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
        <> <div className='py-10 md:px-10 mt-10 px-[7px] bg-card-color rounded-lg'>
          <div className='my-10 lg:px-20 md:px-10 px-[7px] md:max-h-[70svh] max-h-[60svh] overflow-auto cus-scrollbar'>
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
          <div className='mt-8 mr-2 text-right'>
            <button className='py-[6px] px-3 border border-border-color rounded-s-full bg-card-color transition-all hover:bg-primary hover:text-white'>
              Previous
            </button>
            <button className='py-[6px] px-3 border-y border-e border-border-color bg-card-color transition-all hover:bg-primary hover:text-white'>
              1
            </button>
            <button className='py-[6px] px-3 border-y border-e border-border-color bg-primary text-white transition-all hover:bg-primary hover:text-white'>
              2
            </button>
            <button className='py-[6px] px-3 border-y border-border-color bg-card-color transition-all hover:bg-primary hover:text-white'>
              3
            </button>
            <button className='py-[6px] px-3 border border-border-color rounded-e-full bg-card-color transition-all hover:bg-primary hover:text-white'>
              Next
            </button>
          </div>
          <div className="flex md:flex-row flex-col text-xs items-center justify-between p-2 pt-5 pb-3 gap-3">
              <Box
                display="flex"
                alignItems="center"
                sx={{ fontSize: '0.875rem', fontFamily: 'Poppins, sans-serif', padding: '5px', width: 'fit-content' }}
              >
                <Typography sx={{ color: "#717171", fontSize: '13px', marginRight: '0px', fontFamily: 'Poppins, sans-serif' }}>
                  Mostra
                </Typography>
                <Select
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                  sx={{ borderRadius: "6px", borderColor: "#B8B8B8", opacity: 1, margin: "0 5px", height: '30px', fontSize: '13px', fontFamily: 'Poppins, sans-serif' }}
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
                <Typography sx={{ color: "#717171", fontSize: '13px', fontFamily: 'Poppins, sans-serif' }}>
                  di {data.length} risultati
                </Typography>
              </Box>
              <Pagination
                count={totalPages}
                page={page + 1}
                onChange={handleChangePage}
                shape="rounded"
                size="small"
                siblingCount={0}
                boundaryCount={1}
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontSize: "12px",
                    minWidth: "30px",
                    height: "30px",
                  },
                }}
              />
            </div>
        </>
    </>
  );
}