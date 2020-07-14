import React from 'react';

import DashboardHeader from "./DashboardHeader";
import DashboardCanvas from "./DashboardCanvas";
import DashboardFooter from "./DashboardFooter";

const Dashboard:React.FC<{}> = () => {
  return (
    <div>
      <DashboardHeader/>
      <DashboardCanvas/>
      <DashboardFooter/>
    </div>
  );
};

export default Dashboard;
