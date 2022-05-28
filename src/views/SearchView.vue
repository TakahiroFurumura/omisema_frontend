<template>
  <v-container class="mx-0">
    <SearchPanel
        :keyword="keywords"
        :primary_brand_aliases="primary_brand_aliases"
        :category_node_ids="category_node_ids"
        :placeholder_text="keywords"
        @search-executed="updateSearch"
    />
    <ItemList
        id="search-result-item-list"
        v-if="!no_search_result"
        :items="items"
        :is_loading="is_loading"
        :is_load_failed="is_load_failed"
    />
    <HomeRecommended v-if="no_search_result"/>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';

// Components
// import LandingPanel from '@/components/LandingPanel.vue';
// import HomeRecommended from "@/components/HomeRecommended.vue";
import SearchPanel from "@/components/SearchPanel.vue"
import ItemList from "@/components/parts/ItemList.vue";
import ItemInfo from "@/lib/class_item_info";
import axios from "axios";
import store from "@/store";
import HomeRecommended from "@/components/HomeRecommended.vue";

export default defineComponent({
  name: 'SeatchView',

  components: {
    HomeRecommended,
    ItemList,
    SearchPanel,
  },

  props: {
  },

  data() {
    return {
      debug: true,
      no_search_result: false,  // 検索結果がないときに表示
      max_items: 50,

      // search criteria
      search_type: "kbc",
      keywords: "-",
      primary_brand_aliases: "-",
      category_node_ids: "-",

      items: [],
      is_loading: false,
      is_load_failed: false,
    }
  },

  methods: {
    updateSearch(k, b, c) {
      this.keywords = k;
      this.primary_brand_aliases = b;
      this.category_node_ids = c;
      this.$router.push(
          {name: "SearchResult",
            params:{search_type:"kbc", keywords:k, primary_brand_aliases:b, category_node_ids:c}
          })
      this.refreshSearchResult()

    },

    getSearchCriteriaFromUrl() {
      // URLから検索条件を取り込む
      this.search_type = typeof(this.$route.params.search_type) === "string" ? this.$route.params.search_type : "-";
      switch (this.search_type) {
        case 'kbc':
        this.keywords = typeof(this.$route.params.keywords) === "string" ? this.$route.params.keywords: "-";
        this.primary_brand_aliases = typeof(this.$route.params.primary_brand_aliases) === "string" ? this.$route.params.primary_brand_aliases : "-";
        this.category_node_ids = typeof(this.$route.params.category_node_ids) === "string" ? this.$route.params.category_node_ids : "-";
        break;
      }
      // Log
      if (store.state.debug && this.debug) {
        console.log('SearchPanel Criteria Updated')
        console.log("search type=", this.search_type)
        console.log("keywords=", this.keywords)
        console.log("primary brand aliases=", this.primary_brand_aliases)
        console.log("category_node_ids=", this.category_node_ids)
      }

    },

    refreshSearchResult() {
      this.getSearchCriteriaFromUrl()
      // Log
      if (store.state.debug && this.debug) {
        console.log(this.keywords, this.primary_brand_aliases, this.category_node_ids)
      }

      // 全て消す
      this.items.splice(0)

      // 検索条件がない
      if (this.keywords === "-" && this.primary_brand_aliases === "-" && this.category_node_ids === "-") {
        this.no_search_result = true;
        return;
      }

      // 検索API URL
      let api_request_url;
      if (this.search_type === "kbc") {
        let _keywords = (this.keywords === "") ? "-" : this.keywords;
        let _primary_brand_aliases = (this.primary_brand_aliases === "") ? "-" : this.primary_brand_aliases;
        let _category_node_ids = (this.category_node_ids === "") ? "-" : this.category_node_ids;

        api_request_url = "https://a.omisema.com/search/kbc/"
            + _keywords + "/"
            + _primary_brand_aliases + "/"
            + _category_node_ids + "/";
        if (store.state.debug && this.debug) console.log(api_request_url);

      } else {
        console.log('invalid search type')
        return;
      }

      axios.get(api_request_url)
        .then((response) => {
          // log
          if (store.state.debug && this.debug) {
            console.log("GET successful");
            console.log(response.data);
          }

          for (let key in response.data) {
            let new_item = new ItemInfo(response.data[key]);
            this.items.push(new_item)
            this.is_loading = false;
          }

          // 並べ替え
          // this.is_loading = false;
          // this.sort_items()
          // 数調整
          if (this.max_items !== null && this.items.length > this.max_items) {
            this.items.splice(this.max_items)
          //表示
          this.no_search_result = false;
          }
        })
        .catch((e) => {
          if (this.debug) {
            console.log(e);
          }
        })
    },
  },

  mounted() {
    this.getSearchCriteriaFromUrl()
    this.refreshSearchResult()
  }
});
</script>

<style scoped>

</style>