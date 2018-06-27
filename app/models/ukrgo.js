const htmlparser = require("htmlparser2");
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


const getPost = (el) => {
  const post = {};
  let dateEl = DOM(el.children).findOne({ tag: "span", attrs: { style: "font-size: 9px;"} });
  post.date = dateEl ? DOM(dateEl).text() : '';

  let titleEl = DOM(el.children).findOne({ tag: "a", attrs: { class: "link"} });
  post.href = titleEl ? titleEl.attribs.href : '';
  post.title = titleEl ? DOM(titleEl).text().trim() : '';

  let imgEl = DOM(el.children).findOne({ tag: "img" });
  post.img = imgEl ? domain + imgEl.attribs.src : '';

  return post;
}

const parse = (html) => {
  return new Promise( (resolve, reject) => {

    const handler = new htmlparser.DomHandler( (error, dom) => {
      if (error){
        reject(error)
      }else{
        let postsDom = getPosts(dom);
        resolve(postsDom.map(getPost))
      }
    });

    const parser = new htmlparser.Parser(handler);
    parser.write(html);
    parser.end();

  })
}

module.exports = { query, parse };
