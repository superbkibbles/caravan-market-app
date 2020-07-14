import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

interface State {
  data: any
}

type Props = {
  isToggle: boolean
}

class SideBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data:  [
        {
          title: "Dashboard",
          link: "/logged/dashboard",
          icon: "dashboard-icon",
          disabled: false
        },
        {
          title: "Products",
          link: "/logged/products",
          icon: "product-icon",
          disabled: false
        },
        {
          title: "Sales",
          link: "/logged/sales",
          icon: "sales-icon",
          disabled: false
        },
        {
          title: "stores",
          link: "/logged/stores",
          icon: "store-icon",
          disabled: false
        },
        {
          title: "Supplies",
          link: "/logged/supplies",
          icon: "supplies-icon",
          disabled: false
        },
        {
          title: "Report",
          link: "/logged/reports",
          icon: "supplies-icon",
          disabled: false
        },
      ]
    }
  }

  render() {
    const width = this.props.isToggle? "" : "0px";
    return (
      <div className="sidebar" data-color="orange" style={{width: width, transition: "width 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1)"}}>
        <div className="logo">
          {/*<a href="/" className="simple-text logo-normal">*/}
          {/*	caravan*/}
          {/*</a>*/}
          <a href="/" className="simple-text logo-container">
            caravan
            <i> commerce</i>
          </a>
        </div>

        {/*<div className="sidebar-wrapper" id="sidebar-wrapper">*/}
        <div className="sidebar-wrapper" style={{width: width, transition: "width 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1)"}}>
          <ul className="nav">
            {
              this.state.data.map((d, i) =>(
                <li key={i} className="text-left">
                  <NavLink
                    // style={d.disabled && {cursor: "not-allowed"}}
                    activeStyle={{
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                    to={d.link}
                    // onClick={(e) => {d.disabled && e.preventDefault()}}
                  >

                    {d.title}

                  </NavLink>
                </li>
              ))
            }
          </ul>
        </div>

      </div>
    );
  }
}

export default SideBar;
