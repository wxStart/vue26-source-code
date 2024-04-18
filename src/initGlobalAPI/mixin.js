import { mergeOptions } from '../util/index';

export default function initMixin(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };

  // Vue.mixin({
  //   beforeCreate() {
  //       console.log(111)
  //   },
  // });

  // Vue.mixin({
  //   beforeCreate() {
  //       console.log(222)
  //   },
  // });
  /**
   *
   * 生命周期合并策略
   * Vue.mixin({
   *    beforeCreate(){}
   * })
   */
}
