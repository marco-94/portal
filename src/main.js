// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'
import Tabs from "./components/left-tab/tab";
import headers from "./components/top-headers/headers";
import pages from "./components/bottom-pages/pages";

axios.defaults.baseURL = 'http://127.0.0.1:8000/';
Vue.prototype.$axios = axios;
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(Tabs);
Vue.use(headers);
Vue.use(pages);
Vue.component('pages', pages);

Vue.config.productionTip = false;

const forbidList = ["/user/log_in"];
// 请求拦截器
axios.interceptors.request.use(
 config => {
   // const token = sessionStorage.getItem('token');
   //     token && (config.headers.Authorization = token);
   if (!forbidList.includes(config.url)) {  // 如果请求中有query形参数的话，请使用正则，或者字符串截取操作
       // 加token
       const token = sessionStorage.getItem('token');
       if (token) {
           token && (config.headers.Authorization = token);
       }
   }
   return config
 },
 error => {
 return Promise.error(error)
 });

axios.defaults.timeout = 60000;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 响应拦截器
axios.interceptors.response.use(response => {
 if (response.status === 200) {
 return Promise.resolve(response)
 } else {
 return Promise.reject(response)
 }
}, error => {
 if (error.response.status) {
 // 对不同返回码对相应处理
 return Promise.reject(error.response)
 }
});

// get 请求
export function httpGet({
 url,
 params = {}
}) {
 return new Promise((resolve, reject) => {
 axios.get(url, {
  params
 }).then((res) => {
  resolve(res.data)
 }).catch(err => {
  reject(err)
 })
 })
}
//delete 请求
export function httpDelete({
    url,
    data ={}
}) {
    return new Promise((resolve)=>{
        axios({
            url,
            method:"delete",
            data
        }).then((res)=>{
            resolve(res.data)
        })
    })
}

// post请求
export function httpPost({
 url,
 data = {},
 params = {}
}) {
 return new Promise((resolve) => {
 axios({
  url,
  method: 'post',
  transformRequest: [function (data) {
  let ret = '';
  for (let it in data) {
   ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
  }],
  // 发送的数据
  data,
  // url参数
  params

 }).then(res => {
  resolve(res.data)
 })
 })
}

//put请求
export function httpPut({
    url,
    data = {},
    params = {}
   }) {
    return new Promise((resolve) => {
    axios({
     url,
     method: 'put',
     transformRequest: [function (data) {
     let ret = ''
     for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
     }
     return ret
     }],
     // 发送的数据
     data,
     // url参数
     params

    }).then(res => {
     resolve(res.data)
    })
    })
   }



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
