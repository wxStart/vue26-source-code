let callbacks = [];

let waiting = false;
function flushCallback() {
  callbacks.forEach((cb) => cb());
  //   callbacks = [];
  waiting = false;
}

export function nextTick(cb) {
  callbacks.push(cb);

  if (!waiting) {
    // 这里一个周期里面只应该调用一次
    setTimeout(flushCallback, 0);
    waiting = true;
  }
}
