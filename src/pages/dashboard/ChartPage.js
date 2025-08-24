import React from 'react';
import TradingViewWidget from '../../components/TradingViewWidget';

const ChartPage = () => {
  return (
    // The container is set to be a specific height to allow the widget to fill it.
    // The widget itself is responsive and will take up 100% of the container's width and height.
    <div className="bg-white rounded-[60px] p-2 sm:p-4 shadow-lg h-[calc(100vh-10rem)]">
        <TradingViewWidget 
            symbol="BTCUSD" 
            theme="light" 
            autosize 
        />
    </div>
  );
};

export default ChartPage;