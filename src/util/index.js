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
      vm[source][key] = newValue;
    },
  });
}

const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroied',
];
let strats = {};
function mergeHook(parentVal, childVal) {
  if (childVal) {
    if (parentVal) {
      return parentVal.concat(childVal);
    } else {
      return [childVal];
    }
  } else {
    return parentVal;
  }
}
LIFECYCLE_HOOKS.forEach((hook) => {
  strats[hook] = mergeHook;
});

export function mergeOptions(parent = {}, child) {
  const options = {};
  // 生命周期合并策略

  function mergeField(key) {
    if (strats[key]) {
      return (options[key] = strats[key](parent[key], child[key]));
    }
    if (typeof parent[key] == 'object' && typeof child[key] == 'object') {
      options[key] = {
        ...parent[key],
        ...child[key],
      };
    } else if (child[key] == null) {
      options[key] = parent[key];
    } else {
      options[key] = child[key];
    }
  }

  for (const key in parent) {
    mergeField(key);
  }
  for (const key in child) {
    // 已经合并过得就不要合并了
    if (!parent.hasOwnProperty(key)) {
      mergeField(key);
    }
  }

  return options;
}
