import Vue from 'vue';

const checkout = (formData) => {
  return Vue.http.post(`/api/liqpay`, formData);
}


export const Api = {
  checkout
};
