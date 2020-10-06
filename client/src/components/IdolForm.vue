<template>
  <form
    id="form"
    class="col-lg-6 form-group was-validated"
    action="/api/idol"
    method="post"
    enctype="multipart/form-data"
    @submit.prevent="$emit('send-data', this.$el)"
  >
    <div>
      <h1>Crear idol</h1>
    </div>
    <div class="form-group">
      <input v-if="edit" name="_id" v-model="idol._id" type="hidden" />
      <label for="name">(Artistic)Romanized Name</label>
      <input
        v-model="idol.name"
        class="form-control"
        name="name"
        placeholder="Name"
        required
      />
    </div>
    <div class="form-group">
      <label for="hangul">(Artistic)Hangul Name</label>
      <input
        v-model="idol.hangul"
        class="form-control"
        name="hangul"
        placeholder="Korean Name"
        required
      />
    </div>
    <div class="form-group">
      <label for="nativeName">(Native language) Name</label>
      <input
        v-model="idol.nativeName"
        class="form-control"
        name="nativeName"
        placeholder="Native Name(hangul,japanese etc)"
        required
      />
    </div>
    <div class="form-group">
      <label for="fullName">Full Name (Romanized)</label>
      <input
        v-model="idol.fullName"
        class="form-control"
        name="fullName"
        placeholder="Full  Name"
        required
      />
    </div>
    <div class="form-group">
      <label for="fandom">Fandom Name</label>
      <input
        v-model="idol.fandom"
        class="form-control"
        name="fandom"
        placeholder="ReVeluv"
      />
    </div>
    <div class="form-group">
      <label for="profession:">Profession (multiple allowed)</label>
      <select
        v-model="idol.profession"
        multiple
        class="form-control"
        name="profession"
        required
      >
        <option value="I">
          Idol
        </option>
        <option value="A">
          Actor
        </option>
        <option value="S">
          Singer
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="gender:">Gender:</label>
      <select v-model="idol.gender" class="form-control" name="gender" required>
        <option value="M">
          Male
        </option>
        <option value="F">
          Female
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="birthday">Birthday</label>
      <input
        v-model="idol.birthday"
        class="form-control"
        type="date"
        name="birthday"
        placeholder="bd"
        required
      />
    </div>
    <div class="form-group">
      <label for="debut">Debut</label>
      <input
        v-model="idol.debut"
        class="form-control"
        type="date"
        name="debut"
        placeholder="debut"
      />
    </div>
    <div class="form-check">
      <input
        v-model="idol.active"
        class="form-check-input"
        type="checkbox"
        name="active"
      />
      <label class="form-check-label" for="exampleCheck1">
        isCurrentlyActive</label
      >
    </div>
    <div class="custom-file">
      <input
        ref="fileUpload"
        class="custom-file-input"
        :required="!edit"
        type="file"
        name="avatar"
        @change="onChange"
      />
      <label class="custom-file-label" for="validatedCustomFile"
        >{{avatarName}}</label
      >
      <div  :class="idol.avatar!=null? 'valid-feedback':'invalid-feedback'">
        <img v-if="idol.avatar!=null" :src="idol.avatar" class="img-thumbnail"  />
      </div>
      <br />
    </div>

    <div class="form-group">
      <button
        v-if="!isSubmiting"
        class="btn btn-primary btn-lg"
        style="margin: 1%;"
      >
        {{ edit ? "Editar" : "Crear" }}
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
    <div v-if="isSubmiting" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </form>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  props: ["edit", "idol", "isSubmiting"],
  emits: ["cancel-edit", "send-data"],
  watch: {
    isSubmiting(value) {
      console.log(value);
      if (!value) this.$refs.fileUpload.value = null;
    }
  },
  computed:{
    avatarName(){
       return this.idol.avatar !=null ? this.idol.avatar :'Choose avatar..';
    }
  },
  methods: {
    onChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      console.log("file registered");
      const formData = new FormData();
      formData.append("avatar", files[0]);

      axios
        .post("https://evening-savannah-98320.herokuapp.com/upload", formData)
        .then(response => {
          if (response.status == 200) {
            console.log(response.data);
            this.idol.avatar = response.data.link;
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Imaged loaded",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
