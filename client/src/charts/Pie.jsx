import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import data from './data.json';
import { Skeleton } from '@mui/material';
export default function Pie({pieData}) {
  return (
    <div className='d-flex justify-content-center p-3'>
      {pieData.length > 0  ? 
       <PieChart
       series={[
         {
           data: pieData
         },
       ]}
       width={500}
       height={200}
     /> : <Skeleton className="d-flex justify-content-center align-items-center" variant="circular" width={200} height={200} />}
       
    </div>
  )
}
