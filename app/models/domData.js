const domutils = require("domutils");

const find = (sel) => {
  return (el) => {
    if(el.type == 'tag'){
      let fild = false;
      let tag = sel.tag || 'div';
      fild = el.name == tag;
      for(let attr in sel.attrs){
        fild = fild && (el.attribs[attr] && el.attribs[attr] == sel.attrs[attr]);
      }
      return fild;
    }
    return false;
  }
}


const DOM = function (data) {
  return {
    findOne: (selector) => {
      return domutils.findOne(find(selector), data, true);
    },
    findAll: (selector) => {
      return domutils.findAll(find(selector), data, true);
    },
    text: () => {
      return domutils.getText(data);
    },
    html: () => {
      return domutils.getInnerHTML(data);
    }
  }
}

module.exports = DOM;
