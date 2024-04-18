import initMixin from './mixin';

import { ASSETS_TYPE } from './const';

import initExtend from './extend'
import initAssetRegisters from './asstes';
// const ASSETS_TYPE = ['component', 'filter', 'directive'];
export function initGlobalAPI(Vue) {
  Vue.options = {};
  initMixin(Vue);

  // 初始化过滤器  指令  组件
  ASSETS_TYPE.forEach((type) => {
    Vue.options[type + 's'] = {};
  });

  Vue.options._base = Vue; // Vue的构造函数

  initExtend(Vue)

  initAssetRegisters(Vue);
}
