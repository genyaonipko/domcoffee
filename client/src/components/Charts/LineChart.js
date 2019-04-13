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

const SimpleLineChart = ({ data, legend, color }) => (
  <ResponsiveContainer width="99%" height={320}>
    <LineChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid vertical={false} strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line
        isAnimationActive={false}
        type="monotone"
        dataKey={legend}
        stroke={color}
      />
    </LineChart>
  </ResponsiveContainer>
);

SimpleLineChart.propTypes = {
  color: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  legend: PropTypes.string.isRequired,
};

export default SimpleLineChart;
