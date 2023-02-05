// import express from 'express';

import { createStore } from 'vuex'


const types = {
  SET_IS_AUTNENTIATED: 'SET_IS_AUTNENTIATED', // 是否认证通过
  SET_USER: 'SET_USER', // 用户信息
  SET_CURRENR_PAGE:'SET_CURRENR_PAGE'
}

const state = { // 需要维护的状态
  isAutnenticated: false,  // 是否认证
  
  user: {},   // 存储用户信息
  current_page:true
}

const getters = {
  isAutnenticated: state => state.isAutnenticated,
  user: state => state.user,
  current_page:state => state.current_page
}

const mutations = {
  [types.SET_IS_AUTNENTIATED](state, isAutnenticated) {
    if (isAutnenticated)
      state.isAutnenticated = isAutnenticated
    else
      state.isAutnenticated = false
  },
  [types.SET_USER](state, user) {
    if (user)
      state.user = user
    else
      state.user = {}
  },
  [types.SET_CURRENR_PAGE](state, user) {
    if (current_page)
      state.current_page = current_page
    else
      state.current_page = true
  }
}

const actions = {
  setIsAutnenticated: ({ commit }, isAutnenticated) => {
    console.log("here");
    commit(types.SET_IS_AUTNENTIATED, isAutnenticated)
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  setCurrentPage: ({ commit }, user) => {
    commit(types.SET_CURRENR_PAGE, current_page)
  },
  clearCurrentState: ({ commit }) => {
    commit(types.SET_IS_AUTNENTIATED, false)
    commit(types.SET_USER, null)
    commit(types.SET_CURRENR_PAGE, null)
  }
}




export default createStore({
  state,
  getters,
  mutations,
  actions
});
