import { defaultTagRE } from './parser-html';

function genProps(attrs) {
  let str = '';
  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    if (attr.name == 'style') {
      let obj = {};
      attr.value.split(';').forEach((element) => {
        let [key, value] = element.split(':');
        obj[key] = value;
      });
      attr.value = obj;
    }

    str += `${attr.name}:${JSON.stringify(attr.value)},`; // str = id:'app',style=:{color:'red'}
  }
  return `{${str.slice(0, -1)}}`; // 最后多一个，
}

function getChildren(el) {
  let children = el.children;
  if (children.length) {
    return `${children.map((c) => gen(c)).join(',')}`;
  } else {
    return false;
  }
}

function gen(node) {
  if (node.type == 1) {
    return generate(node);
  } else {
    let text = node.text; // a {{name}}
    //"a" + _s(name)
    let tokens = [];
    let match, index;
    let lastIndex = (defaultTagRE.lastIndex = 0);

    while ((match = defaultTagRE.exec(text))) {
      index = match.index;
      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)));
      }
      tokens.push(`_s(${match[1].trim()})`);
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastIndex)));
    }
    return `_v(${tokens.join('+')})`;
  }
}

export function generate(el) {
  const children = getChildren(el);
  let code = `_c("${el.tag}",${
    el.attrs.length ? genProps(el.attrs) : undefined
  }${children ? `,${children}` : ''})`;
  return code;
}
