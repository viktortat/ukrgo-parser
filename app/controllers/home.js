"use strict";

const axios = require("axios");
const UkrGo = require("./../models/ukrgo");


let params = {
  search: 'iphone',
  id_region: 56,
  id_section: 21,
  id_subsection: 150
}


const timeoutRequest = (url, index) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios.get(url)
        .then(resolve, reject)
        .then(() => {
          console.log(index);
        })
    }, Math.random()*2000 );
  })
}


exports.test = async (ctx) => {
  const data = {};
  return axios.get(UkrGo.query(params))
    .then(res => UkrGo.parse(res.data))
    .then(posts => {
      posts = posts.slice(1, 2);
      return Promise.all(posts.map((post, index) => timeoutRequest(post.url, index)))
    })
    .then( res => {
      return res.map((r) => UkrGo.parsePost(r.data))
    })
    .then( res => {
      console.log(res)
    })
    .then(ctx.res.ok, ctx.res.error);
}
