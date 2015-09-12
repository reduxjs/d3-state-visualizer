import React from 'react';
import tree from 'd3-state-visualizer';

class Chart extends React.Component {
  static propTypes = {
    tree: React.PropTypes.object.isRequired,
    id: React.PropTypes.string,
    size: React.PropTypes.number,
    aspectRatio: React.PropTypes.number,
    charge: React.PropTypes.number,
    linkDistance: React.PropTypes.number,
    maxNodeSize: React.PropTypes.number,
    style: React.PropTypes.string
  };

  static defaultProps = {
    id: 'd3svg',
    size: 1000,
    aspectRatio: 1.0,
    charge: -1,
    linkDistance: 1,
    maxNodeSize: 50,
    style: ''
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.renderChart = tree(React.findDOMNode(this), this.props);
    this.renderChart();
  }

  render() {
    return <div/>;
  }
}

export default Chart;
