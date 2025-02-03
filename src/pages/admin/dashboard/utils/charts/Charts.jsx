
import { Bar,Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const chartData = {
  labels: ['January', 'February', 'March'],
  datasets: [
    {
      label: 'Visitors',
      data: [10, 20, 30,40],
      backgroundColor: 'rgba(20,100,100, 1)',
    },
    {
        label: 'Orders',
        data: [5, 10, 20,30],
        backgroundColor: 'rgba(200,100,100, 1)',
      },
  ],
};


const chartOptions = {
  responsive: true,
};

function DummyChart({type,data,chartOptions}) {
    // const myChart = new ChartJS('myChart', {
    //     type: type,
    //     data: data,
    //     options: chartOptions,
    //   });
  return (
    <div className='bg-white p-5 rounded-lg shadow'>
      <Bar data={chartData} options={chartOptions} />
      
       {/* <myChart /> */}
    </div>
  );
}
export default DummyChart;
