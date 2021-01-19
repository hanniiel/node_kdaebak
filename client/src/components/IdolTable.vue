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
            Active
          </th>
          <th>Group(s)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="idol in idols"
          :key="idol._id"
        >
          <th scope="row">
            {{ idol.hangul }}
          </th>
          <td>{{ idol.name }}</td>
          <td>
            <img
              :src="idol.avatar"
              class="img-thumbnail"
            >
          </td>
          <td>
            <span
              class="badge"
              :class="idol.active ?'badge-success':'badge-danger'"
            >{{ idol.active ? 'active':'inactive' }}</span>
          </td>
          <td>
            <span
              v-show="idol.group"
              class="badge badge-success"
            >{{ idol.group?.name }}</span>
          </td>
          <td>
            <span
              class="btn btn-success"
              style="color:white"
            ><i class="fa fa-group" /></span>
            <span
              class="btn btn-warning"
              style="color:white"
              @click="$emit('edit',idol)"
            ><i class="fa fa-pencil" /></span>
            <span
              class="btn btn-danger"
              @click="$emit('delete',idol)"
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
    idols: Array
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
  }
}

</script>
