let id = 0;
class Dep {
  constructor() {
    this.id = id++;
    this.subs = [];
  }

  addSub(watcher) {
    this.subs.push(watcher);
  }

  depend() {
    // 让当前的watcher （Dep.target）记住自己的dep  同时在执行addDep时候 避免放入重复的dep
    Dep.target.addDep(this);
    // this.subs.push(Dep.target);
  }

  notify() {
    this.subs.forEach((watcher) => watcher.update());
  }
}

Dep.target = null;

let stack = [];

export function pushTarget(watcher) {
  Dep.target = watcher;
  stack.push(watcher);
}

export function popTarget() {
  stack.pop();
  Dep.target = stack[stack.length - 1];
}

export default Dep;
