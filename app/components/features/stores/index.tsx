import React, {Component} from 'react';

import classes from './stores.css';

class Stores extends Component {
  render() {
    const arr = [1, 3, 5, 1, 3, 5,1, 3, 5, 1, 3, 5,1, 3, 5, 1, 3, 5,1, 3, 5, 1, 3, 5];
    return (
      <div className="row">
        {
          arr.map((_:any, i: number) => (
            <div key={i} className="col-lg-4 col-md-6 col-sm-1">
              <div className={classes.stores}>
                <div className={classes.storesContent}>
                  Duhok
                  <div style={{display: "block", marginTop: "20px", fontSize: "70px"}}>
                    <i className="fal fa-map-marker-alt"/>
                  </div>
                </div>
                <div className={classes.storesCoordinates}>
                  07503344312
                </div>
                <div className={classes.storesFooter}>
                  <div className={classes.storesFooterCity}>
                    duhok
                  </div>
                  <div>
                    Niva Bazari Nezik Mzgafta Mfti
                  </div>
                </div>
                <div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Stores;
