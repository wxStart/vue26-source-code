import { isObject } from '../util/index';

class Observer {
  constructor(value) {
    this.walk(value);
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

  return new Observer(data);
}
