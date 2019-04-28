import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
  

function SimpleLineChart(props) {
  const initialData = [
    { name: 'balerina' },
    { name: 'gourme' },
    { name: 'orient' },
    { name: 'symphony' },
    { name: 'servus' },
    { name: 'sera' },
    { name: 'rose' },
    { name: 'opera' },
    { name: 'barista' },
    { name: 'nero' },
    { name: 'italia' },
    { name: 'marone' },
    { name: 'pura' },
    { name: 'verde' },
    { name: 'cote' },
    { name: 'trope' },
    { name: 'java' },
    { name: 'efiopia' },
    { name: 'columbia' },
    { name: 'crema' },
  ];
  const dataMain = initialData.map(item => {
    let dataObj = {};
    props.data.forEach(arr => {
      const currentArr = arr.find(x => x.name === item.name);
      dataObj = { ...dataObj, ...item, ...currentArr };
    });
    return dataObj;
  });

  const objLength = Object.keys(dataMain[0]).length - 1;

  const renderCharts = () => {
    const arrOfColors = ['#FF0000', '#009900', '#0000CC', '#660066'];
    const arrForRender = [];
    for (let i = 0; i < objLength; i += 1) {
      arrForRender.push(
        <Bar
          key={`item_${i}`}
          isAnimationActive={false}
          type="monotone"
          dataKey={props.tabTitles[i]}
          stroke={arrOfColors[i]}
          fill={arrOfColors[i]}
        />,
      );
    }
    return arrForRender;
  };

  return (
    <ResponsiveContainer width="99%" height={420}>
        <BarChart
          data={dataMain}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {renderCharts()}
        </BarChart>
    </ResponsiveContainer>
  );
}

SimpleLineChart.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.any]).isRequired,
  tabTitles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default SimpleLineChart;
