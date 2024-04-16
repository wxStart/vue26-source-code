// 改变元素组的方法

let oldArrayMethods = Array.prototype;

export let arrayMethods = Object.create(oldArrayMethods);

const methods = [
  `push`,
  `pop`,
  `shift`,
  `unshift`,
  `splice`,
  `sort`,
  `reverse`,
];

methods.forEach((method) => {
  arrayMethods[method] = function (...args) {
    const result = oldArrayMethods[method].apply(this, args);

    /**
     * 把数组身上的__ob__ 取出来，__ob__ 肯定存在了，因为数组肯定不是最层，
     * 比如是obj.d属性是个数组，第一次便利这个对象的d属性的时候，就已经个d（数组）
     * 添加了__ob__属性
     */
    const ob = this.__ob__;
    console.log('ob: ', ob);

    // 数组中有三个方法会改变 插入新项  现在要把新插入的项也变成为 observe的
    let inserted = [];
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;
      case 'splice':
        // 下标为2 之后才是新增的项目
        // splice(下标，删除个数,后面才是新增的数据)
        inserted = args.slice(2);
        break;
    }
    if (inserted.length) {
      // Observer.observerArray
      ob.observerArray(inserted);
    }
    // 
    ob.dep.notify();
    return result;
  };
});
