import React, { Component, PropTypes } from 'react';
import { tree } from 'd3-state-visualizer/charts';

class TreeChart extends Component {
  static propTypes = {
    state: PropTypes.object,
    rootKeyName: React.PropTypes.string,
    pushMethod: React.PropTypes.string,
    tree: PropTypes.shape({
      name: PropTypes.string,
      children: PropTypes.array
    }),
    id: PropTypes.string,
    style: PropTypes.object,
    size: PropTypes.number,
    aspectRatio: PropTypes.number,
    isSorted: React.PropTypes.bool,
    heightBetweenNodesCoeff: React.PropTypes.number,
    widthBetweenNodesCoeff: React.PropTypes.number,
    transitionDuration: React.PropTypes.number,
    tooltipOptions: PropTypes.shape({
      left: PropTypes.number,
      top: PropTypes.number,
      offset: PropTypes.shape({
        left: PropTypes.number,
        top: PropTypes.number
      }),
      indentationSize: PropTypes.number
    })
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.renderChart = tree(React.findDOMNode(this), this.props);
    this.renderChart();
  }

  componentWillReceiveProps(nextProps) {
    this.renderChart(nextProps.tree || nextProps.state);
  }

  render() {
    return <div/>;
  }
}

export default TreeChart;
