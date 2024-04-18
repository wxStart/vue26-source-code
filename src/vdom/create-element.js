import { isObject, isReservedTag } from '../util/index';

export function createElement(vm, tag, data = {}, ...children) {
  let key = data.key;
  if (key) {
    delete data.key;
  }
  //  区别标签还是组件
  if (isReservedTag(tag)) {
    return vnode(tag, data, key, children);
  } else {
    // 组件
    let Ctor = vm.$options.components[tag];
    console.log('tag: ', tag);
    console.log('vm.$options.components[: ', vm.$options.components);
    console.log('Ctor: ', Ctor);
    return createComponent(vm, tag, data, key, children, Ctor);
  }
}

function createComponent(vm, tag, data, key, children, Ctor) {
  if (isObject(Ctor)) {
    Ctor = vm.$options._base.extend(Ctor);
  }

  console.log('Ctor: ', Ctor);

  data.hook = {
    init(vnode) { // 初始化 实例 并且挂在虚拟节点的 componentInstance 属性上 
      let child = (vnode.componentInstance = new Ctor({ _isComponent: true }));
      // 组件挂载和$el
      child.$mount()// 这里没有传入el  挂载实例  patch  
    },
  };

  return vnode(`vue-component-${Ctor.cid}-${tag}`, data, key, undefined, {
    Ctor,
    children, // slot
  });
}

export function createTextNode(vm, text) {
  return vnode(undefined, undefined, undefined, undefined, text);
}

function vnode(tag, data, key, children, text, componentOptions) {
  return { tag, data, key, children, text, componentOptions };
}
// template -> ast ->render->生成虚拟dom-> 真实dom


/**
 {
    tag:'div',
    key:undefined,
    data:{},
    children:[],
    text:undefined
 }
 */
