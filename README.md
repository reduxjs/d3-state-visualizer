d3-state-visualizer
===================
Enables real-time visualization of your application state. [Demo](http://romseguy.github.io/d3-state-visualizer)

## Installation

`npm install d3-state-visualizer`

## Usage

```javascript
import { tree } from 'd3-state-visualizer/charts';

const appState = {
  todoStore: {
    todos: [
      { title: 'd3'},
      { title: 'state' },
      { title: 'visualizer' },
      { title: 'tree' }
    ],
    completedCount: 1
  }
};

const render = tree(document.getElementById('root'), {
  state: appState,
  id: 'treeExample',
  size: 1000,
  aspectRatio: 0.5,
  isSorted: false,
  widthBetweenNodesCoeff: 1.5,
  heightBetweenNodesCoeff: 2,
  style: {border: '1px solid black'},
  tooltipOptions: {offset: {left: 30, top: 10}, indentationSize: 2}
});

render();
```

## Bindings

### Plain React

[TreeChart](https://github.com/romseguy/d3-state-visualizer/blob/master/src/components/TreeChart.js) component.

`import { TreeChart } from 'd3-state-visualizer/components'`

[example](https://github.com/romseguy/d3-state-visualizer/tree/master/examples/react-tree) implementation.

## Roadmap

* Connect visualizations of the state with the component hierarchy of your application. This would allow to get a bird's eye view of your components' data dependencies.
* Provide example integrations with [Redux](http://rackt.github.io/redux/index.html) and [Mobservable](http://mweststrate.github.io/mobservable/).
