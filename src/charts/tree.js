import { isArray, isPlainObject } from 'lodash/lang';
import mapValues from 'lodash/object/mapValues';

function visit(parent, visitFn, childrenFn) {
  if (!parent) return;

  visitFn(parent);

  let children = childrenFn(parent);
  if (children) {
    let count = children.length;
    for (let i = 0; i < count; i++) {
      visit(children[i], visitFn, childrenFn);
    }
  }
}

function mapStateToTree(state, tree = { name: 'state', children: [] }, key = 'state') {
  if (!isArray(state) && !isPlainObject(state)) {
    return {};
  }

  let currentNode;

  visit(tree, d => {
    if (d.name === key) {
      currentNode = d;
    }
  }, d => d.children);

  mapValues(state, (stateValue, stateKey) => {
    let newNode = { name: stateKey };
    let leaf = false;

    if (isArray(stateValue) || isPlainObject(stateValue)) {
      newNode.children = [];

      if (isArray(stateValue) && stateValue.length !== 0) {
        stateValue.forEach((obj, i) => newNode.children.push({ name: `${stateKey}Child${i}`, ...obj }));
        leaf = true;
      }
    } else {
      newNode = { ...newNode, value: stateValue };
    }

    currentNode.children.push(newNode);

    mapStateToTree(leaf ? false : stateValue, tree, stateKey);
  });

  return tree;
}

export default function() {
  return function treeChart(d3, DOMNode, props) {
    const { id = 'd3svg', style = '', size = 1000, aspectRatio = 1.0 } = props;
    const data = mapStateToTree(props.state);
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

    const root = d3.select(DOMNode);
    const vis = root
      .append('svg')
      .attr({
        id,
        style,
        width: fullWidth,
        viewBox: `0 0 ${fullWidth} ${fullHeight}`,
        preserveAspectRatio: 'xMinYMin slice'
      })
      .append('g')
      .attr({
        transform: `translate(${margin.left}, ${margin.top})`
      });

    return function renderChart(nextNodes) {

    };
  };
}
