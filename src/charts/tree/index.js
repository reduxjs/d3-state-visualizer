import d3 from 'd3';
import { isArray, isPlainObject, isEmpty } from 'lodash/lang';
import mapValues from 'lodash/object/mapValues';
import map2tree from 'map2tree';
import { getTooltipString, toggleChildren, visit, getNodeGroupByDepthCount } from './utils';
import d3tooltip from 'd3-tooltip';

const defaultOptions = {
  id: 'd3svg',
  style: {},
  size: 500,
  aspectRatio: 1.0,
  isSorted: false,
  heightBetweenNodesCoeff: 2,
  widthBetweenNodesCoeff: 1,
  transitionDuration: 750,
  state: undefined,
  rootKeyName: 'state',
  pushMethod: 'push',
  tree: undefined,
  tooltipOptions: {
    left: undefined,
    right: undefined,
    offset: {
      left: 0,
      top: 0
    }
  }
};

export default function(DOMNode, options = {}) {
  const {
    id,
    style,
    size,
    aspectRatio,
    isSorted,
    widthBetweenNodesCoeff,
    heightBetweenNodesCoeff,
    transitionDuration,
    state,
    rootKeyName,
    pushMethod,
    tree,
    tooltipOptions
    } = {...defaultOptions, ...options};

  const margin = {
    top: size / 100,
    right: size / 50,
    bottom: size / 100,
    left: 40
  };
  const width = size - margin.left - margin.right;
  const height = size * aspectRatio - margin.top - margin.bottom;
  const fullWidth = size;
  const fullHeight = size * aspectRatio;

  const attr = {
    id,
    viewBox: `0 0 ${fullWidth} ${fullHeight}`,
    preserveAspectRatio: 'xMinYMin slice'
  };

  if (!style.width) {
    attr.width = fullWidth;
  }

  const root = d3.select(DOMNode);
  const vis = root
    .append('svg')
    .attr(attr)
    .style(style)
    .append('g')
    .attr({
      transform: `translate(${margin.left}, ${margin.top})`
    });

  let layout = d3.layout.tree().size([width, height]);
  let data;

  if (isSorted) {
    layout.sort((a, b) => b.name.toLowerCase() < a.name.toLowerCase() ? 1 : -1);
  }

  return function renderChart(nextState = tree || state) {
    data = !tree ? map2tree(nextState, {key: rootKeyName, pushMethod}) : nextState;

    if (isEmpty(data) || !data.name) {
      data = { name: "error", message: "Please provide a state map or a tree structure"}
    }

    let nodeIndex = 0;
    let maxLabelLength = 0;

    visit(data,
        node => maxLabelLength = Math.max(node.name.length, maxLabelLength),
        node => node.children && node.children.length > 0 ? node.children : null
    );

    data.x0 = height / 2;
    data.y0 = 0;
    /*eslint-disable*/
    update(data);
    /*eslint-enable*/

    function update(source) {
      // path generator for links
      const diagonal = d3.svg.diagonal().projection(d => [d.y, d.x]);
      // set tree dimensions and spacing between branches and nodes
      const maxNodeCountByLevel = Math.max(...getNodeGroupByDepthCount(data));

      layout = layout.size([maxNodeCountByLevel * 25 * heightBetweenNodesCoeff, width]);

      let nodes = layout.nodes(data);
      let links = layout.links(nodes);

      nodes.forEach(node => node.y = node.depth * (maxLabelLength * 7 * widthBetweenNodesCoeff));

      // process the node selection
      let node = vis.selectAll('g.node').data(nodes, d => d.id || (d.id = ++nodeIndex));

      let nodeEnter = node.enter().append('g')
        .attr({
          'class': 'node',
          transform: d => `translate(${source.y0},${source.x0})`
        })
        .call(d3tooltip(d3, 'tooltip', {...tooltipOptions, root})
          .text((d, i) => getTooltipString(d, i, tooltipOptions)))
        .on({
          click: clickedNode => {
            if (d3.event.defaultPrevented) return;
            update(toggleChildren(clickedNode));
          },
          mouseover: function mouseover(d, i) {
            d3.select(this).style({
              fill: 'skyblue'
            });
          },
          mouseout: function mouseout(d, i) {
            d3.select(this).style({
              fill: 'black'
            });
          }
        });

      nodeEnter.append('circle')
        .attr({
          'class': 'nodeCircle'
        });

      nodeEnter.append('text')
        .attr({
          'class': 'nodeText',
          dy: '.35em'
        })
        .style({
          'fill-opacity': 0
        })
        .text(d => d.name);

      // update the text to reflect whether node has children or not
      node.select('text')
        .attr({
          x: d => d.children || d._children ? -10 : 10,
          'text-anchor': d => d.children || d._children ? 'end' : 'start'
        })
        .text(d => d.name);

      // change the circle fill depending on whether it has children and is collapsed
      node.select('circle.nodeCircle')
        .attr({
          r: 4.5
        })
        .style({
          fill: d => d._children ? 'lightsteelblue' : (d.children ? '#fff' : '#ccc')
        });

      // transition nodes to their new position
      let nodeUpdate = node.transition()
        .duration(transitionDuration)
        .attr({
          transform: d => `translate(${d.y},${d.x})`
        });

      // fade the text in
      nodeUpdate.select('text')
        .style('fill-opacity', 1);

      // transition exiting nodes to the parent's new position
      let nodeExit = node.exit().transition()
        .duration(transitionDuration)
        .attr({
          transform: d => `translate(${source.y},${source.x})`
        })
        .remove();

      nodeExit.select('circle')
        .attr('r', 0);

      nodeExit.select('text')
        .style('fill-opacity', 0);

      // update the links
      let link = vis.selectAll('path.link')
        .data(links, d => d.target.id);

      // enter any new links at the parent's previous position
      link.enter().insert('path', 'g')
        .attr({
          'class': 'link',
          d: d => {
            let o = {
              x: source.x0,
              y: source.y0
            };
            return diagonal({
              source: o,
              target: o
            });
          }
        });

      // transition links to their new position
      link.transition()
        .duration(transitionDuration)
        .attr({
          d: diagonal
        });

      // transition exiting nodes to the parent's new position
      link.exit().transition()
        .duration(transitionDuration)
        .attr({
          d: d => {
            let o = {
              x: source.x,
              y: source.y
            };
            return diagonal({
              source: o,
              target: o
            });
          }
        })
        .remove();

      // stash the old positions for transition
      nodes.forEach(d => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }
  };
}
