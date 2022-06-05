<template>
  <v-container class="px-2 py-2">

    <h5 class="ms-2 pb-2">いまオススメの商品</h5>
    <ItemList
        :items="items"
        :is_loading="is_loading"
        :is_load_failed="is_load_failed"
    />
  </v-container>
</template>

<script>
import axios from "axios";
import store from '@/store'
import ItemInfo from '@/lib/class_item_info.ts'
import ItemList from '@/components/parts/ItemList.vue'
import {breakPoint} from "@/lib/break_points";

export default {
  name: "HomeRecommended",
  components:{
    ItemList
  },
  props:{
  },
  data: () => {
    return{
      debug: true,
      is_loading: false,
      is_load_failed: false,
      items:[
          new ItemInfo({item_key: "item_key"}),
      ]
    }
  },
  computed: {
    item_card_width: function () {
      switch (breakPoint()) {
        case 'xs':
          return 350
        case 'sm':
          return 350
        case 'md':
          return 420
        case 'lg':
          return 420
        case 'xl':
          return 420
      }
      return 350
    }
  },
  methods: {
    updateRecommendedItems() {
      // 全部消してLoading Screen
      this.items.splice(0);
      this.is_loading = true;

      // 更新
      let retry_count = 0;
      axios.get('https://a.omisema.com/items/recommended/hot/12/', {timeout: 5000})
          .then((response) => {
            // log
            if(store.state.debug && this.debug) {
              console.log("/items/recommended/hot/ GET successful");
              console.log(response.data);
            }

            // update items list
            for (let key in response.data) {
              let new_item = new ItemInfo(response.data[key]);
              this.items.push(new_item)
              this.is_loading = false;
            }

            // log
            if(store.state.debug && this.debug) {
              console.log("items");
              console.log(this.items);
            }
            this.is_load_failed = false;
            this.is_loading = false

          })
          .catch((e) => {
            if(store.state.debug && this.debug) {
              console.log(e);
            }
            this.is_loading = false;
            retry_count += 1;
            if (retry_count <= 3) {
              // this.updateRecommendedItems();
              this.is_load_failed = true;
            }
          })
    }
  },

  created() {
    if (store.state.debug && this.debug) console.log('HomeRecommended')
  },

  mounted() {
    this.updateRecommendedItems()
  }
}
</script>

<style scoped>
</style>