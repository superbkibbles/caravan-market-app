import React, {useState} from 'react';

import "./ads.css"

const Ads = () => {
  const [isOpen, setIsOpen] = useState(true);
  const fadeClass = isOpen? "fadeOutAd": "fadeinAd";

  const openClose = () => {
    if(isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  };
  return (
    <div className={fadeClass}>
      <div className={`positionRightFixed ${fadeClass}`}
      >
        <div onClick={openClose} style={{background: "red", width: "2vw", height: "10%", cursor: "pointer", transform: "translateX(-100%)"}}>
          <div style={{color: "white", transform: "rotate(-90deg)", padding: "10px 10px 10px 10px"}}>show ads</div>
        </div>
      </div>
    </div>
  );
};

export default Ads;
