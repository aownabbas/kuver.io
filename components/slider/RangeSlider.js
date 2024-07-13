import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function RangeSlider() {
  const marks = [
    {
      value: 25,
      label: '3m',
    },
    {
      value: 50,
      label: '6m',
    },
    {
      value: 75,
      label: '9m',
    },
    {
      value: 100,
      label: '1y',
    },
  ];

  function valuetext(value) {
    return `${value}°C`;
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Slider
        className=""
        aria-label="Always visible"
        defaultValue={20}
        getAriaValueText={valuetext}
        step={25}
        marks={marks}
        valueLabelDisplay="on"
      />
    </Box>
  );
}

export default RangeSlider;
