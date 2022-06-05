<template>
  <div>
    <!--商品説明-->
    <v-spacer/>
    <v-progress-circular indeterminate v-if="is_loading" :value="20" class="my-10"></v-progress-circular>
    <v-spacer/>

    <div class="pb-0 pt-0 d-inline-block" :style="{maxWidth:820}">
      <v-card class="d-flex elevation-0 pl-1 pt-2 pb-2 pe-1 my-1 mx-0"
              :max-width="420"
      >
       <ItemListItem v-bind="item"
                     :box_width="item_card_width - 10"
                     :show_link_bottun="false"
        />
      </v-card>

      <v-card class="text-caption pa-2 font-weight-normal elevation-0"
              color="transparent"
              :min-width=350
              :max-width=580>
        {{truncated_item_description}}
      </v-card>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import ItemInfo from '@/lib/class_item_info.ts'
import ItemListItem from '@/components/parts/ItemListItem.vue'
import {cutString} from "@/lib/cut-string";
import {breakPoint} from "@/lib/break_points";
import axios from "axios";

export default {
  name: "ItemDesc",

  components: {
    ItemListItem,
  },

  props:{
    item_key: {type: String, default: "99BDAF5"},
  },

  emits: {
    itemLoaded: null
  },

  data: () => {
    return{
      debug: false,
      tab: "tab",
      item: new ItemInfo({}),
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
    },

    truncated_item_description: function () {
      return cutString(this.item.item_description, this.item_card_width * 5, 14);
    }
  },

  methods: {
    loadItemInfo: function() {
      axios.get('https://a.omisema.com/item/key/' + this.item_key + '/')  // 語尾/がないとCORSエラーになる
      .then((response) => {
          if(this.debug) {
          console.log("/item/key/ GET successful for key " + this.item_key);
          console.log(response.data);
        }
          if (response.data.item_key != null) {
            this.item = new ItemInfo(response.data)
            // 親にページタイトルを渡す
            let page_title ="おみせま検索 " + this.item.item_name + ' ' + this.item.item_keywords;
            this.$emit('itemLoaded', page_title)

          } else {
            document.location = "/"
          }
    })
    .catch((e) => {
      if(this.debug) {console.log(e);}
      document.location = "/"
    })
    }
  },

  created() {
    if (store.state.debug && this.debug) console.log('ItemDesc')
    if (store.state.debug && this.debug) console.log(this.item_key)
  },

  mounted() {
    this.loadItemInfo()
  }

}
</script>

<style scoped>

</style>