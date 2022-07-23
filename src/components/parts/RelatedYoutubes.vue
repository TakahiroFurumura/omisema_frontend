<template>

  <v-card class="my-2 elevation-0">
    <v-card-title class="h6 px-2 py-1 d-flex align-center">
      <v-icon size="20px" color="black" class="px-1 align-self-center">mdi-movie-open-play</v-icon>
      <div class="align-self-center px-1">関連動画</div>
    </v-card-title>

    <v-row class="mx-1 my-1 py-1">
        <v-col v-for="youtube in youtube_list" v-bind:key=youtube.videoId
               class="mx-0 px-1 elevation-0 v-col-12 v-col-sm-6 v-col-md-4 v-col-lg-3">

          <div class="pa-0 ma-0" v-if="youtube.videoId===played_video_id">
            <iframe style="height:230px;width:100%"
                    :src="'https://www.youtube.com/embed/' + youtube.videoId"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
            </iframe>
          </div>

          <div v-if="youtube.videoId!==played_video_id" v-on:click="this.played_video_id=youtube.videoId">
            <img :src="youtube.thumbnail_url" :alt="youtube.title"
                 style="height:230px;width:100%;object-fit:cover;"/>
          </div>

          <p class="text-caption font-weight-medium" style="line-height: 16px;">{{youtube.title}}</p>
          <a :href="youtube.url" target="_blank" rel="noopener">
            <p class="text-caption font-weight-regular text-grey" style="line-height: 16px;">
              <v-icon small>mdi-youtube</v-icon>Youtubeで見る
            </p>
          </a>
        </v-col>

    </v-row>
    <p class="text-caption"><span>動画コンテンツ利用規約 </span><v-icon size="x-small">mdi-open-in-new</v-icon>
      <a class="text-decoration-underline" href="https://www.youtube.com/t/terms" target="_blank" rel="noopener">
        Youtube利用規約
      </a>
    </p>
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
      played_video_id: "",
      youtube_list: [{
        "videoId": "y2ukwm79fjM",
        "channelTitle": "イヤホン・ヘッドホン専門店 eイヤホン",
        "title": "【実機レビュー】オーディオテクニカ 初のノイキャン搭載TWS！ ATH-ANC300TW を聴いてみた！",
        "description": "プレミアムな音質と高精度ノイキャンを両立！＞ #オーディオテクニカ #ノイズキャンセリング #完全ワイヤレスイヤホン ・音 ...",
        "url": "https://www.youtube.com/watch?v=y2ukwm79fjM",
        "thumbnail_url": "https://i.ytimg.com/vi/y2ukwm79fjM/hqdefault.jpg"
      },
        {
        "videoId": "APKvDzlQIQw",
        "channelTitle": "瀬戸弘司",
        "title": "オーディオテクニカから、熱い手紙が届いた。",
        "description": "オーディオテクニカさんから熱い手紙が届きました。 こんな手紙をいただけるなんて、YouTuber冥利に尽きますね。 製品の感想 ...",
        "url": "https://www.youtube.com/watch?v=APKvDzlQIQw",
        "thumbnail_url": "https://i.ytimg.com/vi/APKvDzlQIQw/hqdefault.jpg"
        },
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
          if (response.status === 200) {
            // update ec_review_list
            this.played_video_id = ""
            for (let key in response.data) {
              try {
                let ydata = response.data[key];
                let new_youtube = {};
                new_youtube["videoId"] = ydata["id"]["videoId"];
                new_youtube["channelTitle"] = ydata["snippet"]["channelTitle"];
                new_youtube["title"] = ydata["snippet"]["title"];
                new_youtube["description"] = ydata["snippet"]["description"];
                new_youtube["url"] = "https://www.youtube.com/watch?v=" + ydata["id"]["videoId"];
                new_youtube["thumbnail_url"] = ydata["snippet"]["thumbnails"]["high"]["url"]
                console.log(new_youtube)
                this.youtube_list.push(new_youtube)
                if (this.played_video_id === "") this.played_video_id = ydata["id"]["videoId"]
              }
              catch {
                console.log("failed to load " + key)
              }
            }
            this.is_loading = false;
            this.is_load_failed = false;
            this.$emit('youtube-loaded', this.youtube_list.length)

            // log
            if (store.state.debug && this.debug) {
              console.log("youtube_list");
              console.log(this.youtube_list);
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
    change_playable(video_id) {
      this.played_video_id = video_id
    }
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