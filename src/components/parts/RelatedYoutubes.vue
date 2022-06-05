<template>

  <v-card class="my-2 elevation-0">
    <v-card-title class="h6 px-2 py-1 d-flex align-center">
      <v-icon size="20px" color="black" class="px-1 align-self-center">mdi-movie-open-play</v-icon>
      <div class="align-self-center px-1">関連動画</div>
    </v-card-title>

    <div class="d-flex mx-1 py-1" style="min-width:0;">
        <v-col v-for="youtube in youtube_list" v-bind:key=youtube.videoId
                class="mx-0 px-1 elevation-0 col-4" min-width="250px" max-width="400px">
          <div style="position: relative; padding-bottom: 56.25%; height:0; overflow: hidden">
            <iframe style="position:absolute; top:0; left:0; width:100%; height:100%"
                    :src="'https://www.youtube.com/embed/' + youtube.videoId"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
            </iframe>
          </div>
          <p class="text-caption font-weight-medium">{{youtube.title}}</p>
        </v-col>
    </div>
  </v-card>
  <!--<v-img :src="this.youtube_list[0].thumbnail"></v-img>-->
</template>

<script>
import axios from "axios";
import store from "@/store";

export default {
  name: "RelatedYoutubes.vue",
  props: {
    item_key: String,
  },
  data() {
    return{
      debug: true,
      youtube_list: [
          {
        "videoId": "y2ukwm79fjM",
        "publishedAt": "2020-05-25T09:42:57Z",
        "channelId": "UCDppocjZtrwEMYmSyFmBmbA",
        "channelTitle": "イヤホン・ヘッドホン専門店 eイヤホン",
        "title": "【実機レビュー】オーディオテクニカ 初のノイキャン搭載TWS！ ATH-ANC300TW を聴いてみた！",
        "description": "プレミアムな音質と高精度ノイキャンを両立！＞ #オーディオテクニカ #ノイズキャンセリング #完全ワイヤレスイヤホン ・音 ...",
        "thumbnail": "https://i.ytimg.com/vi/y2ukwm79fjM/hqdefault.jpg"},
        {
        "videoId": "APKvDzlQIQw",
        "publishedAt": "2022-04-14T10:00:05",
        "channelId": "UCFBjsYvwX7kWUjQoW7GcJ5A",
        "channelTitle": "瀬戸弘司",
        "title": "オーディオテクニカから、熱い手紙が届いた。",
        "description": "オーディオテクニカさんから熱い手紙が届きました。 こんな手紙をいただけるなんて、YouTuber冥利に尽きますね。 製品の感想 ...",
        "thumbnail": "https://i.ytimg.com/vi/APKvDzlQIQw/hqdefault.jpg"},
      ],
      is_loading: false,
      is_load_failed: false
    }
  },

  methods: {
    loadYoutubes() {
      // 全部消してLoading Screen
      this.youtube_list.splice(0);
      this.is_loading = true;

      let api_request_url = "https://a.omisema.com/media/youtube/" + this.item_key + "/"

      // log
      if(store.state.debug && this.debug) {
        console.log(api_request_url);
      }
      // 更新
      let retry_count = 0;
      axios.get(api_request_url, {timeout: 5000})
        .then((response) => {
          // log
          if(store.state.debug && this.debug) {
            console.log(api_request_url + " GET successful");
            console.log(response.data);
          }
          if (response.status !== 200) {
            // update ec_review_list
            for (let key in response.data) {
              let ydata = response.data[key];
              let new_youtube = {};
              new_youtube["videoId"] = ydata["id"]["videoId"];
              new_youtube["publishedAt"] = ydata["snippet"]["publishedAt"];
              new_youtube["channelId"] = ydata["snippet"]["channelId"];
              new_youtube["channelTitle"] = ydata["snippet"]["channelTitle"];
              new_youtube["title"] = ydata["snippet"]["title"];
              new_youtube["description"] = ydata["snippet"]["description"];
              new_youtube["thumbnail"] = ydata["snippet"]["thumbnails"]["high"];
              console.log(new_youtube)
              this.youtube_list.push(new_youtube)
            }
            this.is_loading = false;
            this.is_load_failed = false;
            this.$emit('youtube-loaded', this.youtube_list.length)

            // log
            if (store.state.debug && this.debug) {
              console.log("ec_review_list");
              console.log(this.ec_review_list);
            }
          }
        })
        .catch((e) => {
          if(store.state.debug && this.debug) {
            console.log(e);
          }
          retry_count += 1;
          if (retry_count <= 3) {
            this.is_load_failed = true;
          }
        })
    },
  },

  computed: {
  },

  mounted() {
    if (this.item_key != null) this.loadYoutubes();
  }
}
</script>

<style scoped>

</style>