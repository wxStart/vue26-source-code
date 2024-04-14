export function createElement(tag, data = {}, ...children) {
  let key = data.key;
  if (key) {
    delete data.key;
  }
  return vnode(tag, data, key, children);
}
export function createTextNode(text) {
  return vnode(undefined, undefined, undefined, undefined, text);
}

function vnode(tag, data, key, children, text) {
  return { tag, data, key, children, text };
}
// template -> ast ->render->生成虚拟dom-> 真实dom
//

/**
 {
    tag:'div',
    key:undefined,
    data:{},
    children:[],
    text:undefined
 }
 */
