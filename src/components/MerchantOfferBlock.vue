<template>
  <v-row>
    <div id="control" class="d-block">
      <!--Price type selector-->
      <div class="d-inline-block d-inline-flex"
              :style="{verticalAlign:'top'}"
           id="price-type-checkboxes">
        <v-checkbox
            size="x-small"
            class="text-caption font-weight-medium me-2 pa-0"
            density="compact"
            hide-details=""
            v-model="price_is_shipping_charge_inclusive"
        >
          <template v-slot:label>
            <span class="text-body-2 text-caption">送料込み</span>
          </template>
        </v-checkbox>
        <v-checkbox
            class="text-caption me-2 pa-0"
            density="compact"
            hide-details
            v-model="price_is_net_of_point"
        >
          <template v-slot:label>
            <span class="text-body-2 text-caption">ポイントを引く</span>
          </template>
        </v-checkbox>
      </div>
      <!--Sort type selector-->
      <div>
        <v-radio-group
            v-model="sort_type"
            class="d-inline-block text-caption d-inline-block"
            inline
            hide-details=""
        >
          <v-radio
            class="d-inline-block text-caption font-weight-bold me-2 pa-0"
            density="compact"
            value="price-asc"
          >
            <template v-slot:label>
              <span class="text-body-2 text-caption">安い順</span>
            </template>
          </v-radio>
          <v-radio
            class="d-inline-block text-caption font-weight-bold me-2 pa-0"
            density="compact"
            value="instock-price-asc"
          >
            <template v-slot:label>
              <span class="text-body-2 text-caption">在庫があって安い順</span>
            </template>
          </v-radio>
        </v-radio-group>
      </div>
    </div>
    <v-divider class="mb-2"></v-divider>

    <div >
      <MerchantOfferList
          :item_key="item_key"
          :price_is_shipping_charge_inclusive="price_is_shipping_charge_inclusive"
          :price_is_net_of_point="price_is_net_of_point"
          :sort_type="sort_type"
      />
    </div>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MerchantOfferList from '@/components/parts/MerchantOfferList.vue';

export default defineComponent({
  name: 'MerchantOfferBlock',

  components: {
    MerchantOfferList,
  },

  props: {
    item_key: String,
  },

  data() {
    return {
      debug: true,
      is_loading: false,
      is_load_failed: false,
      // display settings
      price_is_shipping_charge_inclusive: true,
      price_is_net_of_point: false,
      sort_type: "price-asc"
    }
  },

  methods: {
  },

  mounted() {
    void(0)
  }
});
</script>
<style scoped>

</style>