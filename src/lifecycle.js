import Watcher from './observe/watcher';
import { patch } from './vdom/patch';

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    console.log('_update  vnode: 虚拟节点', vnode);

    const vm = this;

    // 第一次默认 肯定不需要diff
    const prevVnode = vm._vnode; // 第一次取值 是娶不到的
    console.log('prevVnode: ', prevVnode);

    vm._vnode = vnode;

    // 通过虚拟节点 渲染真是dom
    if (!prevVnode) {
      // 第一次渲染
      vm.$el = patch(vm.$el, vnode);
    } else {
      vm.$el = patch(prevVnode, vnode);
    }
  };
}

export function mountComponent(vm, el) {
  const options = vm.$options;
  vm.$el = el;

  // vm._render:  通过解析render 渲染出虚拟dom
  // vm._update:  通过虚拟dom渲染真实dom

  callHook(vm, 'beforeMount');

  let updateComponent = () => {
    // 渲染和更新的时候都会调用
    vm._update(vm._render());
  };

  new Watcher(vm, updateComponent, () => {}, true); // true 表示是一个渲染watcher
  callHook(vm, 'mounted');
}

export function callHook(vm, hook) {
  const handlers = vm.$options[hook];
  if (handlers) {
    for (let i = 0; i < handlers.length; i++) {
      handlers[i].call(vm);
    }
  }
}
