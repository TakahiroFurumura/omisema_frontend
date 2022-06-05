<template>
  <v-app>
    <HeaderDefault/>
    <v-main>
      <router-view/>
    </v-main>
    <FooterDefault/>
  </v-app>
</template>

<script lang="ts">
import {defineComponent, onMounted} from 'vue';
// Components
import store from './store'
import HeaderDefault from '@/components/HeaderDefault.vue'
import FooterDefault from '@/components/FooterDefault.vue'

export default defineComponent({
  name: 'App',

  components: {
    HeaderDefault,
    FooterDefault
  },

  setup() {
    onMounted(() => {
      if (store.state.debug) console.log('Debug mode.');
    })
  },

  data () {
    return {
      //
    }
  },

})
</script>

<style scoped>
</style>