import React from 'react';
import visualizer from 'd3-state-visualizer';
import ChartContainer from './components/ChartContainer';

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

const { components: { TreeChart }} = visualizer;

const style = {
  border: '1px solid black',
  link: {
    'stroke-width': '0.5px'
  }
};

const tooltipOptions = {
  style: {
    'font-family': 'Consolas, Menlo, Monaco, monospace',
    'font-size': '0.8em',
    color: 'white',
    background: 'rgba(0, 0, 0, 0.5)',
    'border-radius': '5px',
    padding: '10px'
  },
  offset: {
    top: -390,
    left: 30
  }
}

React.render(
  <div>
    <ChartContainer appState={appState} >
      <TreeChart
        id='treeExample'
        size={619}
        aspectRatio={0.5}
        isSorted={true}
        transitionDuration={0}
        widthBetweenBranchCoeff={2}
        heightBetweenNodesCoeff={1.5}
        style={style}
        tooltipOptions={tooltipOptions}
        />
    </ChartContainer>
  </div>
  , document.getElementById('root')
);
