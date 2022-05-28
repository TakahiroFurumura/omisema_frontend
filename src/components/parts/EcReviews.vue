<template>
  <v-card class="">
    <v-card-title class="h6 px-2 py-1 d-flex align-center">
      <v-icon size="20px" color="black" class="px-1 align-self-center">mdi-storefront-outline</v-icon>
      <div class="align-self-center px-1">ECサイトでのレビュー</div>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-content class="px-2 py-1">
      <v-progress-circular indeterminate v-if="is_loading" :value="20" class="ms-10 my-10"></v-progress-circular>
      <div v-for="ec_review in ec_review_list" v-bind:key="ec_review.merchant_display_name"
           class="mt-1 mb-2 my-0"
      >
        <div>
          <!--店舗名-->
          <div class="text-14 pa-0 ma-0 font-weight-regular">{{ec_review.merchant_display_name}} </div>

          <!--評価-->
          <div class="d-flex align-center  pa-0 ma-0">
            <reviewStars
                :review_rating="ec_review.review_rating"
                :review_count="ec_review.review_count"
                star_filled_color="black"
                size="small"
            />
            <a v-if="ec_review.review_url!=null" :href="ec_review.review_url" target="_blank" rel="noopener">
              <span class="text-12 ms-5 font-weight-regular text-decoration-underline">レビューを見に行く</span>
              <v-icon size="12px" color="black" class="align-self-center">mdi-open-in-new</v-icon>
            </a>
          </div>
        </div>
      </div>
    </v-card-content>
  </v-card>
</template>

<script>
import axios from "axios";
import store from "@/store";
import reviewStars from "@/components/parts/ReviewStars";

export default {
  name: "EcReviews",
  components: {
    reviewStars,
  },

  props: {
    item_key: String,
  },

  data() {
    return{
      debug: true,
      ec_review_list: [
        {"merchant_display_name": "Joshin web\u30b7\u30e7\u30c3\u30d7", "review_rating": 4.5, "review_count": 13,
          "merchant_sku": "4548736085343", "offer_url": "https://joshinweb.jp/av/20168/4548736085343.html",
          "review_url": "https://joshinweb.jp/review/viewitem/4548736085343/0"},
        {"merchant_display_name": "\u30ce\u30b8\u30de\u30aa\u30f3\u30e9\u30a4\u30f3", "review_rating": 4.0, "review_count": 5,
          "merchant_sku": "4548736085343", "offer_url": "https://online.nojima.co.jp/commodity/1/4548736085343/",
          "review_url": "https://online.nojima.co.jp/commodity/1/4548736085343/#tabs"},
        {"merchant_display_name": "\u30e8\u30c9\u30d0\u30b7.com", "review_rating": 4.300000190734863, "review_count": 33,
          "merchant_sku": "100000001004072973", "offer_url": "https://www.yodobashi.com/product/100000001004072973/",
          "review_url": "https://www.yodobashi.com/community/product/100000001004072973/review.html"},
        {"merchant_display_name": "\u30d3\u30c3\u30af\u30ab\u30e1\u30e9.com", "review_rating": 4.699999809265137, "review_count": 44,
          "merchant_sku": null, "offer_url": "https://www.biccamera.com/bc/item/5848293/", "review_url": null}],
      is_loading: false,
      is_load_failed: false
    }
  },

  methods: {
    loadEcReviews() {
      // 全部消してLoading Screen
      this.ec_review_list.splice(0);
      this.is_loading = true;

      let api_request_url = "https://a.omisema.com/reviews/ec/" + this.item_key + "/"

      // log
      if(store.state.debug && this.debug) {
        console.log(api_request_url);
      }
      // 更新
      let retry_count = 0;
      axios.get(api_request_url, {timeout: 5000})
        .then((response) => {
          // log
          if(store.state.debug && this.debug) {
            console.log(api_request_url + " GET successful");
            console.log(response.data);
          }

          // update ec_review_list
          for (let key in response.data) {
            let new_ec_review = response.data[key];
            this.ec_review_list.push(new_ec_review)
            this.is_loading = false;
          }
          this.is_loading = false;
          this.is_load_failed = false;
          this.$emit('ec-review-loaded', this.ec_review_list.length)

          // log
          if(store.state.debug && this.debug) {
            console.log("ec_review_list");
            console.log(this.ec_review_list);
          }
        })
        .catch((e) => {
          if(store.state.debug && this.debug) {
            console.log(e);
          }
          retry_count += 1;
          if (retry_count <= 3) {
            this.is_load_failed = true;
          }
        })
    },
  },

  computed: {
  },

  mounted() {
    if (this.item_key != null) this.loadEcReviews();
  }
}
</script>

<style scoped>

</style>