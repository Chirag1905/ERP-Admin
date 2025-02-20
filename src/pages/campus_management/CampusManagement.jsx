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

const CampusManagement = (props) => {
  const breadcrumbItem = [
    {
      name: "School Management",
    },
  ];

  const [searchText, setSearchText] = useState("");
  const [createCampusModal, setCreateCampusModal] = useState(false);
  const [editSchoolModal, setEditSchoolModal] = useState(false);
  const [selectedModules, setSelectedModules] = useState([]);
  const [data, setData] = useState(props?.admin?.campusData?.data);
  console.log("🚀 ~ CampusManagement ~ props?.admin?.campusData?.data:", props?.admin?.campusData?.data)

  useEffect(() => {
    // Update the `data` state whenever `props.admin.campusData.data` changes
    setData(props?.admin?.campusData?.data);
  }, [props.admin.campusData.data]);
  
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

  useEffect(() => {
    // const encodedSearchText = searchText ? encodeURIComponent(searchText) : "";
    const params = {
      page: page || 0,
      size: rowsPerPage || 10,
      sortBy: "id",
      ascending: "true",
      // encodedSearchText:"45"
      searchFilter: searchText
      // ...(encodedSearchText && { searchFilter: encodedSearchText }),
    };

    // Call the function with the params object
    props.requestGetCampus({ data: params });
  }, [page, rowsPerPage, searchText, props.requestGetCampus]);

  useEffect(() => {
    if (data) {
      setTotalPages(data?.totalPages);
    }
  }, [data, rowsPerPage]);

  // console.log(props?.admin?.campusData?.data, "props");
  // console.log(data, "***********");


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