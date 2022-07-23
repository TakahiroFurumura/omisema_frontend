<template>
  <div class="hero-section" style="height:150px">
    <v-row class="">
      <v-col cols="12" xl="5" class="align-content-center">
        <v-container style="height: 100%">
          <h4 class="text-black text-center display-2 font-weight-regular ma-auto">プライバシーポリシー（個人情報保護方針）</h4>
        </v-container>
      </v-col>
    </v-row>
  </div>
  <div class="ma-2">
    <p>omisema.comのコンテンツを開発・運営している「おみせま開発委員会」（以下「運営者」という）は、omisema.comに表示されるコンテンツに関連する個人情報の取り扱いにつき、以下の通り定めます。</p>
    <v-divider class="my-5"/>
    <h5>個人情報の取得方法</h5>
    <p>運営者は、omisema.com利用者の個人を特定できる情報を収集していません。個人を特定できないIPアドレスと閲覧履歴など、Webサイトの運営・管理に必要な情報のみを記録し、サービスの向上に活用しています。</p>
    <p>omisema.comにおける個人情報の取り扱いに関するご質問やご不明点、苦情、その他のお問い合わせは下記メールアドレスよりご連絡ください。</p>

    <v-hover>
      <p class="text-caption">
        <v-icon class="pe-2">mdi-email</v-icon><span id="contact">{{admin_address}}</span>
      </p>
    </v-hover>

    <v-divider class="my-5"/>
    <h5>SSL（Secure Socket Layer）について</h5>
    <p>当社のWebサイトはSSLに対応しており、WebブラウザとWebサーバーとの通信を暗号化しています。ユーザーが入力する氏名や住所、電話番号などの個人情報は自動的に暗号化されます。</p>

    <v-divider class="my-5"/>
    <h5>cookieについて</h5>
    <p>cookieとは、WebサーバーからWebブラウザに送信されるデータのことです。Webサーバーがcookieを参照することでユーザーのパソコンを識別でき、効率的に当社Webサイトを利用することができます。当社Webサイトがcookieとして送るファイルは、個人を特定するような情報は含んでおりません。
    お使いのWebブラウザの設定により、cookieを無効にすることも可能です。</p>

    <v-divider class="my-5"/>
    <h5>掲載コンテンツの著作権について</h5>
    <p>omisema.com運営者は、インターネット情報の検索サービスを業として行う事業者であり、著作権法47条6並びに関連法令を遵守してサービスを運営しています。</p>
    <p>法令の定めの範囲内で、各著作権利者の同意なく著作物の軽微利用をさせて頂いておりますが、omisema.comで情報の概要や所在を開示することが著作権者の利益を不当に害する恐れがある場合には、著作権者からの申し出があれば該当する情報を削除いたします。本項に関するお申し出は下記メールアドレスにご連絡下さい。</p>
    <v-hover>
      <p class="text-caption">
        <v-icon class="pe-2">mdi-email</v-icon><span id="contact2">{{admin_address}}</span>
      </p>
    </v-hover>

    <v-divider class="my-5"/>
    <h5>連携サービスに関するプライバシーポリシー</h5>
    <h6>Google</h6>
    <p>omisema.comは、Google LLCが提供するGoogle AnalyticsやYoutubeなどのサービス・コンテンツを利用しています。Googleが提供するサービスに関するプライバシー・ポリシーは以下のリンクから確認できます。</p>
    <p><v-icon size="small">mdi-open-in-new</v-icon><a class="text-decoration-underline" href="https://policies.google.com/privacy">Google ポリシーと規約 - プライバシーポリシー</a></p>

    <v-divider class="my-5"/>
    <h5>免責</h5>
    <p>当社Webサイトに掲載されている情報の正確性には万全を期していますが、利用者が当社Webサイトの情報を用いて行う一切の行為に関して、一切の責任を負わないものとします。
    当社は、利用者が当社Webサイトを利用したことにより生じた利用者の損害及び利用者が第三者に与えた損害に関して、一切の責任を負わないものとします。</p>

    <v-divider class="my-5"/>
    <h5>プライバシーポリシーの制定日及び改定日</h5>
    <p>制定: Apr 1, 2022 </p>

  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

// Components
// import LandingPanel from '@/components/LandingPanel.vue';
// import HomeRecommended from "@/components/HomeRecommended.vue";

export default defineComponent({
  name: 'PrivacyPolicy',

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

<style scoped lang="scss">
  .hero-section {
    background-image: url('../assets/images/background/plaid.jpg');
    background-repeat: repeat;
    .nav {
      display: none;
    }
  }

  p{
    font-size: 14px;
  }
</style>