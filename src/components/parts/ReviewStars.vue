<template>
  <div class="d-flex">
    <v-icon id="star-1" :color="star1Color" size="small" class=" align-self-center">mdi-star</v-icon>
    <v-icon id="star-2" :color="star2Color" size="small" class=" align-self-center">mdi-star</v-icon>
    <v-icon id="star-3" :color="star3Color" size="small" class=" align-self-center">mdi-star</v-icon>
    <v-icon id="star-4" :color="star4Color" size="small" class=" align-self-center">mdi-star</v-icon>
    <v-icon id="star-5" :color="star5Color" size="small" class=" align-self-center">mdi-star</v-icon>
    <span class="ms-2 font-weight-light text-caption align-self-center">({{review_count}})</span>
  </div>
</template>

<script>
export default {
  name: "ReviewStars",
  props:{
    rating: Number,
    review_count: Number,
    ref_price: Number
  },
  data() {
    return{
    }
  },
  computed:{
    star1Color: function() {
      return this.rating > 0.5 ? "secondary": "disabled"
    },
    star2Color: function() {
      return this.rating > 1.5 ? "secondary": "disabled"
    },
    star3Color: function() {
      return this.rating > 2.5 ? "secondary": "disabled"
    },
    star4Color: function() {
      return this.rating > 3.5 ? "secondary": "disabled"
    },
    star5Color: function() {
      return this.rating > 4.5 ? "secondary": "disabled"
    },
  },
  method:{
  }
}
</script>

<style scoped>

</style>