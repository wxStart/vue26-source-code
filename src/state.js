import { observe } from "./observe/index";

export function initState(vm) {
  const opts = vm.$options;

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

  observe(data);

  // 对象劫持

  
  console.log('data: ', data);

}
function initComputed(vm) {}

function initWatch(vm) {}
