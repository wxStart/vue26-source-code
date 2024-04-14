import { createElement, createTextNode } from './vdom/create-element';
export function renderMixin(Vue) {
  // _c :创建元素的虚拟节点
  // _v :创建文本的虚拟节点
  // _s : 示例上取值

  Vue.prototype._c = function () {
    return createElement(...arguments);
  };
  Vue.prototype._v = function (text) {
    return createTextNode(text);
  };

  Vue.prototype._s = function (value) {
    return value == null
      ? ''
      : typeof value == 'object'
      ? JSON.stringify(value)
      : value;
  };

  Vue.prototype._render = function () {
    const vm = this;
    const { render } = vm.$options;
    console.log('render: ', render);
    let vnode = render.call(vm); // 取实例上取值  renderFn时候  with语法
    console.log('vnode:111 ', vnode);
    return vnode;
  };
}
