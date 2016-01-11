import React from 'react';
import { render } from 'react-dom';
import react2tree from 'react2tree';
import App from './components/App';
import { TreeChart } from 'd3-state-visualizer';

const hierarchy = react2tree(render(<App/>, document.createElement('hierarchy')));

render(
  <div>
    <TreeChart
      tree={hierarchy}
      id='treeExample'
      size={1000}
      aspectRatio={0.5}
      isSorted={false}
      widthBetweenNodesCoeff={1.5}
      heightBetweenNodesCoeff={2}
      style={{border: '1px solid black'}}
      tooltipOptions={{offset: {left: 30, top: 10}}}
      />
  </div>
  , document.getElementById('root')
);
