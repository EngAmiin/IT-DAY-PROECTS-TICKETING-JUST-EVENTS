
import React from 'react'

export default function LocaleChanger({onChange}) {
    const changeLanguage = (e) => {
        onChange(e.target.value);
      };
  return (
    <div className='w-100 my-4'>
         <select className='w-25 border-1 border-secondary ' onChange={changeLanguage}>
      <option value="en">English</option>
      <option value="ar">arabic</option>
    </select>
    </div>
  )
}
