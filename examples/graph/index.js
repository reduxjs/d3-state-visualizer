import { forceGraph } from './../../lib/index';
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

const render = initialize(d3, document.getElementById('root'), {
  data: nodes,
  id: 'forceGraphExample',
  size: 1000,
  aspectRatio: 1,
  charge: -50,
  linkDistance: 50,
  maxNodeSize: 50
});

render();
