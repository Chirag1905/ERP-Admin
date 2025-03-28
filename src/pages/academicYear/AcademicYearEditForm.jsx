
const AcademicYearEditForm = () => {
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
        >
          Close
        </button>
        <button
          className="btn btn-primary w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AcademicYearEditForm;