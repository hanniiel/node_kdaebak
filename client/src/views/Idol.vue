<template>
  <div class="container">
    <div class="row">
      <idol-form/>
      <idol-table />
    </div>
  </div>
</template>
<script>
import IdolForm from '@/components/IdolForm.vue'
import Table from '@/components/IdolTable.vue'
export default {
  components: {
    'idol-form': IdolForm,
    'idol-table': Table
  }
}
</script>
