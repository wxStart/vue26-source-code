export function patch(oldVnode, vnode) {
  // 判断是更新还是第一次渲染
  console.log('oldVnode,vnode: ', oldVnode, vnode);
  const isReallElement = oldVnode.nodeType;
  if (isReallElement) {
    const oldElm = oldVnode;
    let parentElm = oldElm.parentNode;
    let el = createElm(vnode);
    parentElm.insertBefore(el, oldElm.nextSibling);
    parentElm.removeChild(oldElm);
    return el;
  }
}
// 递归创建真是节点

function createElm(vnode) {
  let { tag, children, key, data, text } = vnode;
  // 是标签
  if (typeof tag == 'string') {
    vnode.el = document.createElement(tag);

    updateProperties(vnode);
    children.forEach((child) => {
      return vnode.el.appendChild(createElm(child));
    });
  } else {
    // 是文本
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}
// 更新属性
function updateProperties(vnode) {
  let newProps = vnode.data;
  let el = vnode.el;
  for (let key in newProps) {
    if (key === 'style') {
      for (let styleName in newProps.style) {
        el.style[styleName] = newProps.style[styleName];
      }
    } else if (key === 'class') {
      el.className = newProps.class;
    } else {
      el.setAttribute(key, newProps[key]);
    }
  }
}
