<template>
  <v-container class="px-0 py-2">
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
import ItemList from '@/components/parts/ItemList.vue'
import ItemInfo from "@/lib/class_item_info";

export default {
  name: "RelatedItems",

  components: {
    ItemList,
  },

  props: {
    item_key: String,
  },

  data() {
    return{
      debug: false,
      items: [],
      is_loading: false,
      is_load_failed: false
    }
  },

  methods: {
    loadItem(api_request_url) {
      // 全部消してLoading Screen
      this.items.splice(0);
      this.is_loading = true;

      // 更新
      let retry_count = 0;
      axios.get(api_request_url, {timeout: 5000})
        .then((response) => {
          // log
          if(store.state.debug && this.debug) {
            console.log(api_request_url + " GET successful");
            console.log(response.data);
        }

        // update items list
        for (let key in response.data) {
          let new_item = new ItemInfo(response.data[key]);
          this.items.push(new_item)
          this.is_loading = false;
        }
        this.is_loading = false;
        this.is_load_failed = false;
        this.$emit('related-item-loaded', this.items.length)

        // log
        if(store.state.debug && this.debug) {
          console.log("items");
          console.log(this.items);
        }
      })
      .catch((e) => {
        if(store.state.debug && this.debug) {
          console.log(e);
        }
        retry_count += 1;
        if (retry_count <= 3) {
          // this.updateRecommendedItems();
          this.is_load_failed = true;
        }
        })
    },

    loadRelatedItems() {
      let api_request_url = "https://a.omisema.com/search/r/" + this.item_key + "/50/"
      this.loadItem(api_request_url)
    },
  },

  mounted() {
    this.loadRelatedItems()
  }
}

</script>

<style scoped>

</style>