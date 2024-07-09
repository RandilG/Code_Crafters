import React from 'react';
import { Pie } from '@ant-design/charts';
import { ShapeInner } from 'antd';

const PieChart = () => {
    const data = [
        { type: 'Category A', value: 27 },
        { type: 'Category B', value: 25 },
        { type: 'Category C', value: 18 },
        { type: 'Category D', value: 15 },
        { type: 'Others', value: 15 },
    ];

    const config = {
        appendPadding: 10,
        data: data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.8,
        label: {
            type: 'inner',  // Ensure 'inner' is correctly referenced
            offset: '-30%',
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    };

    return <Pie {...config} />;
};

export default PieChart;
