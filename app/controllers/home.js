"use strict";

const axios = require("axios");
const UkrGo = require("./../models/ukrgo");


let params = {
  search: 'iphone',
  id_region: 56,
  id_section: 21,
  id_subsection: 150
}

exports.test = async (ctx) => {
  const data = {};
  return axios.get(UkrGo.query(params))
    .then(res => UkrGo.parse(res.data))
    .then(posts => ctx.res.ok(posts));
}
