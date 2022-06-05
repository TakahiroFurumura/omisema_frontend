<template>
  <EcReviews
      :item_key="item_key"
      v-show="show_reviews"
      @ec-review-loaded="onEcReviewLoaded"
  />
  <RelatedYoutubes
      :item_key="item_key"
      v-show="show_youtube"
      @youtube-loaded="onYoutubeLoaded"
  />
</template>

<script>
import EcReviews from "@/components/parts/EcReviews";
import RelatedYoutubes from "@/components/parts/RelatedYoutubes";

export default {
  name: "RelatedWebsites",
  components: {
    EcReviews,
    RelatedYoutubes,
  },

  props: {
    item_key: String,
  },

  data() {
    return{
      show_reviews: false,
      show_youtube: false,
    }
  },

  methods : {
    onEcReviewLoaded: function(n) {
      this.show_reviews = true;
      this.$emit('reviewContentsLoaded', n);
    },
    onYoutubeLoaded: function(n) {
      this.show_youtube = true;
      this.$emit('youtubeContentsLoaded', n)
    }
  }

}

</script>

<style scoped>

</style>