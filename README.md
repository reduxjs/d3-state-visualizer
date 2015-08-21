d3-state-visualizer
===================
Enables real-time visualization of your application state. [Demo](http://romseguy.github.io/d3-state-visualizer)

## Installation

`npm install d3-state-visualizer`

## Usage

```javascript
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
    completedCount: 1
  }
};

// only 2 function calls and you're done!
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
```

## Bindings

### Plain React

[example](https://github.com/romseguy/d3-state-visualizer/blob/boilerplate/components/Chart.js) implementation.

## Roadmap

* Visualize React component hierarchy.
* Connect visualizations of the state with the component hierarchy of your application. This would allow to get a bird's eye view of your components' data dependencies.
* Provide example integrations with [Redux](http://rackt.github.io/redux/index.html) and [Mobservable](http://mweststrate.github.io/mobservable/).
