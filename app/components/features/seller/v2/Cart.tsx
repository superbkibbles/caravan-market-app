import React from 'react';

import classes from '../seller.css';

type Props = {
  items: any;
  decrement: (i: number) => void;
  increment: (i: number) => void;
  onDelete: (item: any) => void;
};

class Cart extends React.Component<Props, {}> {

  renderHead = () => {
    return (
      <tr className={classes.trFont}>
        <th>#</th>
        <th>ITEM NAME</th>
        <th className="text-center">COUNT</th>
        <th className="text-center">PRICE</th>
        <th className="text-center">TOTAL CASH</th>
        <th className="text-center">BRAND</th>
        <th className="text-center">REMAIN</th>
        <th className="text-center">EXPIRE</th>
        <th className="text-center">REMOVE</th>
      </tr>
    );
  };

  renderBody = () => {
    if (this.props.items.length > 0) {
      return this.props.items.map((item: any, i: number) => {
        const time = item.expire_date * 1000;
        const date = `${new Date(time).getFullYear()}/${new Date(
          time
        ).getMonth() + 1}`;
        return (
          <tr key={item.item_id} style={{ color: 'white', fontWeight: '700' }}>
            <td>{i + 1}</td>
            <td>
              {item.trade_name}
            </td>
            <td>
              <div className={classes.quantity}>
                <div
                  onClick={() => this.props.decrement(i)}
                  className={classes.quantity__minus}
                >
                  <span>-</span>
                </div>
                <input
                  name="quantity"
                  type="text"
                  className={classes.quantity__input}
                  value={item.count - item.lastCount}
                />
                <div
                  onClick={() => this.props.increment(i)}
                  className={classes.quantity__plus}
                >
                  <span>+</span>
                </div>
              </div>
            </td>
            <td className="text-center">{item.sale_price}</td>
            <td className="text-center">
              {
                item.sale_price * (item.count - item.lastCount)
              }
            </td>
            <td className="text-center">
              {item.brand} ({item.manufacture})
            </td>
            <td className="text-center">{
                item.remain_amount - item.count
            }</td>
            <td className="text-center">{date}</td>
            <td className="text-center">
              <div
                className="btn btn-danger"
                onClick={() => this.props.onDelete(item)}
              >
                <i className="far fa-trash-alt"/>
              </div>
            </td>
          </tr>
        );
      });
    }
  };

  render () {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table">
              <thead>{this.renderHead()}</thead>
              <tbody>{this.renderBody()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
