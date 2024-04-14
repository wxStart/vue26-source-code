export function isObject (data){
    return typeof data ==='object' && data!==null
}

export function def(obj, key, value, enumerable) {
    Object.defineProperty(obj, key, {
      value,
      enumerable,
      writable: true,
      configurable: true,
    });
  }