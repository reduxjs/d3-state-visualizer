import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { tree } from '../charts';

class TreeChart extends Component {
  static propTypes = {
    state: PropTypes.object,
    rootKeyName: PropTypes.string,
    pushMethod: PropTypes.oneOf(['push', 'unshift']),
    tree: PropTypes.shape({
      name: PropTypes.string,
      children: PropTypes.array
    }),
    id: PropTypes.string,
    style: PropTypes.shape({
      node: PropTypes.shape({
        colors: PropTypes.shape({
          'default': PropTypes.string,
          parent: PropTypes.string,
          collapsed: PropTypes.string
        }),
        radius: PropTypes.number
      }),
      text: PropTypes.shape({
        colors: PropTypes.shape({
          'default': PropTypes.string,
          hover: PropTypes.string
        })
      }),
      link: PropTypes.object
    }),
    size: PropTypes.number,
    aspectRatio: PropTypes.number,
    margin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number
    }),
    isSorted: PropTypes.bool,
    heightBetweenNodesCoeff: PropTypes.number,
    widthBetweenNodesCoeff: PropTypes.number,
    transitionDuration: PropTypes.number,
    onClickText: PropTypes.func,
    tooltipOptions: PropTypes.shape({
      disabled: PropTypes.bool,
      left: PropTypes.number,
      top: PropTypes.number,
      offset: PropTypes.shape({
        left: PropTypes.number,
        top: PropTypes.number
      }),
      indentationSize: PropTypes.number,
      style: PropTypes.object
    })
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.renderChart = tree(findDOMNode(this), this.props);
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
