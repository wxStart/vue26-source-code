export function patch(oldVnode, vnode) {
  if (!oldVnode) {
    // oldVonde  没有值是组件的挂载阶段 child.$mount()
    return createElm(vnode); // 通过当前的虚拟节点创建元素
  }
  // 判断是更新还是第一次渲染
  const isReallElement = oldVnode.nodeType;
  if (isReallElement) {
    const oldElm = oldVnode;
    let parentElm = oldElm.parentNode;
    let el = createElm(vnode);
    parentElm.insertBefore(el, oldElm.nextSibling);
    parentElm.removeChild(oldElm);
    return el;
  } else {
    // 更新时候调用这个
    if (oldVnode.tag !== vnode.tag) {
      // 标签不一致 直接生成新的  替换掉旧的节点
      oldVnode.el.parentNode.replaceChild(createElm(vnode), oldVnode.el);
      return vnode.el;
    }

    // 如果是文本  文本标签没有tag
    if (!oldVnode.tag) {
      if (oldVnode.text !== vnode.text) {
        oldVnode.el.textContent = vnode.text;
      }
    }

    // 标签一致  并且不是文本  复用老的节点的el
    let el = (vnode.el = oldVnode.el);
    // 处理新的节点 的属性
    updateProperties(vnode, oldVnode.data);
    // 对比儿子组件
    let oldChildren = oldVnode.children || [];
    let newChildren = vnode.children || [];
    if (oldChildren.length && newChildren.length) {
      // 都有孩子
      updateChildren(el, oldChildren, newChildren);
    } else if (newChildren.length) {
      //新的有孩子 老的没有孩子
      for (let index = 0; index < newChildren.length; index++) {
        const child = newChildren[index];
        el.appendChild(createElm(child));
      }
    } else if (oldChildren.length) {
      // 老的有孩子 新的没有孩子
      el.innerHTML = '';
    }
  }
}
// 递归创建真是节点
export function createElm(vnode) {
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
function updateProperties(vnode, oldProps = {}) {
  let newProps = vnode.data || {};
  console.log('1111vnode  newProps: ', newProps, oldProps);
  let el = vnode.el;

  // 如果老的属性中有，新的属性中没有，真实dom上就讲这个属性删掉

  let newStyle = newProps.style;
  let oldStyle = oldProps.style;
  for (const key in oldStyle) {
    if (!newStyle[key]) {
      el.style[key] = '';
    }
  }

  for (const key in oldProps) {
    if (!newProps[key]) {
      el.removeAttribute(key);
    }
  }

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
  if (vnode.componentInstance) {
    // 这里表示的组件的实例
    return true;
  }
}

function isSameVnode(oldVnode, newVonde) {
  return oldVnode.tag == newVonde.tag && oldVnode.key == newVonde.key;
}
// diff的核心方法
function updateChildren(parent, oldChildren, newChildren) {
  // 双指针

  let oldStartIndex = 0,
    oldStartVnode = oldChildren[0],
    oldEndIndex = oldChildren.length - 1,
    oldEndVnode = oldChildren[oldEndIndex];
  let newStartIndex = 0,
    newStartVnode = newChildren[0],
    newEndIndex = newChildren.length - 1,
    newEndVnode = newChildren[newEndIndex];
  let oldkeyIndexMap;
  // 任意一个数组比较完成了就停止
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (oldStartVnode === undefined) {
      // 暴力比较的时候 会把这里设置为 undefined 
      //! 顺序比较的时候 可能会碰到 undefined
      oldStartVnode = oldChildren[++oldStartIndex];
    } else if (oldEndVnode === undefined) {
      //! 倒序比较的时候 可能会碰到 undefined
      oldEndVnode = oldChildren[--oldEndIndex];
    } else if (isSameVnode(oldStartVnode, newStartVnode)) {
      //! 头部相同
      //  尝试 头部比较
      // 是同一个节点
      patch(oldStartVnode, newStartVnode); // 比对
      // 头部指针 都往右（后）移动 比较下一个
      oldStartVnode = oldChildren[++oldStartIndex];
      newStartVnode = newChildren[++newStartIndex];
    } else if (isSameVnode(oldEndVnode, newEndVnode)) {
      //! 尾部相同
      //  尝试 尾部对比
      patch(oldEndVnode, newEndVnode); // 比对
      // 尾部部指针 都往左（前）移动 比较前一个
      oldEndVnode = oldChildren[--oldEndIndex];
      newEndVnode = newChildren[--newEndIndex];
    } else if (isSameVnode(oldStartVnode, newEndVnode)) {
      //! 头部移动到尾部
      // 老的头和新的尾部相同时候  头移动到尾部了
      patch(oldStartVnode, newEndVnode); // 比对
      console.log(1111111111111111111111);
      parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
      // 旧的头指针往后移动，新的尾指针 往前移动
      oldStartVnode = oldChildren[++oldStartIndex];
      newEndVnode = newChildren[--newEndIndex];
    } else if (isSameVnode(oldEndVnode, newStartVnode)) {
      //! 尾部移动到头部

      // 老的尾和新的头部相同时候  尾部移动到头部了
      patch(oldEndVnode, newStartVnode); // 比对
      parent.insertBefore(oldEndVnode.el, oldStartVnode.el);
      // 旧的尾指针往前移动，新的头指针 往后移动
      oldEndVnode = oldChildren[--oldEndIndex];
      newStartVnode = newChildren[++newStartIndex];
    } else {
      //! 暴力比对
      //! 1. 现根据老节点的key 做个key和下标的映射
      //! 2. 拿着新的虚拟列表去映射中查找
      //!   2.1 查到就去移动，移动到老的头指针的前面
      //!   2.2 没有找到，说明是一个新的节点  直接插入到老头部指针的前面
      //! 3. 这里操作的是 新节点的开始  所以 新节点头指针会往后移动
      if (!oldkeyIndexMap) {
        oldkeyIndexMap = {}; // 根据key创建 映射表
        for (let index = 0; index < oldChildren.length; index++) {
          const oldChild = oldChildren[index];
          if (oldChild.key !== undefined) oldkeyIndexMap[oldChild.key] = index;
        }
      }
      let moveIndex = oldkeyIndexMap[newStartVnode.key];
      // 没找到
      if (moveIndex === undefined) {
        parent.insertBefore(createElm(newStartVnode), oldStartVnode.el);
      } else {
        let moveVnode = oldChildren[moveIndex];
        oldChildren[moveIndex] = undefined;
        parent.insertBefore(moveVnode.el, oldStartVnode.el);
        patch(moveVnode, newStartVnode);
      }
      newStartVnode = newChildren[++newStartIndex];
    }
  }

  if (newStartIndex <= newEndIndex) {
    // 新的有多余的 直接加到
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      // parent.appendChild(createElm(newChildren[i]));
      let flag = !newChildren[newEndIndex + 1]
        ? null
        : newChildren[newEndIndex + 1].el;
      parent.insertBefore(createElm(newChildren[i]), flag);
    }
  }

  // 老的数组里面还有东西  移除不需要的
  if (oldStartIndex <= oldEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      let child = oldChildren[i];
      console.log('child: ', child);
      if (child) {
        parent.removeChild(child.el);
      }
    }
  }
}
