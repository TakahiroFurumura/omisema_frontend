<template>
  <div class="d-flex">
    <v-icon id="star-1" :color="star1Color" :size="size" class="pe-0 align-self-center">mdi-star</v-icon>
    <v-icon id="star-2" :color="star2Color" :size="size" class="pe-0 align-self-center">mdi-star</v-icon>
    <v-icon id="star-3" :color="star3Color" :size="size" class="pe-0 align-self-center">mdi-star</v-icon>
    <v-icon id="star-4" :color="star4Color" :size="size" class="pe-0 align-self-center">mdi-star</v-icon>
    <v-icon id="star-5" :color="star5Color" :size="size" class="pe-0 align-self-center">mdi-star</v-icon>
    <span class="ms-1 font-weight-light text-12 align-self-center">({{review_count_str}})</span>
  </div>
</template>

<script>
export default {
  name: "ReviewStars",
  props:{
    review_rating: {type: Number, default: 0},
    review_count: {type: Number, default: 1},
    star_filled_color: {type: String, default: "orange"},
    star_void_color: {type: String, default: "grey"},
    size: {type: String, default: "x-small"},
  },
  data() {
    return{
    }
  },
  computed:{
    // Star Fill
    star1Color: function() {
      return this.review_rating > 0.5 ? this.star_filled_color: this.star_void_color;
    },
    star2Color: function() {
      return this.review_rating > 1.5 ? this.star_filled_color: this.star_void_color;
    },
    star3Color: function() {
      return this.review_rating > 2.5 ? this.star_filled_color: this.star_void_color;
    },
    star4Color: function() {
      return this.review_rating > 3.5 ? this.star_filled_color: this.star_void_color;
    },
    star5Color: function() {
      return this.review_rating > 4.5 ? this.star_filled_color: this.star_void_color;
    },
    // review count like 10k+
    review_count_str: function() {
      if (this.review_count < 100) {
        return this.review_count.toString();
      }
      if (this.review_count < 1000) {
        return ((Math.floor(this.review_count / 100) * 100).toString() + '+')
      }
      if (this.review_count < 10000) {
        return ((Math.floor(this.review_count / 1000)).toString() + 'k+')
      }
      return ((Math.floor(this.review_count / 10000)).toString() + '0k+')
    }
  },
  method:{
  }
}
</script>

<style scoped>

</style>