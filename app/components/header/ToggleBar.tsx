import React, {} from 'react';

import classes from "./index.css";

interface Props {
  closeSlider: () => void;
  openSlider: () => void;
  isToggle: boolean;
}

const ToggleBar:React.FC<Props> = (props) => {
  const renderIcon = () => {
    if(!props.isToggle) {
      return (
        <div className={classes.burgerToggle} onClick={() => props.openSlider()}>
          <span className={classes.burgerToggleBar}/>
          <span className={classes.burgerToggleBar}/>
          <span className={classes.burgerToggleBar}/>
        </div>
      )
    }
    return (
      <div className={classes.close} onClick={() => props.closeSlider()}>
        <span className={classes.closeLine}/>
        <span className={classes.closeLine}/>
      </div>
    )
  };

  return (
    // <div className="navbar-toggle">
    // 	<button type="button" className="navbar-toggler">
    // 		<span className="navbar-toggler-bar bar1"></span>
    // 		<span className="navbar-toggler-bar bar2"></span>
    // 		<span className="navbar-toggler-bar bar3"></span>
    // 	</button>
    // </div>
    <div style={{transition: "all 1s ease-in"}}>
      {renderIcon()}
    </div>
  )
};

export default  ToggleBar;
