import React from 'react';

type Props = {
  items: any;
  footer: any;
}

export default (props: Props) => {
  const { items, footer } = props;

  const renderHead = () => {
    return (
      <tr>
        <th>
          #
        </th>
        <th>
          ITEM NAME
        </th>
        <th>
          COUNTRY
        </th>
        <th>
          COST
        </th>
        <th>
          PRICE
        </th>
        <th >
          EXPIRE
        </th>
        {/*<th style={{cursor: "pointer"}}>*/}
        {/*  COUNT*/}
        {/*</th>*/}
        <th>
          TOTAL PRICE
        </th>
      </tr>
    )
  };

  const renderBody = () => {
    return items.map((item: any, i: number) => {
      const date = `${new Date(item.expire_date *1000).getFullYear()}/${new Date(item.expire_date *1000).getMonth() + 1}`;
      const id = i + 1;
      return (
        <tr key={item.id}>
          <td>
            { id }
          </td>
          <td>
            {item.trade_name}
          </td>
          <td>
            {item.manufacture}
          </td>
          <td>
            {Number(item.sale_price).toFixed()}
          </td>
          <td>
            {Number(item.purchase_price).toFixed(2)}
          </td>
          <td>
            {date}
          </td>
          <td className="">
            <strong style={{ color: '#22ba1a'}}>{ Number(item.total_price).toFixed() }</strong>
          </td>
        </tr>
      )
    })
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    { renderHead() }
                  </thead>
                  <tbody>
                  { renderBody() }
                  </tbody>
                </table>
              </div>
              { footer() }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
