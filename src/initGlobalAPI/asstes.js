import { ASSETS_TYPE } from './const';

export default function initAssetRegisters(Vue) {
  console.log('Vue111: ', Vue);
  ASSETS_TYPE.forEach((type) => {
    Vue[type] = function (id, defintion) {
      if (type === 'component') {
        // 注册全局组件
        // 使用extend方法将对象变成构造函数
        defintion = this.options._base.extend(defintion); // 也可以直接Vue.extend
        
      } else if (type === 'filter') {
      } else if (type === 'directive') {
      }
      this.options[type + 's'][id] = defintion;
    };
  });
}
