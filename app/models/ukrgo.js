const htmlparser = require("htmlparser2");
const moment = require("moment");
const DOM = require("./domData");


const domain = 'http://kiev.ukrgo.com/';

const query = (params) => {
  let query = [];
  for(let key in params){
    query.push(`${key}=${params[key]}`);
  }
  return domain + 'search.php?' + query.join('&');
}


const getPosts = (el) => {
  return DOM(el).findAll({
    tag: "div",
    attrs: {
      style: "margin: 0px 0; border-bottom: 1px solid #E9E9E9; padding: 8px 0;"
    }
  });
}


const getPostItem = (el) => {
  const post = {};
  let dateEl = DOM(el.children).findOne({ tag: "span", attrs: { style: "font-size: 9px;"} });
  let dateStr = dateEl ? DOM(dateEl).text().trim().replace("\n", ' ') : '';
  post.date = dateStr ? moment(dateStr, 'DD-MM-YYYY hh:mm').format() : '';

  let titleEl = DOM(el.children).findOne({ tag: "a", attrs: { class: "link"} });
  post.url = titleEl ? titleEl.attribs.href : '';
  post.title = titleEl ? DOM(titleEl).text().trim() : '';

  let imgEl = DOM(el.children).findOne({ tag: "img" });
  post.img = imgEl ? domain + imgEl.attribs.src : '';

  return post;
}

const getPost = (dom) => {
  const post = {};
  let imagesEl = DOM(dom).findAll({ tag: "img", attrs: { class: "image_galary"} });
  post.images = imagesEl.map((img) => {
    return img ? domain + img.attribs.src : '';
  });

  let showPhoneDiv = DOM(dom).findOne({ attrs: { id: "post-phones-show-div"} });

  if(showPhoneDiv) {
    const showPhonesWithDigits = (i, s) => {i, s};
    let showPhoneBtn = DOM(showPhoneDiv.children).findOne({ tag: 'input' });
    post.phoneParams = eval('(function(){return ' + showPhoneBtn.attribs.onclick + '})()');
  }

  console.log(post)
  return post;
}


const parseHtml = (html) => {
  return new Promise( (resolve, reject) => {
    const handler = new htmlparser.DomHandler( (error, dom) => {
      if (error){
        reject(error)
      }else{
        resolve(dom)
      }
    });

    const parser = new htmlparser.Parser(handler);
    parser.write(html);
    parser.end();
  });
}

const parse = (html) => {
  return parseHtml(html).then(dom => getPosts(dom).map(getPostItem));
}

const parsePost = (html) => {
  return parseHtml(html).then(dom => getPost(dom));
}

module.exports = { query, parse, parsePost };
