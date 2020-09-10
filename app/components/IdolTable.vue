<template>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <table class="table table-bordered table-striped mb-0">
                <thead>
                <tr>
                    <th scope="col">Hangul</th>
                    <th scope="col">Name</th>
                    <th scope="col">Avatar</th>
                </tr>
                </thead>
                <tbody>
                <tr :key="idol._id" v-for="idol in idols">
                    <th scope="row">{{idol.hangul}}</th>
                    <td>{{idol.name}}</td>
                    <td><img :src="idol.avatar" class="img-thumbnail" style="height:150" > </td>
                </tr>
                </tbody>
            </table>
        </div>
</template>
<style scoped>
    
</style>
<script>

export default {
    data(){
        return{
            idols : [],
            limit: 10,
            page:0,
            busy: false
        }
    },
    methods:{
        loadMore(){
            this.busy = true;
             axios
            .get(`https://evening-savannah-98320.herokuapp.com/api/idol?per_page=${this.limit}&page=${this.page}`)
            .then(response => {
                this.idols = this.idols.concat(response.data);
                this.page +=1;
                this.busy = false;
            })
        }
    },
    created(){
        this.loadMore();
    },
    mounted(){
       
    }
}

</script>
