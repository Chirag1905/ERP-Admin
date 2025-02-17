import { Box, MenuItem, Select, Typography } from '@mui/material';
import React from 'react';

const CustomPagination = ({ page, totalPages, handleChange, data, rowsPerPage, handleChangeRowsPerPage }) => {
  return (
    <div className="flex md:flex-row flex-col text-xs items-center justify-between me-4 p-2 pt-5 pb-3 gap-3">
      <Box
        display="flex"
        alignItems="center"
        sx={{ fontSize: '0.875rem', fontFamily: 'Poppins, sans-serif', padding: '5px', width: 'fit-content' }}
      >
        <Typography sx={{ color: "#717171", fontSize: '13px', marginRight: '0px', fontFamily: 'Poppins, sans-serif' }}>
          Show
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
          of {data?.totalElements} results
        </Typography>
      </Box>
      
      {/* Custom Button Pagination */}
      <div>
        <button
          className='py-[6px] px-3 border border-border-color rounded-s-full bg-card-color transition-all hover:bg-primary hover:text-white'
          onClick={() => handleChange(null, page - 1)}
          disabled={page === 0}
        >
          Previous
        </button>
        {[...Array(totalPages)]?.map((_, index) => (
          <button
            key={index}
            className={`py-[6px] px-3 border-y border-e border-border-color ${page === index ? 'bg-primary text-white' : 'bg-card-color'
              } transition-all hover:bg-primary hover:text-white`}
            onClick={() => handleChange(null, index)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className='py-[6px] px-3 border border-border-color rounded-e-full bg-card-color transition-all hover:bg-primary hover:text-white'
          onClick={() => handleChange(null, page + 1)}
          disabled={page === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomPagination;
