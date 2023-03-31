import React from 'react';

import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'

const SpiderChart = ({ originalData }) => {
    const transformedData = [
        {
          data: originalData.reduce((acc, cur) => {
            acc[cur.skill_id] = cur.level/100;
            return acc;
          }, {}),
          meta: { color: 'blue' }
        }
      ];
  
      const captions = {
        // columns
        1: 'Python',
        2: 'Spark',
        3: 'SQL',
        4: 'Java',
        5: 'Flask'
      };
  
      return (
        <div>
          <RadarChart
              captions={captions}
              data={transformedData}
              size={250}
            />
        </div>
      );
  };
  
  export default SpiderChart;