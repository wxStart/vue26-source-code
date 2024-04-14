export function renderMixin(Vue) {
  Vue.prototype._render = function () {
    console.log(' Vue.prototype._render: ', Vue.prototype._render);
  };
}
