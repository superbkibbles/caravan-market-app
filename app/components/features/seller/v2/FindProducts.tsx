import React, { Component } from 'react';

import classes from '../seller.css';

type Props = {
  products: any;
  onAddHandler: (product: any) => void;
  isHide: boolean;
  clickHandler: (hide: boolean) => void;
}

type State = {
  searchBy: string;
  inputValue: string;
  value: string;
  foundProducts: any;
  timeout: any;
};

class FindProducts extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchBy: 'barcode',
      inputValue: '',
      value: '',
      foundProducts: [],
      timeout: 0,
    }
  }


  onDropDownClick = (by: string) => {
    this.setState({searchBy: by})
  };

  handleChange = (e: any) => {
    const { products } = this.props;

    if (products.length > 0) {
      let value = e.target.value.replace(new RegExp("\\\\", "g"), "");
      const searchBy = this.state.searchBy;
      this.setState({value});

      let timeout;
      if (this.state.timeout) {
        clearTimeout(this.state.timeout)
      }
      if (value.length > 0 && products) {
        timeout = setTimeout(() => {
          this.setState({inputValue: value});
          let items = products.filter((item: any) => {
            return item[searchBy].toLowerCase().search(value.toLowerCase()) !== -1;
          });
          const filtered = items.filter((item: any) => item.remain_amount - item.count > 0);
          this.setState({foundProducts: filtered});
        }, 1000);
        this.setState({timeout: timeout});
      } else {
        this.setState({foundProducts: []});
        this.setState({inputValue: ""});
      }
    }
  };

  renderNotFound() {
    return (
      <div className="text-center">
        <h4 style={{ margin: "15px 0"}}>Oops! Item not found</h4>
      </div>
    )
  }

  onItemClick = (item: any) => {
    item.count++;
    this.props.onAddHandler(item);
    this.setState({inputValue: ""});
    this.setState({value: ""});
    this.setState({foundProducts: []})
  };

  renderFound = () => {
    return (
      <div className="">
        {this.state.foundProducts.map((item: any) => {
          const time = item.expire_date * 1000;
          const date = `${new Date(time).getFullYear()}/${new Date(time).getMonth() + 1}`;
          return(
            <div onClick={() => this.onItemClick(item)} key={item.item_id} className='dropdown-item' style={{ cursor: 'pointer' }}>
              <div className="row">
                <p className="col-md-5">{item.trade_name}</p>
                <p className="col-md-5">{item.sale_price}</p>
                <p className="col-md-2">{date}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  };

  renderFoundProducts = ()=> {
    if(this.state.inputValue.length > 0) {
      if(this.state.foundProducts.length === 1 && this.state.searchBy === "barcode") {
        this.onItemClick(this.state.foundProducts[0]);
      }
      return (
        <div style={{
          maxHeight: "300px",
          borderRadius: "5px",
          overflowY: "auto",
          width: "100%",
          backgroundColor: "#fff",
          padding: '10px 0',
          zIndex: 1,
          position: "absolute",
          top: "60px",
          boxShadow: "5px -5px 20px rgba(0,0,0, 0.2)"
        }}>
          {
            this.state.foundProducts.length > 0 ? this.renderFound(): this.renderNotFound()
          }
        </div>
      )
    }
    return "";
  };
  render() {
    const selectStyle = this.props.isHide ? "dropdown show": "dropdown";
    const dropMenue = this.props.isHide ? "dropdown-menu show" : "dropdown-menu";
    return (
      <div style={{padding: "10px"}}>
        <div style={{padding: "0 25%"}}>
          <div className="input-group" style={{marginTop: "10px"}}>
            <input
              type="text"
              className="form-control"
              placeholder={`search by ${this.state.searchBy}`}
              style={{height: "40px", background: "#fff"}}
              value={this.state.value}
              onChange={(e)=>this.handleChange(e)}
            />
            {this.renderFoundProducts()}
            <div className="input-group-append">
              <div className="input-group-text" style={{height: "40px", padding:"0", border: "none", backgroundColor: "inherit"}}>
                <div className={selectStyle} style={{display: "inline"}} >
                  <button
                    className="btn btn-secondary dropdown-toggle navbar-brand" type="button" aria-expanded={this.props.isHide}
                    style={{
                      backgroundColor: "#2CA8FF",
                      borderRadius: "0 30px 30px 0",
                      color: "#ffffff"
                    }}
                    onClick={() => this.props.clickHandler(!this.props.isHide)}
                  >
                    {this.state.searchBy == 'trade_name'? 'NAME': 'BARCODE'}
                  </button>
                  <div className={dropMenue} style={{ color: '#fff' }}>
                    <div style={{ color: '#000' }}>
                      <a className="dropdown-item" style={{cursor: "pointer"}} onClick={() => this.onDropDownClick("trade_name")}>NAME</a>
                      <a className="dropdown-item" style={{cursor: "pointer"}} onClick={() => this.onDropDownClick("barcode")}>BARCODE</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FindProducts;
