import React from 'react';
import d3 from 'd3';

class Chart extends React.Component {
  static propTypes = {
    initialize: React.PropTypes.func.isRequired,
    state: React.PropTypes.object.isRequired,
    id: React.PropTypes.string,
    style: React.PropTypes.string,
    size: React.PropTypes.number,
    aspectRatio: React.PropTypes.number,
    isSorted: React.PropTypes.bool,
    widthBetweenBranchCoeff: React.PropTypes.number,
    heightBetweenNodesCoeff: React.PropTypes.number,
    transitionDuration: React.PropTypes.number
  };

  static defaultProps = {
    id: 'd3svg',
    style: '',
    size: 1000,
    aspectRatio: 1.0,
    isSorted: false,
    widthBetweenBranchCoeff: 1,
    heightBetweenNodesCoeff: 1,
    transitionDuration: 750
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.renderChart = this.props.initialize(d3, React.findDOMNode(this), this.props);
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart(this.props.state);
  }

  render() {
    return <div/>;
  }
}

export default Chart;
