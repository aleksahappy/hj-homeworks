'use strict';

function createElement(node) {
  if ((node === undefined) || (node === null) || (node === false)) {
    return document.createTextNode('');
  }
  if ((typeof node === 'string') || (typeof node === 'number') || (node === true)) {
    return document.createTextNode(node.toString());
  }
  if (Array.isArray(node)) {
    return node.reduce((fragment, element) => {
      fragment.appendChild(createElement(element));
      return fragment;
    }, document.createDocumentFragment());
  }

  const element = document.createElement(node.name);

  if (node.props && typeof node.props === 'object') {
    Object.keys(node.props).forEach(key => element.setAttribute(key, node.props[key]));
  }

  if (node.childs) {
    element.appendChild(createElement(node.childs));
  }

  return element;
}
