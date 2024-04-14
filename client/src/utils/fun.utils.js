import {useNavigate}  from 'react-router'
export function convertDatetimeToDate(datetimeStr) {
    const datetimeObj = new Date(datetimeStr);
    const year = datetimeObj.getFullYear();
    const month = datetimeObj.getMonth() + 1;
    const day = datetimeObj.getDate();
    
 
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    return formattedDate;
  }



  export const navigateElseWhere = (path)=> {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const nv =useNavigate();
    nv(path)
  }
  