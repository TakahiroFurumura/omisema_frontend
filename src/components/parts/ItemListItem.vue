<template>
  <div class="ma-0 pa-0">
    <div class="d-flex" >
      <v-img
        :src="item_img_path"
        :width=imgWidth
        :aspect-ratio="1"
      ></v-img>
        <div class="ms-1 me-0 pa-0 align-self-start">
          <div class="mb-0 ps-1 pe-1 pe-2" v-bind:style="{width:'100%'}">
            <!--Title-->
            <a :href="link_to_url">
              <h6 class="ma-0 py-0 pe-1 font-weight-regular"
                  style="overflow-wrap:break-word;
                  width:auto;">
                {{ this.truncatedItemName }}
              </h6>
              <!--Price-->
              <h6 class="text-14 text-secondary">{{priceFromStr}}</h6>
            </a>
          <!--Brand and Category-->
          <v-chip v-if="hasBrand" class="text-uppercase my-1" size="x-small" color="primary">{{this.manufacturer_brand}}</v-chip>
          <v-chip v-if="hasCategory" class="text-uppercase my-1" size="x-small" color="primary">{{this.category}}</v-chip>
          <!--Review Rating-->
          <div class="d-flex my-1">
            <ReviewStars
                :review_rating=this.review_rating
                :review_count=this.review_count
                size="x-small"
            />
          </div>
        </div>
        <div v-if="show_link_bottun"
             class="text-caption text-decoration-underline my-0 py-0 ps-1">

              <a :href="link_to_url">お店をチェック</a>
        </div>
      </div>
    </div>
    <a class="d-flex mt-1" style="text-decoration: None" :href="item_img_source_url" target="_blank" rel="noopener">
      <span class="font-weight-light text-grey ma-0 pa-0"
            :style="{fontSize:'10px'}">
        {{imageSourceString}}
      </span>
      <v-icon size="10px" color="grey" class="align-self-center">mdi-open-in-new</v-icon>
    </a>
  </div>
</template>

<script>
import store from '@/store'
// import ItemInfo from '@/lib/class_item_info.ts';
import ReviewStars from '@/components/parts/ReviewStars.vue';
import {onMounted} from "vue";
import {breakPoint} from "@/lib/break_points";
import {price_from_str} from "@/lib/price_string";
import {cutString} from "@/lib/cut-string";

export default {
  name: "ItemListItem",
  components:{
    ReviewStars
  },
  props:{
    item_key: String,
    item_name: String,
    item_description: String,
    item_description_source_url: String,

    manufacturer_brand: {type: String, default: ""},
    manufacturer_brand_url: {type: String, default: ""},
    category: {type: String, default: ""},

    net_volume: Number,
    net_volume_unit: String,
    net_weight: Number,
    net_weight_unit: String,
    quantity: Number,
    item_img_path: String,
    item_img_source_url: String,
    ref_price: Number,

    review_rating: Number,
    review_count: Number,

    box_width: Number,
    show_link_bottun: Boolean,
  },
  data: () => {
    return{
      debug: true,
    }
  },
  computed: {
    imgWidth: function() {
      switch (breakPoint()) {
      case 'xs': return 150
      case 'sm': return 150
      case 'md': return 180
      case 'lg': return 180
      case 'xl': return 180}
      return 150
    },
    textWidth: function() {
      switch (breakPoint()) {
      case 'xs': return 200
      case 'sm': return 200
      case 'md': return 240
      case 'lg': return 240
      case 'xl': return 240
      }
      return 240
    },
    textWidthStr: function() {
      return (this.textWidth.toString() + "px")
    },
    hasCategory: function() {
      return (this.category !== null && this.category.length > 0)
    },
    hasBrand: function() {
      return (this.manufacturer_brand !== null && this.manufacturer_brand.length > 0)
    },
    priceFromStr: function() {
      return price_from_str(this.ref_price)
    },
    truncatedItemName: function() {
      return cutString(this.item_name, this.textWidth * 3 * 0.9, 15)
    },
    imageSourceString: function() {
      return "Image: " + cutString(this.item_img_source_url, this.textWidth*1.2, 15) + "..."
    },
    link_to_url: function(){
      return "/item/" + this.item_key + "/"
    }
  },
  method:{
  },
  // 追記
  beforeRouteUpdate (to, from, next) {
    // URL の id が変わったときに src/components/items-detail.vue の updateItem 関数を実行してモデルを更新する
    next();
  }

  /*
  mounted () {
  }
  */
}
</script>

<style scoped>
</style>