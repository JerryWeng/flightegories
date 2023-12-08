"use client"
import React from 'react';
import Dropdown from '@/component/Dropdown/Dropdown';

const Reserve = () => {
  //TODO: change datalist to be datalist that we want
  const data = ['one', 'two', 'three', 'four'];

  const handleDropdownSelect = (selectedValue: string) => {
    
    console.log('Selected value:', selectedValue);
  };
  

  return (
    <div className='container'>
      <Dropdown data={data} onSelect={handleDropdownSelect} />
    </div>
  );
};

export default Reserve;
