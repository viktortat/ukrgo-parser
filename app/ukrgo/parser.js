const htmlparser = require("htmlparser2");
const moment = require("moment");
const config = require('./config');
const DOM = require("./../models/domData");

const parseHtml = (html) => {
  return new Promise((resolve, reject) => {
    const handler = new htmlparser.DomHandler((error, dom) => {
      if (error) {
        reject(error)
      } else {
        resolve(dom)
      }
    });

    const parser = new htmlparser.Parser(handler);
    parser.write(html);
    parser.end();
  });
}

const getRows = (dom) => {
  return DOM(dom).findAll({
    tag: "div",
    attrs: {
      style: "margin: 0px 0; border-bottom: 1px solid #E9E9E9; padding: 8px 0;"
    }
  });
}

const getPostRow = (row) => {
  const post = {};
  let dateEl = DOM(row.children).findOne({ tag: "span", attrs: { style: "font-size: 9px;"} });
  
  let dateStr = dateEl ? DOM(dateEl).text().trim().replace("\n", ' ') : '';
  post.date = dateStr ? moment(dateStr, 'DD-MM-YYYY hh:mm').format() : '';

  let titleEl = DOM(row.children).findOne({ tag: "a", attrs: { class: "link"} });
  post.url = titleEl ? titleEl.attribs.href : '';
  post.title = titleEl ? DOM(titleEl).text().trim() : '';
  post.id = post.url.match(/post_([0-9]+?)_/)[1];

  let imgEl = DOM(row.children).findOne({ tag: "img" });
  post.img = imgEl ? config.domain + imgEl.attribs.src : '';

  return post;
}

const getPostPage = (dom) => {
  const post = {};

  const postEl = DOM(dom).findOne({"tag": "table", attrs: { style: "width: 90%; margin-top: 19px; margin-left: auto; margin-right: auto; padding-top: 10px; text-align: left;" }});
  let imagesEl = DOM(postEl.children).findAll({ tag: "img", attrs: { class: "image_galary"} });
  post.images = imagesEl.map((img) => {
    return img ? config.domain + img.attribs.src : '';
  });

  let showPhoneDiv = DOM(postEl.children).findOne({ attrs: { id: "post-phones-show-div"} });
  

  if(showPhoneDiv) {
    const showPhonesWithDigits = (id, salt) => { return {id, salt} };
    let showPhoneBtn = DOM(showPhoneDiv.children).findOne({ tag: 'input' });
    let params = eval('(function(){return ' + showPhoneBtn.attribs.onclick + '})()');
    post.id = params.id;
    post.salt = params.salt;
  }

  return post;
}

const getPhones = (dom) => {

}

module.exports = {parseHtml, getRows, getPostRow, getPostPage, getPhones};