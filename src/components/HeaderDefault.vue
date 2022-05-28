<template>
    <div>
        <v-app-bar
            fixed
            color="white"
            fade-on-scroll
            scroll-off-screen
            width="100%"
        >
            <v-container class="d-flex align-center">
                <router-link to="/">
                  <img :src="require('@/assets/images/logo_icon.svg')" alt="" width="45"/>
                </router-link>
                <router-link to="/">
                  <h5 class="font-weight-medium mx-2">Omisema.com</h5>
                </router-link>

                <v-spacer></v-spacer>
                <div class="form-location flex-grow-1 d-none d-md-flex border rounded ">
                  <input class="white flex-grow-1  ps-5" type="text" placeholder="商品名やメーカーで検索" />
                  <v-btn icon large tile class="rounded-l-0 text-capitalize">
                    <v-icon small>mdi-magnify</v-icon>
                  </v-btn>
                </div>
                <v-spacer></v-spacer>

                <v-dialog
                  v-model="dialog"
                  width="500"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      light
                      text
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon class="me-0 me-sm-3"
                              color="disabled">
                        mdi-account-circle-outline
                      </v-icon>
                      <span class="d-none d-sm-block text-disabled">Account</span>
                    </v-btn>
                  </template>

                  <SignIn />
                </v-dialog>

                <v-app-bar-nav-icon text light @click="drawer = true"></v-app-bar-nav-icon>
            </v-container>
        </v-app-bar>

      <v-navigation-drawer
          width="320"
          v-model="drawer"
          fixed
        >

          <NavbarList>
            <template v-slot:userDrawerCloseButton>
              <v-btn @click.stop="drawer = !drawer" class="elevation-0">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
          </NavbarList>
        </v-navigation-drawer>
    </div>

</template>

<script>
import NavbarList from '@/components/ui/NavbarList.vue';

export default {
  components: {
    NavbarList,
  },

  data() {
      return {
          drawer: false,
          group: null,
          dialog: false,
          shoppingCartDrawer: false,
          items: [
              {
                action: 'mdi-view-dashboard-variant-outline',
                active: true,
                items: [
                    {
                      title: 'Review',
                      link: '/dashboard/Review',
                    },
                    {
                      title: 'Photos',
                      link: '/dashboard/Photos',
                    },
                    {
                      title: 'Order List',
                      link: '/dashboard/OrderList',
                    },
                    {
                      title: 'Order History',
                      link: '/dashboard/OrderHistory',
                    },
                    {
                      title: 'Followers',
                      link: '/dashboard/Followers',
                    },
                    {
                      title: 'Bookmarks',
                      link: '/dashboard/Bookmarks',
                    },
                ],
                title: 'Dashboards',
              },
              {
              action: 'mdi-silverware-fork-knife',
              active: false,
                items: [
                    { title: 'Breakfast & brunch' },
                    { title: 'New American' },
                    { title: 'Sushi' },
                ],
                title: 'Dining',
              },

          ]
      }
  }
}
</script>

<style scoped>

</style>