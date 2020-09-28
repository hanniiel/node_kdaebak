<template>
  <div class="container">
    <div class="row">
      <idol-form :isSubmiting="submiting" :idol="idol" :edit="isEdit" @cancel-edit="cancelEdit" @send-data="sendData"/>
      <idol-table @load-more="loadMore" :idols='idols' :busy="busy" @edit="edit" @delete="remove" />
    </div>
    <div v-show="toast.show"
      class="col-md-6 offset-md-6 alert order-12" :class="toast.error ? 'alert-danger':'alert-success'"
      role="alert">
      {{toast.message}}
    </div>
  </div>
</template>
<script>
import IdolForm from '@/components/IdolForm.vue'
import Table from '@/components/IdolTable.vue'
import axios from 'axios'

class Alert{
 constructor(message,error=false,show=false){
   this.message=message
   this.error = error
   this.show = show
 }
}
class Idol {
  constructor (_id,name, hangul, nativeName, fullName, profession = [], gender='F', birthday=null, debut=null, active=true,avatar) {
    this._id =_id
    this.name = name
    this.hangul = hangul
    this.nativeName = nativeName
    this.fullName = fullName
    this.profession = profession
    this.gender = gender
    this.birthday = birthday
    this.debut = debut
    this.active = active
    this.avatar = avatar
  }
}

export default {
  data(){
    return {
      idols:[],
      limit: 10,
      page: 0,
      busy: false,
      isEdit:false,
      idol: new Idol(),
      submiting:false,
      toast: new Alert()
    }
  },
  emits:['set-idol'],
  components: {
    'idol-form': IdolForm,
    'idol-table': Table
  },
  methods:{
    edit(idol){
      this.isEdit = true;
      console.log(idol.debut)
      idol.birthday= new Date(idol.birthday).toISOString().slice(0,10)
      idol.debut= idol.debut!=null ? new Date(idol.debut).toISOString().slice(0,10):null;
      idol.profession = Array.from(idol.profession)
      delete idol.group
      delete idol.__v

      this.idol = idol;
    },
    cancelEdit(){
      this.isEdit = false;
      this.idol = new Idol()
    },
    remove(idol){
      axios.delete(`https://evening-savannah-98320.herokuapp.com/api/idol?id=${idol._id}`,
      ).then(response => {
        if(response.status === 200){
          this.idol = new Idol()
          this.idols = this.idols.filter(x=>x._id!==idol._id);
          console.log(response.data);
          this.toast = new Alert("idol removed",false,true);
          setTimeout(()=>{
            this.toast.show = false;
          },1000);
        }
        this.submiting = false
      }).catch(error => {
        this.submiting = false
      })
    },
    loadMore () {
      console.log(this.page);
      this.busy = true
      axios
        .get(`https://evening-savannah-98320.herokuapp.com/api/idol?per_page=${this.limit}&page=${this.page}`)
        .then(response => {
          if(response.data.length>0){
            this.idols = this.idols.concat(response.data)
            this.page =this.page+1;
          }
          this.busy = false
        }).catch(error=>{
          console.log('error')
        })
    },
    sendData (form) {
      this.submiting = true
      
     
      if(this.isEdit){
        axios.patch('https://evening-savannah-98320.herokuapp.com/api/idol',
        this.idol,
      ).then(response => {
        if(response.status === 200){
          this.idol = new Idol()
          this.isEdit = false
          let idol = this.idols.find(x=>x._id===response.data._id);
          idol = response.data;
          this.toast = new Alert("idol edited",false,true);
          setTimeout(()=>{
            this.toast.show = false;
          },1000);
        }
        this.submiting = false
      }).catch(error => {
        this.submiting = false
      })
        
      }
      else{
        delete this.idol._id;
        axios.post('https://evening-savannah-98320.herokuapp.com/api/idol',
        this.idol
      ).then(response => {
        if(response.status === 200){
          this.idol = new Idol()
          this.idols.push(response.data);
          this.toast = new Alert("idol added",false,true);
          setTimeout(()=>{
            this.toast.show = false;
          },1000);
        }
        this.submiting = false
      }).catch(error => {
        this.submiting = false
      })
      }
     
      
    },
  },
  mounted () {
   
  }
}
</script>
