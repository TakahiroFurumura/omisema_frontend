<template>
  <div class="d-flex" >
    <v-img
        class="align-self-start"
        :src="require('@/assets/images/4.png')"
        :width=img_width
        alt=""
    ></v-img>
    <div class="ms-1 me-0 pa-0 align-self-start">
      <div class="mb-0 ps-1 pe-1 pe-2" v-bind:style="{width:text_width_str}">
        <!--Title-->
        <h5 class="f-600 ma-0 pa-0" style="overflow-wrap: break-word; width:auto">{{ this.item_name }}</h5>
        <!--Brand and Category-->
        <v-chip class="text-uppercase" text-color="secondary" size="small" color="grey lighten-4">Must Try</v-chip>
        <!--Review Rating-->
        <div class="d-flex">
          <ReviewStars
              :rating=this.rating
              :review_count=this.review_count
          />
        </div>
      </div>
      <div class="d-flex mb-1">
        <span class="text-14 grey--text text--darken-1 text-decoration-line-through me-2 mb-0">$25</span>
        <span class="text-14 grey--text text--darken-4 me-2 mb-0">$22.5</span>
        <span class="text-14 primary--text mb-0">10% off</span>
      </div>
      <v-btn
          v-if="show_link_bottun"
          color="primary"
          outlined
          size="small"
          class="elevation-1"
      >
          お店をチェック
      </v-btn>
    </div>
  </div>
</template>

<script>
// import ItemInfo from '@/lib/class_item_info.ts';
import ReviewStars from '@/components/parts/ReviewStars.vue';
import {onMounted} from "vue";
import {breakPoint} from "@/lib/break_points";

const debug=true;
export default {
  name: "ItemListItem",
  components:{
    ReviewStars
  },
  setup() {
    onMounted(() => {
      if (debug) console.log('ItemListItem mounted');
    })
  },
  props:{
    item_key: String,
    item_name: String,
    item_description: String,
    item_description_source_url: String,

    manufacturer_brand: String,
    manufacturer_brand_url: String,
    category: String,

    net_volume: Number,
    net_volume_unit: String,
    net_weight: Number,
    net_weight_unit: String,
    quantity: Number,
    item_img_path: String,
    item_img_source_url: String,
    ref_price: Number,

    rating: Number,
    review_count: Number,

    box_width: Number,
    show_link_bottun: Boolean,
  },
  data() {
    return{
      debug: true,
    }
  },
  computed: {
    img_width: function() {
      switch (breakPoint()) {
      case 'xs': return 150
      case 'sm': return 150
      case 'md': return 180
      case 'lg': return 180
      case 'xl': return 180}
      return 150
    },
    text_width_str: function() {

      switch (breakPoint()) {
      case 'xs': return "200px"
      case 'sm': return "200px"
      case 'md': return "240px"
      case 'lg': return "240px"
      case 'xl': return "240px"
      }
      return 240
    }
  },
  method:{
  }
}
</script>

<style scoped>

</style>