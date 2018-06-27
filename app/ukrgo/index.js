"use strict";

const axios = require("axios");
const config = require('./config');
const parser = require('./parser');
const FormData = require('form-data');


const timeoutRequest = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios.get(url).then(resolve, reject);
        }, Math.random() * 2000);
    })
}

const addPhone = (post) => {
    if(!post.salt) return post;
    let queryUrl = config.domain + 'moduls/showphonesnumbers.php';
    let form = new FormData();
    form.append('i', post.id);
    form.append('s', post.salt);

    return axios.post(config.domain + 'moduls/showphonesnumbers.php', form, { headers: form.getHeaders() })
        .then((res) => {
            console.log(res);
            if(res.data){
                post.phones = res.data.match(/([0-9])+/g);
            }
            return post;
        })
}

const find = (params) => {
    let query = [];
    for (let key in params) {
        query.push(`${key}=${params[key]}`);
    }
    const queryUrl = config.domain + 'search.php?' + query.join('&');

    console.log('find: ' + queryUrl);

    return axios.get(queryUrl).then(res => {
        return parser.parseHtml(res.data).then(dom => {
            return parser.getRows(dom).map(parser.getPostRow) 
        });
    })

}

const getOne = (url) => {
    console.log('get one: '+url)
    return timeoutRequest(url)
        .then( res => parser.parseHtml(res.data) )
        .then( dom => parser.getPostPage(dom) )
        .then( addPhone );
}

module.exports = {
    find,
    getOne
};