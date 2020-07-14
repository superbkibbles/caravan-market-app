import React, {Component} from 'react';

import classes from "../seller.css";

type Props = {
  onDiscountChange: (val: any) => void;
  onCheckout: () => void;
  totalCash: number;
}

type State = {
  inputValue: 0;
}

class Checkout extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: 0
    }
  }

  onDiscountChange = (e: any) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      this.setState({inputValue: value});
      this.props.onDiscountChange(value)
    } else {
      this.setState({inputValue: 0});
      this.props.onDiscountChange(value)
    }
  };

  renderButton = () => {
    return (
      <div className="row" style={{padding: "0 35%"}}>
        <div className="col-md-12">
          <div style={{background: "inherit", borderRadius: "0 0 20px 20px"}}>
            <div className={classes.bigBtn} onClick={()=> {
              this.props.onCheckout();
              this.setState({inputValue: 0})
            }}>
              <div className="row">
                <div className="col-md-6">
                  <div style={{padding: "15px"}}>
                    <div className="row">
                      <div className="col-md-3">
                        <i style={{color: "#a3fba2", fontSize: "1.5em"}} className="fal fa-arrow-circle-right"/>
                      </div>
                      <div className="col-md-9">
                        <div style={{color: "#a3fba2", fontSize: "1rem"}}>CHECKOUT</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6" >
                  <div style={{padding: "15px", backgroundColor: "#22ba1a", borderRadius: "0 20px 20px 0", height: "100%"}}>
                    <div style={{marginLeft: "40%", color: "#fff", fontSize: "1.2em", fontWeight: 700}}>
                      {this.props.totalCash > 0 ? (this.props.totalCash - this.state.inputValue).toFixed(2): 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  render() {
    return (
      <div style={{paddingTop: "10px"}}>
        <hr style={{background: "white"}}/>
        <div className="container-fluid" style={{background: "inherit", padding: "0 25%"}}>
          <div style={{padding: "10px"}}>
            <div style={{color: "#f96332", margin: "0 auto", width: "100px"}}>
              <i className="fas fa-wallet"/>
              <p style={{display: "inline", fontWeight: "700", fontSize: "0.9em", paddingLeft: "10px"}}>CHECKOUT</p>
            </div>
            <div className="container" style={{marginTop: "5px"}}>
              <div className="form-group">
                <label htmlFor="discount" style={{margin: "0", fontWeight: 700, fontSize: "0.7em", color: "#fff"}}>MANUAL DISCOUNT</label>
                <input
                  value={this.state.inputValue}
                  onChange={(e) => this.onDiscountChange(e)}
                  id="discount"
                  type="text"
                  className="form-control"
                  style={{paddingTop: "10px", paddingBottom: "10px", background: "#fff"}}
                  placeholder="DISCOUNT"
                />
              </div>
              <div style={{margin: "0", fontWeight: 700, fontSize: "1em", color: "#fff"}}>DISCOUNT TOTAL</div>
              <div style={{color: "#feb138", fontWeight: 700, fontSize: "1.3em"}}>
                {this.state.inputValue}
              </div>
            </div>
          </div>
        </div>
        {this.renderButton()}
      </div>
    );
  }
}

export default Checkout;
