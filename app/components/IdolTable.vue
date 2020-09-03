<template>
        <div class="table-wrapper-scroll-y my-custom-scrollbar">
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
                    <td><img :src="idol.avatar" class="img-thumbnail" style="width:20%"> </td>
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
        }
    },
    mounted(){
        axios
            .get('https://evening-savannah-98320.herokuapp.com/api/idol')
            .then(response => (this.idols = response.data))
    }
}

</script>
