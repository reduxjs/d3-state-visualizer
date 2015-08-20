import React from 'react';
import { tree } from 'd3-state-visualizer';
import ChartContainer from './components/ChartContainer';
import Chart from './components/Chart';

const appState = {
  todoStore: {
    todos: [
      { title: 'd3' },
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

React.render(
  <div>
    <ChartContainer appState={appState} >
      <Chart
        initialize={initialize}
        state={appState}
        id='treeExample'
        size={1000}
        aspectRatio={0.5}
        isSorted={true}
        transitionDuration={0}
        widthBetweenBranchCoeff={2}
        heightBetweenNodesCoeff={1.5}
        />
    </ChartContainer>
  </div>
  , document.getElementById('root')
);
