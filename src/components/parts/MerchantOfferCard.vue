<template>
  <v-card min-width="350px" max-width="400px"
          class="px-2 py-1 elevation-0"
  >
    <!-- merchant name -->
    <v-card-header class="pa-1">
      <a class="text-black" :href="offer_url" target="_blank" rel="noopener">
        <div class="d-flex align-center ma-0 py-0">
          <h6 class="font-weight-normal">
            {{this.merchant_display_name}}
          </h6>
          <v-icon size="x-small" class="mx-1">
            mdi-open-in-new
          </v-icon>
        </div>
      </a>
    </v-card-header>
    <v-divider></v-divider>

      <v-list
          density="compact"
         :stype="{flexWrap:'warp'}"
      >
      <!-- Price -->
      <v-list-item class="my-0 pt-0 pb-1 px-1">
        <div class="d-flex align-center">
          <span class="h3 text-secondary font-weight-medium">{{this.price_str}}</span>
          <!-- 価格注記 -->
          <span v-if="price_is_net_of_point" class="ms-2" style="font-size:11px">ポイントGET後</span>
          <span class="ms-2" style="font-size:11px">{{ shipping_charge_string }}</span>
          <!-- message chips -->
          <v-chip v-if="lowest_landing" class="mx-1" size="x-small" color="primary">いちばん安い</v-chip>
          <v-chip v-if="lowest_after_point_landing" class="mx-1" size="x-small" color="primary">ポイントで安い</v-chip>
        </div>
      </v-list-item>

      <!-- Point -->
      <v-list-item v-if="this.point > 0" class="my-0 py-0 px-1" height="12px">
        <v-list-item-icon class="my-0 py-0" icon="mdi-alpha-p-circle-outline " size="small"/>
        <v-list-item-content class="my-0 py-0">
          <v-list-item-title
              class="my-0 py-0 text-body-2 ms-1 text-wrap"
              >
            {{point_str}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Delivery -->
      <v-list-item class="my-0 py-0 px-1" height="12px">
        <v-list-item-icon class="my-0 py-0" :icon="inventory_icon" size="small"/>
        <v-list-item-content>
          <v-list-item-title
              class="my-0 py-0 text-caption ms-1 text-wrap"
              style="line-height:12px">
            {{ this.delivery_promise }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
</v-list>

    <!-- Disclaimer -->

    <div class="font-weight-light px-2"
         :style="{fontSize:'10px', color:'grey'}">
      <p>{{this.price_date_string}}ごろの情報です。</p>
      <p>{{this.sponsorship_disclosure_text}}</p>
    </div>


  </v-card>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {commaValStr} from "@/lib/price_string";
import {datetimeToString} from "@/lib/datetime-to-string";
import gsap from "gsap";

export default defineComponent({
  name: "MerchantOfferCard",
  props: {
    // Display Setting
    price_is_shipping_charge_inclusive: {type: Boolean, default: true},
    price_is_net_of_point: {type: Boolean, default: false},
    // Chip
    lowest_landing: {type: Boolean, default: false},
    lowest_after_point_landing: {type: Boolean, default: false},
    lowest_conditional: {type: Boolean, default: false},
    lowest_condition_text: String,

    // Data
    platform_merchant_item_key: String,
    item_key: String,

    platform_id: Number,
    platform_name: String,
    merchant_id: Number,
    merchant_display_name: String,

    offer_url: String,
    price_with_tax: Number,
    landed_price_with_tax: Number,
    delivery_promise: String,
    expected_delivery_days: Number ,
    shipping_charge_with_tax: Number,
    free_shipment_minimum_purchase: Number,

    point: Number,
    point_type: String,

    availability_level_id: Number,
    min_shipment_days: Number,
    max_shipment_days: Number,
    min_delivery_days: Number,
    max_delivery_days: Number,
    snapshot_datetime: Date,

    is_sponsored: Boolean,
    sponsorship_disclosure_text: String
  },

  data() {
    return {    // Drum roll
      tweened_price_to_show: 0,
    }
  },

  watch: {
    display_price: function(newValue) {
      gsap.to(this.$data, { duration: 0.2, tweened_price_to_show: newValue });
    },
  },

  computed: {
    display_price: function() {
      if (this.price_with_tax == null) return null;

      let price_shown = this.price_with_tax
      if (this.price_is_net_of_point && this.point != null) {
        price_shown = price_shown - this.point;
      }
      if (this.price_is_shipping_charge_inclusive && this.shipping_charge_with_tax != null) {
        price_shown = price_shown + this.shipping_charge_with_tax;
      }
      return price_shown;
    },

    price_str: function() {
      if (this.display_price == null) {
        return "価格未確認"
      } else {
        return (commaValStr(this.tweened_price_to_show) + "円")
      }
    },

    point_str: function() {
      if (this.point == null) {
        return "ポイント未確認"
      } else {
        return this.point > 0 ? (commaValStr(this.point) + "ポイント") : "ポイントなし"
      }
    },

    shipping_charge_string: function() {
      let prefix = ""
      if (!this.price_is_shipping_charge_inclusive) prefix = "+";
      let suffix = ""
      if (this.price_is_shipping_charge_inclusive) suffix = "を含む";

      if (this.shipping_charge_with_tax == null) {
        return "送料未確認";
      } else {
        if (this.shipping_charge_with_tax === 0) {
          return "送料無料"
        } else {
          return prefix + "送料" + commaValStr(this.shipping_charge_with_tax) + "円" + suffix;
        }
      }
    },

    price_date_string: function() {
      if (this.snapshot_datetime != null ) {
        return datetimeToString(this.snapshot_datetime, 'MM月DD日HH時');
      } else {
        return ""
      }
    },

    inventory_icon: function() {
      if (this.availability_level_id === undefined || this.availability_level_id === null) return "mdi-calendar-question";
      if (this.availability_level_id == 0) return "mdi-calendar-question";
      if (this.availability_level_id <= 200) return "mdi-minus-circle";
      if (this.availability_level_id > 200) return "mdi-truck-check-outline ";
      return "mdi-calendar-question"
    }
  },

  mounted() {
    if (this.display_price != null) {
      this.tweened_price_to_show = this.display_price;
    }
    void(0)
  }

})



</script>

<style scoped>

</style>