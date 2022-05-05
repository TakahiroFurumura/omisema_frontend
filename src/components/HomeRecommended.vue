<template>
  <v-container class="px-2 py-2">

    <h4 class="font-weight-bold ms-2 pb-2">注目の商品</h4>
    <v-row
        class="pt-2 "
    >
      <v-col
          v-for="i in 12"
          :key="i"
          class="pb-0 pt-0"
      >
        <v-card class="d-flex elevation-0 pl-2 pt-2 pb-2 pe-1 mt-1 mb-1"
                :item_no="i"
                :max-width="420"
        >
          <ItemListItem v-for="item in items" v-bind="item" v-bind:key="item.item_key"
                        :box_width="item_card_width - 10"
                        :show_link_bottun="true"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ItemInfo from '@/lib/class_item_info.ts'
import ItemListItem from '@/components/parts/ItemListItem.vue'
import {onMounted} from "vue";
import {breakPoint} from "@/lib/break_points";

export default {
  name: "HomeRecommended",
  components:{
    ItemListItem
  },
  setup() {
    onMounted(() => {
      console.log('HomeRecommended mounted')
    })
  },
  props:{
  },
  data() {
    return{
      items:[
          new ItemInfo('test')
      ]
    }
  },
  computed:{
    item_card_width: function() {
      switch (breakPoint()) {
      case 'xs': return "350px"
      case 'sm': return "350px"
      case 'md': return "420px"
      case 'lg': return "420px"
      case 'xl': return "420px"
      }
      return 350
    },
  },
  method: {
  }
}
</script>

<style scoped>

</style>