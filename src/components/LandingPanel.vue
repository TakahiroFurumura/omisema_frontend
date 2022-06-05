<template>
  <div class="hero-section" >
    <!--<Header :class="toggleNavClass()" />-->

    <v-container>
      <div class="mt-15">
        <v-row>
          <v-col cols="12" xl="5" class="mx-auto">
            <h1 class="text-black text-center display-2 font-weight-regular mt-4 mb-4">
              商品とお店を検索
            </h1>
            <h6 class="text-black text-center font-weight-regular mb-5">
              100件以上のネット通販をチェック、価格や在庫を比較します
            </h6>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12" lg="7" class="mx-auto mb-15">
            <div class="d-flex white flex-wrap">
              <input id="keyword-search-box" class="bg-white flex-1 rounded rounded-r-0 ps-5" type="text" placeholder="商品名やメーカーで検索"
                     @keypress.enter="openSearchResult"
              />
              <v-btn @click="openSearchResult"
                     x-large
                     color="primary"
                     class="rounded rounded-l-0 text-capitalize">
                検索
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>

export default {

  data: () => ({
    drawer: false,
    active: false,
    dialog: false,
    shoppingCartDrawer: false
  }),

  methods: {
    toggleNavClass(){
        if(this.active == false){
          return 'nav'
        } else {
          return 'sticky-nav'
        }
    },
    openSearchResult() {
      let e = document.getElementById("keyword-search-box")
      this.$router.push({name: "SearchResult",
        params:{search_type:"kbc", keywords:e.value, primary_brand_aliases:"-", category_node_ids:"-"}})
      return e.value;
    }
  },
  computed: {
  },

  mounted() {
    window.document.onscroll = () => {

      if(window.scrollY > 400){
        this.active = true;
      }else {
        this.active = false;
      }
    }
  }
}
</script>
<style lang="scss">

  .hero-section {
    background-image: url('../assets/images/background/plaid.jpg');
    background-repeat: repeat;
    .nav {
      display: none;
    }

  }

</style>

