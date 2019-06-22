import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

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
        <Line
          key={`item_${i}`}
          isAnimationActive={false}
          type="monotone"
          dataKey={props.tabTitles[i]}
          stroke={arrOfColors[i]}
        />,
      );
    }
    return arrForRender;
  };

  return (
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="99%" height={420}>
      <LineChart data={dataMain}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        {renderCharts()}
      </LineChart>
    </ResponsiveContainer>
  );
}

SimpleLineChart.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.any]).isRequired,
  tabTitles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default SimpleLineChart;
