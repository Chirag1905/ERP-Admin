import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const AcademicYearCreateForm = (props) => {
  const {
    openModal,
    closeModal,
  } = props;

  // Redux state
  const dispatch = useDispatch();
  const { academicYearPostData, loading, error } = useSelector((state) => state.academicYear);

  // Component state
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const params = {
        campusGroupName: formData.campusGroupName,
        licenseCount: formData.licenseCount,
        gpsEnabled: formData.gpsEnabled,
        zoomEnabled: formData.zoomEnabled,
        isActive: formData.isActive,
      };
      // dispatch(postCampusGroupRequest(params));
    } catch (err) {
      console.error("Error submitting data:", err);
      toast.error(err || "Failed to submit data. Please try again.", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  // Handle API responses
  useEffect(() => {
    if (!academicYearPostData?.message) return;

    toast.success(academicYearPostData.message, {
      position: "top-right",
      duration: 5000,
    });

    // Refresh campus data
    // dispatch(getCampusGroupRequest({
    //     data: {
    //         page: 0,
    //         size: 10,
    //         sortBy: "id",
    //         ascending: true,
    //     },
    // }));

    // dispatch(postCampusGroupSuccess(null));
    closeModal();
  }, [academicYearPostData, dispatch, closeModal]);

  // Handle API errors
  useEffect(() => {
    if (!error) return;

    if (Array.isArray(error.error)) {
      error.error.forEach((err) => {
        toast.error(`${err.field || 'Error'}: ${err.message}`, {
          position: "top-right",
          duration: 2000,
        });
      });
    } else if (error.message) {
      toast.error(error.message, { position: "top-right", duration: 2000 });
    } else {
      toast.error("An unexpected error occurred", { position: "top-right", duration: 2000 });
    }
  }, [error]);

  return (
    <div className='py-6 px-4 md:py-9 md:px-10 bg-card-color rounded-lg'>
      <h5 className='text-lg md:text-[20px]/[30px] font-medium ml-2 md:ml-6 mb-4 md:mb-6'>
        Create Academic Year
      </h5>
      <div className="max-w-3xl mx-auto p-4 md:p-6">
        <div className="space-y-4 md:space-y-6">
          <div className="floating-form-control">
            <input
              type="text"
              id="noteTitle"
              className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Note Title"
            />
            <label htmlFor="noteTitle" className="form-label">Name</label>
          </div>
          <div className="floating-form-control">
            <input
              type="date"
              id="startDate"
              className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Select Date"
            />
            <label htmlFor="startDate" className="form-label">Start Date</label>
          </div>
          <div className="floating-form-control">
            <input
              type="date"
              id="endDate"
              className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Select Date"
            />
            <label htmlFor="endDate" className="form-label">End Date</label>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-start gap-4 ml-2 md:ml-8 mt-6 md:mt-8">
        <button
          className="btn btn-white w-full md:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-300"
          onClick={closeModal}
        >
          Close
        </button>
        <button
          className='btn btn-primary flex-1 sm:flex-none'
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default AcademicYearCreateForm;