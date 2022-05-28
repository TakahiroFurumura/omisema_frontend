<template>
  <div class="ma-0 pa-0">
    <transition-group >
      <v-row dense>
        <v-col v-for="offer in offers" v-bind:key="offer.platform_merchant_item_key">
          <MerchantOfferCard
              v-bind="offer"
              :price_is_shipping_charge_inclusive="price_is_shipping_charge_inclusive"
              :price_is_net_of_point="price_is_net_of_point"
              :lowest_landing="lowest_landing"
              :lowest_after_point_landing="lowest_after_point_landing"
              :lowest_conditional="lowest_conditional"
              :lowest_condition_text="lowest_condition_text"
          />
        </v-col>
      </v-row>
    </transition-group>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from "axios";
import MerchantOffer from "@/lib/class_merchant_offer";
import MerchantOfferCard from "@/components/parts/MerchantOfferCard.vue";
import store from "@/store";
import {breakPoint} from "@/lib/break_points";
import {compare_price} from "@/lib/compare_price";

export default defineComponent({
  name: 'MerchantOfferList',

  components: {
    MerchantOfferCard
  },

  props: {
    item_key: String,
    // display settings
    price_is_shipping_charge_inclusive: Boolean,
    price_is_net_of_point: Boolean,
    sort_type: String,
  },

  data() {
    return {
      debug: true,
      is_loading: false,
      is_load_failed: false,
      offers: [],

      // label chips
      lowest_landing: false,
      lowest_after_point_landing: false,
      lowest_conditional: false,
      lowest_condition_text: "",
    }
  },

  methods: {
    loadOffers: function() {
      //全部消す
      this.offers.splice(0);
      // 初回ロード
      axios.get('https://a.omisema.com/offers/key/' + this.item_key + '/')
          .then((response) => {
            // log
            if (store.state.debug && this.debug) {
              console.log("/offers/key/ GET successful");
              console.log(response.data);
            }

            this.is_loading = true;

            // update items list
            for (let key in response.data) {
              let new_offer = new MerchantOffer(response.data[key]);
              this.offers.push(new_offer)
              this.is_loading = false;
            }

            this.is_loading = true;
            this.is_loading = false;

            // log
            if(store.state.debug && this.debug) {
              console.log("offers");
              console.log(this.offers);
            }

          })
          .catch((e) => {
            if (store.state.debug && this.debug) {
              console.log(e);
            }
          })
    },

    loadRefreshedOfferes: function() {
      // 更新後のデータ
      axios.get('https://a.omisema.com/offers/key/' + this.item_key + '/?process=2')
          .then((response) => {
            if (this.debug) {
              console.log("/offers/key/" + this.item_key + "/?process=2 GET successful");
              console.log(response.data);
            }
            for (let key in response.data){
              let updated_offer = new MerchantOffer(response.data[key]);

              // 一致するmerchantを探して値を更新
              for (const offer of this.offers) {
                if (offer.merchant_id === updated_offer.merchant_id
                    && offer.snapshot_datetime !== updated_offer.snapshot_datetime) {
                  if(this.debug) {console.log(offer.merchant_display_name + updated_offer.price_with_tax.toString());}
                  offer.price_with_tax = updated_offer.price_with_tax;
                  offer.shipping_charge_with_tax = updated_offer.shipping_charge_with_tax;
                  offer.point = updated_offer.point;
                  offer.availability_level_id = updated_offer.availability_level_id;
                  offer.snapshot_datetime = updated_offer.snapshot_datetime;
                }
              }
            }
            // this.offers.splice();
            this.updateOfferConfigs();
            this.sort_offers();
            this.is_loading = false;
          })
          .catch((e) => {
            if (this.debug) {
              console.log("api updated failed")
              console.log(e);
            }
          })
    },

    compare_price: function(a, b) {
      // 価格nullは最後
      {
        if (isNaN(a.price_with_tax) && !isNaN(b.price_with_tax)) {
          return 1
        } else if (!isNaN(a.price_with_tax) && isNaN(b.price_with_tax)) {
          return -1
        }

        // 表示中の価格種別で場合分け
        // 送料あり、ポイント除く
        // shipping_charge_with_taxがnull/undifinedの場合は、ペナルティで千円足して比較
        let a_price_landed = a.price_with_tax + (a.shipping_charge_with_tax != null ? a.shipping_charge_with_tax : 1000)
        let b_price_landed = b.price_with_tax + (b.shipping_charge_with_tax != null ? b.shipping_charge_with_tax : 1000)
        if (a.price_is_shipping_charge_inclusive() && !a.price_is_net_of_point) {
          if (a_price_landed < b_price_landed) {
            return -1;
          } else {
            return 1;
          }
        }
        // 送料あり、ポイント引き後
        let a_price_landed_net_point = a_price_landed - (a.point ? a.point : 0);
        let b_price_landed_net_point = b_price_landed - (b.point ? b.point : 0);
        // 送料あり、ポイント引き後
        if (a.price_is_shipping_charge_inclusive && a.price_is_net_of_point) {
          if (a_price_landed_net_point < b_price_landed_net_point) {
            return -1;
          } else {
            return 1;
          }
        }
        // 送料なし、ポイント引き後
        let a_price_net_point = a.price_with_tax - (a.point ? a.point : 0);
        let b_price_net_point = b.price_with_tax - (b.point ? b.point : 0);
        // 送料なし、ポイント除く
        if (!a.price_is_shipping_charge_inclusive && !a.price_is_net_of_point) {
          if (a_price_net_point < b_price_net_point) {
            return -1;
          } else {
            return 1;
          }
        }
        // どれにも該当しなければ、とりあえず生価格で並べ替え
        if (a.price_with_tax < b.price_with_tax) {
          return -1;
        } else {
          return 1;
        }
      }
    },

    sort_offers: function() {

      // 在庫条件アリの場合
      if (this.sort_type === "instock-price-asc"){
        this.offers.sort(
            function (a, b) {
              // どちらかがNan
              if (isNaN(a.price_with_tax) && !isNaN(b.price_with_tax)) return 1;
              if (!isNaN(a.price_with_tax) && isNaN(b.price_with_tax)) return -1;
              // 在庫ありvsなしは、常に在庫あり優先
              if (100 <= a.availability_level_id <= 200 && (b.availability_level_id === 0 || b.availability_level_id > 200)) {
                return 1;
              }
              else if (100 <= b.availability_level_id <= 200 && (a.availability_level_id === 0 || a.availability_level_id > 200)) {
                return -1;
              }

              // 在庫状態おなじなら、送料あり、ポイント除くで比較
              // shipping_charge_with_taxがnull/undifinedの場合は、ペナルティで千円足して比較
              let a_price_landed = a.price_with_tax + (a.shipping_charge_with_tax != null ? a.shipping_charge_with_tax : 1000)
              let b_price_landed = b.price_with_tax + (b.shipping_charge_with_tax != null ? b.shipping_charge_with_tax : 1000)
              if (a_price_landed < b_price_landed) {
                return -1;
              } else {
                return 1;
              }


            });
          }

      // 安い順 送料込み ポイントなし
      else if (this.sort_type === "price-asc"
          && this.price_is_shipping_charge_inclusive
          && !this.price_is_net_of_point) {
        this.offers.sort(function (a, b) {
          // どちらかがNan
          if (isNaN(a.price_with_tax) && !isNaN(b.price_with_tax)) return 1;
          if (!isNaN(a.price_with_tax) && isNaN(b.price_with_tax)) return -1;
          // 送料あり、ポイント除く
          // shipping_charge_with_taxがnull/undifinedの場合は、ペナルティで千円足して比較
          let a_price_landed = a.price_with_tax + (a.shipping_charge_with_tax != null ? a.shipping_charge_with_tax : 1000)
          let b_price_landed = b.price_with_tax + (b.shipping_charge_with_tax != null ? b.shipping_charge_with_tax : 1000)
          if (a_price_landed < b_price_landed) {
            return -1;
          } else {
            return 1;
          }
        })
      }

      // 安い順 送料込み ポイントあり
      else if (this.sort_type === "price-asc"
          && this.price_is_shipping_charge_inclusive
          && this.price_is_net_of_point) {
        this.offers.sort(function (a, b) {
          // どちらかがNan
          if (isNaN(a.price_with_tax) && !isNaN(b.price_with_tax)) return 1;
          if (!isNaN(a.price_with_tax) && isNaN(b.price_with_tax)) return -1;

          // 送料あり、ポイント引き後
          let a_price_landed = a.price_with_tax + (a.shipping_charge_with_tax != null ? a.shipping_charge_with_tax : 1000)
          let b_price_landed = b.price_with_tax + (b.shipping_charge_with_tax != null ? b.shipping_charge_with_tax : 1000)
          let a_price_landed_net_point = a_price_landed - (a.point ? a.point : 0);
          let b_price_landed_net_point = b_price_landed - (b.point ? b.point : 0);
          if (a_price_landed_net_point < b_price_landed_net_point) {
            return -1;
          } else {
            return 1;
          }
        })
      }

      // 送料なし、ポイント引き後
      else if (this.sort_type === "price-asc"
          && !this.price_is_shipping_charge_inclusive
          && this.price_is_net_of_point) {
        this.offers.sort(function (a, b) {
          // どちらかがNan
          if (isNaN(a.price_with_tax) && !isNaN(b.price_with_tax)) return 1;
          if (!isNaN(a.price_with_tax) && isNaN(b.price_with_tax)) return -1;

        let a_price_net_point = a.price_with_tax - (a.point ? a.point : 0);
        let b_price_net_point = b.price_with_tax - (b.point ? b.point : 0);
        if (!a.price_is_shipping_charge_inclusive && !a.price_is_net_of_point) {
          if (a_price_net_point < b_price_net_point) {
            return -1;
          } else {
            return 1;
          }
        }
        })
      }

      else {
        this.offers.sort(function (a, b) {
          // どちらかがNan
          if (isNaN(a.price_with_tax) && !isNaN(b.price_with_tax)) return 1;
          if (!isNaN(a.price_with_tax) && isNaN(b.price_with_tax)) return -1;
          // どれにも該当しなければ、とりあえず生価格で並べ替え
          if (a.price_with_tax < b.price_with_tax) {
            return -1;
          } else {
            return 1;
          }
        })
      }
    }
  },

  computed: {
    breakpoint: function() {
      return breakPoint()
    },
  },

  watch: {
    sort_type: function() {
      this.sort_offers()
    },
    price_is_shipping_charge_inclusive: function() {this.sort_offers();},

    price_is_net_of_point: function() {this.sort_offers()}

  },

  mounted() {
    this.loadOffers()
    this.sort_offers()
  }
});
</script>

<style scoped>

</style>