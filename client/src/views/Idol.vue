<template>
  <div class="container">
    <div class="row">
      <idol-form
        :is-submiting="submiting"
        :idol="idol"
        :edit="isEdit"
        @cancel-edit="cancelEdit"
        @send-data="sendData"
      />
      <idol-table
        :idols="idols"
        :busy="busy"
        @load-more="loadMore"
        @edit="edit"
        @delete="remove"
      />
    </div>
  </div>
</template>
<script>
import IdolForm from '@/components/IdolForm.vue'
import Table from '@/components/IdolTable.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'


class Idol {
  constructor (
    _id,
    name,
    hangul,
    nativeName,
    fullName,
    fandom,
    profession = [],
    gender = 'F',
    birthday = null,
    debut = null,
    active = true,
    avatar
  ) {
    this._id = _id
    this.name = name
    this.hangul = hangul
    this.nativeName = nativeName
    this.fullName = fullName
    this.fandom = fandom
    this.profession = profession
    this.gender = gender
    this.birthday = birthday
    this.debut = debut
    this.active = active
    this.avatar = avatar
  }
}

export default {
  components: {
    'idol-form': IdolForm,
    'idol-table': Table
  },
  emits: ['set-idol'],
  data () {
    return {
      idols: [],
      limit: 10,
      page: 0,
      busy: false,
      isEdit: false,
      idol: new Idol(),
      submiting: false
    }
  },
  mounted () {},
  methods: {
    edit (idol) {
      this.isEdit = true
      console.log(idol.debut)
      idol.birthday = new Date(idol.birthday).toISOString().slice(0, 10)
      idol.debut =
        idol.debut != null
          ? new Date(idol.debut).toISOString().slice(0, 10)
          : null
      idol.profession = Array.from(idol.profession)
      delete idol.group
      delete idol.__v

      this.idol = idol
    },
    cancelEdit () {
      this.isEdit = false
      this.idol = new Idol()
    },
    remove (idol) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, delete ${idol.name} it!`
      }).then(result => {
        if (result.isConfirmed) {
          axios
            .delete(
              `https://evening-savannah-98320.herokuapp.com/api/idol?id=${idol._id}`,
              {
                headers:{Authorization:`Bearer ${this.getToken}`}
              }
            )
            .then(response => {
              if (response.status === 200) {
                this.idol = new Idol()
                this.idols = this.idols.filter(x => x._id !== idol._id)
                console.log(response.data)

                Swal.fire('Deleted!', 'Your idol has been deleted.', 'success')
              }
              this.submiting = false
            })
            .catch(error => {
              this.submiting = false
              Swal.fire('error!', error.message, 'error')
            })
        }
      })
    },
    loadMore () {
      this.busy = true
      axios
        .get(
          `https://evening-savannah-98320.herokuapp.com/api/idol?per_page=${this.limit}&page=${this.page}`
        )
        .then(response => {
          if (response.data.length > 0) {
            this.idols = this.idols.concat(response.data)
            this.page = this.page + 1
          }
          this.busy = false
        })
        .catch(error => {
          console.log('error')
        })
    },
    sendData (form) {
      this.submiting = true

      if (this.isEdit) {
        axios
          .patch(
            'https://evening-savannah-98320.herokuapp.com/api/idol',
            this.idol,
            {
                headers:{Authorization:`Bearer ${this.getToken}`}
            }
          )
          .then(response => {
            if (response.status === 200) {
              this.idol = new Idol()
              this.isEdit = false
              let idol = this.idols.find(x => x._id === response.data._id)
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
            Swal.fire('Error!', error.message, 'error')
          })
      } else {
        delete this.idol._id
        axios
          .post(
            'https://evening-savannah-98320.herokuapp.com/api/idol',
            this.idol,
            {
                headers:{Authorization:`Bearer ${this.getToken}`}
            }
          )
          .then(response => {
            if (response.status === 200) {
              this.idol = new Idol()
              this.idols.push(response.data)
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Idol created',
                showConfirmButton: false,
                timer: 1500
              })
            }
            this.submiting = false
          })
          .catch(error => {
            this.submiting = false
            Swal.fire('Error!', error.message, 'error')
          })
      }
    }
  },
  computed:{
    ...mapGetters(['getToken']),
  }
}
</script>
