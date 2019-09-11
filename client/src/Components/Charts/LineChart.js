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
import * as assets from '../../assets/jss/material-dashboard-react';

const Colors = {
  success: assets.successColor,
  warning: assets.warningColor,
  info: assets.infoColor,
  danger: assets.dangerColor,
  rose: assets.roseColor,
  primary: assets.primaryColor,
}

const SimpleLineChart = ({ data, legend, color, height, type, tooltipTextColor }) => (
  <ResponsiveContainer width="100%" height={height}>
    <LineChart data={data}>
      <XAxis stroke={color} dataKey="name" />
      <YAxis stroke={color} />
      <CartesianGrid vertical={false} strokeDasharray="3 3" />
      <Tooltip
        labelStyle={{ color: tooltipTextColor, fontWeight: 'bold' }}
        itemStyle={{ color: tooltipTextColor }}
        contentStyle={{ borderColor: Colors[type][1], borderRadius: 10, backgroundColor: Colors[type][0] }}
      />
      <Legend />
      <Line
        isAnimationActive={false}
        type="monotone"
        dataKey={legend}
        stroke={color}
        strokeWidth="3"
      />
    </LineChart>
  </ResponsiveContainer>
);

SimpleLineChart.propTypes = {
  color: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  legend: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  type: PropTypes.string,
  tooltipTextColor: PropTypes.string,
};

SimpleLineChart.defaultProps = {
  type: 'success',
  tooltipTextColor: '#ffffff'
}

export default SimpleLineChart;
