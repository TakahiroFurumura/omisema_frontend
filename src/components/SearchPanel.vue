<template>
  <v-container>
    <v-row rows="1">
      <div class="d-flex white flex-wrap my-7" :style="{Width:'330px'}">
        <input id="keyword-search-box" class="bg-white flex-1 rounded ps-2 elevation-5"
               @keypress.enter="emitSearchExecuted"
               type="text"
               :value="KeywordSearchBoxValue"
               placeholder="商品名やメーカーで検索" />
        <v-btn @click="emitSearchExecuted" x-large color="primary" class="rounded rounded-l-0 text-capitalize elevation-5">
          検索
        </v-btn>
      </div>
      <v-col>
        <!--絞り込みパネル-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ItemListItem from "@/components/parts/ItemListItem";
import {breakPoint} from "@/lib/break_points";
import store from "@/store";

export default {
  name: "SearchPanel",

  components: {
  },

  props:{
    keyword: {type: String, default: ""},
    primary_brand_aliases: {type: String, default: ""},
    category_node_ids: {type: String, default: ""},
  },

  data: () => {
    return{
      debug: true,
      // search criteria
    }
  },

  computed: {
    KeywordSearchBoxValue: function() {
      return this.keyword === "-" ? null : this.keyword;
    }
  },

  methods: {
    emitSearchExecuted() {
      let new_keyword = document.getElementById("keyword-search-box").value
      this.$emit('search-executed', new_keyword, this.primary_brand_aliases, this.category_node_ids)
    }
  },

  created() {
    void(0);
  },

  mounted() {
    void(0)
  }
}
</script>

<style scoped>

</style>