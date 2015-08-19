import { tree } from 'd3-state-visualizer';
import d3 from 'd3';

const appState = {
  todoStore: {
    todos: [{ title: 'troll'}, { title: 'ish' }],
    completedCount: 1
  },
  otherStore: {
    foo: 0,
    bar: { some: 'value' }
  }
};

const initialize = tree();

const render = initialize(d3, document.getElementById('root'), {
  state: appState,
  id: 'treeExample',
  size: 500,
  aspectRatio: 0.5,
  style: 'border: 1px solid black'
});

render();
