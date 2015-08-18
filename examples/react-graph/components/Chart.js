import React from 'react'

class Chart extends React.Component {
  static propTypes = {
    initialize: React.PropTypes.func,
    data: React.PropTypes.array
  };

  static defaultProps = {
    id: 'd3svg',
    size: 1000,
    aspectRatio: 1.0,
    charge: -1,
    linkDistance: 1,
    maxNodeSize: 50
  };

  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    this.renderChart = this.props.initialize(d3, React.findDOMNode(this), this.props);
    this.renderChart()
  }

  addNode() {
    this.renderChart([{ space: -1 }, { invaders: 4 }])
  }

  render() {
    return (
      <div>
        <button onClick={this.addNode.bind(this)}>Add nodes</button>
      </div>
    )
  }
}

export default Chart