import { mergeOptions } from '../util/index';

export default function initExtend(Vue) {
  // 为什么要有子类和父类
  // 创建子类 继承父类，扩展时候扩展到自己身上 ，同时也可以拿到父类上的一些方法和属性
  let cid = 0;
  Vue.extend = function (extendOption) {

    console.log('extendOption: 11', extendOption);

    const Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.cid = cid++;
    Sub.prototype = Object.create(this.prototype);
    Sub.prototype.constructor = Sub;
    Sub.options = mergeOptions(this.options, extendOption);

    // mixin
    Sub.mixin = this.mixin;

    // ... 等等其他方法
    return Sub;
  };
}
