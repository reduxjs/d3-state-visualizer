import React from 'react';
import { forceGraph } from 'd3-state-visualizer';
import Chart from './components/Chart';

const appState = {
  foo: ['1', '2', '3'],
  bar: 3,
  baz: { some: 'value' },
  todo: ['a', 'b']
};

const nodes = Object.keys(appState).map(key => ({
  key,
  [key]: appState[key]
}));

const initialize = forceGraph();

React.render(
  <Chart
    initialize={initialize}
    data={nodes}
    id='forceGraphReactExample'
    size={500}
    aspectRatio={0.5}
    charge={-50}
    linkDistance={80}
    maxNodeSize={50}
    style='border: 1px solid black'
    />
  , document.getElementById('root')
);
