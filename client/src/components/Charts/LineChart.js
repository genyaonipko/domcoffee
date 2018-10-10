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
  const dataMain =
    props.data &&
    Object.keys(props.data).map(item => ({
      name: item,
      [props.legend]: +props.data[item],
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
        <Line isAnimationActive={false} type="monotone" dataKey={props.legend} stroke="#b4193d" />
        {/* <Line type="monotone" dataKey="Orders" stroke="#b4193d" /> */}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SimpleLineChart;
