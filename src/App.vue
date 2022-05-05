<template>
  <v-app>
    <HeaderDefault/>
    <router-view/>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// Components
import HeaderDefault from '@/components/HeaderDefault.vue'

export default defineComponent({
  name: 'App',

  components: {
    HeaderDefault,
  },

  data () {
    return {
      //
    }
  },
})
</script>
