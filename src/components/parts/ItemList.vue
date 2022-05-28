<template>
  <div>
    <v-progress-circular indeterminate v-if="is_loading" :value="20" class="ms-10 my-10"></v-progress-circular>
    <v-row
        class="pt-2 "
    >
     <v-col
          v-for="item in items" v-bind:key="item.item_key"
          class="pb-0 pt-0"
     >
        <v-card class="d-flex elevation-0 pl-2 pt-2 pb-2 pe-1 mt-1 mb-1"
                :item_no="item.item_key"
                :max-width="420"
        >
         <ItemListItem v-bind="item"
                     :box_width="item_card_width - 10"
                     :show_link_bottun="true"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import store from '@/store'
import ItemInfo from '@/lib/class_item_info.ts'
import ItemListItem from '@/components/parts/ItemListItem.vue'
import {breakPoint} from "@/lib/break_points";

export default {
  name: "ItemList",

  components: {
    ItemListItem,
  },

  props:{
    items:[],
    is_loading: {type: Boolean, default: true},
    is_load_failed: {type: Boolean, default: false}
  },

  data: () => {
    return{
      debug: true,
    }
  },

  computed: {
    item_card_width: function () {
      switch (breakPoint()) {
        case 'xs':
          return "350px"
        case 'sm':
          return "350px"
        case 'md':
          return "420px"
        case 'lg':
          return "420px"
        case 'xl':
          return "420px"
      }
      return 350
    }
  },

  methods: {
  },

  created() {
    if (store.state.debug && this.debug) console.log('ItemList')
  }

}
</script>

<style scoped>

</style>