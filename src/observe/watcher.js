import { pushTarget, popTarget } from './dep';

let id = 0;
class Watcher {
  constructor(vm, exprOrFn, callback, options) {
    console.log('Watcher');
    this.vm = vm;
    // this.exprOrFn = exprOrFn;
    this.callback = callback;
    this.options = options;
    this.getter = exprOrFn;
    this.id = id++;
    this.depsId = new Set();
    this.deps = [];
    this.get();
  }
  addDep(dep) {
    let id = dep.id;
    if (!this.depsId.has(id)) {
      this.depsId.add(id);
      this.deps.push(dep);
      dep.addSub(this)
    }
  }

  get() {
    pushTarget(this);
    this.getter();
    popTarget();
  }
  update() {
    this.get();
  }
}

export default Watcher;
