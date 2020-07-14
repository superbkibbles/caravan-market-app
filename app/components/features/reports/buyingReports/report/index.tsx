import React, { Component } from 'react';

import ReportCard from '../../ReportCard';

type Props = {
  auth: any;
  getBuyingReport: (id: number, invoice: number) => void
  match: any;
  report: any;
}

export default class extends Component<Prpos, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {}
  }

  componentDidMount(): void {
    const { auth, getBuyingReport, match } = this.props;
    if (auth) {
      getBuyingReport(auth.UsersId, match.params.invoice)
    }
  }

  renderFooter = () => {
    const { match } = this.props;
    return (
        <h3 className="text-center" style={{ color: "#22ba1a" }}> {Number(match.params.total).toFixed()} </h3>
    )
  };

  render() {
    return <ReportCard items={this.props.report} footer={this.renderFooter} />
  }
}
