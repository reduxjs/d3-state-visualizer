import { tree } from 'd3-state-visualizer';
import d3 from 'd3';

const appState = {
  todoStore: {
    todos: [
      { title: 'd3'},
      { title: 'state' },
      { title: 'visualizer' },
      { title: 'tree' }
    ],
    completedCount: 1,
    alphabeticalOrder: true
  },
  someStore: {
    someProperty: 0,
    someObject: {
      anotherProperty: 'value',
      someArray: [0, 1, 2]
    }
  }
};

const initialize = tree();

const render = initialize(d3, document.getElementById('root'), {
  state: appState,
  id: 'treeExample',
  size: 1000,
  aspectRatio: 0.5,
  isSorted: false,
  widthBetweenBranchCoeff: 2,
  heightBetweenNodesCoeff: 1.5,
  style: 'border: 1px solid black'
});

render();
