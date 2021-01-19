<template>
  <div>
    <nav v-show="isLoggedIn" class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a
        class="navbar-brand"
        href="#"
      >KD-DB</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div
        id="navbarSupportedContent"
        class="collapse navbar-collapse"
      >
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/"
            >
              <i class="fas fa-user" /> Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/idol"
            >
              <i class="fas fa-user" /> idol
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/group"
            >
              <i class="fas fa-users" /> Group
            </router-link>
          </li>
          <li v-show="isLoggedIn" class="nav-item">
            <a
              class="nav-link" @click="logOut">
              <i class="fas fa-sign-out-alt" /> Log out
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>
<script>
import {mapActions, mapGetters,mapMutations} from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'

export default{
  methods:{
    ...mapActions(['setUser','logOut']),
    ...mapMutations(['unsetUser'])
  },
  computed:{
    ...mapGetters(['isLoggedIn'])
  },
  mounted(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user==null){
        console.log('user not logged in')
        this.unsetUser()
      }else{
       this.setUser(user)
      }
    });
  }
}
</script>
