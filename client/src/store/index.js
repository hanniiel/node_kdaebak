import { createStore } from 'vuex'
import firebase from 'firebase'

export default createStore({
  state: {
    return:{
      isLoggedIn:false,
      jwtToken:null,
      user:null
    }
  },
  //methods to update states
  mutations: {
    changeAuth(state,{user,token}){
      state.isLoggedIn =true
      state.jwtToken = token
      state.user = user
    },
    unsetUser(state){
      state.isLoggedIn =false
      state.jwtToken = null
      state.user = null
    }
  },
  //
  getters:{
    isLoggedIn(state){
      return state.isLoggedIn
    },
    getUser(state){
      return state.user
    },
    getToken(state){
      return state.jwtToken.token
    }
  },
  actions: {
    async logOut(){
      await firebase.auth().signOut();
    },
    async setUser(context,user){
      try{
        var jwt = await user.getIdTokenResult()
        context.commit('changeAuth',{user,token:jwt})

      }catch(e){
        console.log('error'+e)
      }
    },
    async loginGoogle(context){
      var provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('profile')
      provider.addScope('email')
      
      try {
        var result = await firebase.auth().signInWithPopup(provider)
        var credential = result.credential
        var token = credential.accessToken
        var jwt = await result.user.getIdTokenResult()

        //context.commit('changeAuth',jwt.token)
      } catch (e) {
        console.log('error' + e)
      }
    },
    async loginFB(context){
      var provider = new firebase.auth.FacebookAuthProvider()
      // provider.addScope('user_birthday');
      try {
        var result = await firebase.auth().signInWithPopup(provider)
        var credential = result.credential
        var token = credential.accessToken
        var jwt = await result.user.getIdTokenResult()

        //console.log(result.user.displayName + ' ' + result.user.email + ' ' + jwt.token)
        //context.commit('changeAuth',jwt.token)

      } catch (e) {
        console.log('error' + e)
      }
    }
  },
  modules: {
  }
})
