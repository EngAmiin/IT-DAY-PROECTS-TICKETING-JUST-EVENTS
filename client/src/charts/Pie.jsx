import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import data from './data.json';
export default function Pie({pieData}) {
  return (
    <div className='d-flex justify-content-center p-3'>
        <PieChart
      series={[
        {
          data: pieData
        },
      ]}
      width={500}
      height={200}
    />
    </div>
  )
}
