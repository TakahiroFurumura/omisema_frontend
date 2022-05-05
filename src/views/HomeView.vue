<template>
  <LandingPanel/>
  <HomeRecommended/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import LandingPanel from '@/components/LandingPanel.vue';
import HomeRecommended from "@/components/HomeRecommended.vue";

export default defineComponent({
  name: 'HomeView',

  components: {
    HomeRecommended,
    LandingPanel
  },
});
</script>
