import { isArray, isPlainObject } from 'lodash/lang';
import pretty from 'json-pretty';
import R from 'ramda';

export function collapseChildren(node) {
  if (node.children) {
    node._children = node.children;
    node._children.forEach(collapseChildren);
    node.children = null;
  }
}

export function expandChildren(node) {
  if (node._children) {
    node.children = node._children;
    node.children.forEach(expandChildren);
    node._children = null;
  }
}

export function toggleChildren(node) {
  if (node.children) {
    node._children = node.children;
    node.children = null;
  } else if (node._children) {
    node.children = node._children;
    node._children = null;
  }
  return node;
}

export function visit(parent, visitFn, childrenFn) {
  if (!parent) {
    return;
  }

  visitFn(parent);

  let children = childrenFn(parent);
  if (children) {
    let count = children.length;

    for (let i = 0; i < count; i++) {
      visit(children[i], visitFn, childrenFn);
    }
  }
}

export function getNodeGroupByDepthCount(rootNode) {
  let nodeGroupByDepthCount = [1];

  const traverseFrom = function traverseFrom(node, depth = 0) {
    if (!node.children || node.children.length === 0) {
      return 0;
    }

    if (nodeGroupByDepthCount.length <= depth + 1) {
      nodeGroupByDepthCount.push(0);
    }

    nodeGroupByDepthCount[depth + 1] += node.children.length;

    node.children.forEach(childNode => {
      traverseFrom(childNode, depth + 1);
    });
  };

  traverseFrom(rootNode);
  return nodeGroupByDepthCount;
}

export function getTooltipString(node, i, tooltipOptions) {
  const { children, value } = node;
  console.log(node, children, value)

  const cr2br = R.replace(/\n/g, '<br/>');
  const spaces2nbsp = R.replace(/\s{2}/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
  const json2html = R.pipe(pretty, cr2br, spaces2nbsp);

  if (isArray(children)) {
    const toStringMap = {
      [Array]: 'Array',
      [Object]: 'Object'
    };
    const tuples = R.map(({ name, children, value }) => ({name, children, value}));
    const setState = R.forEach(({ name, children, value }) => state[name] = value ? toStringMap[value.constructor] || value : 'Array');

    let state = {};
    setState(tuples(children));

    return json2html(state)
  }

  if (isPlainObject(value)) {
    return json2html(value);
  }

  return value;
}
