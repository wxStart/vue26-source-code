const ncname = `[a-zA-z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则， 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的
const attribute =
  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>']+)))?/; // 属性匹配
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

let root = null;
let currentParent; // 当前父亲是谁
let stack = [];
const ELEMENT_TYPE = 1;
const TEXT_TYPE = 3;

function createASTElement(tagName, attrs) {
  return {
    tag: tagName,
    type: ELEMENT_TYPE,
    children: [],
    attrs,
    parent: null,
  };
}

function start(tagName, attrs) {
  console.log('开始标签:', tagName, attrs);

  let element = createASTElement(tagName, attrs);
  if (!root) {
    root = element;
  }
  currentParent = element; // 把当前元素标记成父 ast树
  stack.push(element); // 将开始标签元素存放栈中
}

function chars(text) {
  console.log('文本 是', text);
  text = text.replace(/\s/g, '');
  if (text) {
    currentParent.children.push({
      text,
      type: TEXT_TYPE,
    });
  }
}

function end(tagName) {
  console.log('结束标签:', tagName);
  let element = stack.pop();
  currentParent = stack[stack.length-1];

  if(currentParent){
    element.parent  =currentParent;
    currentParent.children.push(element)
  }
  // 
}
export function parseHTML(html) {
  while (html) {
    let textEnd = html.indexOf('<');
    //  索引为0 肯定是一个标签 开始标签或者结束标签
    if (textEnd == 0) {
      let startTagMatch = parseStartTag(); // 通过这个方法 获取到tagName attrs
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue; // 如果开始标签匹配完毕后 继续下次匹配
      }
      let endTagMatch = html.match(endTag);
      if (endTagMatch) {
        advance(endTagMatch[0].length);
        end(endTagMatch[1]);
        continue;
      }
    }
    let text;
    if (textEnd >= 0) {
      text = html.substring(0, textEnd);
    }
    if (text) {
      advance(text.length);
      chars(text);
      //   console.log('html: ', html);
    }
  }
  function advance(n) {
    html = html.substring(n);
  }
  function parseStartTag() {
    let start = html.match(startTagOpen);
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
      };
      advance(start[0].length);
      //   console.log('start: ', start);
      //   console.log('html: ', html);
      let end, attr;
      while (
        !(end = html.match(startTagClose)) &&
        (attr = html.match(attribute))
      ) {
        advance(attr[0].length);
        // console.log('attr: ', attr);

        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5],
        });
      }
      if (end) {
        // 去掉 开始标签的 >
        advance(end[0].length);
      }
      return match;
    }
    // console.log('html: ', html);
  }
  return  root;
}
