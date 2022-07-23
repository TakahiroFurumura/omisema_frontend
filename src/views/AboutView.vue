<template>
  <div class="py-0">
    <v-row class="d-flex">
      <v-col class="v-col-12 v-col-sm-6">
        <div id="img-panel" class="d-flex" style="height:300px;">
          <h3 class="text-center ma-auto">Omisema.comについて</h3>
        </div>
      </v-col>

      <v-col class="mx-3" align-self="center">
        <v-row>
          <v-col>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="text-caption">おみせまは、大手検索サイトで出会えない小さなお店の情報まで幅広く収集し、消費者とお店との出会いを支援している検索サービスです。</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-hover>
              <p class="text-caption">
                お問い合わせはこちら
              </p>
              <p class="text-caption">
                <v-icon class="pe-2">mdi-email</v-icon><span id="contact">{{admin_address}}</span>
              </p>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
// import LandingPanel from '@/components/LandingPanel.vue';
// import HomeRecommended from "@/components/HomeRecommended.vue";

export default defineComponent({
  name: 'AboutView',

  components: {
  },

  data() {
    return {
      admin_address: "admin@omisema.com"
    }
  },

  methods: {
  }
});
</script>

<style lang="scss" scoped>
  #img-panel{
    background-image: url('../assets/images/background/jade.jpg');
    background-repeat: repeat;
  }
</style>