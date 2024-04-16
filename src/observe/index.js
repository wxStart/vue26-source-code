import { isObject, def } from '../util/index';
import { arrayMethods } from './array';
import Dep from './dep';

class Observer {
  constructor(value) {
    // value.__ob__ = this;
    // 避免给  让 __ob__ 只能访问到值
    def(value, '__ob__', this, false);

    // 这里主要是对数组整体进行依赖收集 比如访问 data.arr=[1,2,3]是一个数组么，访问data.arr属相时候进行依赖收集
    this.dep = new Dep();

    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods;
      this.observerArray(value);
    } else {
      this.walk(value);
    }
  }

  observerArray(value) {
    for (let index = 0; index < value.length; index++) {
      observe(value[index]);
    }
  }

  walk(data) {
    let keys = Object.keys(data);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const value = data[key];

      defineReactive(data, key, value);
    }
  }
}

function defineReactive(target, key, value = target[key]) {
  const valueOb = observe(value); // 深层次的对象

  let dep = new Dep();

  Object.defineProperty(target, key, {
    get() {
      // 获取时候 收集依赖
      console.log('取值1111', target, key);
      if (Dep.target) {
        dep.depend(); // 当前属性的收集
        if(valueOb && valueOb.dep){ // 属性值是数组在这里收集  然后在调用数组的方法时候 触发dep.notify()
          valueOb.dep.depend();
        }
        console.log('dep: 1111', dep);
      }
      return value;
    },
    set(newValue) {
      if (newValue === value) return;
      console.log('更新数据', target, key);
      observe(newValue); // 设置是一个对象时候也需要劫持
      value = newValue;
      // 通知更新
      dep.notify();
    },
  });
}

export function observe(data) {
  if (!isObject(data)) {
    return;
  }
  let ob;
  if (typeof data.__ob__ !== 'undefined') {
    ob = data.__ob__; // 判断是否是响应式
  } else {
    ob = new Observer(data);
  }

  return ob;
}
