import { isArray, isPlainObject } from 'lodash/lang';

export function collapseChildren(d) {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
}

export function expandChildren(d) {
  if (d._children) {
    d.children = d._children;
    d.children.forEach(expand);
    d._children = null;
  }
}

export function toggleChildren(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else if (d._children) {
    d.children = d._children;
    d._children = null;
  }
  return d;
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

  function getChildrenLength(rootNode, level = 0) {
    if (!rootNode.children || rootNode.children.length === 0) {
      return 0;
    }

    if (branchesDepth.length <= level + 1) {
      branchesDepth.push(0);
    }

    branchesDepth[level + 1] += rootNode.children.length;

    rootNode.children.forEach(childNode => {
      getChildrenLength(childNode, level + 1);
    });
  }
}
