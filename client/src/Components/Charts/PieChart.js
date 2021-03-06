/* eslint-disable */
import React, { useState } from 'react';
import { PieChart, Pie, Sector } from 'recharts';

const PIE_CHART_WIDTH = 750;
const PIE_CHART_HEIGHT = 700;
const PIE_CHART_INNER_RADIUS = 140;
const PIE_CHART_OUTER_RADIUS = 230;
const CX = 370;
const CY = 300;
const RADIAN = Math.PI / 180;

const renderActiveShape = (props) => {
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Кол-во ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


const PieChartContainer = (props) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <PieChart width={PIE_CHART_WIDTH} height={PIE_CHART_HEIGHT}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={props.data}
        cx={CX}
        cy={CY}
        innerRadius={PIE_CHART_INNER_RADIUS}
        outerRadius={PIE_CHART_OUTER_RADIUS}
        fill={props.color}
        dataKey={props.legend}
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
}

export default PieChartContainer;
