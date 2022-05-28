<template>
  <EcReviews :item_key="item_key"
             @ec-review-loaded="onEcReviewLoaded"
  ></EcReviews>
</template>

<script>
import EcReviews from "@/components/parts/EcReviews";

export default {
  name: "RelatedWebsites",
  components: {
    EcReviews,
  },

  props: {
    item_key: String,
  },

  methods : {
    onEcReviewLoaded: function(n) {
      this.$emit('reviewContentsLoaded', n)
    }
  }

}

</script>

<style scoped>

</style>