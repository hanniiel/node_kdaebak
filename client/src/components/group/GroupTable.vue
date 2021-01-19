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
          <td>
            <span
              class="badge"
              :class="getStyle(group.state)"
            >{{ getStatus(group.state) }}</span>
          </td>
          <td>
            <span
              class="btn btn-success"
              style="color:white"
            ><i class="fa fa-group" /></span>
            <span
              class="btn btn-warning"
              style="color:white"
              @click="$emit('edit',group)"
            ><i class="fa fa-pencil" /></span>
            <span
              class="btn btn-danger"
              @click="$emit('delete',group)"
            ><i class="fa fa-trash" /></span>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      id="obs"
      class="col"
    />
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
  props: {
    busy: Boolean,
    groups: Array
  },
  // emits:{'event-ex':function(paramter){/*validation */}},
  emits: ['load-more', 'edit', 'delete', 'group'],
  data () {
    return {
      observer: null
    }
  },
  mounted () {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        if (!this.busy) this.$emit('load-more')
      }
    }, { threshold: [1] })
    this.observer.observe(document.getElementById('obs'))
  },
  methods: {
    getStatus (status) {
      switch (status) {
        case 'A':
          return 'Active'
        case 'H':
          return 'Hiatus'
        case 'D':
          return 'Disbanded'
      }
    },
    getStyle (status) {
      switch (status) {
        case 'A':
          return 'badge-success'
        case 'H':
          return 'badge-warning'
        case 'D':
          return 'badge-danger'
      }
    }
  }
}

</script>
