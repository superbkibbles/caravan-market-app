import React from 'react';

const DashboardCanvas:React.FC<{}> = () => {
  return (
    <div>
      <div className="panel-header panel-header-lg" style={{backgroundColor: "white"}}>
        <canvas id="bigDashboardChart"/>
      </div>
    </div>
  );
};

export default DashboardCanvas;
