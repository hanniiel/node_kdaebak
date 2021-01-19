<template>
  <div class="container">
    <div class="row ">
      <group-form
        :group="group"
        :edit="isEdit"
        :is-submiting="submiting"
        @cancel-edit="cancelEdit"
        @send-data="sendData"
        @on-upload="onChange"
      />
      <group-table
        :groups="groups"
        :busy="busy"
        @delete="remove"
        @edit="edit"
        @load-more="loadMore"
      />
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'

//
import GroupForm from '../components/group/GroupForm.vue'
import GroupTable from '../components/group/GroupTable.vue'
import {mapGetters} from 'vuex'
//
class Group {
  constructor (
    _id,
    name,
    fandom,
    hangul,
    avatar,
    logo,
    debut,
    state = 'A',
    gender = 'F',
    members = [],
    exmembers = [],
    subgroups = []
  ) {
    this._id = _id
    this.name = name
    this.fandom = fandom
    this.hangul = hangul
    this.avatar = avatar
    this.logo = logo
    this.debut = debut
    this.state = state
    this.gender = gender
    this.members = members
    this.exmembers = exmembers
    this.subgroups = subgroups
  }
}

export default {
  components: {
    GroupForm,
    GroupTable
  },
  data () {
    return {
      limit: 10,
      page: 0,
      groups: [],
      busy: false,
      isEdit: false,
      submiting: false,
      group: new Group()
    }
  },
  methods: {
    cancelEdit () {
      this.isEdit = false
      this.group = new Group()
    },
    edit (group) {
      this.isEdit = true
      group.debut = new Date(group.debut).toISOString().slice(0, 10)

      // delete idol.members
      // delete idol.__v

      this.group = group
    },
    remove (group) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result => {
        if (result.isConfirmed) {
          axios
            .delete(
              `https://evening-savannah-98320.herokuapp.com/api/group?id=${group._id}`,{
              headers:{Authorization:`Bearer ${this.getToken}`}
            }
            )
            .then(response => {
              if (response.status === 200) {
                this.group = new Group()
                this.groups = this.groups.filter(x => x._id !== group._id)
                console.log(response.data)
                Swal.fire(
                  'Deleted!',
                  'Your group has been deleted.',
                  'success'
                )
              }
              this.submiting = false
            })
            .catch(error => {
              this.submiting = false
            })
        }
      })
    },
    loadMore () {
      console.log(this.page)
      this.busy = true
      axios
        .get(
          `https://evening-savannah-98320.herokuapp.com/api/group?per_page=${this.limit}&page=${this.page}`
        )
        .then(response => {
          if (response.data.length > 0) {
            this.groups = this.groups.concat(response.data)
            this.page = this.page + 1
          }
          this.busy = false
        })
        .catch(error => {
          console.log('error')
        })
    },
    sendData () {
      this.submiting = true

      if (this.isEdit) {
        axios
          .patch(
            'https://evening-savannah-98320.herokuapp.com/api/group',
            this.group,{
              headers:{Authorization:`Bearer ${this.getToken}`}
            }
          )
          .then(response => {
            if (response.status === 200) {
              this.group = new Group()
              this.isEdit = false
              let idol = this.groups.find(x => x._id === response.data._id)
              idol = response.data
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'idol edited',
                showConfirmButton: false,
                timer: 1500
              })
            }
            this.submiting = false
          })
          .catch(error => {
            this.submiting = false
          })
      } else {
        delete this.group._id
        axios
          .post(
            'https://evening-savannah-98320.herokuapp.com/api/group',
            this.group,{
              headers:{Authorization:`Bearer ${this.getToken}`}
            }
          )
          .then(response => {
            if (response.status === 200) {
              this.group = new Group()
              this.groups.push(response.data)
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Group created',
                showConfirmButton: false,
                timer: 1500
              })
            }
            this.submiting = false
          })
          .catch(error => {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Group not created',
                showConfirmButton: false,
                timer: 1500
              })
            this.submiting = false
          })
      }
    },
    onChange (e, isAvatar) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      console.log('file registered')

      const formData = new FormData()
      formData.append('avatar', files[0])

      axios
        .post('/upload', formData)
        .then(response => {
          if (response.status == 200) {
            console.log(response.data)
            if (isAvatar) this.group.avatar = response.data.link
            else this.group.logo = response.data.link

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Imaged loaded',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
        .catch(error => {
          if (isAvatar) this.group.avatar = null
          else this.group.logo = null

          console.log(error)
        })
    }
  },
  computed:{
    ...mapGetters(['getToken']),
  }
}
</script>
