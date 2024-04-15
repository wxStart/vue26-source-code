import { mergeOptions } from '../util/index';
export function initGlobalAPI(Vue) {
  Vue.options = {};

  Vue.mixins = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };

  Vue.mixins({
    beforeCreate() {
        console.log(111)
    },
  });

  Vue.mixins({
    beforeCreate() {
        console.log(222)
    },
  });
  /**
   *
   * 生命周期合并策略
   * Vue.mixins({
   *    beforeCreate(){}
   * })
   */
}
