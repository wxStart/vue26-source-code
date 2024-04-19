import { initMixin } from './init';
import { renderMixin } from './render';
import { lifecycleMixin } from './lifecycle';
import { initGlobalAPI } from './initGlobalAPI/index';

function Vue(options) {
  this._init(options);
}

initMixin(Vue);
renderMixin(Vue);
lifecycleMixin(Vue);
initGlobalAPI(Vue);

//! demo 产生diff进行比对

/* 

import { compileToFunction } from './compiler/index';
import { createElm, patch } from './vdom/patch';

let vm1 = new Vue({
  data: { name: 'wx' },
});

let render1 = compileToFunction(
  `<div id="vnode" a="12" style="color:red;fontSize:16px" >
      <div  style="background:red;color:#fff" key="A" >A</div>
      <div  style="background:red;color:#fff" key="B" >B</div>
      <div  style="background:yellow;color:#fff" key="C" >C</div>
      <div  style="background:green;color:#fff" key="D" >D</div>
      <div  style="background:green;color:#fff" key="E" >E</div>
  </div>`
);

let vnode = render1.call(vm1);

let el = createElm(vnode);
console.log('1111vnode el: ', el);
document.getElementById('diff').appendChild(el);

let vm2 = new Vue({
  data: { name: 'wang', age: 22 },
});

// 标签不一致的示例
// let render2 = compileToFunction('<p id="vnode2">{{name}}<p>{{age}}</p></p>');

// 标签一致 属性不一致
let render2 = compileToFunction(
  `<div id="vnode2" b="123"  style="background:red;color:#fff" >
      <div  style="background:red;color:#fff" key="G" >G</div>
      <div  style="background:red;color:#fff" key="D" >D</div>
      <div  style="background:blue;color:#fff" key="A" >A</div>
      <div  style="background:blue;color:#fff" key="B" >B</div>
      <div  style="background:green;color:#fff" key="C" >C</div>
      <div  style="background:green;color:#fff" key="N" >N</div>
  </div>`
);

//       <div  style="background: pink;color:#fff" key="E" >E</div>
let newVnode = render2.call(vm2);
console.log('1111vnode:222 ', newVnode);

//
setTimeout(() => {
  patch(vnode, newVnode); // 传入两个节点 会返回真是节点
}, 5000);
*/

/**
 * 1. diff 算法的特点 平级比对
 * 2. 标签不一样 ，直接生成新的标签进行替换
 * 3. 标签一样 元素复用
 *    3.1  比对属性，新属性里面没有的就删掉，然后吧新属性加上去
 *
 */

export default Vue;
