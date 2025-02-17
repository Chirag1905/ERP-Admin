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
} from '@tabler/icons-react';
import { Box, MenuItem, Pagination, Select, Typography } from "@mui/material";
import CampusCreate from './CampusCreate';
import CustomPagination from '../CustomPagination';

function CampusManagement(props) {
  const breadcrumbItem = [
    {
      name: "School Management",
    },
  ];

  const [searchText, setSearchText] = useState("");
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
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [campusGroupName, setCampusGroupName] = useState("");
  const [licenseCount, setLicenseCount] = useState();
  const [gpsEnabled, setGPSEnabled] = useState(false);
  const [zoomEnabled, setZoomEnabled] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('https://api.testmazing.com/campus/api/campusgroups');
  //     const json = await response.json();
  //     setData(json);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }

  useEffect(() => {
    const encodedSearchText = searchText ? encodeURIComponent(searchText) : "";

      const params = new URLSearchParams({
        page: page || 0,
        size: rowsPerPage || 10,
        sortBy: "id",
        ascending: "true",
        ...(encodedSearchText && { searchFilter: encodedSearchText }) // Ensure proper key
      });

    props.requestGetCampus({
      params
    });
  }, [page, rowsPerPage, searchText]);

  console.log(props?.admin?.campusData?.data, "*************************props***********************");

  // const fetchData = async () => {
  //   setIsLoading((prev) => ({ ...prev, main: true }));

  //   try {
  //     // Encode search text to handle spaces & special characters
  //     const encodedSearchText = searchText ? encodeURIComponent(searchText) : "";

  //     const params = new URLSearchParams({
  //       page: page || 0,
  //       size: rowsPerPage || 10,
  //       sortBy: "id",
  //       ascending: "true",
  //       ...(encodedSearchText && { searchFilter: encodedSearchText }) // Ensure proper key
  //     });

  //     const url = `https://api.testmazing.com/campus/api/campusgroupspagination?${params}`;

  //     console.log("🚀 ~ fetchData ~ url:", url)
  //     // Fetch data with headers
  //     const response = await fetch(url, {
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     });

  //     if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

  //     const json = await response.json();
  //     console.log("API Response:", json); // Debugging: Check API response structure

  //     // Update state
  //     setData(json || []);
  //     setTotalPages(json?.totalPages || 0);
  //   } catch (error) {
  //     console.error("Error fetching order data:", error);
  //   } finally {
  //     setIsLoading((prev) => ({ ...prev, main: false }));
  //   }
  // };


  // useEffect(() => {
  //   fetchData();
  // }, [page, rowsPerPage, searchText])

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
      <>
        <div className='py-10 md:px-10 mt-10 px-[7px] bg-card-color rounded-lg'>
          <div className='flex justify-between items-start gap-4 me-4'>
            <div>
              <h5 className='text-[20px]/[30px] font-medium'>
                Schools Listing
              </h5>
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
              <button className="btn border border-border-color !rounded-s-none" type="button">
                <IconSearch className='w-[20px] h-[20px]' />
              </button>
            </div>
          </div>
          <div className='my-10 lg:px-20 md:px-10 px-[7px] md:max-h-[70svh] max-h-[60svh] overflow-auto cus-scrollbar'>
            <ul className="flex flex-col md:gap-8 gap-6 mt-6">
              {data?.content?.length > 0 && data?.content?.map((item, index) => (
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
        <CustomPagination
          page={page}
          totalPages={totalPages}
          handleChange={handleChange}
          data={data}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </>
    </>
  );
}

const mapStateToProps = (state) => {
  return { admin: state.admin };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestGetCampus, userLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CampusManagement);


