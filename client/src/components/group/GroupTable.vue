<template>
  <div class="col-lg-6 table-wrapper-scroll-y my-custom-scrollbar">
    <table class="table table-sm table-striped table-dark ">
      <thead>
        <tr>
          <th scope="col">
            Hangul
          </th>
          <th scope="col">
            Name
          </th>
          <th scope="col">
            Avatar
          </th>
          <th>
            logo
          </th>
          <th>
            State
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="group in groups"
          :key="group._id"
        >
          <th scope="row">
            {{ group.hangul }}
          </th>
          <td>{{ group.name }}</td>
          <td>
            <img
              :src="group.avatar"
              class="img-thumbnail"
            >
          </td>
          <td>
            <img
              :src="group.logo"
              class="img-thumbnail"
            >
          </td>
          <td><span class="badge" :class="getStyle(group.state)" >{{getStatus(group.state)}}</span></td>
          <td>
            <span class="btn btn-success" style="color:white"><i class="fa fa-group"></i></span>
            <span @click="$emit('edit',group)" class="btn btn-warning" style="color:white"><i class="fa fa-pencil"></i></span>
            <span @click="$emit('delete',group)" class="btn btn-danger"><i class="fa fa-trash"></i></span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="col" id="obs"></div>
  </div>
</template>
<style>
    #obs{
      height: 5px;
    }
   
    .my-custom-scrollbar {
        position: relative;
        height: 500px;
        overflow: auto;
    }
    .table-wrapper-scroll-y {
        display: block;
    }
</style>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      observer:null,
    }
  },
  //emits:{'event-ex':function(paramter){/*validation */}},
  emits:['load-more','edit','delete','group'],
  props:{
    busy:Boolean,
    groups:Array
  },
  methods:{
      getStatus(status){
         switch(status){
             case 'A':
                return 'Active';
            case 'H':
                return 'Hiatus';
            case 'D':
                return 'Disbanded';
         }
      },
      getStyle(status){
         switch(status){
             case 'A':
                return 'badge-success';
            case 'H':
                return 'badge-warning';
            case 'D':
                return 'badge-danger';
         }
      }
  },
  mounted(){
     this.observer = new IntersectionObserver(([entry])=>{
      if(entry && entry.isIntersecting){
        if(!this.busy) this.$emit('load-more');
      }
    },{threshold:[1]});
    this.observer.observe(document.getElementById('obs'));
  }
}

</script>
