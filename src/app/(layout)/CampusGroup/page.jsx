'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCampusGroupRequest } from "../../../Redux/features/campusGroup/campusGroupSlice";
import Breadcrumb from '../../../components/common/Breadcrumb';
import WelcomeHeader from '../../../components/common/WelcomeHeader';
import {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
} from '../../../assets/images';
import {
  IconEdit,
  IconPlus,
  IconLogin2,
  IconSearch,
  IconCaretDownFilled,
  IconCaretUpFilled,
} from '@tabler/icons-react';
import toast from 'react-hot-toast';
import CustomPagination from '../../../components/common/CustomPagination';
import { closeModal, openModal } from '../../../Redux/features/utils/modalSlice';
import CampusGroupEdit from './_components/CampusGroupEdit';
import CampusGroupCreate from './_components/CampusGroupCreate';
import Image from 'next/image';

const CampusGroupManagement = () => {
  const breadcrumbItem = [{ name: "School Management" }];

  // Redux state
  const dispatch = useDispatch();
  const { campusGroupData, loading, error } = useSelector((state) => state.campusGroup);
  const { modals } = useSelector((state) => state.modal);

  // Modal states
  const isCreateModalOpen = modals.createCampusGroup.isOpen;
  const isEditModalOpen = modals.editCampusGroup.isOpen;

  // Component state
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 10,
    totalPages: 0,
    totalElements: 0,
  });
  const [selectedItem, setSelectedItem] = useState(null);

  // Modal handlers
  const handleCreateModal = {
    open: () => {
      dispatch(openModal({ modalType: "createCampusGroup" }));
      dispatch(closeModal({ modalType: "editCampusGroup" }));
    },
    close: () => dispatch(closeModal({ modalType: "createCampusGroup" }))
  };

  const handleEditModal = {
    open: (item) => {
      dispatch(openModal({ modalType: "editCampusGroup" }));
      dispatch(closeModal({ modalType: "createCampusGroup" }));
      setSelectedItem(item);
    },
    close: () => dispatch(closeModal({ modalType: "editCampusGroup" }))
  };

  // Pagination handlers
  const handlePageChange = (event, value) => {
    setPagination(prev => ({ ...prev, page: value }));
  };

  const handleRowsPerPageChange = (event) => {
    setPagination(prev => ({
      ...prev,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    }));
  };

  // Search handler
  const handleSearch = (e) => setSearchText(e.target.value);

  // Effect for body scroll lock
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isCreateModalOpen || isEditModalOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isCreateModalOpen, isEditModalOpen]);

  // Effect for data update
  useEffect(() => {
    if (campusGroupData) {
      setData(campusGroupData?.data?.content || []);
      setPagination(prev => ({
        ...prev,
        totalPages: campusGroupData?.data?.totalPages || 0,
        totalElements: campusGroupData?.data?.totalElements || 0
      }));
    }
  }, [campusGroupData]);

  // Effect for data fetching
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        page: pagination.page,
        size: pagination.rowsPerPage,
        sortBy: "id",
        ascending: isAscending,
        searchFilter: searchText
      };

      try {
        dispatch(getCampusGroupRequest({ data: params }));
      } catch (error) {
        console.error("Error fetching campus group data:", error);
        toast.error("Failed to load campus group data");
      }
    };

    fetchData();
  }, [
    pagination.page,
    pagination.rowsPerPage,
    isAscending,
    searchText,
    isCreateModalOpen,
    isEditModalOpen,
    dispatch
  ]);

  // Handle API errors
  useEffect(() => {
    if (!error) return;
    if (Array.isArray(error.error)) {
      console.error('Error Fetching Data', { position: "top-right", duration: 2000, });
    } else if (error.message) {
      toast.error(error.message, { position: "top-right", duration: 2000 });
    } else {
      toast.error("An unexpected error occurred", { position: "top-right", duration: 2000 });
    }
  }, [error]);

  return (
    <>
      {/* <div className="flex justify-between items-center">
        <Breadcrumb breadcrumbItem={breadcrumbItem} />
        <button
          onClick={handleCreateModal.open}
          className="flex gap-1 btn btn-light-primary"
        >
          <IconPlus />
          <span className="md:block hidden">New School</span>
        </button>
      </div>
      <WelcomeHeader /> */}
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
          <Breadcrumb breadcrumbItem={breadcrumbItem} />
          <button
            onClick={handleCreateModal.open}
            className="flex gap-1 btn btn-light-primary w-full md:w-auto"
          >
            <IconPlus />
            <span className="block">Add School</span>
          </button>
        </div>
        <div className="md:hidden h-4"></div>
        <WelcomeHeader />
      </div>

      {isCreateModalOpen && (
        <CampusGroupCreate
          openModal={handleCreateModal.open}
          closeModal={handleCreateModal.close}
        />
      )}

      {isEditModalOpen && (
        <CampusGroupEdit
          openModal={handleEditModal.open}
          closeModal={handleEditModal.close}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}

      {!isCreateModalOpen && !isEditModalOpen && (
        <div className="pt-6 md:pt-9 px-4 sm:px-6 md:px-10 bg-card-color rounded-lg">
          {/* Header Section */}
          <div className="flex flex-col md:mx-6 md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center w-full md:w-auto">
              <h5 className="text-lg sm:text-xl font-medium">
                Schools Listing
              </h5>
              {isAscending ? (
                <IconCaretDownFilled
                  onClick={() => setIsAscending(false)}
                  className="cursor-pointer ml-2"
                />
              ) : (
                <IconCaretUpFilled
                  onClick={() => setIsAscending(true)}
                  className="cursor-pointer ml-2"
                />
              )}
            </div>

            {/* Search Input */}
            <div className='w-full md:w-auto card bg-card-color rounded-xl form-control flex'>
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

          {/* Content Section */}
          <div
            className={`my-6 md:my-10 px-2 sm:px-4 md:px-10 h-[60vh] md:h-[70vh] ${loading ? '' : 'overflow-auto cus-scrollbar'
              }`}
          >
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full">
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
              <ul className="flex flex-col gap-4 md:gap-6 h-full">
                {data?.length > 0 ? (
                  data?.map((item, index) => (
                    <li
                      className="flex items-center justify-between gap-3 p-3 bg-white/10 rounded-lg border"
                      key={`school-${item.id || index}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Image
                          src={avatar1 || ""}
                          alt="school profile"
                          className="rounded-md w-9 h-9 min-w-[36px] object-cover"
                        />
                        <h6 className="font-medium truncate">
                          {item?.campusGroupName || ""}
                        </h6>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          className="btn btn-light-primary px-3 py-1.5 text-sm"
                          onClick={() => handleEditModal.open(item)}
                        >
                          <IconEdit className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                          <span className="hidden md:inline ml-1">Edit</span>
                        </button>
                        <button className="btn btn-light-danger px-3 py-1.5 text-sm">
                          <IconLogin2 className="w-4 h-4 md:w-[18px] md:h-[18px]" />
                          <span className="hidden md:inline ml-1">Login</span>
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="flex items-center justify-center h-full text-gray-500">
                    No schools available
                  </li>
                )}
              </ul>
            )}
          </div>
          {/* Pagination */}
          <div className="mt-6">
            <CustomPagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              handleChange={handlePageChange}
              totalElements={pagination?.totalElements}
              rowsPerPage={pagination.rowsPerPage}
              handleChangeRowsPerPage={handleRowsPerPageChange}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default CampusGroupManagement;