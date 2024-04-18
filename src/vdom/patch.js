export function patch(oldVnode, vnode) {
  if (!oldVnode) {
    // oldVonde  没有值是组件的挂载阶段 child.$mount()
    return createElm(vnode); // 通过当前的虚拟节点创建元素
  }
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
  // 是标签 也有可能自定义组件 自定义标签也是字符串
  if (typeof tag == 'string') {
    // 实例化组件ƒ
    if (createComponent(vnode)) {
      return vnode.componentInstance.$el; // 等会在看看
    }

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

function createComponent(vnode) {
  // 需要创建组件实例
  let i = vnode.data;
  if ((i = i.hook) && (i = i.init)) {
    i(vnode);
  }
  // 执行完成后
  if (vnode.componentInstance) { // 这里表示的组件的实例
    return true;
  }
}
