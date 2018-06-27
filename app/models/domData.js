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

class DomData {
  constructor(data) {
    this.data = data;
  }

  findAll(selector) {
    return domutils.findAll(find(selector), this.data, true);
  }

  findOne(selector) {
    return domutils.findOne(find(selector), this.data);
  }

  text() {
    return domutils.getText(this.data);
  }

  html() {
    return domutils.getInnerHTML(this.data);
  }
}

module.exports = DOM;
