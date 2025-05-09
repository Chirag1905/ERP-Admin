'use client';
import { getAcademicYearRequest, putAcademicYearRequest, putAcademicYearSuccess } from "@/Redux/features/academicYear/academicYearSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const AcademicYearEdit = (props) => {
  const {
    openModal,
    closeModal,
    selectedItem,
    setSelectedItem
  } = props;

  // Redux state
  const dispatch = useDispatch();
  const { academicYearPutData, loading, error } = useSelector((state) => state.campusGroup);
  const { token } = useSelector((state) => state.auth);

  // Component state
  const [formData, setFormData] = useState({
    academicYearName: "",
    startDate: "",
    endDate: "",
    isActive: false,
  });
  const [errors, setErrors] = useState({
    startDate: "",
    endDate: "",
  });

  // Date validation function
  const validateDates = () => {
    const newErrors = { ...errors };
    let isValid = true;

    // Validate start date
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
      isValid = false;
    } else {
      newErrors.startDate = '';
    }

    // Validate end date
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
      isValid = false;
    } else {
      newErrors.endDate = '';
    }

    // If both dates exist, validate their relationship
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);

      if (endDate <= startDate) {
        newErrors.endDate = 'End date must be after start date';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Function to update form data
  const updateFormData = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate dates before submission
    if (!validateDates()) {
      return;
    }

    try {
      const params = {
        id: selectedItem?.id,
        formData,
        token
      };
      dispatch(putAcademicYearRequest({
        data: formData,
        token,
        id: selectedItem?.id,
      }));
    } catch (err) {
      console.error("Error submitting data:", err);
      toast.error(err || "An unexpected error occurred. Please try again.", {
        position: "top-right",
        duration: 2000,
      });
    };
  }

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        academicYearName: selectedItem?.academicYearName || "",
        startDate: selectedItem?.startDate || "",
        endDate: selectedItem?.endDate || "",
        isActive: selectedItem?.isActive || "",
      });
    }
  }, [selectedItem])

  // Handle successful API response
  useEffect(() => {
    if (!academicYearPutData?.message) return;

    toast.success(academicYearPutData.message, {
      position: "top-right",
      duration: 5000,
    });

    // Refresh campus data
    dispatch(getAcademicYearRequest({
      data: {
        page: 0,
        size: 10,
        sortBy: "id",
        ascending: true,
      },
    }));

    dispatch(putAcademicYearSuccess(null));
    closeModal();
  }, [academicYearPutData, closeModal]);

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
        Modify Academic Year
      </h5>
      <div className="max-w-3xl mx-auto p-4 md:p-6">
        <div className="space-y-4 md:space-y-6">
          <div className="floating-form-control">
            <input
              type="text"
              placeholder="AcademicYear Title"
              className="form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData?.academicYearName || ""}
              onChange={(e) => updateFormData("academicYearName", e.target.value)}
            />
            <label htmlFor="noteTitle" className="form-label">Name <span className="text-red-500">*</span></label>
          </div>
          <div className="floating-form-control">
            <input
              type="date"
              className={`form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.startDate ? 'border-red-500' : ''}`}
              value={formData?.startDate || ""}
              onChange={(e) => updateFormData("startDate", e.target.value)}
              onBlur={() => validateDates()}
            />
            <label htmlFor="startDate" className="form-label">Start Date <span className="text-red-500">*</span></label>
          </div>
          {errors.startDate && (
            <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
          )}
          <div className="floating-form-control">
            <input
              type="date"
              className={`form-input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.endDate ? 'border-red-500' : ''}`}
              value={formData?.endDate || ""}
              onChange={(e) => updateFormData("endDate", e.target.value)}
              onBlur={() => validateDates()}
              min={formData.startDate} // Set min date to start date
            />
            <label htmlFor="endDate" className="form-label">End Date <span className="text-red-500">*</span></label>
          </div>
          {errors.endDate && (
            <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
          )}
          <div className='space-y-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 gap-2 md:gap-0 md:px-4'>
            <label htmlFor='campaignsTitle' className='form-label md:w-1/3'>
              Status <span className="text-red-500">*</span>
            </label>
            <div className='form-check form-switch w-full flex items-center'>
              <input
                type="checkbox"
                className="form-check-input"
                checked={formData?.isActive || false}
                onChange={(e) => updateFormData("isActive", e.target.checked)}
              />
              <label className="form-check-label ml-2" htmlFor="lightIndoor1">
                {formData?.isActive ? "Enabled" : "Disabled"}
              </label>
            </div>
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

export default AcademicYearEdit;