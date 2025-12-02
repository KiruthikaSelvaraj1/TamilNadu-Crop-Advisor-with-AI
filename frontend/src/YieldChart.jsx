import React from 'react';

const YieldChart = ({ data }) => {
  const maxValue = Math.max(...data.values);
  
  return (
    <div className="w-full">
      <div className="flex items-end space-x-2 h-32">
        {data.values.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-blue-500 hover:bg-blue-600 transition-all rounded-t"
              style={{ 
                height: `${(value / maxValue) * 100}%`,
                minHeight: '4px'
              }}
            />
            <div className="text-xs text-gray-600 mt-1">{data.labels[index]}</div>
            <div className="text-sm font-medium">{value.toFixed(1)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YieldChart;