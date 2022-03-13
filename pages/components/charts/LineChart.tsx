import React , {}from 'react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
const data1 = ['0', '20', '15', '35', '30', '45'];
// const money = 57594864 ; 

export const LineChart = () => {
    return (
      //Use of Daisy UI with class Name
      <div>
            <div className="stat w-full place-items-center  ">
            <div className="stat-title text-black">Total</div>
            <div className="stat-value text-black">$89,500</div>
      </div>
      
        <div className=" bg-orange-600 pt-5 " > 
          <Line options={options} data={data} />
        </div>
      </div>
      
    );
};

export const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false,
      },
    

    },
  };

  export const data = {
    labels,
    datasets: [
      {
        data: data1,
        borderColor: 'white',
        backgroundColor: 'white',
      },
    ],
  };
