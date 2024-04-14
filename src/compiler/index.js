// AST语法树， 用对象来描述原生语法  vDom
/**
 *   template
 *
 *
 */

import { parseHTML } from './parser-html';

// function generate(el) {}

export function compileToFunction(template) {
  template = `<div id="app">
    <p>{{age}}</p>
    <p>{{name}}</p>
  </div>`;
  // template 转 ast树
  const root = parseHTML(template);
  console.log('root: ', root);

//   let code = generate(root);
  // 把 ast 转为render函数

  return function render() {};
}
