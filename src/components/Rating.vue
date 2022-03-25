<template>  
  <div>
    <span v-for="(star, i) in stars" :key="i">
      <i :class="' fa fa-star' + (i < rate ? ' text-warning': '-o colo')"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Rating',
  props: ['rate', 'total'],
  data() {
    return {
      stars: Array(this.total).fill(0)
    }
  },
}
</script>

<style scoped>
.colo{
  color: #888888;
  /* background-color: #888888; */
}
</style>