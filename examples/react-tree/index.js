import React from 'react';
import react2tree from 'react2tree';
import { tree } from 'd3-state-visualizer';
import App from './components/App';
import Chart from './components/Chart';

const hierarchy = react2tree(React.render(<App/>, document.createElement('hierarchy')));

const initialize = tree();

React.render(
  <Chart
    initialize={initialize}
    tree={hierarchy}
    id='treeExample'
    size={1000}
    aspectRatio={0.5}
    isSorted={false}
    widthBetweenBranchCoeff={2}
    heightBetweenNodesCoeff={1.5}
    style={'border: 1px solid black'}
    />
  , document.getElementById('root')
);
