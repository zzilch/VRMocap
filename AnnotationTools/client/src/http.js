import axios from 'axios';
import { ElLoading,ElMessage  } from 'element-plus'
import router from './router'

let loading;
function startLoading()
{
    loading=ElLoading.service({
        lock:true,
        text:"加载中...",
        background:'rgba(0,0,0,0.7)'
    });
}


function endLoading()
{
    loading.close();
}

// 请求拦截
axios.interceptors.request.use(config=>{
    startLoading();
    if(localStorage.eleToken)
    {
        config.headers.Authorization=localStorage.eleToken;
    }
    return config;
},
error=>{
    return Promise.reject(error);
}
);
// 响应拦截
axios.interceptors.response.use(response=>{
    endLoading();
    return response;
},
error=>{
    endLoading();
    ElMessage.error(error.response.data);
    const {status}=error.response;
    if(status==401)
    {
        EIMessage.error('token 失效，请重新登录');
        localStorage.removeItem('eleToken');
        router.push('/login');
    }
    return Promise.reject(error);
})








export default axios;