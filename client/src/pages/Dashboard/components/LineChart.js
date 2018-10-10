/* eslint-disable */

import React from 'react';
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
  const dataMain = initialData.map((item, i) => ({
    ...item,
    Продажи: props.data.sales[item.name],
    Помол: props.data.coffee[item.name],
    Личное: props.data.own[item.name],
  }));

  return (
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="99%" height={320}>
      <LineChart data={dataMain}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="Продажи"
          stroke="#b4193d"
        />
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="Помол"
          stroke="#5000ff"
        />
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="Личное"
          stroke="#0A6519"
        />
        {/* <Line type="monotone" dataKey="Orders" stroke="#b4193d" /> */}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SimpleLineChart;
