<template>
  <form
    id="form"
    class="col-lg-6 form-group"
    action="/api/idol"
    method="post"
    enctype="multipart/form-data"
    @submit.prevent="$emit('send-data')">
    <div>
      <h1>Create Group</h1>
    </div>
    <div class="form-group">
      <input v-if="edit" name="_id" v-model="group._id" type="hidden" />
      <label for="name">(Artistic)Romanized Name</label>
      <input
        v-model="group.name"
        class="form-control"
        name="name"
        placeholder="Name"
        required
      >
    </div>
    <div class="form-group">
      <label for="hangul">(Artistic)Hangul Name</label>
      <input
        v-model="group.hangul"
        class="form-control"
        name="hangul"
        placeholder="Korean Name"
        required
      >
    </div>

    <div class="form-group">
      <label for="gender:">Gender:</label>
      <select
        v-model="group.gender"
        class="form-control"
        name="gender"
        required
      >
        <option value="M">
          Male
        </option>
        <option value="X">
          Mixed
        </option>
        <option value="F">
          Female
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="debut">Debut</label>
      <input
        v-model="group.debut"
        class="form-control"
        type="date"
        name="debut"
        required
        placeholder="debut"
      >
    </div>
    <div class="form-group">
        <label
        class="form-check-label"
        for="exampleCheck1"
      > Status</label>
      <select
        v-model="group.state"
        class="form-control"
        name="gender"
        required
      >
        <option value="A">Active</option>
        <option value="H">Hiatus</option>
        <option value="D">Disbanded</option>
      </select>
      
    </div>
    <div class="custom-file">
      <input
        class="custom-file-input"
        ref="fileUpload"
        :required="!edit"
        type="file"
        name="avatar"
        @change="onChange"
      >
      <label
        class="custom-file-label"
        for="validatedCustomFile"
      >Choose avatar...</label>
      <div class="invalid-feedback">
        Example invalid custom file feedback
      </div>
      <br>
    </div>

    <div class="form-group">
      <button
        v-if="!isSubmiting"
        class="btn btn-primary btn-lg"
        style="margin: 1%;"
      >
        {{edit ? 'Editar':'Crear'}}
      </button>
      <button
        @click="$emit('cancel-edit')"
        v-if="edit"
        class="btn btn-primary btn-lg"
        style="margin: 1%;"
      >
        cancel edition
      </button>
    </div>
    <div
      v-if="isSubmiting"
      class="d-flex justify-content-center"
    >
      <div
        class="spinner-border"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </form>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  props:['edit','group','isSubmiting'],
  emits:['cancel-edit','send-data'],
  watch:{
      isSubmiting(value){
          console.log(value);
          if(!value) this.$refs.fileUpload.value = null;
      }
  },
  methods: {
    
    onChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) { return }
      console.log('file registered')
      const formData = new FormData();
      formData.append('avatar',files[0]);

      axios.post('https://evening-savannah-98320.herokuapp.com/upload',formData)
      .then(response=>{
        if(response.status==200){
          console.log(response.data)
          this.group.avatar = response.data.link
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Imaged loaded',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
      .catch(error=>{
          console.log(error);
      })
      
    }
  }
}
</script>
