import { isObject, def } from '../util/index';
import { arrayMethods } from './array';

class Observer {
  constructor(value) {
    // value.__ob__ = this;
    // 避免给  让 __ob__ 只能访问到值
    def(value, '__ob__', this, false);

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
  observe(value); // 深层次的对象

  Object.defineProperty(target, key, {
    get() {
      // 获取时候 收集依赖
      return value;
    },
    set(newValue) {
      if (newValue === value) return;
      observe(newValue); // 设置是一个对象时候也需要劫持
      value = newValue;
      // 通知更新
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
