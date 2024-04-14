export function isObject(data) {
  return typeof data === 'object' && data !== null;
}

export function def(obj, key, value, enumerable) {
  Object.defineProperty(obj, key, {
    value,
    enumerable,
    writable: true,
    configurable: true,
  });
}

export function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(newValue) {
      vim[source][key] = newValue;
    },
  });
}
