import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCampusGroupRequest } from "../../Redux/features/campusGroup/campusGroupSlice";
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
  IconBooksOff,
} from '@tabler/icons-react';
import CampusCreate from './CampusGroupCreate';
import CampusEdit from './CampusGroupEdit';
import CustomPagination from '../CustomPagination';
import { closeModal, openModal } from '../../Redux/features/utils/modalSlice';

const CampusGroupManagement = () => {
  const breadcrumbItem = [
    {
      name: "School Management",
    },
  ];
  const dispatch = useDispatch();
  const {
    campusGroupData,
    loading,
    error
  } = useSelector((state) => state.campusGroup);
  console.log("🚀 ~ CampusGroupManagement ~ campusGroupData:", campusGroupData)
  const { modals } = useSelector((state) => state.modal);
  const createCampusModal = modals.createCampusGroup.isOpen;
  const editCampusModal = modals.editCampusGroup.isOpen;

  const [searchText, setSearchText] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState({ main: false, edit: false, add: false });

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // Open Create Campus Modal
  const openCreateSchoolModal = () => {
    dispatch(openModal({ modalType: "createCampusGroup" }));
    dispatch(closeModal({ modalType: "editCampusGroup" }));
  };

  // Open Edit Campus Modal
  const openEditSchoolModal = (item) => {
    dispatch(openModal({ modalType: "editCampusGroup" }));
    dispatch(closeModal({ modalType: "createCampusGroup" }));
    setSelectedItem(item);
  };

  // Close Create Campus Modal
  const closeCreateSchoolModal = () => {
    dispatch(closeModal({ modalType: "createCampusGroup" }));
  };

  // Close Edit Campus Modal
  const closeEditSchoolModal = () => {
    dispatch(closeModal({ modalType: "editCampusGroup" }));
  };
  // Prevent body scroll when modals are open
  useEffect(() => {
    if (createCampusModal || editCampusModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [createCampusModal, editCampusModal]);

  useEffect(() => {
    if (campusGroupData) {
      setData(campusGroupData?.data?.content);
      setTotalPages(campusGroupData?.data?.totalPages);
    }
  }, [campusGroupData, page, rowsPerPage]);

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
        await Promise.all([dispatch(getCampusGroupRequest({ data: params })), minDelay]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading({ ...isLoading, main: false });
      }
    };

    fetchData();
  }, [page, rowsPerPage, isAscending, searchText, createCampusModal, editCampusModal, dispatch]);

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
          closeCreateSchoolModal={closeCreateSchoolModal}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ) : editCampusModal ? (
        <CampusEdit
          openEditSchoolModal={openEditSchoolModal}
          closeEditSchoolModal={closeEditSchoolModal}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
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
                  {data && data?.length > 0 ? (
                    data?.map((item, index) => (
                      <li className="flex sm:items-center sm:gap-4 gap-2 sm:flex-row flex-col" key={index}>
                        <img src={avatar1 || ""} alt="user profile" className='rounded-md w-[36px] h-[36px] min-w-[36px]' />
                        <div className='flex-grow'>
                          <h6 className="font-medium">{item?.campusGroupName || ""}</h6>
                        </div>
                        <div className="flex items-stretch gap-2">
                          <button className="btn btn-light-primary" onClick={() => { openEditSchoolModal(item) }}>
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

export default CampusGroupManagement;