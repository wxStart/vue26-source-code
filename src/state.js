import { observe } from './observe/index';
import {proxy} from './util/index'

export function initState(vm) {
  const opts = vm.$options;
  console.log('opts: ', opts);

  if (opts.props) {
    initProps(vm);
  }

  if (opts.methods) {
    initMethod(vm);
  }
  if (opts.data) {
    initData(vm);
  }
  if (opts.computed) {
    initComputed(vm);
  }
  if (opts.watch) {
    initWatch(vm);
  }
}

function initProps(vm) {}

function initMethod(vm) {}

function initData(vm) {
  console.log(vm.$options.data);
  let data = vm.$options.data;
  if (typeof data == 'function') {
    data = data.call(vm);
  }
  vm._data = data;

  // 让用户直接 vm方式访问
  for (let key in data) {
    proxy(vm, '_data', key);
  }

  observe(data);

  // 对象劫持

  console.log('data: ', data);
}
function initComputed(vm) {}

function initWatch(vm) {}
