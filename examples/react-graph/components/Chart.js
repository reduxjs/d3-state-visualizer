import React from 'react';
import d3 from 'd3';

class Chart extends React.Component {
  static propTypes = {
    initialize: React.PropTypes.func.isRequired,
    data: React.PropTypes.array.isRequired,
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
    this.renderChart = this.props.initialize(d3, React.findDOMNode(this), this.props);
    this.renderChart();
  }

  addNode() {
    this.renderChart([{ space: -1 }, { invaders: 4 }]);
  }

  render() {
    return (
      <div>
        <button onClick={this.addNode.bind(this)} style={{ float: 'left'}}>Add nodes</button>
      </div>
    );
  }
}

export default Chart;
