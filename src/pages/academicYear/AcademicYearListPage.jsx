import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
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
import AcademicYearCreateForm from './AcademicYearCreateForm';
import CustomPagination from '../CustomPagination';
import toast from 'react-hot-toast';
import AcademicYearEditForm from './AcademicYearEditForm';

const AcademicYearListPage = () => {
  const breadcrumbItem = [
    {
      name: "Academic Years",
    },
  ];
  // const dispatch = useDispatch();
  // const {
  //   campusData,
  //   validationErrors,
  //   campusPostData,
  //   loading,
  //   error
  // } = useSelector((state) => state.campus);
  const [searchText, setSearchText] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [createAcademicModal, setCreateAcademicModal] = useState(false);
  const [editAcademicModal, setEditAcademicModal] = useState(false);
  const [data, setData] = useState([
    { id: 1, name: "2024-25", start_date: "2024-04-01", end_date: "2025-03-31" },
    { id: 2, name: "2024-25", start_date: "2024-04-01", end_date: "2025-03-31" },
    { id: 3, name: "2024-25", start_date: "2024-04-01", end_date: "2025-03-31" }
  ]);

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

  const openCreateAcademicModal = () => {
    setCreateAcademicModal(!createAcademicModal);
    setEditAcademicModal(false);
  };

  const openEditAcademicModal = (item) => {
    setEditAcademicModal(!editAcademicModal);
    setCreateAcademicModal(false);
    setSelectedItem(item);
  };

  useEffect(() => {
    document.body.classList[createAcademicModal ? "add" : "remove"]("overflow-hidden");
  }, [createAcademicModal]);

  useEffect(() => {
    document.body.classList[editAcademicModal ? "add" : "remove"]("overflow-hidden");
  }, [editAcademicModal]);

  // useEffect(() => {
  //   if (campusData) {
  //     setData(campusData?.data?.content);
  //     setTotalPages(campusData?.data?.totalPages);
  //   }
  // }, [campusData, page, rowsPerPage]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading({ ...isLoading, main: true });

  //     const params = {
  //       page: page || 0,
  //       size: rowsPerPage || 10,
  //       sortBy: "id",
  //       ascending: isAscending,
  //       searchFilter: searchText
  //     };

  //     // Create a minimum delay of 1 second
  //     const minDelay = new Promise(resolve => setTimeout(resolve, 1000));

  //     try {
  //       // Wait for both the API call and the minimum delay to complete
  //       await Promise.all([dispatch(getCampusRequest({ data: params })), minDelay]);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setIsLoading({ ...isLoading, main: false });
  //     }
  //   };

  //   fetchData();
  // }, [page, rowsPerPage, isAscending, searchText, createAcademicModal, editAcademicModal, dispatch]);

  // useEffect(() => {
  //   if (validationErrors?.error && validationErrors?.error?.length > 0) {
  //     validationErrors?.error?.forEach((error) => {
  //       toast.error(`${error.field}: ${error.message}`, {
  //         position: "top-right",
  //         duration: 5000,
  //       });
  //     });
  //   }
  // }, [dispatch]);

  return (
    <>
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
          <Breadcrumb breadcrumbItem={breadcrumbItem} />
          <button
            onClick={openCreateAcademicModal}
            className="flex gap-1 btn btn-light-primary w-full md:w-auto"
          >
            <IconPlus />
            <span className="md:block hidden">Add</span>
            <span className="md:hidden block">Add Academic Year</span>
          </button>
        </div>
        <div className="md:hidden h-4"></div>
        <WelcomeHeader />
      </div>
      {createAcademicModal ? (
        <AcademicYearCreateForm
          openCreateAcademicModal={openCreateAcademicModal}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ) : editAcademicModal ? (
        <AcademicYearEditForm
          openEditAcademicModal={openEditAcademicModal}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      ) : (
        <>
          <div className='min-h-screen py-4 md:py-9 md:px-10 px-4 bg-card-color rounded-lg'>
            <div className='flex flex-col md:flex-row justify-between items-start gap-4 md:mr-6'>
              <h5 className='text-lg md:text-[20px] md:leading-[30px] font-medium md:ml-6'>
                Academic Years Listing
              </h5>
              <div className='w-full md:w-auto card bg-card-color rounded-xl form-control flex'>
                <div className='flex w-full'>
                  <input
                    type="text"
                    id="team_board_search"
                    className="form-input !rounded-e-none !py-[6px] flex-grow"
                    placeholder="Search years..."
                    value={searchText}
                    onChange={handleSearch}
                  />
                  <button className="btn border border-border-color !rounded-s-none">
                    <IconSearch className='w-[20px] h-[20px]' />
                  </button>
                </div>
              </div>
            </div>
            <div className={`my-6 md:my-10 px-2 sm:px-4 md:px-10 h-[60vh] md:h-[70vh] ${isLoading?.main ? '' : 'overflow-auto cus-scrollbar'}`}>
              {isLoading?.main ? (
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
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                  <thead>
  <tr>
    <th className="py-2 px-2 md:px-4">
      <div className="flex justify-center items-center gap-1">
        SL
        {isAscending ? (
          <IconCaretDownFilled onClick={() => setIsAscending(false)} className="cursor-pointer w-3 h-3" />
        ) : (
          <IconCaretUpFilled onClick={() => setIsAscending(true)} className="cursor-pointer w-3 h-3" />
        )}
      </div>
    </th>
    <th className="py-2 px-2 md:px-4">
      <div className="flex justify-center items-center gap-1">
        Name
        {isAscending ? (
          <IconCaretDownFilled onClick={() => setIsAscending(false)} className="cursor-pointer w-3 h-3" />
        ) : (
          <IconCaretUpFilled onClick={() => setIsAscending(true)} className="cursor-pointer w-3 h-3" />
        )}
      </div>
    </th>
    <th className="py-2 px-2 md:px-4">
      <div className="flex justify-center items-center gap-1">
        Start Date
        {isAscending ? (
          <IconCaretDownFilled onClick={() => setIsAscending(false)} className="cursor-pointer w-3 h-3" />
        ) : (
          <IconCaretUpFilled onClick={() => setIsAscending(true)} className="cursor-pointer w-3 h-3" />
        )}
      </div>
    </th>
    <th className="py-2 px-2 md:px-4">
      <div className="flex justify-center items-center gap-1">
        End Date
        {isAscending ? (
          <IconCaretDownFilled onClick={() => setIsAscending(false)} className="cursor-pointer w-3 h-3" />
        ) : (
          <IconCaretUpFilled onClick={() => setIsAscending(true)} className="cursor-pointer w-3 h-3" />
        )}
      </div>
    </th>
    <th className="py-2 px-2 md:px-4">
      <div className="flex justify-center items-center gap-1">
        Actions
      </div>
    </th>
  </tr>
</thead>
                    <tbody>
                      {data && data?.length > 0 ? (
                        data?.map((item, index) => (
                          <tr key={index} className="border-b border-border-color">
                            <td className="py-4 px-2 md:px-4 text-center">{index + 1}</td>
                            <td className="py-4 px-2 md:px-4 text-center">{item?.name || ""}</td>
                            <td className="py-4 px-2 md:px-4 text-center">{item?.start_date || ""}</td>
                            <td className="py-4 px-2 md:px-4 text-center">{item?.start_date || ""}</td>
                            <td className="py-4 px-2 md:px-4 text-center">
                              <div className="flex items-center justify-center gap-2"> {/* Center buttons */}
                                <button className="btn btn-light-primary p-2" onClick={() => { openEditAcademicModal(item) }}>
                                  <IconEdit className='w-[16px] h-[16px] md:w-[18px] md:h-[18px] min-w-[16px]' />
                                </button>
                                <button className="btn btn-light-danger p-2">
                                  <IconTrash className='w-[16px] h-[16px] md:w-[18px] md:h-[18px] min-w-[16px]' />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center text-gray-500 py-4 px-2 md:px-4">No schools available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
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

export default AcademicYearListPage;