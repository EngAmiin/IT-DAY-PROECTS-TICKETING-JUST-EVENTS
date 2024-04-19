const convertDatetimeToDate=function(datetimeStr) {
  const datetimeObj = new Date(datetimeStr);
  const year = datetimeObj.getFullYear();
  const month = datetimeObj.getMonth() + 1;
  const day = datetimeObj.getDate();

  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

  return formattedDate;
}

module.exports=convertDatetimeToDate
