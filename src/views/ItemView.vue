<template>
  <v-container class="mx-0">
    <ItemDesc
       :item_key=this.item_key
       @item-loaded="updateTitle"
    />
  </v-container>

  <v-divider class="my-0"></v-divider>

  <!--タブ-->
  <v-container  class="mx-0">
    <div class="d-flex justify-space-between flex-wrap flex-sm-nowrap">
      <v-tabs class="mb-3" color="primary" v-model=tab>
        <v-tab value="offers" class="text-capitalize">お店と価格</v-tab>
        <v-tab value="related" class="text-capitalize" :disabled="!has_related_items">関連商品</v-tab>
        <v-tab value="reviews" class="text-capitalize" :disabled="!has_review">レビュー</v-tab>
      </v-tabs>
    </div>

    <!--お店と価格-->
    <div v-show="tab==='offers'">
      <MerchantOfferBlock
          :item_key="item_key"
      />
    </div>

    <!--関連商品ー-->
    <div v-show="tab==='related'" class="ma-0 pa-0">
      <RelatedItems
          :item_key="item_key"
          @related-item-loaded="enableRelatedTab"
      />
    </div>

    <!--レビュー-->
    <div v-show="tab==='reviews'" class="ma-0 pa-0">
      <RelatedWebsites
          :item_key="item_key"
          @review-contents-loaded="onReviewContentsLoaded"
      />
    </div>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import store from '@/store'

import ItemDesc from "@/components/parts/ItemDesc.vue";
import MerchantOfferBlock from "@/components/MerchantOfferBlock.vue";
import RelatedItems from "@/components/parts/RelatedItems.vue";
import RelatedWebsites from "@/components/parts/RelatedWebsites";

export default defineComponent({
  name: 'ItemOfferView',

  components: {
    ItemDesc,
    MerchantOfferBlock,
    RelatedItems,
    RelatedWebsites,
  },

  props: {
  },

  data() {
    return{
      debug: true,
      is_loading: false,
      item_key: "",
      tab: "offers",

      n_related_items: 0,
      has_review: false
    }
  },

  methods: {
    updateTitle(page_title) {
      document.title = page_title
    },

    enableRelatedTab(n) {
      this.n_related_items = n != null ? n : 0;
    },

    onReviewContentsLoaded(n) {
      this.has_review = (n != null && n > 0)
    }
  },

  computed: {
    has_related_items: function(){
      return this.n_related_items > 0;
    },
  },

  created() {
    if (store.state.debug && this.debug) console.log('ItemOfferView')
    let mlist = location.href.match(/item\/[a-zA-Z0-9]+\//)
    if (mlist !== null && mlist.length > 0) {
      this.item_key = mlist[0].replace('item/', '').replace('/', '');
    }
  },

  mounted() {
    void(0);
  }

});
</script>

<style scoped>

</style>