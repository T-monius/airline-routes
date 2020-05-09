import React from 'react';

const Select = ({ options,
                  compatible,
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
                 key={option[value]}
                 value={option[value]}
                 disabled={!compatible(option[valueKey])}
               >
                 {option[value]}
               </option>
      })}
    </select>
  )
}

export default Select;