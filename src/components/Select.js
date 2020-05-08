import React from 'react';

const Select = ({ options,
                  onChange,
                  value,
                  valueKey,
                  titleKey,
                  allTitle }) => {
  return (
    <select onChange={onChange}>
      <option key={titleKey} value={titleKey}>{allTitle}</option>
      {options.map((option) => {
        return <option 
                 key={option[valueKey]}
                 value={option[value]}
               >
                 {option[valueKey]}
               </option>
      })}
    </select>
  )
}

export default Select;