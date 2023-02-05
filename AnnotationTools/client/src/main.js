import Vue from "vue";		
import Vuex from 'vuex'
import { createApp } from 'vue'
import App from './App.vue'
import axios from './http'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'



// Vue.prototype.axios = axios;

const app=createApp(App);

app.config.globalProperties.axios = axios;  // 添加全局属性

app.use(ElementPlus).use(store).use(router).mount('#app')