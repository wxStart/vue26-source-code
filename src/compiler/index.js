// AST语法树， 用对象来描述原生语法  vDom
/**
 *   template
 *
 *
 */

import { parseHTML } from './parser-html';

import { generate } from './generate';

export function compileToFunction(template) {
  // template 转 ast树
  const root = parseHTML(template);
//   console.log('root: ', root);

  // 把 ast 转为render函数
  // _c("div",{id:"app"},_c(p,undefined,_v("hello" + _s(name))))
  /**
    _c("div",{id:"app",style:{"color":" red"," font-size":" 30px"}},_c("p",undefined,_v("年龄:"+_s(age)+"岁")),_c("p",undefined,_v("姓名:"+_s(name))))
   */
  let code = generate(root);
//   console.log('code:1111 ', code);

  let renderFn = new Function(`with(this){
    return ${code};
  }`);
  console.log('renderFn: ', renderFn);
  return renderFn;
}
