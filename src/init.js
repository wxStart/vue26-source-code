import { initState } from './state';

import { compileToFunction } from './compiler/index';
import { mountComponent } from './lifecycle';
import { mergeOptions } from './util/index';
import {callHook} from './lifecycle'

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    // console.log('options: ', options);

    const vm = this;
    
    // 将用户传递的options 和 全局的options 进行合并  使用 constructor 避免是Vue的子
    vm.$options = mergeOptions(vm.constructor.options, options);

    callHook(vm, 'beforeCreate');
    // 数据劫持
    initState(vm);

    callHook(vm, 'created');
    
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };

  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);
    console.log('el: ', el);

    if (!options.render) {
      let template = options.template;
      if (!template && el) {
        template = el.outerHTML;
      }
      const render = compileToFunction(template);
      options.render = render;
    }

    mountComponent(vm, el);
  };
}
