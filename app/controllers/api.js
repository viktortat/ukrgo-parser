"use strict";

const Ukrgo = require("./../ukrgo");


let params = {
  search: 'iphone',
  id_region: 56,
  id_section: 21,
  id_subsection: 150
}


const timeout = (post) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios.get(url).then(resolve, reject);
    }, Math.random()*2000 );
  })
}


exports.search = async (ctx) => {
  const data = {};
  return Ukrgo.find(params)
    .then((posts) => {
      posts = posts.slice(6, 8);
      return Promise.all(posts.map((post) => {
        data[post.id] = post;
        return Ukrgo.getOne(post.url);
      }));
    })
    .then( posts => {
      for(let post of posts){
        if(data[post.id]) data[post.id] = Object.assign(data[post.id], post);
      }
      return data;
    })
    .then(ctx.res.ok, ctx.res.error);
}
