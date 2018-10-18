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
import _ from 'lodash';

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
    Порции: props.data.portions[item.name],
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
        {_.findKey(props.data.sales, o => o !== 0) && (
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="Продажи"
            stroke="#b4193d"
          />
        )}
        {_.findKey(props.data.coffee, o => o !== 0) && (
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="Помол"
            stroke="#5000ff"
          />
        )}
        {_.findKey(props.data.own, o => o !== 0) && (
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="Личное"
            stroke="#0A6519"
          />
        )}
        {_.findKey(props.data.portions, o => o !== 0) && (
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="Порции"
            stroke="#4C0099"
          />
        )}
        {/* <Line type="monotone" dataKey="Orders" stroke="#b4193d" /> */}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SimpleLineChart;
