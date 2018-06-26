"use strict";

const htmlparser = require("htmlparser2");
const axios = require("axios");
const domutils = require("domutils");


function test(el) {
  return el.type == 'tag' && el.name == 'body';
}

exports.test = async (ctx) => {
  const data = {};
  return axios.get('http://kiev.ukrgo.com/search.php?search=iphone&id_region=56&id_section=21&id_subsection=150&id_fr_14=&id_to_14=&id_dr_127')
    .then(res => {
      const handler = new htmlparser.DomHandler( (error, dom) => {
        if (error){
          ctx.res.error(error);
        }else{
          // let html = getHtml(dom);
          // let table = getByAttribute(html, 'style', 'margin: 0px 0; border-bottom: 1px solid #E9E9E9; padding: 8px 0;');
          console.log(domutils.find(test, dom, true))
          ctx.res.ok(data);
        }
      });
      const parser = new htmlparser.Parser(handler);
      parser.write(res.data);
      parser.end();
    })
}
