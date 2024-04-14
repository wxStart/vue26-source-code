class Watcher {
  constructor(vm, exprOrFn, callback, options) {
    console.log('Watcher');
    this.vm = vm;
    // this.exprOrFn = exprOrFn;
    this.callback = callback;
    this.options = options;
    this.getter = exprOrFn;
    this.get();
  }

  get() {
    this.getter();
  }
}

export default Watcher;
