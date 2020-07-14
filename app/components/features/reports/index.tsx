import React, {Component} from 'react';
import { History, LocationState } from 'history';

import classes from './index.css';

type Props = {
  getPageName: (name: string) => void;
  history: History<LocationState>;
}

class ShowReportsType extends Component<Props, {}> {
  componentDidMount() {
    this.props.getPageName("reports")
  }

  onReport (name: string, targetName: string) {
    const target = document.getElementById(targetName);
    const all = document.getElementById("allReports");

    setTimeout(() => {
      // @ts-ignore
      target.style.transform = "translateX(-30px)";
      setTimeout(() => {
        // @ts-ignore
        target.style.transform = "translateX(2000px)";
        // @ts-ignore
        all.style.opacity = "0";
      }, 300)
    }, 100);

    setTimeout(() => {
      this.props.history.push(`/logged/reports/${name}`)
    }, 1000)
  }
  render() {
    return (
      <div className={`row ${classes.allReports}`}>
        <div className="col-md-12" style={{transition: "all 0.3s ease-in-out", fontWeight: "800"}} id="allReports">

          <div className={`card ${classes.firstReport}`}
               id="targetingFirst"
               onClick={() => this.onReport("buying", "targetingFirst")}
          >
            <div className="card-body"
                 style={{background: "#6fe7dd", cursor: "pointer", color: "#949296", borderRadius: "10px", fontSize: "1.5rem"}}
            >
              <div style={{padding: "50px 0"}}>
                <div className="text-center" style={{textTransform: "uppercase"}}>
                  buying reports
                </div>
              </div>
            </div>
          </div>
          <div className={`card ${classes.secondReport}`}
               id="targetingSecond"
               onClick={() => this.onReport("selling", "targetingSecond")}
          >
            <div className="card-body"
                 style={{background: "#00A9CE", cursor: "pointer", color: "rgba(255, 255, 255, 0.9)", borderRadius: "10px", fontSize: "1.5rem"}}
            >
              <div style={{padding: "50px 0"}}>
                <div className="text-center" style={{textTransform: "uppercase"}}>
                  selling reports
                </div>
              </div>
            </div>
          </div>
          <div className={`card ${classes.thirdReport}`}
               id="targetingThird"
               onClick={() => this.onReport("notpaid", "targetingThird")}
          >
            <div className="card-body"
                 style={{background: "#642374", cursor: "pointer", color: "#fff", borderRadius: "10px", fontSize: "1.5rem"}}
            >
              <div style={{padding: "50px 0"}}>
                <div className="text-center" style={{textTransform: "uppercase"}}>
                  unpaid bills
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default ShowReportsType;
