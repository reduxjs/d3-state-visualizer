import { isArray, isPlainObject } from 'lodash/lang';

export function collapseChildren(node) {
  if (node.children) {
    node._children = node.children;
    node._children.forEach(collapse);
    node.children = null;
  }
}

export function expandChildren(node) {
  if (node._children) {
    node.children = node._children;
    node.children.forEach(expand);
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

export function getBranchesDepth(rootNode) {
  let branchesDepth = [1];
  getChildrenLength(rootNode);
  return branchesDepth;

  function getChildrenLength(node, level = 0) {
    if (!node.children || node.children.length === 0) {
      return 0;
    }

    if (branchesDepth.length <= level + 1) {
      branchesDepth.push(0);
    }

    branchesDepth[level + 1] += node.children.length;

    node.children.forEach(childNode => {
      getChildrenLength(childNode, level + 1);
    });
  }
}
