import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SearchView from '@/views/SearchView.vue'
import ItemOfferView from '@/views/ItemView.vue';
import PrivacyPolicy from "@/views/PrivacyPolicy.vue";
import ItemView from "@/views/ItemView.vue";
import AboutView from "@/views/AboutView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/item/:ik',
    name: 'ItemView',
    component: ItemView

  },
  // 検索
  // search_typeは、k, kbc
  {
    path: '/search-result/:search_type/:keywords/:primary_brand_aliases/:category_node_ids',
    name: 'SearchResult',
    component: SearchView
  },
  // About
  {
    path: '/about',
    name: 'AboutView',
    component: AboutView
  },
  // Privacy Policy
  {
    path: '/privacy_policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
