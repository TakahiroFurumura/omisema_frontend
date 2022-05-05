<template>
  <div>
    <!-- <v-app-bar-nav-icon tile dark @click="drawer = true"></v-app-bar-nav-icon> -->
    <div class="d-flex justify-space-between align-center ps-4 pe-3 mt-3">
      <h5 class="m-0 mt-3">Index</h5>
      <slot name="userDrawerCloseButton"></slot>
    </div>

    <div class="navbar-scroll">
      <v-list dense>
        <v-list-item-group  color="primary">
            <v-card
              class="mx-auto elevation-0"
              max-width="300"
              style="cursor: pointer"
            >
              <v-list-item>
                <v-icon class="mr-1 v-icon--size-large" stype="">mdi-alpha-o-circle-outline</v-icon>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-midium">Omisema.comについて</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
        </v-list-item-group>
      </v-list>
    </div>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  // .navbar-scroll {
  //   overflow-y: scroll;
  //   height: calc(100vh - 36px);
  // }
</style>