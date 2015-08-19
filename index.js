import { forceGraph } from 'd3-state-visualizer'
import d3 from 'd3';

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

const root = document.getElementById('root');

const render = initialize(d3, root, {
  data: nodes,
  id: 'forceGraphExample',
  size: 1000,
  aspectRatio: 1,
  charge: -30,
  linkDistance: 100,
  maxNodeSize: 50
});

render();

document.getElementById('addNodesButton').addEventListener('click', () => {
  render([{space: -1}, {invaders: 4}])
});
