import Watcher from './observe/watcher';

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    //
  };
}

export function mountComponent(vm, el) {
  const options = vm.$options;
  vm.$el = el;

  // vm._render:  通过解析render 渲染出虚拟dom
  // vm._update:  通过虚拟dom渲染真实dom

  let updateComponent = () => {
    // 渲染和更新的时候都会调用
    vm._update(vm._render());
  };

  new Watcher(vm, updateComponent, () => {}, true); // true 表示是一个渲染watcher
}
