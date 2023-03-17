import {request} from "./request.js";
import lodash from 'lodash';
import axios from "axios";

// get请求
export const get= (url, data) =>{
	return request({
		url:url,
		params:lodash.pickBy(data, item => item),
		method:'get'
	})
};

// post请求
export const post= (url, data) =>{
	return request({
		url:url,
		data:lodash.pickBy(data, item => item),
		method:'post'
	})
};

// put请求
export const put= (url, data) =>{
	return request({
		url:url,
		data:lodash.pickBy(data, item => item),
		method:'put'
	})
};

