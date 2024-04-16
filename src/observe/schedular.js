import { nextTick } from '../util/next-tick';

let queue = [],
  has = {};

function flushCallback() {
  queue.forEach((watcher) => watcher.run());
  queue = [];
  has = {};
}
export function queueWatcher(watcher) {
  // 过滤wather
  const id = watcher.id;
  if (!has[id]) {
    queue.push(watcher);
    has[id] = true;
    // nextTick

    nextTick(flushCallback);
  }
}
