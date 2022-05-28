<template>
  <div class="py-0">
    <v-row>

      <v-col>
        <v-img
          :src="require('@/assets/images/about.jpg')"
        />
      </v-col>

      <v-col align-self="center">
        <v-row>
          <v-col>
            <h3>Omisema.comについて</h3>
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